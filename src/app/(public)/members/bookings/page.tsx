import Link from "next/link";
import type { Metadata } from "next";
import { getMemberBookings } from "../actions";
import { formatDate, formatTime, formatDuration, formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My Bookings",
  description: "View your Healing with Boo session bookings.",
};

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  COMPLETED: "bg-blue-100 text-blue-800",
  NO_SHOW: "bg-yellow-100 text-yellow-800",
};

export default async function MembersBookingsPage() {
  const { upcoming, past } = await getMemberBookings();

  return (
    <div className="max-w-3xl">
      <h1 className="font-headline text-3xl text-on-surface mb-2">My Bookings</h1>
      <p className="text-on-surface-variant mb-10">View your upcoming and past sessions.</p>

      {/* Upcoming */}
      <section className="mb-10">
        <h2 className="font-label font-medium text-sm tracking-widest uppercase text-secondary mb-4">
          Upcoming
        </h2>
        {upcoming.length === 0 ? (
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 text-center">
            <p className="text-on-surface-variant mb-3">No upcoming bookings</p>
            <Link href="/booking" className="text-sm font-label font-medium text-secondary hover:underline">
              Book a session
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map((booking) => (
              <div
                key={booking.id}
                className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">spa</span>
                    </div>
                    <div>
                      <p className="font-label font-medium text-on-surface">
                        {booking.service.name}
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        {formatDate(booking.startTime)} at {formatTime(booking.startTime)}
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        {formatDuration(booking.service.duration)} · {formatPrice(booking.price)}
                      </p>
                      <p className="text-xs text-outline mt-1">Ref: {booking.reference}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium self-start ${STATUS_COLORS[booking.status]}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section>
          <h2 className="font-label font-medium text-sm tracking-widest uppercase text-secondary mb-4">
            Past Sessions
          </h2>
          <div className="space-y-3">
            {past.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-5 gap-3"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-surface-variant text-lg">
                      event_available
                    </span>
                  </div>
                  <div>
                    <p className="font-label font-medium text-on-surface text-sm">
                      {booking.service.name}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {formatDate(booking.startTime)} · {formatPrice(booking.price)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[booking.status]}`}>
                    {booking.status}
                  </span>
                  <Link
                    href="/booking"
                    className="text-sm font-label font-medium text-secondary hover:underline whitespace-nowrap"
                  >
                    Book Again
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
