import { esc } from "./escape";
import { emailShell, ctaButton } from "./shell";

export function buildPasswordResetEmail(data: {
  resetUrl: string;
  expiresMinutes: number;
}): { subject: string; html: string } {
  const d = {
    resetUrl: esc(data.resetUrl),
    expiresMinutes: data.expiresMinutes,
  };

  const body = `
    <h1 style="margin:0 0 18px 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:normal;color:#2d3b2d;line-height:1.3;">
      Reset your password
    </h1>
    <p style="margin:0 0 16px 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#3a3a3a;line-height:1.7;">
      Someone &mdash; hopefully you &mdash; asked to reset the password on your Healing with Boo account.
    </p>
    <p style="margin:0 0 24px 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#3a3a3a;line-height:1.7;">
      Click the button below to choose a new one. The link expires in <strong>${d.expiresMinutes} minutes</strong> and can only be used once.
    </p>

    ${ctaButton(d.resetUrl, "Reset password")}

    <p style="margin:0 0 6px 0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#8a7d6a;line-height:1.6;">
      Or paste this link into your browser:
    </p>
    <p style="margin:0 0 24px 0;font-family:Menlo,Consolas,monospace;font-size:12px;color:#5a5a5a;line-height:1.5;word-break:break-all;">
      ${d.resetUrl}
    </p>

    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#8a7d6a;line-height:1.6;">
      If you didn&apos;t request this, you can safely ignore this email &mdash; your password won&apos;t change.
    </p>`.trim();

  return {
    subject: "Reset your Healing with Boo password",
    html: emailShell({
      preheader: "Password reset",
      inboxPreview: `Reset link for your Healing with Boo account, valid for ${data.expiresMinutes} minutes.`,
      body,
    }),
  };
}
