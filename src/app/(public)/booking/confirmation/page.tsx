import Link from "next/link";
import type { Metadata } from "next";
import { getPrisma } from "@/lib/db";
import { formatPrice, formatDate, formatTime, formatDuration } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description:
    "Your healing session has been successfully booked with Healing with Boo.",
};

type Props = {
  searchParams: Promise<{ session_id?: string; ref?: string }>;
};

export default async function BookingConfirmationPage({ searchParams }: Props) {
  const { session_id, ref } = await searchParams;

  let booking = null;

  if (session_id) {
    booking = await getPrisma().booking.findUnique({
      where: { stripeSessionId: session_id },
      include: { service: true },
    });
  } else if (ref) {
    booking = await getPrisma().booking.findUnique({
      where: { reference: ref },
      include: { service: true },
    });
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full text-center">
          <span className="material-symbols-outlined text-on-surface-variant text-6xl mb-6 block">
            search_off
          </span>
          <h1 className="font-headline text-3xl text-on-surface mb-3">
            Booking Not Found
          </h1>
          <p className="text-on-surface-variant mb-8">
            We couldn&apos;t find a booking for this session. It may still be
            processing — please check your email for confirmation.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-primary text-on-primary font-label font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            Book a Session
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        <span
          className="material-symbols-outlined text-primary text-8xl mb-6 block"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>

        <h1 className="font-headline text-4xl text-on-surface mb-3">
          Booking Confirmed!
        </h1>
        <p className="text-on-surface-variant mb-2">
          Thank you for choosing Healing with Boo. We look forward to welcoming
          you.
        </p>
        <p className="text-on-surface-variant mb-8">
          Your reference number:{" "}
          <span className="font-bold text-primary font-label">
            {booking.reference}
          </span>
        </p>

        {/* Summary Card */}
        <div className="bg-surface-container rounded-xl p-6 mb-8 text-left">
          <h3 className="font-label font-medium text-on-surface mb-4">
            Session Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Service</span>
              <span className="font-medium text-on-surface">
                {booking.service.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Date</span>
              <span className="font-medium text-on-surface">
                {formatDate(booking.startTime)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Time</span>
              <span className="font-medium text-on-surface">
                {formatTime(booking.startTime)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Duration</span>
              <span className="font-medium text-on-surface">
                {formatDuration(booking.service.duration)}
              </span>
            </div>
            <div className="border-t border-outline-variant/30 pt-3">
              <div className="flex justify-between">
                <span className="font-medium text-on-surface">Total</span>
                <span className="font-headline text-xl text-primary">
                  {formatPrice(booking.price)}
                </span>
              </div>
              {!booking.stripeSessionId && (
                <p className="text-xs text-on-surface-variant mt-1 text-right">
                  Pay cash on the day
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="text-sm text-on-surface-variant mb-8">
          A confirmation email has been sent with all the details. Please arrive
          10 minutes before your appointment.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-outline-variant text-on-surface font-label font-medium px-6 py-3 rounded-full hover:bg-surface-container transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* CTA — Create Account (for guests) */}
        {!booking.userId && (
          <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/20">
            <h3 className="font-headline text-lg text-on-surface mb-2">
              Want to manage your bookings?
            </h3>
            <p className="text-sm text-on-surface-variant mb-4">
              Create a free member account to view your booking history, access
              exclusive content, and rebook with ease.
            </p>
            <Link
              href="/register"
              className="inline-block bg-primary text-on-primary font-label font-medium px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity text-sm"
            >
              Create an Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
