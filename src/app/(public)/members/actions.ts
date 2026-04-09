"use server";

import { getPrisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { hashSync, compareSync } from "bcryptjs";

async function requireUser() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Not authenticated");
  const user = await getPrisma().user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error("User not found");
  return user;
}

export async function getMemberBookings() {
  const user = await requireUser();

  const now = new Date();

  const [upcoming, past] = await Promise.all([
    getPrisma().booking.findMany({
      where: {
        userId: user.id,
        status: "CONFIRMED",
        startTime: { gte: now },
      },
      include: { service: { select: { name: true, duration: true } } },
      orderBy: { startTime: "asc" },
    }),
    getPrisma().booking.findMany({
      where: {
        userId: user.id,
        status: { in: ["COMPLETED", "CANCELLED", "NO_SHOW"] },
      },
      include: { service: { select: { name: true, duration: true } } },
      orderBy: { startTime: "desc" },
      take: 20,
    }),
  ]);

  return { upcoming, past };
}

export async function getMemberProfile() {
  const user = await requireUser();
  return {
    name: user.name || "",
    email: user.email,
    phone: user.phone || "",
    pressurePref: user.pressurePref || "Medium",
    healthNotes: user.healthNotes || "",
  };
}

export async function updateMemberProfile(data: {
  name: string;
  phone: string;
  pressurePref: string;
  healthNotes: string;
}) {
  const user = await requireUser();

  await getPrisma().user.update({
    where: { id: user.id },
    data: {
      name: data.name,
      phone: data.phone || null,
      pressurePref: data.pressurePref,
      healthNotes: data.healthNotes || null,
    },
  });

  revalidatePath("/members/profile");
}

export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ error: string | null }> {
  const user = await requireUser();

  if (!user.hashedPassword) {
    return { error: "No password set on this account." };
  }

  if (!compareSync(data.currentPassword, user.hashedPassword)) {
    return { error: "Current password is incorrect." };
  }

  if (data.newPassword.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }

  await getPrisma().user.update({
    where: { id: user.id },
    data: { hashedPassword: hashSync(data.newPassword, 12) },
  });

  return { error: null };
}
