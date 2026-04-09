import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResendClient(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not set");
    _resend = new Resend(key);
  }
  return _resend;
}

export const FROM_EMAIL =
  process.env.FROM_EMAIL || "Healing with Boo <onboarding@resend.dev>";
export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "zonedoutbeauty@gmail.com";
