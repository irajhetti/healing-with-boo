import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const navItems = [
  { href: "/members", label: "Dashboard", icon: "dashboard" },
  { href: "/members/bookings", label: "My Bookings", icon: "calendar_month" },
  { href: "/members/profile", label: "Profile", icon: "person" },
];

export default async function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen bg-surface">
      {/* Mobile Nav */}
      <div className="md:hidden overflow-x-auto border-b border-outline-variant/20 bg-surface-container-low">
        <nav className="flex min-w-max px-4 py-2 gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-label font-medium text-on-surface-variant hover:bg-surface-container transition-colors whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 min-h-[calc(100vh-4rem)] bg-surface-container-low border-r border-outline-variant/20 p-6">
          <p className="font-headline text-lg text-primary mb-2">Member Area</p>
          <p className="text-xs text-on-surface-variant mb-8 truncate">
            {session.user.name || session.user.email}
          </p>
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-label font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <form
            action={async () => {
              "use server";
              const { signOut } = await import("@/lib/auth");
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors text-left"
            >
              Sign Out
            </button>
          </form>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
