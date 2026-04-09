"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: form.get("email") as string,
      password: form.get("password") as string,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/members");
    }
  }

  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8 md:p-10 shadow-sm">
          <p className="font-headline text-xl text-primary text-center mb-8">Healing with Boo</p>
          <h1 className="font-headline text-3xl text-on-surface text-center mb-2">Welcome Back</h1>
          <p className="text-on-surface-variant text-center mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
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
            <div>
              <label className="block font-label text-sm font-medium text-on-surface mb-2">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                placeholder="Enter your password"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-label font-medium py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-outline-variant/30" />
            <span className="text-sm text-on-surface-variant">or</span>
            <div className="flex-1 h-px bg-outline-variant/30" />
          </div>

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
