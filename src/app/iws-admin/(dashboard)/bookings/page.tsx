"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { getBookings, updateBookingStatus, type DateRange } from "../actions/bookings";
import { formatPrice } from "@/lib/utils";
import type { BookingStatus } from "@prisma/client";

const SOURCE_LABEL: Record<string, string> = {
  WEB: "Online",
  CASH: "Cash",
  ADMIN: "Manual",
};

const SOURCE_COLORS: Record<string, string> = {
  WEB: "bg-blue-50 text-blue-700",
  CASH: "bg-amber-50 text-amber-700",
  ADMIN: "bg-purple-50 text-purple-700",
};

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  COMPLETED: "bg-blue-100 text-blue-800",
  NO_SHOW: "bg-yellow-100 text-yellow-800",
};

const RANGE_OPTIONS: { value: DateRange; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "thisWeek", label: "This week" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
  { value: "all", label: "All" },
];

const STATUS_OPTIONS = ["ALL", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"] as const;

type Booking = Awaited<ReturnType<typeof getBookings>>[number];

function toLondonDateKey(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function formatLondonTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function formatDayLabel(dateKey: string): { primary: string; secondary: string } {
  const today = toLondonDateKey(new Date());
  const tomorrow = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return toLondonDateKey(d);
  })();

  // Parse YYYY-MM-DD as a London-day Date (any time-of-day works for label formatting)
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12));

  const weekday = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
  }).format(date);
  const dayMonth = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    day: "numeric",
    month: "short",
  }).format(date);

  if (dateKey === today) return { primary: "Today", secondary: `${weekday} ${dayMonth}` };
  if (dateKey === tomorrow) return { primary: "Tomorrow", secondary: `${weekday} ${dayMonth}` };
  return { primary: weekday, secondary: dayMonth };
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [range, setRange] = useState<DateRange>("upcoming");
  const [status, setStatus] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  // Debounce search input
  useEffect(() => {
    const handle = setTimeout(() => setDebouncedSearch(search), 250);
    return () => clearTimeout(handle);
  }, [search]);

  // Fetch when filters change
  useEffect(() => {
    startTransition(async () => {
      const data = await getBookings({
        status: status as BookingStatus | "ALL",
        range,
        search: debouncedSearch,
      });
      setBookings(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, status, debouncedSearch]);

  function handleAction(bookingId: string, newStatus: BookingStatus) {
    startTransition(async () => {
      await updateBookingStatus(bookingId, newStatus);
      const data = await getBookings({
        status: status as BookingStatus | "ALL",
        range,
        search: debouncedSearch,
      });
      setBookings(data);
    });
  }

  // Group by London date key
  const grouped = useMemo(() => {
    const map = new Map<string, Booking[]>();
    for (const b of bookings) {
      const key = toLondonDateKey(b.startTime);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(b);
    }
    return Array.from(map.entries());
  }, [bookings]);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline text-2xl font-medium text-on-surface">Bookings</h1>
        <Link
          href="/iws-admin/bookings/new"
          className="inline-flex items-center gap-1.5 bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New booking
        </Link>
      </div>

      {/* Range pills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {RANGE_OPTIONS.map((r) => (
          <button
            key={r.value}
            onClick={() => setRange(r.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              range === r.value
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Status filter + search */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg text-sm text-on-surface md:w-48"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s === "ALL" ? "All statuses" : s.charAt(0) + s.slice(1).toLowerCase().replace("_", " ")}
            </option>
          ))}
        </select>
        <input
          type="search"
          placeholder="Search by client name, email or ref..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 bg-surface-container border border-outline-variant/30 rounded-lg text-sm text-on-surface"
        />
      </div>

      {isPending && (
        <p className="text-on-surface-variant text-sm mb-4">Loading...</p>
      )}

      {bookings.length === 0 && !isPending && (
        <p className="text-on-surface-variant text-sm py-12 text-center">
          {debouncedSearch
            ? `No bookings match "${debouncedSearch}".`
            : "No bookings in this range."}
        </p>
      )}

      {/* Day-grouped list */}
      <div className="space-y-6">
        {grouped.map(([dateKey, dayBookings]) => {
          const label = formatDayLabel(dateKey);
          return (
            <div key={dateKey}>
              <div className="sticky top-0 bg-surface z-10 -mx-1 px-1 py-2 mb-2 border-b border-outline-variant/20 flex items-baseline gap-3">
                <span className="font-headline text-lg font-medium text-on-surface">
                  {label.primary}
                </span>
                <span className="text-sm text-on-surface-variant">{label.secondary}</span>
                <span className="text-xs text-outline ml-auto">
                  {dayBookings.length} booking{dayBookings.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="space-y-2">
                {dayBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-surface-container rounded-xl p-4 flex flex-col sm:flex-row sm:items-start gap-4"
                  >
                    {/* Time column */}
                    <div className="shrink-0 sm:w-20 sm:text-right">
                      <p className="font-mono text-sm font-bold text-on-surface tabular-nums">
                        {formatLondonTime(booking.startTime)}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {booking.service.name.match(/(\d+)\s*min/)?.[1] ?? "?"}min
                      </p>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-medium text-on-surface text-sm">
                          {booking.guestName || "Guest"}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            STATUS_COLORS[booking.status] || ""
                          }`}
                        >
                          {booking.status}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            SOURCE_COLORS[booking.source] || ""
                          }`}
                        >
                          {SOURCE_LABEL[booking.source] || booking.source}
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant">
                        {booking.service.name} &middot; {formatPrice(booking.price)}
                      </p>
                      {(booking.guestEmail || booking.guestPhone) && (
                        <p className="text-xs text-on-surface-variant mt-1">
                          {booking.guestEmail}
                          {booking.guestEmail && booking.guestPhone ? " · " : ""}
                          {booking.guestPhone}
                        </p>
                      )}
                      {booking.notes && (
                        <p className="text-xs text-on-surface-variant mt-1 italic">
                          Note: {booking.notes}
                        </p>
                      )}
                      <p className="text-xs text-outline mt-1">Ref: {booking.reference}</p>
                    </div>

                    {/* Actions */}
                    {booking.status === "CONFIRMED" && (
                      <div className="flex flex-wrap gap-2 shrink-0">
                        <button
                          onClick={() => handleAction(booking.id, "COMPLETED")}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleAction(booking.id, "NO_SHOW")}
                          className="px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-xs font-medium hover:bg-yellow-100 transition-colors"
                        >
                          No Show
                        </button>
                        <button
                          onClick={() => handleAction(booking.id, "CANCELLED")}
                          className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
