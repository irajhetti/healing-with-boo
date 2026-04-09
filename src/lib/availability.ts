"use server";

import { getPrisma } from "@/lib/db";
import type { DaySchedule } from "@/lib/config/business-hours";
import {
  BUFFER_MINUTES,
  SLOT_INCREMENT_MINUTES,
  BOOKING_HORIZON_DAYS,
  TIMEZONE,
} from "@/lib/config/business-hours";

function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function getLondonDayOfWeek(dateStr: string): number {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    timeZone: TIMEZONE,
  });
  const date = new Date(dateStr + "T12:00:00Z");
  const dayName = formatter.format(date);
  const dayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  return dayMap[dayName] ?? 0;
}

function getLondonNow(): { dateStr: string; minutesSinceMidnight: number } {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TIMEZONE,
  });
  const parts = formatter.formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  const dateStr = `${get("year")}-${get("month")}-${get("day")}`;
  const minutesSinceMidnight = parseInt(get("hour")) * 60 + parseInt(get("minute"));
  return { dateStr, minutesSinceMidnight };
}

// Fetch business hours from DB and return same shape as old hardcoded config
async function getBusinessHoursFromDB(): Promise<Record<number, DaySchedule>> {
  const rows = await getPrisma().businessHours.findMany();
  const hours: Record<number, DaySchedule> = {};
  for (let d = 0; d < 7; d++) {
    const row = rows.find((r) => r.dayOfWeek === d);
    if (row?.open && row?.close) {
      hours[d] = { open: row.open, close: row.close };
    } else {
      hours[d] = null;
    }
  }
  return hours;
}

// Fetch blocked dates for a date range
async function getBlockedDatesMap(
  from: Date,
  to: Date
): Promise<Map<string, { blocked: boolean; open?: string; close?: string }>> {
  const rows = await getPrisma().blockedDate.findMany({
    where: { date: { gte: from, lte: to } },
  });
  const map = new Map<string, { blocked: boolean; open?: string; close?: string }>();
  for (const row of rows) {
    const dateStr = row.date.toISOString().split("T")[0];
    if (row.openOverride && row.closeOverride) {
      map.set(dateStr, { blocked: false, open: row.openOverride, close: row.closeOverride });
    } else {
      map.set(dateStr, { blocked: true });
    }
  }
  return map;
}

export async function getAvailableSlots(
  serviceId: string,
  dateStr: string
): Promise<string[]> {
  const service = await getPrisma().service.findUnique({
    where: { id: serviceId },
    select: { duration: true },
  });
  if (!service) return [];

  // Get business hours from DB
  const businessHours = await getBusinessHoursFromDB();
  const dayOfWeek = getLondonDayOfWeek(dateStr);
  let schedule = businessHours[dayOfWeek];

  // Check for blocked date or override
  const dayStart = new Date(dateStr + "T00:00:00Z");
  const dayEnd = new Date(dateStr + "T23:59:59Z");
  const blockedMap = await getBlockedDatesMap(dayStart, dayEnd);
  const blocked = blockedMap.get(dateStr);

  if (blocked) {
    if (blocked.blocked) return []; // Fully blocked
    if (blocked.open && blocked.close) {
      schedule = { open: blocked.open, close: blocked.close }; // Override hours
    }
  }

  if (!schedule) return [];

  const openMinutes = parseTimeToMinutes(schedule.open);
  const closeMinutes = parseTimeToMinutes(schedule.close);

  // Get existing bookings for this date
  const existingBookings = await getPrisma().booking.findMany({
    where: {
      status: "CONFIRMED",
      startTime: { gte: dayStart, lte: dayEnd },
    },
    select: { startTime: true, endTime: true },
  });

  const bookedRanges = existingBookings.map((b) => {
    const startParts = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: TIMEZONE,
    }).formatToParts(b.startTime);
    const endParts = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: TIMEZONE,
    }).formatToParts(b.endTime);

    const getMin = (parts: Intl.DateTimeFormatPart[]) => {
      const h = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0");
      const m = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0");
      return h * 60 + m;
    };

    return { start: getMin(startParts), end: getMin(endParts) };
  });

  const londonNow = getLondonNow();
  const isToday = dateStr === londonNow.dateStr;

  const slots: string[] = [];

  for (
    let slotStart = openMinutes;
    slotStart + service.duration <= closeMinutes;
    slotStart += SLOT_INCREMENT_MINUTES
  ) {
    const slotEnd = slotStart + service.duration;

    if (isToday && slotStart <= londonNow.minutesSinceMidnight) continue;

    const hasConflict = bookedRanges.some(
      (booked) =>
        slotStart < booked.end + BUFFER_MINUTES &&
        slotEnd + BUFFER_MINUTES > booked.start
    );

    if (!hasConflict) {
      const h = Math.floor(slotStart / 60).toString().padStart(2, "0");
      const m = (slotStart % 60).toString().padStart(2, "0");
      slots.push(`${h}:${m}`);
    }
  }

  return slots;
}

export async function getAvailableDates(
  serviceId: string
): Promise<string[]> {
  const service = await getPrisma().service.findUnique({
    where: { id: serviceId },
    select: { duration: true },
  });
  if (!service) return [];

  const businessHours = await getBusinessHoursFromDB();

  const today = new Date();
  const horizon = new Date(today);
  horizon.setDate(horizon.getDate() + BOOKING_HORIZON_DAYS);
  const blockedMap = await getBlockedDatesMap(today, horizon);

  const dates: string[] = [];

  for (let i = 0; i < BOOKING_HORIZON_DAYS; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];
    const dayOfWeek = getLondonDayOfWeek(dateStr);

    // Check blocked
    const blocked = blockedMap.get(dateStr);
    if (blocked?.blocked) continue;

    // Get schedule (override or regular)
    let schedule = businessHours[dayOfWeek];
    if (blocked && !blocked.blocked && blocked.open && blocked.close) {
      schedule = { open: blocked.open, close: blocked.close };
    }

    if (!schedule) continue;

    const openMinutes = parseTimeToMinutes(schedule.open);
    const closeMinutes = parseTimeToMinutes(schedule.close);
    if (closeMinutes - openMinutes < service.duration) continue;

    // For today, check if any slots remain after current time
    if (i === 0) {
      const londonNow = getLondonNow();
      if (dateStr === londonNow.dateStr) {
        // Latest possible slot start
        const latestSlotStart = closeMinutes - service.duration;
        if (latestSlotStart <= londonNow.minutesSinceMidnight) continue;
      }
    }

    dates.push(dateStr);
  }

  return dates;
}
