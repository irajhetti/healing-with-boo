import type { Metadata } from "next";
import Image from "next/image";
// Link import removed - all booking links now use <a> tags to Setmore

export const metadata: Metadata = {
  title: "Shamanic Healing",
  description:
    "Healing sessions in Boscombe, Bournemouth. Energy healing, sound healing, sacred womb activation, deep shamanic release, and signature massage-healing experiences from £25 with Leah at Healing with Boo.",
};

const treatments = [
  {
    name: "Kids Healing",
    description:
      "Releases blockages, doubts, and negative emotions for children. A gentle, safe session designed to help kids feel lighter, more confident, and more settled. Leah creates a warm, welcoming space where children can relax and let go.",
    duration: "30 min",
    price: "\u00a325",
    icon: "child_care",
  },
  {
    name: "Rebalance",
    description:
      "Energy healing with spirit, sound healing, and herbs. A session to restore your energetic balance, clear what\u2019s weighing you down, and bring you back to centre. Leah works intuitively with whatever your energy body needs on the day.",
    duration: "45 min",
    price: "\u00a355",
    icon: "balance",
  },
  {
    name: "Sacred Womb Activation",
    description:
      "Hip massage combined with womb healing for feminine energy. This powerful session works with the sacral area to release stored tension, support hormonal balance, and reconnect you with your feminine power. Deeply nurturing and transformative.",
    duration: "75 min",
    price: "\u00a375",
    icon: "brightness_7",
  },
  {
    name: "Deep Release",
    description:
      "Shamanic healing with drums, rattles, breathwork, and massage. This is the deepest healing session \u2014 designed to shift what\u2019s stuck at the very core. Leah combines physical bodywork with powerful energetic tools for a truly transformative experience.",
    duration: "90 min",
    price: "\u00a390",
    icon: "air",
  },
];

const signatureExperiences = [
  {
    name: "Massage & Healing",
    description:
      "Full body massage combined with energy work and tarot card pulls. The best of both worlds \u2014 physical release meets spiritual insight in one deeply restorative session.",
    duration: "90 min",
    price: "\u00a390",
    icon: "all_inclusive",
  },
  {
    name: "Full Package Healing & Massage",
    description:
      "An extended session of massage and healing for those who want to go deeper. More time means more layers addressed \u2014 body, mind, and spirit all get the attention they need.",
    duration: "120 min",
    price: "\u00a3120",
    icon: "auto_awesome",
  },
  {
    name: "The 3 Hour Intentional Pause",
    description:
      "The most comprehensive session available. Sound healing, herbs, energy work \u2014 three full hours dedicated to your complete restoration. This is for when you need to truly stop, reset, and come back to yourself.",
    duration: "180 min",
    price: "\u00a3165",
    icon: "self_improvement",
  },
  {
    name: "Total Chill Out",
    description:
      "Medium-pressure facial, neck, and scalp massage combined with healing and hand massage. No deep work, no talking \u2014 just pure, blissful relaxation. Switch off completely.",
    duration: "60 min",
    price: "\u00a370",
    icon: "spa",
  },
];

const timelineSteps = [
  {
    title: "Chat & Settle In",
    description:
      "Leah will have a warm, relaxed chat about what\u2019s going on for you and what you\u2019d like from the session. No judgement, no pressure \u2014 just listening.",
    icon: "forum",
  },
  {
    title: "Setting the Space",
    description:
      "The room is prepared with intention \u2014 herbs, sound, and energy. Leah creates a safe, held container for whatever needs to come through during your session.",
    icon: "brightness_7",
  },
  {
    title: "The Healing",
    description:
      "Using a blend of energy work, sound healing with drums and rattles, herbs, breathwork, and hands-on techniques, Leah works intuitively with what your body and spirit need. You just relax and receive.",
    icon: "auto_awesome",
  },
  {
    title: "Coming Back",
    description:
      "Gentle integration time to come back to yourself. Leah will share anything that came up and you can take your time \u2014 no rushing out the door.",
    icon: "nest_eco_leaf",
  },
];

const signs = [
  "You feel stuck, drained, or like something is off but you can\u2019t quite explain it",
  "You\u2019re carrying emotional weight that won\u2019t shift",
  "You\u2019re going through a big life change and need support",
  "You want to reconnect with your feminine energy or heal womb-related issues",
  "Your child is struggling with confidence, anxiety, or unsettled emotions",
  "You\u2019ve tried other things and they haven\u2019t quite got to the root of it",
  "You\u2019re curious about energy healing and want to try it in a safe, relaxed space",
  "You just need to properly stop and reset",
];

const faqs = [
  {
    question: "Do I need to believe in any of this for it to work?",
    answer:
      "Not at all. You don\u2019t need any specific beliefs. Just come as you are with an open mind. Many clients are simply curious and still have deeply meaningful experiences.",
  },
  {
    question: "What\u2019s the difference between Rebalance and Deep Release?",
    answer:
      "Rebalance (45 min, \u00a355) is energy healing with spirit, sound healing, and herbs \u2014 great for restoring balance and clearing what\u2019s weighing you down. Deep Release (90 min, \u00a390) goes further with shamanic tools like drums, rattles, and breathwork combined with massage. It\u2019s for when you need to shift something at the core.",
  },
  {
    question: "Is the Kids Healing session suitable for my child?",
    answer:
      "The Kids Healing session is designed to release blockages, doubts, and negative emotions in a gentle, safe way. It\u2019s suitable for children of various ages. If you\u2019re unsure, message Leah on +447425018335 and she\u2019ll chat it through with you.",
  },
  {
    question: "What is the Total Chill Out?",
    answer:
      "It\u2019s 60 minutes of medium-pressure facial, neck, and scalp massage combined with healing and hand massage. No deep work, no talking \u2014 just pure relaxation. Perfect if you want to completely switch off.",
  },
  {
    question: "What\u2019s the cancellation policy?",
    answer:
      "Leah is always happy to reschedule with enough notice \u2014 life is nuts sometimes and she fully understands. But she does need to charge if it\u2019s less than 24 hours notice.",
  },
];

export default function ShamanicHealingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRXSyAU8Oni-kVOzl9L2HYJgaFeY6V0Gb3fQYvv3ZndRBrAhfpQdrd9iVKBH3qrHPvIJASp8zkyuD-thdfRbnWEzsV-XKtTZT7fvDOQzH0_5tvOgDAIVW2E2VmwH5VmKt-Ebb430rv1nBQVialypyM0WOIDMgqGDvs6uXkaaBXqkSPjJoQLPsjQlegUpQE8A6GeZ_CVUe9G22fGI8thVrYfBjApUZV2I6RR3_6uRWiwUh7fg53eOlkA6R6KP4MmvcDrOhUDyCF0J0"
          alt="Shamanic healing ritual"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        <div className="relative z-10 px-6 md:px-12 pb-12 max-w-7xl mx-auto w-full">
          <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary-container mb-3 block">
            Energy Work
          </span>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Shamanic Healing
          </h1>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-3xl mx-auto text-center">
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-6">
          What Is Energy Healing?
        </h2>
        <p className="font-body text-on-surface-variant text-lg md:text-xl leading-relaxed mb-4">
          Sometimes what you&apos;re carrying isn&apos;t just physical &mdash; it&apos;s energetic, emotional, spiritual.
        </p>
        <p className="font-body text-on-surface-variant text-base leading-relaxed mb-4">
          Leah&apos;s healing sessions work with energy, spirit, sound, herbs, drums, rattles, and breathwork to shift what&apos;s stuck, release what&apos;s heavy, and bring you back to balance. Whether it&apos;s a gentle Rebalance or a full Deep Release with shamanic tools, each session meets you exactly where you are.
        </p>
        <p className="font-body text-on-surface-variant text-base leading-relaxed">
          No special beliefs needed &mdash; just come as you are. Leah creates a warm, safe space where you can let go and receive what you need.
        </p>
      </section>

      {/* ── Treatment Cards ── */}
      <section className="pb-20 md:pb-28 px-6 md:px-12 max-w-3xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
            Offerings
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">
            Shamanic Sessions
          </h2>
        </div>

        {treatments.map((treatment) => (
          <div
            key={treatment.name}
            className="bg-surface-container-low rounded-xl p-8 md:p-10 shadow-sm"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  {treatment.icon}
                </span>
              </div>
              <div>
                <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface">
                  {treatment.name}
                </h3>
              </div>
            </div>
            <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
              {treatment.description}
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-surface-container rounded-full px-4 py-2 text-sm font-body">
                <span className="font-bold text-on-surface">{treatment.price}</span>
                <span className="text-on-surface-variant ml-1.5">{treatment.duration}</span>
              </span>
            </div>
            <a
              href="https://bookwithboo.setmore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all duration-300"
            >
              Book This Session
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        ))}
      </section>

      {/* ── Signature Experiences ── */}
      <section className="pb-20 md:pb-28 px-6 md:px-12 max-w-3xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
            The Full Experience
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">
            Signature Experiences
          </h2>
          <p className="font-body text-on-surface-variant text-base leading-relaxed mt-4 max-w-xl mx-auto">
            Massage meets healing. These combined sessions are for when you want to go all in on feeling like yourself again.
          </p>
        </div>

        {signatureExperiences.map((treatment) => (
          <div
            key={treatment.name}
            className="bg-surface-container-low rounded-xl p-8 md:p-10 shadow-sm"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  {treatment.icon}
                </span>
              </div>
              <div>
                <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface">
                  {treatment.name}
                </h3>
              </div>
            </div>
            <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
              {treatment.description}
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-surface-container rounded-full px-4 py-2 text-sm font-body">
                <span className="font-bold text-on-surface">{treatment.price}</span>
                <span className="text-on-surface-variant ml-1.5">{treatment.duration}</span>
              </span>
            </div>
            <a
              href="https://bookwithboo.setmore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all duration-300"
            >
              Book This Experience
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        ))}
      </section>

      {/* ── Botanical Divider ── */}
      <div className="botanical-divider my-2" />

      {/* ── How a Session Works ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
            The Process
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">
            How a Session Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {timelineSteps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              {/* Connector line for desktop */}
              {i < timelineSteps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px bg-outline-variant/40" />
              )}
              <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-sm relative z-10">
                {i + 1}
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  {step.icon}
                </span>
              </div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-3">
                {step.title}
              </h3>
              <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Is This Right for You? ── */}
      <section className="py-20 md:py-28 bg-surface-container-low">
        <div className="px-6 md:px-12 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
              Signs &amp; Guidance
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">
              Is This Right for You?
            </h2>
            <p className="font-body text-on-surface-variant text-base leading-relaxed mt-4">
              Shamanic healing may be what you&apos;re looking for if any of these resonate:
            </p>
          </div>

          <ul className="space-y-4">
            {signs.map((sign) => (
              <li
                key={sign}
                className="flex items-start gap-3 bg-surface rounded-lg p-4 shadow-sm"
              >
                <span
                  className="material-symbols-outlined text-secondary text-[20px] mt-0.5 shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span className="font-body text-on-surface-variant text-sm leading-relaxed">
                  {sign}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28">
        <div className="px-6 md:px-12 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
              Common Questions
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-surface-container-low rounded-xl shadow-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-headline text-base font-bold text-on-surface hover:text-primary transition-colors list-none">
                  {faq.question}
                  <span className="material-symbols-outlined text-[20px] text-outline group-open:rotate-180 transition-transform duration-300 shrink-0 ml-4">
                    expand_more
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-primary-container py-16 md:py-20">
        <div className="px-6 md:px-12 max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-secondary-container mb-4">
            Ready to Feel Like Yourself Again?
          </h2>
          <p className="font-body text-on-primary-container/80 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            If you&apos;re feeling called to this work, trust that feeling. Book your session with Leah today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://bookwithboo.setmore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary-container text-on-secondary-container px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:brightness-110 transition-all duration-300 active:scale-95 inline-block"
            >
              Book Now
            </a>
            <a
              href="https://wa.me/447425018335"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-on-primary-container/30 text-on-primary-container px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:bg-on-primary-container/10 transition-all duration-300 active:scale-95 inline-block"
            >
              Message Leah
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
