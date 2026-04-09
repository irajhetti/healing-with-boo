"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function getAllServices() {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  return getPrisma().service.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
}

export async function updateService(
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: number;
    duration?: number;
    sortOrder?: number;
  }
) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  await getPrisma().service.update({ where: { id }, data });

  revalidatePath("/iws-admin/services");
  revalidatePath("/booking");
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createService(data: {
  name: string;
  category: "MASSAGE" | "HEALING" | "COMBINED" | "SIGNATURE";
  description: string;
  price: number;
  duration: number;
}) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const prisma = getPrisma();

  let slug = slugify(data.name);
  const existing = await prisma.service.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  const last = await prisma.service.findFirst({
    where: { category: data.category },
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });

  await prisma.service.create({
    data: {
      ...data,
      slug,
      sortOrder: (last?.sortOrder ?? 0) + 1,
    },
  });

  revalidatePath("/iws-admin/services");
  revalidatePath("/booking");
}

export async function toggleServiceActive(id: string) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const service = await getPrisma().service.findUnique({ where: { id } });
  if (!service) return;

  await getPrisma().service.update({
    where: { id },
    data: { active: !service.active },
  });

  revalidatePath("/iws-admin/services");
  revalidatePath("/booking");
}
