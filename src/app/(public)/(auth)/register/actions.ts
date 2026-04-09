"use server";

import { hashSync } from "bcryptjs";
import { getPrisma } from "@/lib/db";

export async function registerUser(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<{ error: string | null }> {
  const prisma = getPrisma();

  // Check if email already exists
  const existing = await prisma.user.findUnique({
    where: { email: data.email.toLowerCase() },
  });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  // Create user
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone || null,
      hashedPassword: hashSync(data.password, 12),
      role: "CLIENT",
    },
  });

  // Auto-link any guest bookings with same email
  await prisma.booking.updateMany({
    where: {
      guestEmail: data.email.toLowerCase(),
      userId: null,
    },
    data: { userId: user.id },
  });

  return { error: null };
}
