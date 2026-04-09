import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const navItems = [
  { href: "/iws-admin", label: "Dashboard", icon: "dashboard" },
  { href: "/iws-admin/bookings", label: "Bookings", icon: "calendar_month" },
  { href: "/iws-admin/availability", label: "Availability", icon: "schedule" },
  { href: "/iws-admin/services", label: "Services", icon: "spa" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/iws-admin/login");

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container border-r border-outline-variant/20 flex flex-col shrink-0">
        <div className="p-6 border-b border-outline-variant/20">
          <h1 className="font-headline text-lg font-bold text-on-surface">
            Healing with Boo
          </h1>
          <p className="text-on-surface-variant text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-outline-variant/20">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[18px]">
                person
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-on-surface truncate">
                {session.user?.name || "Admin"}
              </p>
              <p className="text-xs text-on-surface-variant truncate">
                {session.user?.email}
              </p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              const { signOut } = await import("@/lib/auth");
              await signOut({ redirectTo: "/iws-admin/login" });
            }}
          >
            <button
              type="submit"
              className="w-full mt-2 px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors text-left"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl">{children}</div>
      </div>
    </div>
  );
}
