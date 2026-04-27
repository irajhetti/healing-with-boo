"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { requestPasswordReset } from "./actions";

export default function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(form: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await requestPasswordReset({
        email: (form.get("email") as string) || "",
      });
      if (result.error) {
        setError(result.error);
        return;
      }
      setSubmitted(true);
    });
  }

  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8 md:p-10 shadow-sm">
          <p className="font-headline text-xl text-primary text-center mb-8">Healing with Boo</p>

          <h1 className="font-headline text-2xl text-on-surface text-center mb-2">Reset Password</h1>
          <p className="text-on-surface-variant text-center mb-8">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>

          {submitted ? (
            <div className="bg-surface-container rounded-xl p-5 text-center text-on-surface">
              <p className="mb-2 font-medium">Check your inbox.</p>
              <p className="text-sm text-on-surface-variant">
                If an account exists for that email, we&apos;ve sent a reset link. The link expires in 60 minutes.
              </p>
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-label text-sm font-medium text-on-surface mb-2">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                  placeholder="you@example.com"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary text-on-primary font-label font-medium py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isPending ? "Sending..." : "Send Reset Link"}
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
