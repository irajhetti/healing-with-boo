"use server";

import { getPrisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function getMembers() {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const users = await getPrisma().user.findMany({
    where: { role: "CLIENT" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      _count: { select: { consultationResponses: true } },
    },
    orderBy: { name: "asc" },
  });

  return users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    createdAt: u.createdAt,
    hasConsultation: u._count.consultationResponses > 0,
  }));
}

export async function getMemberConsultation(userId: string) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const prisma = getPrisma();

  const [user, questions, responses] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { pressurePref: true, healthNotes: true },
    }),
    prisma.consultationQuestion.findMany({
      orderBy: { sortOrder: "asc" },
    }),
    prisma.consultationResponse.findMany({
      where: { userId },
    }),
  ]);

  const answerMap = new Map(responses.map((r) => [r.questionId, r.answer]));

  return {
    pressurePref: user?.pressurePref || "Not set",
    healthNotes: user?.healthNotes || "",
    questions: questions.map((q) => ({
      id: q.id,
      label: q.label,
      type: q.type,
      active: q.active,
      answer: answerMap.get(q.id) ?? null,
    })),
  };
}
