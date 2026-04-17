import type { Metadata } from "next";
import Image from "next/image";
import { MysticalDivider } from "@/components/ui/MysticalDivider";

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
        <div className="px-6 md:px-12 max-w-3xl mx-auto text-center">
          <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
            Meet Leah / Boo
          </span>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-6">
            Hello, welcome to my space.
          </h1>
          <p className="font-body text-on-surface-variant text-lg leading-relaxed">
            I am based at 22 Churchill Road in Boscombe. Boo&apos;s Healing Bubble is a warm, down-to-earth space where massage, energy healing, rattles, drums and herbs come together to help you feel like yourself again.
          </p>
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
              My journey into healing wasn&apos;t some grand plan. It came from my own experience of needing to feel better, in my body and in my soul. I learned that you can&apos;t separate the two &mdash; they&apos;re wrapped up together.
            </p>
            <p className="font-body text-on-surface-variant text-base leading-relaxed">
              That understanding changed everything for me, and it&apos;s what got me the results. We often accept feeling a certain way because of &ldquo;life,&rdquo; but we absolutely can feel better &mdash; and this is my passion.
            </p>
          </div>
        </div>

        {/* Block 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative">
            <div className="asymmetric-mask overflow-hidden rounded-xl">
              <Image
                src="/images/therapeutic-massage.png"
                alt="Therapeutic massage treatment"
                width={600}
                height={500}
                className="object-cover w-full"
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
              I trained in therapeutic and deep tissue massage, and my hands learned to listen &mdash; finding where your body is holding on and helping it let go. But bodywork was only half the picture.
            </p>
            <p className="font-body text-on-surface-variant text-base leading-relaxed">
              I also studied shamanic healing traditions &mdash; energy clearing, soul retrieval, journeying, sound healing with drums and rattles, breathwork and herbs. It all weaves together. The body and spirit aren&apos;t separate, so the work shouldn&apos;t be either.
            </p>
          </div>
        </div>

        {/* Block 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative md:order-2">
            <div className="asymmetric-mask overflow-hidden rounded-xl">
              <Image
                src="/images/energy-healing.jpg"
                alt="Energy healing session with warm glowing light"
                width={600}
                height={500}
                className="object-cover w-full"
              />
            </div>
          </div>
          <div className="md:order-1">
            <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
              The Practice
            </span>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-6">
              Boo&apos;s Healing Bubble
            </h2>
            <p className="font-body text-on-surface-variant text-base leading-relaxed mb-4">
              My treatment room at 22 Churchill Road, Boscombe BH1 4ES is my little bubble &mdash; a warm, safe space where you can properly switch off. Every session is different because every person is different. I work with what you need on the day, not from a script.
            </p>
            <p className="font-body text-on-surface-variant text-base leading-relaxed">
              Whether you come for massage, energy work, shamanic healing, sound healing, or you&apos;re not even sure what you need &mdash; that&apos;s absolutely fine. Come as you are. Healing with Boo is about being real and feeling safe enough to let go.
            </p>
          </div>
        </div>
      </section>

      {/* ── Botanical Divider ── */}
      <MysticalDivider />

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            {
              icon: "spa",
              title: "Qualified Massage Therapist",
              description:
                "Deep tissue, therapeutic, relaxation, and hot stone massage. My hands listen to what your body needs.",
            },
            {
              icon: "auto_awesome",
              title: "Shamanic Practitioner",
              description:
                "Shamanic journeying, soul retrieval, energy clearing, drums, rattles, herbs, and breathwork.",
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
            &ldquo;I&apos;m just me. Hopefully you are just being you too. Come as you are &mdash; that&apos;s all you ever need to be.&rdquo;
          </blockquote>
          <p className="font-label text-sm font-bold text-secondary tracking-wide uppercase">
            &mdash; Leah, Healing with Boo
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-primary-container py-16 md:py-20">
        <div className="px-6 md:px-12 max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-primary-container mb-4">
            Begin Your Healing Journey
          </h2>
          <p className="font-body text-on-primary-container/80 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re drawn to bodywork, energy healing, or simply seeking a safe space to exhale &mdash; you are welcome here.
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
