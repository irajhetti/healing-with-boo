"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { londonTimeToUTC, addDays } from "@/lib/time";
import type { BookingStatus, Prisma } from "@prisma/client";

export type DateRange = "today" | "thisWeek" | "upcoming" | "past" | "all";

function toLondonDateKey(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function dateBoundsForRange(range: DateRange): { gte?: Date; lt?: Date; lte?: Date } {
  const todayLondon = toLondonDateKey(new Date());
  switch (range) {
    case "today": {
      return {
        gte: londonTimeToUTC(todayLondon, "00:00"),
        lt: londonTimeToUTC(addDays(todayLondon, 1), "00:00"),
      };
    }
    case "thisWeek": {
      // Rolling 7 days starting today
      return {
        gte: londonTimeToUTC(todayLondon, "00:00"),
        lt: londonTimeToUTC(addDays(todayLondon, 7), "00:00"),
      };
    }
    case "upcoming": {
      return { gte: new Date() };
    }
    case "past": {
      return { lt: new Date() };
    }
    case "all":
    default:
      return {};
  }
}

export async function getBookings(filters?: {
  status?: BookingStatus | "ALL";
  range?: DateRange;
  search?: string;
}) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const prisma = getPrisma();

  const where: Prisma.BookingWhereInput = {};

  if (filters?.status && filters.status !== "ALL") {
    where.status = filters.status;
  }

  const range = filters?.range ?? "upcoming";
  const dateBounds = dateBoundsForRange(range);
  if (dateBounds.gte || dateBounds.lt || dateBounds.lte) {
    where.startTime = dateBounds;
  }

  const search = filters?.search?.trim() ?? "";
  if (search.length >= 2) {
    where.OR = [
      { guestName: { contains: search, mode: "insensitive" } },
      { guestEmail: { contains: search, mode: "insensitive" } },
      { reference: { contains: search, mode: "insensitive" } },
      { user: { name: { contains: search, mode: "insensitive" } } },
      { user: { email: { contains: search, mode: "insensitive" } } },
    ];
  }

  // Past bookings: most recent first; everything else: soonest first
  const orderBy: Prisma.BookingOrderByWithRelationInput =
    range === "past" || range === "all"
      ? { startTime: "desc" }
      : { startTime: "asc" };

  return prisma.booking.findMany({
    where,
    include: { service: { select: { name: true } } },
    orderBy,
    take: 200,
  });
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus
) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const prisma = getPrisma();

  const data: Record<string, unknown> = { status };
  if (status === "CANCELLED") {
    data.cancelledAt = new Date();
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data,
  });

  revalidatePath("/iws-admin/bookings");
  revalidatePath("/iws-admin");
}
