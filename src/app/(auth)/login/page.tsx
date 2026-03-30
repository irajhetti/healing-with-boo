import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Healing with Boo member account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8 md:p-10 shadow-sm">
          {/* Brand */}
          <p className="font-headline text-xl text-primary text-center mb-8">Healing with Boo</p>

          {/* Heading */}
          <h1 className="font-headline text-3xl text-on-surface text-center mb-2">Welcome Back</h1>
          <p className="text-on-surface-variant text-center mb-8">Sign in to your account</p>

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
            <div>
              <label className="block font-label text-sm font-medium text-on-surface mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-secondary hover:underline font-label">
                Forgot Password?
              </Link>
            </div>

            <button
              type="button"
              className="w-full bg-primary text-on-primary font-label font-medium py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-outline-variant/30" />
            <span className="text-sm text-on-surface-variant">or</span>
            <div className="flex-1 h-px bg-outline-variant/30" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-secondary font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
