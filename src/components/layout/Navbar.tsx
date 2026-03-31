"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Booking" },
  { href: "/blog", label: "Blog" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#0a0f0b]/85 backdrop-blur-xl shadow-[0_40px_40px_-15px_rgba(0,0,0,0.3)] border-b border-[#343d32]/40">
        <div className="flex justify-between items-center w-full px-6 md:px-8 py-4 max-w-full mx-auto">
          <Link
            href="/"
            className="font-headline text-2xl font-bold text-primary tracking-tight"
          >
            Healing with Boo
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-label text-[12px] font-bold tracking-[0.05em] uppercase text-primary hover:text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            <Link
              href="/members"
              className="hidden lg:block font-label text-[12px] font-bold tracking-[0.05em] uppercase text-primary"
            >
              Members
            </Link>
            <a
              href="https://bookwithboo.setmore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold text-sm tracking-wide hover:opacity-80 transition-all duration-300 active:scale-95"
            >
              Book Now
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-primary"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[28px]">
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0a0f0b]/95 backdrop-blur-xl border-t border-[#343d32]/40 px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block font-label text-sm font-bold tracking-[0.05em] uppercase text-primary hover:text-secondary transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/members"
              onClick={() => setMobileOpen(false)}
              className="block font-label text-sm font-bold tracking-[0.05em] uppercase text-primary hover:text-secondary transition-colors py-2"
            >
              Members
            </Link>
          </div>
        )}
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-[72px]" />
    </>
  );
}
