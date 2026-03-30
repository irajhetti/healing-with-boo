import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shamanic Healing",
  description:
    "Shamanic healing sessions in Boscombe, Bournemouth. Energy clearing, soul retrieval, power animal retrieval, and shamanic journeying from £55 with Leah at Healing with Boo.",
};

const treatments = [
  {
    name: "Energy Clearing",
    description:
      "A gentle yet powerful session to clear stagnant, heavy, or unwanted energies from your field. Using drumming, rattling, and hands-on energy work, Leah moves through your energy body to release blockages and restore a sense of lightness and clarity. Ideal as a first session or whenever you feel weighed down by life.",
    duration: "60 min",
    price: "\u00a355",
    icon: "air",
  },
  {
    name: "Soul Retrieval",
    description:
      "In shamanic understanding, parts of our soul can become separated during traumatic or difficult experiences. Soul retrieval is a sacred ceremony where Leah journeys on your behalf to locate and return these lost soul parts, helping you feel more whole, present, and alive. This is deep, transformative work.",
    duration: "90 min",
    price: "\u00a385",
    icon: "psychology",
  },
  {
    name: "Power Animal Retrieval",
    description:
      "Your power animal is a spirit ally that brings strength, protection, and guidance. Through shamanic journeying, Leah connects with the spirit world to retrieve your power animal and restore this vital relationship. Many clients feel an immediate sense of support and empowerment afterward.",
    duration: "60 min",
    price: "\u00a355",
    icon: "pets",
  },
  {
    name: "Shamanic Journeying",
    description:
      "A guided journey into non-ordinary reality using the steady rhythm of the drum. This session is for those seeking answers, clarity, or a deeper connection to their spiritual path. Leah holds sacred space while you travel with intention, receiving wisdom and healing from the spirit world.",
    duration: "75 min",
    price: "\u00a365",
    icon: "explore",
  },
  {
    name: "Combined Session (Massage + Shamanic)",
    description:
      "The most comprehensive healing experience. This session begins with bodywork to release physical tension and prepare the body, then transitions into shamanic energy work to address the spiritual and emotional layers. Perfect for those seeking deep, holistic transformation on every level.",
    duration: "120 min",
    price: "\u00a395",
    icon: "all_inclusive",
  },
];

const timelineSteps = [
  {
    title: "Consultation",
    description:
      "We begin with a warm conversation about what brought you here, what you\u2019re experiencing, and what you\u2019d like to explore. There\u2019s no judgement \u2014 only listening.",
    icon: "forum",
  },
  {
    title: "Sacred Space",
    description:
      "Leah opens sacred space using traditional practices \u2014 calling in the directions, lighting candles, and setting the intention for your healing. The room becomes a container for deep work.",
    icon: "brightness_7",
  },
  {
    title: "Healing Work",
    description:
      "Using drumming, rattling, song, and hands-on energy work, Leah works with the spirit world on your behalf. You may lie still, drift into a meditative state, or experience visions and sensations.",
    icon: "auto_awesome",
  },
  {
    title: "Integration",
    description:
      "After the healing, Leah shares what she experienced and we discuss what came up for you. She\u2019ll offer guidance for the days ahead to support your integration process.",
    icon: "nest_eco_leaf",
  },
];

const signs = [
  "You feel stuck, disconnected, or like something is missing",
  "You\u2019ve experienced trauma or loss that still affects you",
  "You\u2019re going through a major life transition",
  "You feel drained, heavy, or weighed down without clear cause",
  "You\u2019re curious about your spiritual path and deeper purpose",
  "Physical treatments alone haven\u2019t addressed your full experience",
  "You sense there is healing needed beyond the physical body",
  "You\u2019re ready to reclaim parts of yourself you\u2019ve lost along the way",
];

const faqs = [
  {
    question: "Do I need to believe in shamanism for it to work?",
    answer:
      "Not at all. You don\u2019t need any specific belief system. What matters is your openness to the experience and your willingness to receive. Many clients come with curiosity rather than belief, and still have profoundly meaningful sessions.",
  },
  {
    question: "Is shamanic healing safe?",
    answer:
      "Absolutely. Leah has trained extensively and always works within a protected sacred space. The healing is gentle and non-invasive. You are in control throughout and can stop at any time. Leah\u2019s priority is your safety and comfort.",
  },
  {
    question: "What might I experience during a session?",
    answer:
      "Experiences vary widely. Some clients see vivid imagery or colours, others feel sensations of warmth or tingling, some experience emotional release, and others simply feel deeply relaxed. There is no right or wrong experience \u2014 whatever happens is what needs to happen.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "Some clients experience significant shifts in a single session. Others benefit from a series of sessions to work through deeper layers. Leah will never pressure you into booking more \u2014 she\u2019ll give you an honest recommendation based on your experience.",
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
          What Is Shamanic Healing?
        </h2>
        <p className="font-body text-on-surface-variant text-lg md:text-xl leading-relaxed mb-4">
          Shamanic healing is one of the oldest forms of spiritual healing known to humanity.
        </p>
        <p className="font-body text-on-surface-variant text-base leading-relaxed mb-4">
          It works with the understanding that illness, emotional distress, and a sense of disconnection often have roots in the energetic and spiritual body. Through practices like energy clearing, soul retrieval, and shamanic journeying, we can address these deeper layers &mdash; releasing what no longer serves you and restoring what was lost.
        </p>
        <p className="font-body text-on-surface-variant text-base leading-relaxed">
          Leah approaches this work with deep reverence, warmth, and accessibility. You don&apos;t need any prior experience or special beliefs &mdash; just an open heart and a willingness to explore.
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
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all duration-300"
            >
              Book This Session
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
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
            Ready to Explore Shamanic Healing?
          </h2>
          <p className="font-body text-on-primary-container/80 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            If you&apos;re feeling called to this work, trust that feeling. Book a session or start with a free discovery call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-secondary-container text-on-secondary-container px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:brightness-110 transition-all duration-300 active:scale-95 inline-block"
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="border-2 border-on-primary-container/30 text-on-primary-container px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:bg-on-primary-container/10 transition-all duration-300 active:scale-95 inline-block"
            >
              Book a Free Discovery Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
