"use server";

import { randomBytes, createHash } from "node:crypto";
import { getPrisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import { buildPasswordResetEmail } from "@/lib/emails/password-reset";

const RESET_TTL_MINUTES = 60;

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

/**
 * Admin sends a password reset link to a member. Reuses the same token
 * mechanism as the public /forgot-password flow — single-use, 60 min TTL,
 * stored as SHA-256 hash. Invalidates any existing unused tokens first.
 */
export async function sendPasswordResetForUser(
  userId: string,
): Promise<{ error: string | null }> {
  const session = await getAdminSession();
  if (!session) return { error: "Unauthorized" };

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true },
  });
  if (!user) return { error: "User not found" };
  if (!user.email) return { error: "User has no email on file" };

  // Invalidate any unused tokens for this user
  await prisma.passwordResetToken.updateMany({
    where: { userId: user.id, usedAt: null },
    data: { usedAt: new Date() },
  });

  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + RESET_TTL_MINUTES * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: { userId: user.id, tokenHash, expiresAt },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://healingwithboo.co.uk";
  const resetUrl = `${baseUrl}/forgot-password/reset?token=${rawToken}`;

  try {
    const email = buildPasswordResetEmail({
      resetUrl,
      expiresMinutes: RESET_TTL_MINUTES,
    });
    await sendEmail({
      to: user.email,
      subject: email.subject,
      html: email.html,
    });
  } catch (err) {
    console.error("Failed to send admin-triggered reset email:", err);
    return { error: "Failed to send email — try again or check SMTP" };
  }

  return { error: null };
}
