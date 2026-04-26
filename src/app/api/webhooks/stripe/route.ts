import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import { getPrisma } from "@/lib/db";
import { generateReference, formatDate, formatTime, formatDuration, formatPrice } from "@/lib/utils";
import { getResendClient, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/email";
import { buildConfirmationEmail } from "@/lib/emails/booking-confirmation";
import { buildNotificationEmail } from "@/lib/emails/booking-notification";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripeClient().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (!metadata?.serviceId || !metadata?.startTime || !metadata?.endTime) {
      console.error("Missing metadata in checkout session:", session.id);
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const startTime = new Date(metadata.startTime);
    const endTime = new Date(metadata.endTime);

    const prisma = getPrisma();
    let reference: string;
    let alreadyProcessed = false;

    // Use serializable transaction to prevent double-booking + maxUses races
    try {
      reference = await prisma.$transaction(async (tx) => {
        // Idempotency check inside the transaction (in case Stripe retries concurrently)
        const existing = await tx.booking.findUnique({
          where: { stripeSessionId: session.id },
        });
        if (existing) {
          alreadyProcessed = true;
          return existing.reference;
        }

        // Re-check availability inside the transaction
        const conflicting = await tx.booking.findFirst({
          where: {
            status: "CONFIRMED",
            startTime: { lt: endTime },
            endTime: { gt: startTime },
          },
        });

        if (conflicting) {
          throw new Error("SLOT_CONFLICT");
        }

        const discountCodeId = metadata.discountCodeId || null;
        const discountAmount =
          metadata.discountAmount != null && metadata.discountAmount !== ""
            ? parseInt(metadata.discountAmount)
            : null;

        // Re-check discount maxUses inside the transaction to prevent over-redemption races
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
            serviceId: metadata.serviceId,
            userId: metadata.userId || null,
            guestName: metadata.guestName || null,
            guestEmail: metadata.guestEmail || null,
            guestPhone: metadata.guestPhone || null,
            startTime,
            endTime,
            price: parseInt(metadata.price || "0"),
            discountCodeId,
            discountAmount,
            stripeSessionId: session.id,
            stripePaymentId: session.payment_intent as string | null,
            notes: metadata.notes || null,
          },
        });

        // Record discount usage + increment counter (covers £0 fixed discounts too)
        if (discountCodeId) {
          const originalPrice = metadata.originalPrice
            ? parseInt(metadata.originalPrice)
            : parseInt(metadata.price || "0") + (discountAmount ?? 0);
          await tx.discountUsage.create({
            data: {
              discountCodeId,
              bookingId: booking.id,
              userId: metadata.userId || null,
              originalPrice,
              discountAmount: discountAmount ?? 0,
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
      // P2002 = unique constraint on stripeSessionId — concurrent webhook delivery; treat as no-op replay
      if (err != null && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2002") {
        console.log(`Concurrent webhook delivery for session ${session.id} — already processed`);
        return NextResponse.json({ received: true });
      }

      const isSlotConflict =
        (err instanceof Error && err.message === "SLOT_CONFLICT") ||
        (err instanceof Error && err.message === "DISCOUNT_EXHAUSTED") ||
        (err != null && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2034");
      if (isSlotConflict) {
        // Refund — slot taken or discount exhausted between checkout creation and payment
        if (session.payment_intent) {
          await getStripeClient().refunds.create({
            payment_intent: session.payment_intent as string,
          });
        }
        const reason = err instanceof Error ? err.message : "SLOT_CONFLICT";
        console.error(`${reason} for session ${session.id} — refunded`);
        return NextResponse.json({ received: true });
      }
      throw err;
    }

    if (alreadyProcessed) {
      console.log(`Webhook replay — booking ${reference} already exists`);
      return NextResponse.json({ received: true });
    }

    console.log(`Booking created: ${reference} for ${metadata.guestName}`);

    // Send confirmation + notification emails
    try {
      const service = await getPrisma().service.findUnique({
        where: { id: metadata.serviceId },
      });

      const finalPrice = parseInt(metadata.price || "0");
      const originalPrice = metadata.originalPrice
        ? parseInt(metadata.originalPrice)
        : finalPrice;
      const discountApplied = originalPrice > finalPrice;

      let priceDisplay = formatPrice(finalPrice);
      if (discountApplied) {
        priceDisplay = `${formatPrice(finalPrice)} (was ${formatPrice(originalPrice)} — discount applied)`;
      }

      const emailData = {
        reference,
        guestName: metadata.guestName || "Guest",
        serviceName: service?.name || "Session",
        date: formatDate(startTime),
        time: formatTime(startTime),
        duration: formatDuration(service?.duration || 60),
        price: priceDisplay,
      };

      const resend = getResendClient();

      if (metadata.guestEmail) {
        const confirmation = buildConfirmationEmail(emailData);
        await resend.emails.send({
          from: FROM_EMAIL,
          to: metadata.guestEmail,
          subject: confirmation.subject,
          html: confirmation.html,
        });
      }

      const notification = buildNotificationEmail({
        ...emailData,
        guestEmail: metadata.guestEmail || "",
        guestPhone: metadata.guestPhone || "",
        notes: metadata.notes || null,
      });
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: notification.subject,
        html: notification.html,
      });
    } catch (emailErr) {
      // Log but don't fail — booking is already created
      console.error("Failed to send booking emails:", emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
