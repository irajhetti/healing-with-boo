import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Leah",
  description:
    "Learn about Leah, a qualified massage therapist and shamanic practitioner based in Boscombe, Bournemouth. Discover her journey into holistic healing.",
};

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative py-20 md:py-28 bg-surface-container-low overflow-hidden">
        <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
              The Healer
            </span>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-6">
              About Leah
            </h1>
            <p className="font-body text-on-surface-variant text-lg leading-relaxed max-w-lg">
              A healer, bodyworker, and guide dedicated to holding sacred space for your transformation.
            </p>
          </div>
          <div className="relative">
            <div className="asymmetric-mask overflow-hidden rounded-xl">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBi6aKf_FpJld2xpDHGvhxbwOmSuGTCPTZgwWcTATIbLh0J6WCvyAjYIbc4ouflCYXQzj6seE-WimwsFfCU8rbQn7saeeFPqNLt0FqjL9oLqekEPJB9nnb65l_zBunItaEYsrOXvcN9rCejgJ-5QLpetm6TFwVqGtw8PNiXOdr-E1CMM30kflkLBs4DQ8TN8wRul5Wto4tJGLhxZt6rnltXmnFY9nnXGmHT1Z4HX44U5mTi0GD00NZ6DMdiRputmG3euAWRZP0gxk"
                alt="Leah, holistic healer and massage therapist"
                width={600}
                height={700}
                className="object-cover w-full"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto space-y-24">
        {/* Block 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative md:order-2">
            <div className="asymmetric-mask overflow-hidden rounded-xl">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcx3T1X84KIaHuoXTeBOqfL9hl-TlGdJfdA4Zwe3HTe5HXfRZX0Au73_XWL8o0PQDABNwjPsux3KlbgW6p06mVUH_Mjzl847L1eIFgh_XzW2o1tp53D-VzMnTlBSgHo1mG2SyGv7i_0zJPvd5qCfo8nPzPZ_4lPJ5fr7ZiemFUuWqNHyQs6ZihHgHy82JSKATIJ--K8FdElyjzdJfZ-wY6DUusvYZh2E6E_QpPqVezLsJAPuMudxb1a5tyqagq7qLuzcL425CkZJg"
                alt="Forest path representing the healing journey"
                width={600}
                height={500}
                className="object-cover w-full"
                unoptimized
              />
            </div>
          </div>
          <div className="md:order-1">
            <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
              The Beginning
            </span>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-6">
              Discovering the Healing Path
            </h2>
            <p className="font-body text-on-surface-variant text-base leading-relaxed mb-4">
              Leah&apos;s journey into healing began not in a classroom, but through her own experience of deep personal transformation. After years of navigating chronic pain and emotional upheaval, she discovered that true healing required attention to both the physical body and the energetic spirit.
            </p>
            <p className="font-body text-on-surface-variant text-base leading-relaxed">
              This revelation set her on a path that would change not only her own life, but the lives of countless others who would later find their way to her treatment room.
            </p>
          </div>
        </div>

        {/* Block 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative">
            <div className="asymmetric-mask overflow-hidden rounded-xl">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUzN4OYn93LhHTKr1lU7QUFpby-vOQIC_7QYUnYyPur2K4Pdp73QU8uomAYL1YaKUyQvnlrRu0IlgR6ODmzLE8h8FRavav6dwhej0r3DO19MVzbB8jWlniUb3Iv9QQ4mveS0N39kqnoHGdzyjaer4y1IRkAb0GFf45IjpLoyXTgbO5QZ6hrPGBM85HS-ZxfKLaf31CYm3tZDmxG_PkAnpSwKs0U1Ftbv8x_ZuYFConjh9tkTRH6X0jUz2xwtVWjrHbaHXdYRtFxrQ"
                alt="Massage therapy training and bodywork"
                width={600}
                height={500}
                className="object-cover w-full"
                unoptimized
              />
            </div>
          </div>
          <div>
            <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
              The Training
            </span>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-6">
              Bodywork &amp; Shamanic Traditions
            </h2>
            <p className="font-body text-on-surface-variant text-base leading-relaxed mb-4">
              Leah trained extensively in therapeutic and deep tissue massage, developing a keen intuition for the body&apos;s held patterns of tension and trauma. Her hands learned to listen, finding the places where the body was asking for release.
            </p>
            <p className="font-body text-on-surface-variant text-base leading-relaxed">
              Alongside her bodywork training, Leah studied shamanic healing traditions, learning the ancient practices of energy clearing, soul retrieval, and journeying. This dual training gives her a unique ability to work with clients on both physical and spiritual levels.
            </p>
          </div>
        </div>

        {/* Block 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative md:order-2">
            <div className="asymmetric-mask overflow-hidden rounded-xl">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRXSyAU8Oni-kVOzl9L2HYJgaFeY6V0Gb3fQYvv3ZndRBrAhfpQdrd9iVKBH3qrHPvIJASp8zkyuD-thdfRbnWEzsV-XKtTZT7fvDOQzH0_5tvOgDAIVW2E2VmwH5VmKt-Ebb430rv1nBQVialypyM0WOIDMgqGDvs6uXkaaBXqkSPjJoQLPsjQlegUpQE8A6GeZ_CVUe9G22fGI8thVrYfBjApUZV2I6RR3_6uRWiwUh7fg53eOlkA6R6KP4MmvcDrOhUDyCF0J0"
                alt="Sacred healing space in Boscombe"
                width={600}
                height={500}
                className="object-cover w-full"
                unoptimized
              />
            </div>
          </div>
          <div className="md:order-1">
            <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
              The Practice
            </span>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-6">
              A Sacred Space in Boscombe
            </h2>
            <p className="font-body text-on-surface-variant text-base leading-relaxed mb-4">
              Today, Leah&apos;s practice in Boscombe, Bournemouth, is a sanctuary for those seeking genuine, deep healing. Every session is personal and intentional &mdash; no two are ever the same, because no two people carry the same story in their body.
            </p>
            <p className="font-body text-on-surface-variant text-base leading-relaxed">
              Whether you come for the physical relief of massage or the spiritual depth of shamanic work, you&apos;ll find a space that is warm, safe, and held with care. Healing with Boo is more than a practice &mdash; it&apos;s a homecoming.
            </p>
          </div>
        </div>
      </section>

      {/* ── Botanical Divider ── */}
      <div className="botanical-divider my-2" />

      {/* ── Credentials ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
            Qualifications
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">
            Training &amp; Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: "spa",
              title: "Qualified Massage Therapist",
              description:
                "Fully qualified in deep tissue, therapeutic, relaxation, and hot stone massage techniques.",
            },
            {
              icon: "auto_awesome",
              title: "Shamanic Practitioner",
              description:
                "Trained in shamanic journeying, soul retrieval, power animal retrieval, and energy clearing.",
            },
            {
              icon: "self_improvement",
              title: "Holistic Wellness Certified",
              description:
                "Certified in holistic wellness practices with a whole-person approach to health and healing.",
            },
            {
              icon: "emergency",
              title: "First Aid Trained",
              description:
                "Current first aid certification ensuring client safety and professional standards of care.",
            },
          ].map((credential) => (
            <div
              key={credential.title}
              className="bg-surface-container-low rounded-xl p-8 text-center shadow-sm"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="material-symbols-outlined text-primary text-[28px]">
                  {credential.icon}
                </span>
              </div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-3">
                {credential.title}
              </h3>
              <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                {credential.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="bg-surface-container-low py-20 md:py-28">
        <div className="px-6 md:px-12 max-w-4xl mx-auto text-center">
          <span className="material-symbols-outlined text-secondary text-[40px] mb-6 block">
            format_quote
          </span>
          <blockquote className="font-headline text-2xl md:text-3xl font-bold text-on-surface leading-snug mb-8 italic">
            &ldquo;I believe healing happens when we feel truly safe and held. My practice creates a sacred space where the body and soul can begin to remember their wholeness.&rdquo;
          </blockquote>
          <p className="font-label text-sm font-bold text-secondary tracking-wide uppercase">
            &mdash; Leah, Healing with Boo
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-primary-container py-16 md:py-20">
        <div className="px-6 md:px-12 max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-secondary-container mb-4">
            Begin Your Healing Journey
          </h2>
          <p className="font-body text-on-primary-container/80 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re drawn to bodywork, energy healing, or simply seeking a safe space to exhale &mdash; you are welcome here.
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
