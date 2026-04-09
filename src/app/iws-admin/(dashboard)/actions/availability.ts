"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

const TIME_REGEX = /^\d{2}:\d{2}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export async function getBusinessHours() {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  return getPrisma().businessHours.findMany({
    orderBy: { dayOfWeek: "asc" },
  });
}

export async function updateBusinessHours(
  hours: { dayOfWeek: number; open: string | null; close: string | null }[]
) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const prisma = getPrisma();

  for (const h of hours) {
    if (h.dayOfWeek < 0 || h.dayOfWeek > 6) continue;
    if (h.open && !TIME_REGEX.test(h.open)) continue;
    if (h.close && !TIME_REGEX.test(h.close)) continue;

    await prisma.businessHours.upsert({
      where: { dayOfWeek: h.dayOfWeek },
      update: { open: h.open, close: h.close },
      create: h,
    });
  }

  revalidatePath("/iws-admin/availability");
  revalidatePath("/booking");
}

export async function getBlockedDates() {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  return getPrisma().blockedDate.findMany({
    orderBy: { date: "asc" },
  });
}

export async function addBlockedDate(data: {
  date: string;
  reason?: string;
  openOverride?: string;
  closeOverride?: string;
}) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  if (!DATE_REGEX.test(data.date)) throw new Error("Invalid date format");
  if (data.openOverride && !TIME_REGEX.test(data.openOverride)) throw new Error("Invalid time format");
  if (data.closeOverride && !TIME_REGEX.test(data.closeOverride)) throw new Error("Invalid time format");

  await getPrisma().blockedDate.create({
    data: {
      date: new Date(data.date + "T00:00:00Z"),
      reason: data.reason || null,
      openOverride: data.openOverride || null,
      closeOverride: data.closeOverride || null,
    },
  });

  revalidatePath("/iws-admin/availability");
  revalidatePath("/booking");
}

export async function removeBlockedDate(id: string) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  await getPrisma().blockedDate.delete({ where: { id } });

  revalidatePath("/iws-admin/availability");
  revalidatePath("/booking");
}
