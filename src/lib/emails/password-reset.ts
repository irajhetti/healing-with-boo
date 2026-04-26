import { esc } from "./escape";

export function buildPasswordResetEmail(data: {
  resetUrl: string;
  expiresMinutes: number;
}): { subject: string; html: string } {
  const d = {
    resetUrl: esc(data.resetUrl),
    expiresMinutes: data.expiresMinutes,
  };

  return {
    subject: "Reset your Healing with Boo password",
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f0eb;font-family:Georgia,serif;">
  <div style="max-width:520px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;">
    <div style="background:#2d3b2d;padding:28px 32px;">
      <h1 style="color:#f5f0eb;margin:0;font-size:24px;font-weight:normal;">Reset your password</h1>
    </div>
    <div style="padding:32px;color:#333;line-height:1.6;">
      <p>You asked to reset your password for Healing with Boo.</p>
      <p>Click the button below to choose a new password. The link expires in ${d.expiresMinutes} minutes and can only be used once.</p>
      <p style="margin:28px 0;">
        <a href="${d.resetUrl}" style="display:inline-block;background:#2d3b2d;color:#f5f0eb;padding:12px 24px;border-radius:24px;text-decoration:none;font-family:Helvetica,Arial,sans-serif;">Reset password</a>
      </p>
      <p style="font-size:13px;color:#666;">If you didn't request this, you can safely ignore this email — your password won't change.</p>
      <p style="font-size:13px;color:#666;word-break:break-all;">Or copy this link: ${d.resetUrl}</p>
    </div>
  </div>
</body>
</html>
    `.trim(),
  };
}
