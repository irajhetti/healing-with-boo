"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { discountCodeSchema } from "@/lib/validations/discount";

export async function getAllDiscountCodes() {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  return getPrisma().discountCode.findMany({
    include: {
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createDiscountCode(data: {
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  amount: number;
  maxUses: number | null;
  expiresAt: string | null;
  userId: string | null;
}) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const parsed = discountCodeSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const prisma = getPrisma();

  // Check for duplicate code
  const existing = await prisma.discountCode.findUnique({
    where: { code: parsed.data.code },
  });
  if (existing) {
    throw new Error("A discount code with this name already exists.");
  }

  await prisma.discountCode.create({
    data: {
      code: parsed.data.code,
      discountType: parsed.data.discountType,
      amount: parsed.data.amount,
      maxUses: parsed.data.maxUses,
      expiresAt: parsed.data.expiresAt ? new Date(parsed.data.expiresAt) : null,
      userId: parsed.data.userId,
    },
  });

  revalidatePath("/iws-admin/discount-codes");
}

export async function updateDiscountCode(
  id: string,
  data: {
    code?: string;
    discountType?: "PERCENTAGE" | "FIXED";
    amount?: number;
    maxUses?: number | null;
    expiresAt?: string | null;
  }
) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const updateData: Record<string, unknown> = {};
  if (data.code !== undefined) updateData.code = data.code.toUpperCase().replace(/\s/g, "");
  if (data.discountType !== undefined) updateData.discountType = data.discountType;
  if (data.amount !== undefined) updateData.amount = data.amount;
  if (data.maxUses !== undefined) updateData.maxUses = data.maxUses;
  if (data.expiresAt !== undefined) {
    updateData.expiresAt = data.expiresAt ? new Date(data.expiresAt) : null;
  }

  await getPrisma().discountCode.update({ where: { id }, data: updateData });

  revalidatePath("/iws-admin/discount-codes");
}

export async function toggleDiscountCodeActive(id: string) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const code = await getPrisma().discountCode.findUnique({ where: { id } });
  if (!code) return;

  await getPrisma().discountCode.update({
    where: { id },
    data: { active: !code.active },
  });

  revalidatePath("/iws-admin/discount-codes");
}

export async function getDiscountCodeUsages(codeId: string) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  return getPrisma().discountUsage.findMany({
    where: { discountCodeId: codeId },
    include: {
      booking: {
        select: {
          reference: true,
          guestName: true,
          guestEmail: true,
          service: { select: { name: true } },
        },
      },
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getClientsForAssignment() {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  return getPrisma().user.findMany({
    where: { role: "CLIENT" },
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });
}
