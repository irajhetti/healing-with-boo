"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/iws-admin", label: "Dashboard", icon: "dashboard" },
  { href: "/iws-admin/bookings", label: "Bookings", icon: "calendar_month" },
  { href: "/iws-admin/availability", label: "Availability", icon: "schedule" },
  { href: "/iws-admin/services", label: "Services", icon: "spa" },
  { href: "/iws-admin/discount-codes", label: "Discounts", icon: "sell" },
];

export function AdminShell({
  user,
  signOutAction,
  children,
}: {
  user: { name?: string | null; email?: string | null };
  signOutAction: () => Promise<void>;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-surface md:flex">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-outline-variant/20 bg-surface-container">
        <h1 className="font-headline text-base font-bold text-on-surface">
          Healing with Boo
        </h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-on-surface text-[24px]">
            {sidebarOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-surface-container border-r border-outline-variant/20 flex flex-col shrink-0
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:transition-none
        `}
      >
        <div className="p-6 border-b border-outline-variant/20">
          <h1 className="font-headline text-lg font-bold text-on-surface">
            Healing with Boo
          </h1>
          <p className="text-on-surface-variant text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/iws-admin"
                ? pathname === "/iws-admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
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
                {user.name || "Admin"}
              </p>
              <p className="text-xs text-on-surface-variant truncate">
                {user.email}
              </p>
            </div>
          </div>
          <form action={signOutAction}>
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
        <div className="p-4 sm:p-6 md:p-8 max-w-6xl">{children}</div>
      </div>
    </div>
  );
}
