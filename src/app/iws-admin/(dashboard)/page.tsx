import { getStats } from "./actions/stats";
import { formatPrice } from "@/lib/utils";

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <>
      <h1 className="font-headline text-2xl font-medium text-on-surface mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Upcoming"
          value={stats.upcomingCount.toString()}
          icon="event_upcoming"
        />
        <StatCard
          label="This Month"
          value={stats.monthBookings.toString()}
          icon="calendar_month"
        />
        <StatCard
          label="Revenue (Month)"
          value={formatPrice(stats.monthRevenue)}
          icon="payments"
        />
        <StatCard
          label="Cancellation Rate"
          value={`${Math.round(stats.cancellationRate * 100)}%`}
          icon="cancel"
        />
      </div>

      {stats.popularServices.length > 0 && (
        <div className="bg-surface-container rounded-xl p-6">
          <h2 className="font-headline text-lg font-medium text-on-surface mb-4">
            Popular Services
          </h2>
          <div className="space-y-3">
            {stats.popularServices.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-on-surface">{service.name}</span>
                <span className="text-sm text-on-surface-variant">
                  {service.count} booking{service.count !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="bg-surface-container rounded-xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <span className="material-symbols-outlined text-primary text-[20px]">
          {icon}
        </span>
        <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-2xl font-bold text-on-surface">{value}</p>
    </div>
  );
}
