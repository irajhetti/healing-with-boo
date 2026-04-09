import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your Healing with Boo account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8 md:p-10 shadow-sm">
          {/* Brand */}
          <p className="font-headline text-xl text-primary text-center mb-8">Healing with Boo</p>

          {/* Heading */}
          <h1 className="font-headline text-3xl text-on-surface text-center mb-2">Reset Password</h1>
          <p className="text-on-surface-variant text-center mb-8">
            Enter your email address and we will send you a link to reset your password.
          </p>

          {/* Form */}
          <form className="space-y-6">
            <div>
              <label className="block font-label text-sm font-medium text-on-surface mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="button"
              className="w-full bg-primary text-on-primary font-label font-medium py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to login */}
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
