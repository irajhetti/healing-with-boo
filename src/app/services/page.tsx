import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Healing Services",
  description:
    "Explore massage therapy and shamanic healing services at Healing with Boo in Boscombe, Bournemouth. Deep tissue, therapeutic massage, energy clearing, soul retrieval and more.",
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
            Two complementary paths to wholeness &mdash; therapeutic bodywork for the physical form and shamanic healing for the energetic body. Each session is personal, intentional, and deeply held.
          </p>
        </div>
      </section>

      {/* ── Featured Service Cards ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        {/* Massage Therapy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center bg-surface-container-low rounded-2xl overflow-hidden shadow-sm">
          <div className="relative h-80 md:h-[480px]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUzN4OYn93LhHTKr1lU7QUFpby-vOQIC_7QYUnYyPur2K4Pdp73QU8uomAYL1YaKUyQvnlrRu0IlgR6ODmzLE8h8FRavav6dwhej0r3DO19MVzbB8jWlniUb3Iv9QQ4mveS0N39kqnoHGdzyjaer4y1IRkAb0GFf45IjpLoyXTgbO5QZ6hrPGBM85HS-ZxfKLaf31CYm3tZDmxG_PkAnpSwKs0U1Ftbv8x_ZuYFConjh9tkTRH6X0jUz2xwtVWjrHbaHXdYRtFxrQ"
              alt="Massage therapy session"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="p-8 md:p-12">
            <span className="font-label text-[11px] font-bold tracking-[0.15em] uppercase text-secondary mb-2 block">
              Body Work
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-4">
              Massage Therapy
            </h2>
            <p className="font-body text-on-surface-variant text-base leading-relaxed mb-4">
              Leah&apos;s massage work goes beyond surface relaxation. Through deep tissue, therapeutic, relaxation, and hot stone techniques, she works intuitively with your body to release held tension, ease chronic pain, and restore natural flow.
            </p>
            <p className="font-body text-on-surface-variant text-base leading-relaxed mb-6">
              Each session is tailored to your unique needs &mdash; no two treatments are ever the same.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-secondary-container/20 text-secondary px-4 py-1.5 rounded-full font-bold text-sm">
                From &pound;45
              </span>
              <span className="text-on-surface-variant text-sm">60&ndash;90 minute sessions</span>
            </div>
            <Link
              href="/services/massage"
              className="bg-primary text-on-primary px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:opacity-80 transition-all duration-300 active:scale-95 inline-flex items-center gap-2"
            >
              View Massage Treatments
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Shamanic Healing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center bg-surface-container-low rounded-2xl overflow-hidden shadow-sm">
          <div className="relative h-80 md:h-[480px] md:order-2">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRXSyAU8Oni-kVOzl9L2HYJgaFeY6V0Gb3fQYvv3ZndRBrAhfpQdrd9iVKBH3qrHPvIJASp8zkyuD-thdfRbnWEzsV-XKtTZT7fvDOQzH0_5tvOgDAIVW2E2VmwH5VmKt-Ebb430rv1nBQVialypyM0WOIDMgqGDvs6uXkaaBXqkSPjJoQLPsjQlegUpQE8A6GeZ_CVUe9G22fGI8thVrYfBjApUZV2I6RR3_6uRWiwUh7fg53eOlkA6R6KP4MmvcDrOhUDyCF0J0"
              alt="Shamanic healing ritual"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="p-8 md:p-12 md:order-1">
            <span className="font-label text-[11px] font-bold tracking-[0.15em] uppercase text-secondary mb-2 block">
              Energy Work
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-4">
              Shamanic Healing
            </h2>
            <p className="font-body text-on-surface-variant text-base leading-relaxed mb-4">
              Shamanic healing works with the energetic and spiritual dimensions of your being. Through ancient practices of energy clearing, soul retrieval, and journeying, Leah helps you release what no longer serves you and reclaim your wholeness.
            </p>
            <p className="font-body text-on-surface-variant text-base leading-relaxed mb-6">
              These sessions are held in sacred space, with deep reverence for the traditions that guide this work.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-secondary-container/20 text-secondary px-4 py-1.5 rounded-full font-bold text-sm">
                From &pound;55
              </span>
              <span className="text-on-surface-variant text-sm">60&ndash;120 minute sessions</span>
            </div>
            <Link
              href="/services/shamanic-healing"
              className="bg-primary text-on-primary px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:opacity-80 transition-all duration-300 active:scale-95 inline-flex items-center gap-2"
            >
              View Shamanic Treatments
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Botanical Divider ── */}
      <div className="botanical-divider my-2" />

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
                  Massage Therapy
                </th>
                <th className="font-headline text-lg font-bold text-on-surface pb-4 px-6 border-b border-outline-variant/30">
                  Shamanic Healing
                </th>
              </tr>
            </thead>
            <tbody className="font-body text-sm text-on-surface-variant">
              <tr>
                <td className="font-label text-xs font-bold tracking-[0.1em] uppercase text-on-surface py-5 pr-6 border-b border-outline-variant/20">
                  Duration
                </td>
                <td className="py-5 px-6 border-b border-outline-variant/20">60&ndash;90 minutes</td>
                <td className="py-5 px-6 border-b border-outline-variant/20">60&ndash;120 minutes</td>
              </tr>
              <tr>
                <td className="font-label text-xs font-bold tracking-[0.1em] uppercase text-on-surface py-5 pr-6 border-b border-outline-variant/20">
                  Price Range
                </td>
                <td className="py-5 px-6 border-b border-outline-variant/20">&pound;45 &ndash; &pound;85</td>
                <td className="py-5 px-6 border-b border-outline-variant/20">&pound;55 &ndash; &pound;95</td>
              </tr>
              <tr>
                <td className="font-label text-xs font-bold tracking-[0.1em] uppercase text-on-surface py-5 pr-6 border-b border-outline-variant/20">
                  Best For
                </td>
                <td className="py-5 px-6 border-b border-outline-variant/20">
                  Chronic pain, muscle tension, physical recovery, relaxation
                </td>
                <td className="py-5 px-6 border-b border-outline-variant/20">
                  Emotional blockages, spiritual disconnection, life transitions, inner healing
                </td>
              </tr>
              <tr>
                <td className="font-label text-xs font-bold tracking-[0.1em] uppercase text-on-surface py-5 pr-6">
                  Ideal If
                </td>
                <td className="py-5 px-6">
                  You carry tension in your body and need physical release and restoration
                </td>
                <td className="py-5 px-6">
                  You feel stuck, lost, or disconnected and seek deeper energetic or spiritual healing
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
            That&apos;s completely okay. Many clients begin with a free discovery call where Leah can listen to what you&apos;re experiencing and gently guide you toward the right modality. There&apos;s no pressure &mdash; just a warm conversation.
          </p>
          <Link
            href="/contact"
            className="bg-secondary-container text-on-secondary-container px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:brightness-110 transition-all duration-300 active:scale-95 inline-block"
          >
            Book a Free Discovery Call
          </Link>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-primary-container py-16 md:py-20">
        <div className="px-6 md:px-12 max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-secondary-container mb-4">
            Ready to Begin?
          </h2>
          <p className="font-body text-on-primary-container/80 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Your body and spirit already know the way. Let Leah help you find it.
          </p>
          <Link
            href="/booking"
            className="bg-secondary-container text-on-secondary-container px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:brightness-110 transition-all duration-300 active:scale-95 inline-block"
          >
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
}
