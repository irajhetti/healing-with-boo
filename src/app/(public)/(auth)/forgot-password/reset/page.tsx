import type { Metadata } from "next";
import ResetPasswordForm from "./form";

export const metadata: Metadata = {
  title: "Choose a new password",
  description: "Set a new password for your Healing with Boo account.",
};

export default async function ResetPasswordPage(props: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await props.searchParams;
  return <ResetPasswordForm token={token ?? ""} />;
}
