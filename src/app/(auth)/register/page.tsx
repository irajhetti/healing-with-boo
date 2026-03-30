import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Healing with Boo member account for exclusive content and easy booking.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8 md:p-10 shadow-sm">
          {/* Brand */}
          <p className="font-headline text-xl text-primary text-center mb-8">Healing with Boo</p>

          {/* Heading */}
          <h1 className="font-headline text-3xl text-on-surface text-center mb-2">Join the Circle</h1>
          <p className="text-on-surface-variant text-center mb-8">Create your member account</p>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label className="block font-label text-sm font-medium text-on-surface mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block font-label text-sm font-medium text-on-surface mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block font-label text-sm font-medium text-on-surface mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                placeholder="07xxx xxxxxx"
              />
            </div>
            <div>
              <label className="block font-label text-sm font-medium text-on-surface mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                placeholder="Create a password"
              />
            </div>
            <div>
              <label className="block font-label text-sm font-medium text-on-surface mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="button"
              className="w-full bg-primary text-on-primary font-label font-medium py-3 rounded-full hover:opacity-90 transition-opacity mt-2"
            >
              Create Account
            </button>
          </form>

          {/* Login link */}
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
