"use server";

import { getPrisma } from "@/lib/db";
import { getStripeClient } from "@/lib/stripe";
import { getAvailableSlots } from "@/lib/availability";
import { bookingFormSchema } from "@/lib/validations/booking";
import { calculateDiscountedPrice } from "@/lib/discount";
import { auth } from "@/lib/auth";
import type { ServiceCategory, DiscountType } from "@prisma/client";

export type ServiceWithCategory = {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  description: string | null;
  duration: number;
  price: number;
};

export type DiscountValidationResult = {
  valid: boolean;
  error?: string;
  discountType?: DiscountType;
  amount?: number;
  finalPrice?: number;
  savedAmount?: number;
  codeId?: string;
  code?: string;
};

export type MemberDiscountCode = {
  id: string;
  code: string;
  discountType: DiscountType;
  amount: number;
  expiresAt: string | null;
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

export async function validateDiscountCode(data: {
  code: string;
  serviceId: string;
}): Promise<DiscountValidationResult> {
  const prisma = getPrisma();
  const code = data.code.toUpperCase().trim();

  const discountCode = await prisma.discountCode.findUnique({
    where: { code },
  });

  if (!discountCode || !discountCode.active) {
    return { valid: false, error: "Invalid discount code." };
  }

  if (discountCode.expiresAt && discountCode.expiresAt < new Date()) {
    return { valid: false, error: "This discount code has expired." };
  }

  if (discountCode.maxUses !== null && discountCode.usedCount >= discountCode.maxUses) {
    return { valid: false, error: "This discount code has been fully used." };
  }

  // If personal code, verify the current user matches
  if (discountCode.userId) {
    const session = await auth();
    if (!session?.user?.email) {
      return { valid: false, error: "You must be signed in to use this code." };
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (!user || user.id !== discountCode.userId) {
      return { valid: false, error: "This code is not assigned to your account." };
    }
  }

  const service = await prisma.service.findUnique({
    where: { id: data.serviceId },
  });
  if (!service) {
    return { valid: false, error: "Service not found." };
  }

  const { finalPrice, savedAmount } = calculateDiscountedPrice(
    service.price,
    discountCode.discountType,
    discountCode.amount
  );

  return {
    valid: true,
    discountType: discountCode.discountType,
    amount: discountCode.amount,
    finalPrice,
    savedAmount,
    codeId: discountCode.id,
    code: discountCode.code,
  };
}

export async function getMemberDiscountCodes(): Promise<MemberDiscountCode[]> {
  const session = await auth();
  if (!session?.user?.email) return [];

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return [];

  const codes = await prisma.discountCode.findMany({
    where: {
      userId: user.id,
      active: true,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  // Filter exhausted codes in JS (Prisma can't compare two columns)
  return codes
    .filter((c) => c.maxUses === null || c.usedCount < c.maxUses)
    .map((c) => ({
      id: c.id,
      code: c.code,
      discountType: c.discountType,
      amount: c.amount,
      expiresAt: c.expiresAt?.toISOString() ?? null,
    }));
}

export async function createCheckoutSession(formData: {
  serviceId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  discountCode?: string;
}): Promise<{ url: string | null; error: string | null }> {
  // Validate input
  const parsed = bookingFormSchema.safeParse(formData);
  if (!parsed.success) {
    return { url: null, error: parsed.error.issues[0].message };
  }

  const { serviceId, date, time, name, email, phone, notes, discountCode } = parsed.data;

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

  // Validate and apply discount code
  let finalPrice = service.price;
  let discountCodeId: string | null = null;
  let discountAmount = 0;

  if (discountCode) {
    const result = await validateDiscountCode({ code: discountCode, serviceId });
    if (!result.valid) {
      return { url: null, error: result.error || "Invalid discount code." };
    }
    finalPrice = result.finalPrice!;
    discountAmount = result.savedAmount!;
    discountCodeId = result.codeId!;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3034";

  // Create Stripe Checkout Session
  const stripe = getStripeClient();
  const productDescription = discountCodeId
    ? `${service.duration} minutes — Healing with Boo (${discountCode!.toUpperCase()} applied)`
    : `${service.duration} minutes — Healing with Boo`;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: service.name,
            description: productDescription,
          },
          unit_amount: finalPrice,
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
      price: finalPrice.toString(),
      originalPrice: service.price.toString(),
      ...(userId && { userId }),
      ...(discountCodeId && {
        discountCodeId,
        discountAmount: discountAmount.toString(),
      }),
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
  discountCode?: string;
}): Promise<{ reference: string | null; error: string | null }> {
  const parsed = bookingFormSchema.safeParse(formData);
  if (!parsed.success) {
    return { reference: null, error: parsed.error.issues[0].message };
  }

  const { serviceId, date, time, name, email, phone, notes, discountCode } = parsed.data;

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

  // Validate discount code before entering transaction
  let discountCodeId: string | null = null;
  let discountAmount = 0;
  let finalPrice = service.price;

  if (discountCode) {
    const result = await validateDiscountCode({ code: discountCode, serviceId });
    if (!result.valid) {
      return { reference: null, error: result.error || "Invalid discount code." };
    }
    discountCodeId = result.codeId!;
    discountAmount = result.savedAmount!;
    finalPrice = result.finalPrice!;
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

      const booking = await tx.booking.create({
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
          price: finalPrice,
          discountCodeId,
          discountAmount: discountAmount || null,
          notes: notes || null,
        },
      });

      // Record discount usage and increment counter
      if (discountCodeId) {
        await tx.discountUsage.create({
          data: {
            discountCodeId,
            bookingId: booking.id,
            userId,
            originalPrice: service.price,
            discountAmount,
          },
        });
        await tx.discountCode.update({
          where: { id: discountCodeId },
          data: { usedCount: { increment: 1 } },
        });
      }

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

    let priceDisplay = `${formatPrice(finalPrice)} (pay on the day)`;
    if (discountAmount > 0) {
      priceDisplay = `${formatPrice(finalPrice)} (was ${formatPrice(service.price)} — ${discountCode!.toUpperCase()} applied) (pay on the day)`;
    }

    const emailData = {
      reference,
      guestName: name,
      serviceName: service.name,
      date: formatDate(startTime),
      time: formatTime(startTime),
      duration: formatDuration(service.duration),
      price: priceDisplay,
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
