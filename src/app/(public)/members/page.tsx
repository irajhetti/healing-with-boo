import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { getMemberBookings } from "./actions";
import { formatDate, formatTime, formatDuration } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Healing with Boo member dashboard.",
};

export default async function MembersDashboardPage() {
  const session = await auth();
  const { upcoming, past } = await getMemberBookings();
  const firstName = session?.user?.name?.split(" ")[0] || "there";

  return (
    <div className="max-w-4xl">
      <h1 className="font-headline text-3xl text-on-surface mb-2">
        Welcome back, {firstName}!
      </h1>
      <p className="text-on-surface-variant mb-10">
        Here&apos;s an overview of your healing journey.
      </p>

      {/* Upcoming Booking */}
      <section className="mb-10">
        <h2 className="font-label font-medium text-sm tracking-widest uppercase text-secondary mb-4">
          Upcoming Appointment
        </h2>
        {upcoming.length > 0 ? (
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">spa</span>
              </div>
              <div>
                <p className="font-label font-medium text-on-surface text-lg">
                  {upcoming[0].service.name}
                </p>
                <p className="text-on-surface-variant text-sm">
                  {formatDate(upcoming[0].startTime)} at {formatTime(upcoming[0].startTime)}
                </p>
                <p className="text-on-surface-variant text-sm">
                  {formatDuration(upcoming[0].service.duration)}
                </p>
                <p className="text-xs text-outline mt-1">
                  Ref: {upcoming[0].reference}
                </p>
              </div>
            </div>
            {upcoming.length > 1 && (
              <p className="text-sm text-on-surface-variant mt-4">
                + {upcoming.length - 1} more upcoming{" "}
                <Link href="/members/bookings" className="text-secondary hover:underline">
                  View all
                </Link>
              </p>
            )}
          </div>
        ) : (
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 text-center">
            <p className="text-on-surface-variant mb-3">No upcoming appointments</p>
            <Link
              href="/booking"
              className="text-sm font-label font-medium text-secondary hover:underline"
            >
              Book a session
            </Link>
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section className="mb-10">
        <h2 className="font-label font-medium text-sm tracking-widest uppercase text-secondary mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/booking"
            className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 hover:border-primary/30 transition-colors group"
          >
            <span className="material-symbols-outlined text-primary text-3xl mb-3 block group-hover:scale-110 transition-transform">
              calendar_add_on
            </span>
            <p className="font-label font-medium text-on-surface mb-1">Book New Session</p>
            <p className="text-sm text-on-surface-variant">Schedule your next healing experience</p>
          </Link>
          <Link
            href="/members/profile"
            className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 hover:border-primary/30 transition-colors group"
          >
            <span className="material-symbols-outlined text-primary text-3xl mb-3 block group-hover:scale-110 transition-transform">
              settings
            </span>
            <p className="font-label font-medium text-on-surface mb-1">Update Profile</p>
            <p className="text-sm text-on-surface-variant">Manage your preferences</p>
          </Link>
        </div>
      </section>

      {/* Recent Sessions */}
      {past.length > 0 && (
        <section>
          <h2 className="font-label font-medium text-sm tracking-widest uppercase text-secondary mb-4">
            Recent Sessions
          </h2>
          <div className="space-y-3">
            {past.slice(0, 5).map((booking) => (
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
                      {formatDate(booking.startTime)} — {formatDuration(booking.service.duration)}
                    </p>
                  </div>
                </div>
                <Link
                  href="/booking"
                  className="text-sm font-label font-medium text-secondary hover:underline whitespace-nowrap"
                >
                  Book Again
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
