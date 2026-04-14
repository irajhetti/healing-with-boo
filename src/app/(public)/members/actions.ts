"use server";

import { getPrisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { hashSync, compareSync } from "bcryptjs";
import { profileSchema } from "@/lib/validations/profile";

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

export async function getMemberCodes() {
  const user = await requireUser();

  const codes = await getPrisma().discountCode.findMany({
    where: {
      userId: user.id,
      active: true,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  // Filter exhausted codes (Prisma can't compare two columns)
  return codes
    .filter((c) => c.maxUses === null || c.usedCount < c.maxUses)
    .map((c) => ({
      id: c.id,
      code: c.code,
      discountType: c.discountType,
      amount: c.amount,
      expiresAt: c.expiresAt,
      maxUses: c.maxUses,
      usedCount: c.usedCount,
    }));
}

export type ConsultationFormQuestion = {
  id: string;
  label: string;
  type: "SHORT_TEXT" | "LONG_TEXT" | "DROPDOWN" | "YES_NO";
  options: string[] | null;
  required: boolean;
  answer: string | null;
};

export async function getConsultationForm(): Promise<ConsultationFormQuestion[]> {
  const user = await requireUser();
  const prisma = getPrisma();

  const [questions, responses] = await Promise.all([
    prisma.consultationQuestion.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.consultationResponse.findMany({
      where: { userId: user.id },
    }),
  ]);

  const answerMap = new Map(responses.map((r) => [r.questionId, r.answer]));

  return questions.map((q) => ({
    id: q.id,
    label: q.label,
    type: q.type,
    options: q.options ? (JSON.parse(q.options) as string[]) : null,
    required: q.required,
    answer: answerMap.get(q.id) ?? null,
  }));
}

export async function saveConsultationAnswers(
  answers: Array<{ questionId: string; answer: string }>
): Promise<{ error: string | null }> {
  const user = await requireUser();
  const prisma = getPrisma();

  // Validate required fields
  const questions = await prisma.consultationQuestion.findMany({
    where: { active: true },
  });
  const questionMap = new Map(questions.map((q) => [q.id, q]));

  for (const { questionId, answer } of answers) {
    const q = questionMap.get(questionId);
    if (q?.required && !answer.trim()) {
      return { error: `"${q.label}" is required.` };
    }
  }

  // Upsert each answer
  for (const { questionId, answer } of answers) {
    if (!questionMap.has(questionId)) continue;
    await prisma.consultationResponse.upsert({
      where: {
        userId_questionId: { userId: user.id, questionId },
      },
      update: { answer },
      create: { userId: user.id, questionId, answer },
    });
  }

  revalidatePath("/members/profile");
  return { error: null };
}

export async function hasCompletedConsultation(): Promise<boolean> {
  const user = await requireUser();
  const prisma = getPrisma();

  const requiredQuestions = await prisma.consultationQuestion.findMany({
    where: { active: true, required: true },
    select: { id: true },
  });

  if (requiredQuestions.length === 0) return true;

  const responses = await prisma.consultationResponse.findMany({
    where: {
      userId: user.id,
      questionId: { in: requiredQuestions.map((q) => q.id) },
    },
  });

  const answeredIds = new Set(
    responses.filter((r) => r.answer.trim() !== "").map((r) => r.questionId)
  );

  return requiredQuestions.every((q) => answeredIds.has(q.id));
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
}): Promise<{ error: string | null }> {
  const parsed = profileSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const user = await requireUser();

  await getPrisma().user.update({
    where: { id: user.id },
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      pressurePref: parsed.data.pressurePref,
      healthNotes: parsed.data.healthNotes || null,
    },
  });

  revalidatePath("/members/profile");
  return { error: null };
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
