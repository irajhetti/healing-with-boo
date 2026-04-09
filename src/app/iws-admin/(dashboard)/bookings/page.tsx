"use client";

import { useEffect, useState, useTransition } from "react";
import { getBookings, updateBookingStatus } from "../actions/bookings";
import { formatPrice, formatDate, formatTime } from "@/lib/utils";
import type { BookingStatus } from "@prisma/client";

type Booking = Awaited<ReturnType<typeof getBookings>>[number];

const STATUS_OPTIONS = ["ALL", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"] as const;

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  COMPLETED: "bg-blue-100 text-blue-800",
  NO_SHOW: "bg-yellow-100 text-yellow-800",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [status, setStatus] = useState<string>("ALL");
  const [isPending, startTransition] = useTransition();

  function loadBookings(filterStatus?: string) {
    startTransition(async () => {
      const data = await getBookings({
        status: (filterStatus || status) as BookingStatus | "ALL",
      });
      setBookings(data);
    });
  }

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleStatusFilter(newStatus: string) {
    setStatus(newStatus);
    loadBookings(newStatus);
  }

  function handleAction(bookingId: string, newStatus: BookingStatus) {
    startTransition(async () => {
      await updateBookingStatus(bookingId, newStatus);
      loadBookings();
    });
  }

  return (
    <>
      <h1 className="font-headline text-2xl font-bold text-on-surface mb-6">
        Bookings
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => handleStatusFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              status === s
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase().replace("_", " ")}
          </button>
        ))}
      </div>

      {isPending && (
        <p className="text-on-surface-variant text-sm mb-4">Loading...</p>
      )}

      {/* Bookings list */}
      <div className="space-y-3">
        {bookings.length === 0 && !isPending && (
          <p className="text-on-surface-variant text-sm py-8 text-center">
            No bookings found.
          </p>
        )}
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-surface-container rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
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
              </div>
              <p className="text-sm text-on-surface-variant">
                {booking.service.name} &middot;{" "}
                {formatDate(booking.startTime)} at{" "}
                {formatTime(booking.startTime)} &middot;{" "}
                {formatPrice(booking.price)}
              </p>
              {booking.guestEmail && (
                <p className="text-xs text-on-surface-variant mt-1">
                  {booking.guestEmail}
                  {booking.guestPhone ? ` · ${booking.guestPhone}` : ""}
                </p>
              )}
              {booking.notes && (
                <p className="text-xs text-on-surface-variant mt-1 italic">
                  Note: {booking.notes}
                </p>
              )}
              <p className="text-xs text-outline mt-1">
                Ref: {booking.reference}
              </p>
            </div>

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
    </>
  );
}
