"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { registerUser } from "./actions";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;
    const confirm = form.get("confirm") as string;

    if (password !== confirm) {
      setError("Passwords don't match.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    const result = await registerUser({
      name: form.get("name") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      password,
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // Auto sign in after registration
    const signInResult = await signIn("credentials", {
      email: form.get("email") as string,
      password,
      redirect: false,
    });

    setLoading(false);

    if (signInResult?.error) {
      setError("Account created but sign in failed. Please log in manually.");
    } else {
      window.location.href = "/members";
    }
  }

  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8 md:p-10 shadow-sm">
          <p className="font-headline text-xl text-primary text-center mb-8">Healing with Boo</p>
          <h1 className="font-headline text-3xl text-on-surface text-center mb-2">Join the Circle</h1>
          <p className="text-on-surface-variant text-center mb-8">Create your member account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-label text-sm font-medium text-on-surface mb-2">Full Name</label>
              <input
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                placeholder="Your full name"
              />
            </div>
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
              <label className="block font-label text-sm font-medium text-on-surface mb-2">Phone Number</label>
              <input
                name="phone"
                type="tel"
                className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                placeholder="07xxx xxxxxx"
              />
            </div>
            <div>
              <label className="block font-label text-sm font-medium text-on-surface mb-2">Password</label>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                placeholder="At least 8 characters"
              />
            </div>
            <div>
              <label className="block font-label text-sm font-medium text-on-surface mb-2">Confirm Password</label>
              <input
                name="confirm"
                type="password"
                required
                className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                placeholder="Confirm your password"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-label font-medium py-3 rounded-full hover:opacity-90 transition-opacity mt-2 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-on-surface-variant mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-secondary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
