"use server";

import { getPrisma } from "@/lib/db";
import { getStripeClient } from "@/lib/stripe";
import { getAvailableSlots } from "@/lib/availability";
import { bookingFormSchema } from "@/lib/validations/booking";
import { calculateDiscountedPrice } from "@/lib/discount";
import { auth } from "@/lib/auth";
import { londonTimeToUTC } from "@/lib/time";
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

export async function getAuthUserProfile(): Promise<{
  name: string;
  email: string;
  phone: string;
} | null> {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await getPrisma().user.findUnique({
    where: { email: session.user.email },
    select: { name: true, email: true, phone: true },
  });
  if (!user) return null;

  return {
    name: user.name || "",
    email: user.email,
    phone: user.phone || "",
  };
}

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

export type PaymentIntentResult =
  | {
      clientSecret: string;
      paymentIntentId: string;
      finalPrice: number;
      originalPrice: number;
      discountAmount: number;
      error: null;
    }
  | { clientSecret: null; error: string };

/**
 * Creates a Stripe PaymentIntent for an inline (Payment Element) checkout.
 * No DB row is created until the webhook receives `payment_intent.succeeded`.
 */
export async function createPaymentIntent(formData: {
  serviceId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  discountCode?: string;
}): Promise<PaymentIntentResult> {
  const parsed = bookingFormSchema.safeParse(formData);
  if (!parsed.success) {
    return { clientSecret: null, error: parsed.error.issues[0].message };
  }
  const { serviceId, date, time, name, email, phone, notes, discountCode } =
    parsed.data;

  const service = await getPrisma().service.findUnique({
    where: { id: serviceId },
  });
  if (!service) return { clientSecret: null, error: "Service not found" };

  const availableSlots = await getAvailableSlots(serviceId, date);
  if (!availableSlots.includes(time)) {
    return {
      clientSecret: null,
      error: "This time slot is no longer available. Please choose another.",
    };
  }

  const startTime = londonTimeToUTC(date, time);
  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + service.duration);

  const authSession = await auth();
  let userId: string | null = null;
  if (authSession?.user?.email) {
    const user = await getPrisma().user.findUnique({
      where: { email: authSession.user.email },
      select: { id: true },
    });
    userId = user?.id ?? null;
  }

  let finalPrice = service.price;
  let discountCodeId: string | null = null;
  let discountAmount = 0;

  if (discountCode) {
    const result = await validateDiscountCode({ code: discountCode, serviceId });
    if (!result.valid) {
      return { clientSecret: null, error: result.error || "Invalid discount code." };
    }
    finalPrice = result.finalPrice!;
    discountAmount = result.savedAmount!;
    discountCodeId = result.codeId!;
  }

  const stripe = getStripeClient();
  const intent = await stripe.paymentIntents.create({
    amount: finalPrice,
    currency: "gbp",
    automatic_payment_methods: { enabled: true },
    receipt_email: email,
    description: discountCodeId
      ? `${service.name} (${service.duration}min) — ${discountCode!.toUpperCase()} applied`
      : `${service.name} (${service.duration}min)`,
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
  });

  if (!intent.client_secret) {
    return { clientSecret: null, error: "Failed to initialise payment." };
  }

  return {
    clientSecret: intent.client_secret,
    paymentIntentId: intent.id,
    finalPrice,
    originalPrice: service.price,
    discountAmount,
    error: null,
  };
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

      // Re-check discount maxUses inside the transaction
      if (discountCodeId) {
        const code = await tx.discountCode.findUnique({
          where: { id: discountCodeId },
        });
        if (code?.maxUses != null && code.usedCount >= code.maxUses) {
          throw new Error("DISCOUNT_EXHAUSTED");
        }
      }

      let ref = generateReference();
      while (await tx.booking.findUnique({ where: { reference: ref } })) {
        ref = generateReference();
      }

      const booking = await tx.booking.create({
        data: {
          reference: ref,
          status: "CONFIRMED",
          source: "CASH",
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
    if (err instanceof Error && err.message === "DISCOUNT_EXHAUSTED") {
      return {
        reference: null,
        error: "This discount code has reached its usage limit. Please remove it and try again.",
      };
    }
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
    const { sendEmail, ADMIN_EMAIL } = await import("@/lib/email");
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

    const confirmation = buildConfirmationEmail(emailData);
    await sendEmail({
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
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `💷 CASH — ${notification.subject}`,
      html: notification.html,
    });
  } catch (emailErr) {
    console.error("Failed to send cash booking emails:", emailErr);
  }

  return { reference, error: null };
}

export async function checkConsultationStatus(): Promise<{
  signedIn: boolean;
  consultationComplete: boolean;
}> {
  const session = await auth();
  if (!session?.user?.email) {
    return { signedIn: false, consultationComplete: true };
  }

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return { signedIn: false, consultationComplete: true };

  const requiredQuestions = await prisma.consultationQuestion.findMany({
    where: { active: true, required: true },
    select: { id: true },
  });

  if (requiredQuestions.length === 0) {
    return { signedIn: true, consultationComplete: true };
  }

  const responses = await prisma.consultationResponse.findMany({
    where: {
      userId: user.id,
      questionId: { in: requiredQuestions.map((q) => q.id) },
    },
  });

  const answeredIds = new Set(
    responses.filter((r) => r.answer.trim() !== "").map((r) => r.questionId)
  );

  return {
    signedIn: true,
    consultationComplete: requiredQuestions.every((q) => answeredIds.has(q.id)),
  };
}

