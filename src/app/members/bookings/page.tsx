import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bookings",
  description: "View and manage your Healing with Boo session bookings.",
};

const upcomingBookings = [
  {
    service: "Deep Tissue Massage",
    date: "April 15, 2026",
    time: "10:00 AM",
    duration: "60 min",
    status: "Confirmed",
  },
  {
    service: "Shamanic Journey",
    date: "April 28, 2026",
    time: "2:00 PM",
    duration: "75 min",
    status: "Confirmed",
  },
];

const pastBookings = [
  {
    service: "Relaxation Massage",
    date: "March 10, 2026",
    time: "11:00 AM",
    duration: "60 min",
    status: "Completed",
  },
  {
    service: "Energy Clearing",
    date: "February 24, 2026",
    time: "3:00 PM",
    duration: "60 min",
    status: "Completed",
  },
  {
    service: "Deep Tissue Massage",
    date: "February 5, 2026",
    time: "10:00 AM",
    duration: "60 min",
    status: "Completed",
  },
  {
    service: "Soul Retrieval",
    date: "January 18, 2026",
    time: "1:00 PM",
    duration: "90 min",
    status: "Completed",
  },
];

export default function MembersBookingsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="font-headline text-3xl text-on-surface mb-2">My Bookings</h1>
      <p className="text-on-surface-variant mb-10">View your upcoming and past healing sessions.</p>

      {/* Upcoming */}
      <section className="mb-12">
        <h2 className="font-label font-medium text-sm tracking-widest uppercase text-secondary mb-4">Upcoming</h2>
        <div className="space-y-4">
          {upcomingBookings.map((booking) => (
            <div
              key={`${booking.service}-${booking.date}`}
              className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">spa</span>
                  </div>
                  <div>
                    <p className="font-label font-medium text-on-surface text-lg">{booking.service}</p>
                    <p className="text-on-surface-variant text-sm">{booking.date} at {booking.time}</p>
                    <p className="text-on-surface-variant text-sm">{booking.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-primary text-on-primary text-xs font-label font-medium px-3 py-1 rounded-full">
                    {booking.status}
                  </span>
                  <button className="border border-outline-variant text-on-surface-variant font-label font-medium text-sm px-4 py-2 rounded-full hover:bg-surface-container transition-colors">
                    Reschedule
                  </button>
                  <button className="border border-error/30 text-error font-label font-medium text-sm px-4 py-2 rounded-full hover:bg-error/5 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Past Sessions */}
      <section>
        <h2 className="font-label font-medium text-sm tracking-widest uppercase text-secondary mb-4">Past Sessions</h2>
        <div className="space-y-3">
          {pastBookings.map((booking) => (
            <div
              key={`${booking.service}-${booking.date}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-5 gap-3"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant text-lg">event_available</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-label font-medium text-on-surface text-sm">{booking.service}</p>
                    <span className="inline-block border border-outline-variant text-on-surface-variant text-xs font-label px-2.5 py-0.5 rounded-full">
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant">{booking.date} at {booking.time} — {booking.duration}</p>
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
    </div>
  );
}
