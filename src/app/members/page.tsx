import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Healing with Boo member dashboard.",
};

const quickActions = [
  { href: "/booking", icon: "calendar_add_on", title: "Book New Session", description: "Schedule your next healing experience" },
  { href: "/members/content", icon: "auto_stories", title: "Exclusive Content", description: "Member-only guides and meditations" },
  { href: "/members/profile", icon: "settings", title: "Update Profile", description: "Manage your preferences" },
];

const recentSessions = [
  { date: "March 10, 2026", service: "Relaxation Massage", duration: "60 min" },
  { date: "February 24, 2026", service: "Energy Clearing", duration: "60 min" },
  { date: "February 5, 2026", service: "Deep Tissue Massage", duration: "60 min" },
];

export default function MembersDashboardPage() {
  return (
    <div className="max-w-4xl">
      {/* Welcome */}
      <h1 className="font-headline text-3xl text-on-surface mb-2">Welcome back, Sarah!</h1>
      <p className="text-on-surface-variant mb-10">Here is an overview of your healing journey.</p>

      {/* Upcoming Booking */}
      <section className="mb-10">
        <h2 className="font-label font-medium text-sm tracking-widest uppercase text-secondary mb-4">Upcoming Appointment</h2>
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">spa</span>
              </div>
              <div>
                <p className="font-label font-medium text-on-surface text-lg">Deep Tissue Massage</p>
                <p className="text-on-surface-variant text-sm">April 15, 2026 at 10:00 AM</p>
                <p className="text-on-surface-variant text-sm">60 minutes</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="border border-outline-variant text-on-surface-variant font-label font-medium text-sm px-5 py-2 rounded-full hover:bg-surface-container transition-colors">
                Reschedule
              </button>
              <button className="border border-error/30 text-error font-label font-medium text-sm px-5 py-2 rounded-full hover:bg-error/5 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-10">
        <h2 className="font-label font-medium text-sm tracking-widest uppercase text-secondary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 hover:border-primary/30 transition-colors group"
            >
              <span className="material-symbols-outlined text-primary text-3xl mb-3 block group-hover:scale-110 transition-transform">
                {action.icon}
              </span>
              <p className="font-label font-medium text-on-surface mb-1">{action.title}</p>
              <p className="text-sm text-on-surface-variant">{action.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Sessions */}
      <section>
        <h2 className="font-label font-medium text-sm tracking-widest uppercase text-secondary mb-4">Recent Sessions</h2>
        <div className="space-y-3">
          {recentSessions.map((session) => (
            <div
              key={session.date}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-5 gap-3"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant text-lg">event_available</span>
                </div>
                <div>
                  <p className="font-label font-medium text-on-surface text-sm">{session.service}</p>
                  <p className="text-xs text-on-surface-variant">{session.date} — {session.duration}</p>
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
