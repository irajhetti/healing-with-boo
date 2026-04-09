"use server";

import { hashSync } from "bcryptjs";
import { getPrisma } from "@/lib/db";
import { registerSchema } from "@/lib/validations/auth";

export async function registerUser(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<{ error: string | null }> {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const prisma = getPrisma();

  // Check if email already exists
  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  // Create user
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      phone: parsed.data.phone || null,
      hashedPassword: hashSync(parsed.data.password, 12),
      role: "CLIENT",
    },
  });

  // Auto-link any guest bookings with same email
  await prisma.booking.updateMany({
    where: {
      guestEmail: parsed.data.email.toLowerCase(),
      userId: null,
    },
    data: { userId: user.id },
  });

  return { error: null };
}
