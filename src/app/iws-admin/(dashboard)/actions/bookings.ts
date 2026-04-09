"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import type { BookingStatus } from "@prisma/client";

export async function getBookings(filters?: {
  status?: BookingStatus | "ALL";
  dateFrom?: string;
  dateTo?: string;
}) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const prisma = getPrisma();

  const where: Record<string, unknown> = {};

  if (filters?.status && filters.status !== "ALL") {
    where.status = filters.status;
  }

  if (filters?.dateFrom || filters?.dateTo) {
    where.startTime = {};
    if (filters?.dateFrom) {
      (where.startTime as Record<string, unknown>).gte = new Date(filters.dateFrom);
    }
    if (filters?.dateTo) {
      (where.startTime as Record<string, unknown>).lte = new Date(filters.dateTo + "T23:59:59");
    }
  }

  return prisma.booking.findMany({
    where,
    include: { service: { select: { name: true } } },
    orderBy: { startTime: "desc" },
    take: 100,
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
