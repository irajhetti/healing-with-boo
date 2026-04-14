"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { questionSchema } from "@/lib/validations/consultation";

export async function getAllQuestions() {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  return getPrisma().consultationQuestion.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createQuestion(data: {
  label: string;
  type: "SHORT_TEXT" | "LONG_TEXT" | "DROPDOWN" | "YES_NO";
  options?: string;
  required: boolean;
}) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const parsed = questionSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const prisma = getPrisma();
  const last = await prisma.consultationQuestion.findFirst({
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });

  // Convert comma-separated options to JSON array for DROPDOWN
  let options: string | null = null;
  if (parsed.data.type === "DROPDOWN" && parsed.data.options) {
    const items = parsed.data.options
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (items.length < 2) throw new Error("Dropdown needs at least 2 options");
    options = JSON.stringify(items);
  }

  await prisma.consultationQuestion.create({
    data: {
      label: parsed.data.label,
      type: parsed.data.type,
      options,
      required: parsed.data.required,
      sortOrder: (last?.sortOrder ?? 0) + 1,
    },
  });

  revalidatePath("/iws-admin/consultation");
}

export async function updateQuestion(
  id: string,
  data: {
    label?: string;
    type?: "SHORT_TEXT" | "LONG_TEXT" | "DROPDOWN" | "YES_NO";
    options?: string;
    required?: boolean;
  }
) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const updateData: Record<string, unknown> = {};
  if (data.label !== undefined) updateData.label = data.label;
  if (data.type !== undefined) updateData.type = data.type;
  if (data.required !== undefined) updateData.required = data.required;

  if (data.type === "DROPDOWN" && data.options !== undefined) {
    const items = data.options
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (items.length < 2) throw new Error("Dropdown needs at least 2 options");
    updateData.options = JSON.stringify(items);
  } else if (data.type && data.type !== "DROPDOWN") {
    updateData.options = null;
  }

  await getPrisma().consultationQuestion.update({ where: { id }, data: updateData });
  revalidatePath("/iws-admin/consultation");
}

export async function toggleQuestionActive(id: string) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const q = await getPrisma().consultationQuestion.findUnique({ where: { id } });
  if (!q) return;

  await getPrisma().consultationQuestion.update({
    where: { id },
    data: { active: !q.active },
  });

  revalidatePath("/iws-admin/consultation");
}

export async function reorderQuestions(orderedIds: string[]) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const prisma = getPrisma();
  await prisma.$transaction(
    orderedIds.map((id, i) =>
      prisma.consultationQuestion.update({
        where: { id },
        data: { sortOrder: i },
      })
    )
  );

  revalidatePath("/iws-admin/consultation");
}

export async function deleteQuestion(id: string) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  await getPrisma().consultationQuestion.delete({ where: { id } });
  revalidatePath("/iws-admin/consultation");
}
