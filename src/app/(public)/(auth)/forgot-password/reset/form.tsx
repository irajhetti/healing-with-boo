"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { resetPassword } from "../actions";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(form: FormData) {
    setError(null);
    const password = (form.get("password") as string) || "";
    const confirm = (form.get("confirm") as string) || "";

    if (!token) {
      setError("Reset link is missing or malformed.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    startTransition(async () => {
      const result = await resetPassword({ token, password });
      if (result.error) {
        setError(result.error);
        return;
      }
      setDone(true);
    });
  }

  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8 md:p-10 shadow-sm">
          <p className="font-headline text-xl text-primary text-center mb-8">Healing with Boo</p>

          <h1 className="font-headline text-3xl text-on-surface text-center mb-2">Choose a new password</h1>
          <p className="text-on-surface-variant text-center mb-8">
            Pick something at least 8 characters long.
          </p>

          {done ? (
            <div className="bg-surface-container rounded-xl p-5 text-center text-on-surface">
              <p className="mb-3 font-medium">Password updated.</p>
              <Link
                href="/login"
                className="inline-block bg-primary text-on-primary font-label font-medium px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Sign in
              </Link>
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-label text-sm font-medium text-on-surface mb-2">New password</label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                />
              </div>
              <div>
                <label className="block font-label text-sm font-medium text-on-surface mb-2">Confirm new password</label>
                <input
                  name="confirm"
                  type="password"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={isPending || !token}
                className="w-full bg-primary text-on-primary font-label font-medium py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isPending ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-on-surface-variant mt-8">
            <Link href="/login" className="inline-flex items-center gap-1 text-secondary font-medium hover:underline">
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
