import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MysticalDivider } from "@/components/ui/MysticalDivider";

export const metadata: Metadata = {
  title: "Our Healing Services",
  description:
    "Massage, healing and signature experiences at Healing with Boo in Boscombe, Bournemouth. From £12 scalp rituals to 3-hour intentional pause sessions. Book online via Setmore.",
};

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative py-20 md:py-28 bg-surface-container-low">
        <div className="px-6 md:px-12 max-w-4xl mx-auto text-center">
          <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
            Sacred Modalities
          </span>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-6">
            Our Healing Services
          </h1>
          <p className="font-body text-on-surface-variant text-lg leading-relaxed max-w-2xl mx-auto">
            Three paths to feeling like yourself again &mdash; hands-on massage for the body, energy healing for the spirit, and signature experiences that combine both. Every session is personal, intentional, and held with care.
          </p>
        </div>
      </section>

      {/* ── Featured Service Cards ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Massage */}
          <Link href="/services/massage" className="group block">
            <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64 md:h-72 overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUzN4OYn93LhHTKr1lU7QUFpby-vOQIC_7QYUnYyPur2K4Pdp73QU8uomAYL1YaKUyQvnlrRu0IlgR6ODmzLE8h8FRavav6dwhej0r3DO19MVzbB8jWlniUb3Iv9QQ4mveS0N39kqnoHGdzyjaer4y1IRkAb0GFf45IjpLoyXTgbO5QZ6hrPGBM85HS-ZxfKLaf31CYm3tZDmxG_PkAnpSwKs0U1Ftbv8x_ZuYFConjh9tkTRH6X0jUz2xwtVWjrHbaHXdYRtFxrQ"
                  alt="Massage therapy session"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="p-6 md:p-8">
                <span className="font-label text-[11px] font-bold tracking-[0.15em] uppercase text-secondary mb-2 block">
                  Body Work
                </span>
                <h2 className="font-headline text-2xl font-bold text-on-surface mb-3">
                  Massage
                </h2>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-4">
                  Deep tissue or calming \u2014 tailored to what your body needs. From 30-minute sessions to 90-minute full body treatments, plus scalp pressure rituals and pelvic health massage.
                </p>
                <span className="inline-flex items-center text-primary font-bold text-sm group-hover:gap-2 transition-all">
                  From &pound;25
                  <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Healing */}
          <Link href="/services/shamanic-healing" className="group block">
            <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64 md:h-72 overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRXSyAU8Oni-kVOzl9L2HYJgaFeY6V0Gb3fQYvv3ZndRBrAhfpQdrd9iVKBH3qrHPvIJASp8zkyuD-thdfRbnWEzsV-XKtTZT7fvDOQzH0_5tvOgDAIVW2E2VmwH5VmKt-Ebb430rv1nBQVialypyM0WOIDMgqGDvs6uXkaaBXqkSPjJoQLPsjQlegUpQE8A6GeZ_CVUe9G22fGI8thVrYfBjApUZV2I6RR3_6uRWiwUh7fg53eOlkA6R6KP4MmvcDrOhUDyCF0J0"
                  alt="Healing session"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="p-6 md:p-8">
                <span className="font-label text-[11px] font-bold tracking-[0.15em] uppercase text-secondary mb-2 block">
                  Energy Work
                </span>
                <h2 className="font-headline text-2xl font-bold text-on-surface mb-3">
                  Healing
                </h2>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-4">
                  Chakra balancing, sacred womb activation, and shamanic healing. Working with spirit, drums, rattles, herbs, and breathwork.
                </p>
                <span className="inline-flex items-center text-primary font-bold text-sm group-hover:gap-2 transition-all">
                  From &pound;55
                  <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Signature Experiences */}
          <Link href="/services/shamanic-healing" className="group block">
            <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64 md:h-72 overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcx3T1X84KIaHuoXTeBOqfL9hl-TlGdJfdA4Zwe3HTe5HXfRZX0Au73_XWL8o0PQDABNwjPsux3KlbgW6p06mVUH_Mjzl847L1eIFgh_XzW2o1tp53D-VzMnTlBSgHo1mG2SyGv7i_0zJPvd5qCfo8nPzPZ_4lPJ5fr7ZiemFUuWqNHyQs6ZihHgHy82JSKATIJ--K8FdElyjzdJfZ-wY6DUusvYZh2E6E_QpPqVezLsJAPuMudxb1a5tyqagq7qLuzcL425CkZJg"
                  alt="Signature healing experience"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="p-6 md:p-8">
                <span className="font-label text-[11px] font-bold tracking-[0.15em] uppercase text-secondary mb-2 block">
                  Combined
                </span>
                <h2 className="font-headline text-2xl font-bold text-on-surface mb-3">
                  Signature Experiences
                </h2>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-4">
                  Massage meets healing. From the Total Chill Out to the 3 Hour Intentional Pause &mdash; deep release, body &amp; soul reset, and full restoration.
                </p>
                <span className="inline-flex items-center text-primary font-bold text-sm group-hover:gap-2 transition-all">
                  From &pound;70
                  <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Botanical Divider ── */}
      <MysticalDivider />

      {/* ── Comparison ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
            Compare
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">
            Which Path Is Right for You?
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="font-label text-xs font-bold tracking-[0.15em] uppercase text-outline pb-4 pr-6 border-b border-outline-variant/30">
                  &nbsp;
                </th>
                <th className="font-headline text-lg font-bold text-on-surface pb-4 px-6 border-b border-outline-variant/30">
                  Massage
                </th>
                <th className="font-headline text-lg font-bold text-on-surface pb-4 px-6 border-b border-outline-variant/30">
                  Healing
                </th>
                <th className="font-headline text-lg font-bold text-on-surface pb-4 px-6 border-b border-outline-variant/30">
                  Signature
                </th>
              </tr>
            </thead>
            <tbody className="font-body text-sm text-on-surface-variant">
              <tr>
                <td className="font-label text-xs font-bold tracking-[0.1em] uppercase text-on-surface py-5 pr-6 border-b border-outline-variant/20">
                  Duration
                </td>
                <td className="py-5 px-6 border-b border-outline-variant/20">30&ndash;90 minutes</td>
                <td className="py-5 px-6 border-b border-outline-variant/20">45&ndash;90 minutes</td>
                <td className="py-5 px-6 border-b border-outline-variant/20">60&ndash;180 minutes</td>
              </tr>
              <tr>
                <td className="font-label text-xs font-bold tracking-[0.1em] uppercase text-on-surface py-5 pr-6 border-b border-outline-variant/20">
                  Price Range
                </td>
                <td className="py-5 px-6 border-b border-outline-variant/20">&pound;25 &ndash; &pound;70</td>
                <td className="py-5 px-6 border-b border-outline-variant/20">&pound;55 &ndash; &pound;95</td>
                <td className="py-5 px-6 border-b border-outline-variant/20">&pound;70 &ndash; &pound;165</td>

              </tr>
              <tr>
                <td className="font-label text-xs font-bold tracking-[0.1em] uppercase text-on-surface py-5 pr-6 border-b border-outline-variant/20">
                  Includes
                </td>
                <td className="py-5 px-6 border-b border-outline-variant/20">
                  Deep tissue, calming, scalp pressure ritual, pelvic health massage
                </td>
                <td className="py-5 px-6 border-b border-outline-variant/20">
                  Chakra Balancing, Sacred Womb Activation, Shamanic Healing
                </td>
                <td className="py-5 px-6 border-b border-outline-variant/20">
                  Total Chill Out, Body &amp; Soul Reset, Deep Release, The Intentional Pause
                </td>
              </tr>
              <tr>
                <td className="font-label text-xs font-bold tracking-[0.1em] uppercase text-on-surface py-5 pr-6">
                  Best For
                </td>
                <td className="py-5 px-6">
                  Muscle tension, chronic pain, relaxation, physical recovery
                </td>
                <td className="py-5 px-6">
                  Emotional release, energy blockages, feminine healing, spiritual alignment
                </td>
                <td className="py-5 px-6">
                  Full body &amp; soul restoration, deep relaxation, comprehensive healing
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Not Sure? ── */}
      <section className="bg-surface-container-low py-16 md:py-20">
        <div className="px-6 md:px-12 max-w-3xl mx-auto text-center">
          <span className="material-symbols-outlined text-secondary text-[40px] mb-4 block">
            help_outline
          </span>
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="font-body text-on-surface-variant text-base leading-relaxed mb-8">
            That&apos;s completely okay. If you&apos;re not sure what you need, just book a 30 Minute Calming Massage (&pound;25) as a starting point, or message Leah directly on +447425018335 and she&apos;ll help you figure it out. No pressure &mdash; just a warm conversation.
          </p>
          <a
            href="/booking"
            className="bg-secondary text-on-secondary px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:brightness-110 transition-all duration-300 active:scale-95 inline-block"
          >
            Book on Setmore
          </a>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-primary-container py-16 md:py-20">
        <div className="px-6 md:px-12 max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-primary-container mb-4">
            Ready to Begin?
          </h2>
          <p className="font-body text-on-primary-container/80 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Your body and spirit already know the way. Let Leah help you find it.
          </p>
          <a
            href="/booking"
            className="bg-secondary text-on-secondary px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:brightness-110 transition-all duration-300 active:scale-95 inline-block"
          >
            Book Now
          </a>
        </div>
      </section>
    </>
  );
}
