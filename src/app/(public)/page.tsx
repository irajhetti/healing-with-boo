import Image from "next/image";
import Link from "next/link";
import { Fireflies } from "@/components/ui/Fireflies";
import { MysticalDivider } from "@/components/ui/MysticalDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { homepageTestimonials } from "@/data/testimonials";

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/forest-canopy.jpg"
          alt="Misty forest path winding through the trees"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0b]/85 via-[#0c1a0e]/70 to-[#0a0f0b]/95" />
        <Fireflies />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <span className="inline-block font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-6">
            Holistic Healing &amp; Massage in Boscombe
          </span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Personal, Intentional &amp; Deep Healing
          </h1>
          <p className="font-body text-on-surface-variant text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            A sacred space for body and soul restoration at 22 Churchill Road, Boscombe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="bg-secondary text-on-secondary px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:brightness-110 transition-all duration-300 active:scale-95"
            >
              Book a Session
            </a>
            <Link
              href="/services"
              className="border-2 border-white/30 text-white px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:bg-white/10 transition-all duration-300 active:scale-95"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Botanical Divider ── */}
      <MysticalDivider />

      {/* ── Services Preview ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <ScrollReveal animation="shimmer">
          <div className="text-center mb-16">
            <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
              Sacred Modalities
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">
              Our Healing Services
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Massage Therapy Card */}
          <ScrollReveal animation="glow" delay={100}>
          <Link href="/services/massage" className="group block">
            <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-72 md:h-80 overflow-hidden">
                <Image
                  src="/images/therapeutic-massage.png"
                  alt="Therapeutic massage treatment"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-8">
                <span className="font-label text-[11px] font-bold tracking-[0.15em] uppercase text-secondary mb-2 block">
                  Body Work
                </span>
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-3">
                  Massage Therapy
                </h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-4">
                  Deep to fix, relaxing to soothe or a bit of both. Tailored bodywork from 30 to 90 minutes.
                </p>
                <span className="inline-flex items-center text-primary font-bold text-sm group-hover:gap-2 transition-all">
                  From &pound;27
                  <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
                </span>
              </div>
            </div>
          </Link>
          </ScrollReveal>

          {/* Shamanic Healing Card */}
          <ScrollReveal animation="glow" delay={250}>
          <Link href="/services/shamanic-healing" className="group block md:mt-12">
            <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-72 md:h-80 overflow-hidden">
                <Image
                  src="/images/sound-healing-session.jpg"
                  alt="Leah leading a sound bowl healing session in the forest"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-8">
                <span className="font-label text-[11px] font-bold tracking-[0.15em] uppercase text-secondary mb-2 block">
                  Energy Work
                </span>
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-3">
                  Shamanic Healing
                </h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-4">
                  Energy healing with spirit, sound healing, and herbs. Sessions for all ages, from kids healing to deep shamanic release.
                </p>
                <span className="inline-flex items-center text-primary font-bold text-sm group-hover:gap-2 transition-all">
                  From &pound;25
                  <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
                </span>
              </div>
            </div>
          </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Botanical Divider ── */}
      <MysticalDivider />

      {/* ── About Teaser ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-3xl mx-auto text-center">
        <ScrollReveal animation="shimmer">
          <div className="mx-auto mb-10 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-surface-container-low shadow-md">
            <Image
              src="/images/moss-heart.jpg"
              alt="A heart shape made of moss in the forest"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
            The Healer
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface mb-6">
            Meet Leah
          </h2>
          <p className="font-body text-on-surface-variant text-base leading-relaxed mb-4">
            Hello my lovely people. Leah appreciates every single one of her clients &mdash; and if you&apos;re new here, welcome. She&apos;s just her, and she hopes you&apos;re just being you too.
          </p>
          <p className="font-body text-on-surface-variant text-base leading-relaxed mb-8">
            Based at 22 Churchill Road in Boscombe, Boo&apos;s Healing Bubble is a warm, down-to-earth space where massage, energy healing, sound healing, and herbs come together to help you feel like yourself again.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center text-primary font-bold text-sm hover:gap-3 gap-2 transition-all duration-300"
          >
            Read Leah&apos;s Story
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </ScrollReveal>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 md:py-28 bg-surface-container-low">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <ScrollReveal animation="shimmer">
          <div className="text-center mb-16">
            <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
              Kind Words
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">
              What Clients Say
            </h2>
          </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homepageTestimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-surface rounded-xl p-8 shadow-sm"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-secondary text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <p className="font-label text-sm font-bold text-on-surface">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/testimonials"
              className="inline-flex items-center text-primary font-bold text-sm hover:gap-3 gap-2 transition-all duration-300"
            >
              Read More Testimonials
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-primary-container py-16 md:py-20">
        <ScrollReveal animation="glow">
        <div className="px-6 md:px-12 max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-primary-container mb-4">
            Your Healing Journey Starts Here
          </h2>
          <p className="font-body text-on-primary-container/70 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you seek physical relief or spiritual reconnection, there is a place for you here. Book your session today.
          </p>
          <a
            href="https://bookwithboo.setmore.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-on-secondary px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:brightness-110 transition-all duration-300 active:scale-95 inline-block"
          >
            Book Now
          </a>
        </div>
        </ScrollReveal>
      </section>
    </>
  );
}
