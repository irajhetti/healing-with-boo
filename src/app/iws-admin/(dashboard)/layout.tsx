import { getAdminSession, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminShell } from "./admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/iws-admin/login");

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/iws-admin/login" });
  }

  return (
    <AdminShell
      user={{ name: session.user?.name, email: session.user?.email }}
      signOutAction={handleSignOut}
    >
      {children}
    </AdminShell>
  );
}
