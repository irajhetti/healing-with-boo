"use server";

import { getPrisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function getStats() {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const prisma = getPrisma();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    upcomingCount,
    monthBookings,
    monthRevenue,
    totalCancelled,
    totalBookings,
    popularServices,
  ] = await Promise.all([
    prisma.booking.count({
      where: { status: "CONFIRMED", startTime: { gte: now } },
    }),
    prisma.booking.count({
      where: { createdAt: { gte: startOfMonth } },
    }),
    prisma.booking.aggregate({
      _sum: { price: true },
      where: {
        status: { in: ["CONFIRMED", "COMPLETED"] },
        createdAt: { gte: startOfMonth },
      },
    }),
    prisma.booking.count({ where: { status: "CANCELLED" } }),
    prisma.booking.count(),
    prisma.booking.groupBy({
      by: ["serviceId"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 5,
    }),
  ]);

  const serviceIds = popularServices.map((s) => s.serviceId);
  const services = await prisma.service.findMany({
    where: { id: { in: serviceIds } },
    select: { id: true, name: true },
  });
  const serviceMap = new Map(services.map((s) => [s.id, s.name]));

  return {
    upcomingCount,
    monthBookings,
    monthRevenue: monthRevenue._sum.price || 0,
    cancellationRate: totalBookings > 0 ? totalCancelled / totalBookings : 0,
    popularServices: popularServices.map((s) => ({
      name: serviceMap.get(s.serviceId) || "Unknown",
      count: s._count.id,
    })),
  };
}
