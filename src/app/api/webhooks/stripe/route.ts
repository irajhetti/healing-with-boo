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

    // Idempotency: check if this webhook was already processed
    const existingBooking = await getPrisma().booking.findUnique({
      where: { stripeSessionId: session.id },
    });
    if (existingBooking) {
      console.log(`Webhook replay — booking ${existingBooking.reference} already exists`);
      return NextResponse.json({ received: true });
    }

    const prisma = getPrisma();
    let reference: string;

    // Use serializable transaction to prevent double-booking
    try {
      reference = await prisma.$transaction(async (tx) => {
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

        let ref = generateReference();
        while (await tx.booking.findUnique({ where: { reference: ref } })) {
          ref = generateReference();
        }

        await tx.booking.create({
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
            stripeSessionId: session.id,
            stripePaymentId: session.payment_intent as string | null,
            notes: metadata.notes || null,
          },
        });

        return ref;
      }, { isolationLevel: "Serializable" });
    } catch (err) {
      // SLOT_CONFLICT = our explicit check; P2034 = PostgreSQL serialization failure
      const isSlotConflict =
        (err instanceof Error && err.message === "SLOT_CONFLICT") ||
        (err != null && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2034");
      if (isSlotConflict) {
        // Refund the payment since the slot is taken
        if (session.payment_intent) {
          await getStripeClient().refunds.create({
            payment_intent: session.payment_intent as string,
          });
        }
        console.error(`Slot conflict for session ${session.id} — refunded`);
        return NextResponse.json({ received: true });
      }
      throw err;
    }

    console.log(`Booking created: ${reference} for ${metadata.guestName}`);

    // Send confirmation + notification emails
    try {
      const service = await getPrisma().service.findUnique({
        where: { id: metadata.serviceId },
      });

      const emailData = {
        reference,
        guestName: metadata.guestName || "Guest",
        serviceName: service?.name || "Session",
        date: formatDate(startTime),
        time: formatTime(startTime),
        duration: formatDuration(service?.duration || 60),
        price: formatPrice(parseInt(metadata.price || "0")),
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
