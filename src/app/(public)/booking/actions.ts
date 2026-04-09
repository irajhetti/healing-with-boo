"use server";

import { getPrisma } from "@/lib/db";
import { getStripeClient } from "@/lib/stripe";
import { getAvailableSlots } from "@/lib/availability";
import { bookingFormSchema } from "@/lib/validations/booking";
import { auth } from "@/lib/auth";
import type { ServiceCategory } from "@prisma/client";

export type ServiceWithCategory = {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  description: string | null;
  duration: number;
  price: number;
};

export async function getServices(): Promise<
  Record<ServiceCategory, ServiceWithCategory[]>
> {
  const services = await getPrisma().service.findMany({
    where: { active: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });

  const grouped: Record<ServiceCategory, ServiceWithCategory[]> = {
    MASSAGE: [],
    HEALING: [],
    COMBINED: [],
    SIGNATURE: [],
  };

  for (const service of services) {
    grouped[service.category].push(service);
  }

  return grouped;
}

export async function createCheckoutSession(formData: {
  serviceId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}): Promise<{ url: string | null; error: string | null }> {
  // Validate input
  const parsed = bookingFormSchema.safeParse(formData);
  if (!parsed.success) {
    return { url: null, error: parsed.error.issues[0].message };
  }

  const { serviceId, date, time, name, email, phone, notes } = parsed.data;

  // Look up service
  const service = await getPrisma().service.findUnique({
    where: { id: serviceId },
  });
  if (!service) {
    return { url: null, error: "Service not found" };
  }

  // Re-check availability
  const availableSlots = await getAvailableSlots(serviceId, date);
  if (!availableSlots.includes(time)) {
    return {
      url: null,
      error: "This time slot is no longer available. Please choose another.",
    };
  }

  // Build start and end times in UTC
  // Treat the selected time as London wall-clock time and convert to UTC
  const startTime = londonTimeToUTC(date, time);
  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + service.duration);

  // Check if user is signed in to link booking
  const authSession = await auth();
  let userId: string | null = null;
  if (authSession?.user?.email) {
    const user = await getPrisma().user.findUnique({
      where: { email: authSession.user.email },
      select: { id: true },
    });
    userId = user?.id ?? null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3034";

  // Create Stripe Checkout Session
  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: service.name,
            description: `${service.duration} minutes — Healing with Boo`,
          },
          unit_amount: service.price,
        },
        quantity: 1,
      },
    ],
    customer_email: email,
    metadata: {
      serviceId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      guestName: name,
      guestEmail: email,
      guestPhone: phone,
      notes: notes || "",
      price: service.price.toString(),
      ...(userId && { userId }),
    },
    success_url: `${baseUrl}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/booking`,
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 min expiry
  });

  return { url: session.url, error: null };
}

export async function createCashBooking(formData: {
  serviceId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}): Promise<{ reference: string | null; error: string | null }> {
  const parsed = bookingFormSchema.safeParse(formData);
  if (!parsed.success) {
    return { reference: null, error: parsed.error.issues[0].message };
  }

  const { serviceId, date, time, name, email, phone, notes } = parsed.data;

  const service = await getPrisma().service.findUnique({
    where: { id: serviceId },
  });
  if (!service) {
    return { reference: null, error: "Service not found" };
  }

  const availableSlots = await getAvailableSlots(serviceId, date);
  if (!availableSlots.includes(time)) {
    return {
      reference: null,
      error: "This time slot is no longer available. Please choose another.",
    };
  }

  const startTime = londonTimeToUTC(date, time);
  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + service.duration);

  // Check if user is signed in to link booking
  const authSession = await auth();
  let userId: string | null = null;
  if (authSession?.user?.email) {
    const user = await getPrisma().user.findUnique({
      where: { email: authSession.user.email },
      select: { id: true },
    });
    userId = user?.id ?? null;
  }

  const { generateReference } = await import("@/lib/utils");
  const prisma = getPrisma();

  // Use serializable transaction to prevent double-booking
  let reference: string;
  try {
    reference = await prisma.$transaction(async (tx) => {
      // Re-check for conflicts inside the transaction
      const conflicting = await tx.booking.findFirst({
        where: {
          status: "CONFIRMED",
          startTime: { lt: endTime },
          endTime: { gt: startTime },
        },
      });
      if (conflicting) {
        throw new Error("SLOT_TAKEN");
      }

      let ref = generateReference();
      while (await tx.booking.findUnique({ where: { reference: ref } })) {
        ref = generateReference();
      }

      await tx.booking.create({
        data: {
          reference: ref,
          status: "CONFIRMED",
          serviceId,
          userId,
          guestName: name,
          guestEmail: email,
          guestPhone: phone,
          startTime,
          endTime,
          price: service.price,
          notes: notes || null,
        },
      });

      return ref;
    }, { isolationLevel: "Serializable" });
  } catch (err) {
    // SLOT_TAKEN = our explicit check; P2034 = PostgreSQL serialization failure
    const isSlotConflict =
      (err instanceof Error && err.message === "SLOT_TAKEN") ||
      (err != null && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2034");
    if (isSlotConflict) {
      return {
        reference: null,
        error: "This time slot is no longer available. Please choose another.",
      };
    }
    throw err;
  }

  // Send emails
  try {
    const { getResendClient, FROM_EMAIL, ADMIN_EMAIL } = await import("@/lib/email");
    const { buildConfirmationEmail } = await import("@/lib/emails/booking-confirmation");
    const { buildNotificationEmail } = await import("@/lib/emails/booking-notification");
    const { formatDate, formatTime, formatDuration, formatPrice } = await import("@/lib/utils");

    const emailData = {
      reference,
      guestName: name,
      serviceName: service.name,
      date: formatDate(startTime),
      time: formatTime(startTime),
      duration: formatDuration(service.duration),
      price: `${formatPrice(service.price)} (pay on the day)`,
    };

    const resend = getResendClient();

    const confirmation = buildConfirmationEmail(emailData);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: confirmation.subject,
      html: confirmation.html,
    });

    const notification = buildNotificationEmail({
      ...emailData,
      guestEmail: email,
      guestPhone: phone,
      notes: notes || null,
    });
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `💷 CASH — ${notification.subject}`,
      html: notification.html,
    });
  } catch (emailErr) {
    console.error("Failed to send cash booking emails:", emailErr);
  }

  return { reference, error: null };
}

function londonTimeToUTC(dateStr: string, timeStr: string): Date {
  // Create a date string that represents the London wall-clock time
  // Use Intl to find the UTC offset for London on this specific date
  const naive = new Date(`${dateStr}T${timeStr}:00Z`);
  const utcStr = naive.toLocaleString("en-US", { timeZone: "UTC" });
  const londonStr = naive.toLocaleString("en-US", { timeZone: "Europe/London" });
  const offsetMs = new Date(londonStr).getTime() - new Date(utcStr).getTime();
  // Subtract London's offset from the naive UTC time to get the real UTC
  return new Date(naive.getTime() - offsetMs);
}
