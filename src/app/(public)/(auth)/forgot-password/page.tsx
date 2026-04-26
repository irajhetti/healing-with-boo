import type { Metadata } from "next";
import ForgotPasswordForm from "./form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your Healing with Boo account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
