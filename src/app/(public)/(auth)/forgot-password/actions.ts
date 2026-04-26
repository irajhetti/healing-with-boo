"use server";

import { randomBytes, createHash } from "node:crypto";
import { hashSync } from "bcryptjs";
import { z } from "zod";
import { getPrisma } from "@/lib/db";
import { getResendClient, FROM_EMAIL } from "@/lib/email";
import { buildPasswordResetEmail } from "@/lib/emails/password-reset";

const TOKEN_TTL_MINUTES = 60;

const requestSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

const resetSchema = z.object({
  token: z.string().min(20),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

export async function requestPasswordReset(
  data: { email: string },
): Promise<{ error: string | null }> {
  const parsed = requestSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true, email: true },
  });

  // Always return success — don't reveal whether the email exists
  if (!user) {
    return { error: null };
  }

  // Invalidate any unused tokens for this user
  await prisma.passwordResetToken.updateMany({
    where: { userId: user.id, usedAt: null },
    data: { usedAt: new Date() },
  });

  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTES * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: { userId: user.id, tokenHash, expiresAt },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://healingwithboo.co.uk";
  const resetUrl = `${baseUrl}/forgot-password/reset?token=${rawToken}`;

  try {
    const email = buildPasswordResetEmail({
      resetUrl,
      expiresMinutes: TOKEN_TTL_MINUTES,
    });
    await getResendClient().emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: email.subject,
      html: email.html,
    });
  } catch (err) {
    console.error("Failed to send password reset email:", err);
    // Still return success — security via obscurity
  }

  return { error: null };
}

export async function resetPassword(
  data: { token: string; password: string },
): Promise<{ error: string | null }> {
  const parsed = resetSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const prisma = getPrisma();
  const tokenHash = hashToken(parsed.data.token);

  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
  });

  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return { error: "This reset link is invalid or has expired." };
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { hashedPassword: hashSync(parsed.data.password, 12) },
    }),
    prisma.passwordResetToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return { error: null };
}
