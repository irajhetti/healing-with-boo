import type { Metadata } from "next";
import Image from "next/image";
import { MysticalDivider } from "@/components/ui/MysticalDivider";
// Link import removed - all booking links now use <a> tags to Setmore

export const metadata: Metadata = {
  title: "Massage Therapy",
  description:
    "Massage therapy in Boscombe, Bournemouth. Deep tissue and calming massage from 30 to 90 minutes, scalp pressure rituals, and pelvic health massage. From \u00a325 with Leah at Healing with Boo.",
};

const treatments = [
  {
    name: "Deep Tissue Massage",
    description:
      "Brutal but releasing and strangely addictive. Tailored to what your body needs.",
    prices: [
      { duration: "30 min", price: "\u00a330" },
      { duration: "45 min", price: "\u00a340" },
      { duration: "60 min", price: "\u00a350" },
      { duration: "90 min", price: "\u00a370" },
    ],
    icon: "fitness_center",
  },
  {
    name: "Calming Massage",
    description:
      "Ideal for hectic nervous systems. Tailored to what your body needs.",
    prices: [
      { duration: "30 min", price: "\u00a325" },
      { duration: "45 min", price: "\u00a335" },
      { duration: "60 min", price: "\u00a345" },
      { duration: "90 min", price: "\u00a365" },
    ],
    icon: "spa",
  },
  {
    name: "Women\u2019s Pelvic Health Massage",
    description:
      "Great for tight hips, post-pregnancy recovery, endometriosis, PCOS, scar tissue, and PMS. During the treatment you\u2019ll be led on each side, face down, and a little bit facing up. If you\u2019re shy you can wear loose shorts over your undies and Leah will cover you as much as possible. Don\u2019t worry \u2014 it\u2019s not half as invasive as a Brazilian wax.",
    prices: [
      { duration: "40 min", price: "\u00a337" },
    ],
    icon: "favorite",
  },
  {
    name: "Scalp Pressure Ritual",
    description:
      "Relaxing face massage mixed with trigger points (can be tender) to ease up tension. Great for lymphatic flow. Oil hair mask is massaged into scalp and hair for you to leave on as long as you wish.",
    prices: [
      { duration: "30 min", price: "\u00a325" },
    ],
    icon: "face_retouching_natural",
  },
];

const steps = [
  {
    title: "Before Your Session",
    icon: "event_note",
    description:
      "Arrive 5\u201310 minutes early to settle in. You\u2019ll have a brief consultation where Leah will ask about your areas of concern, any injuries, and what you\u2019d like to focus on. Wear comfortable clothing \u2014 you\u2019ll undress to your comfort level.",
  },
  {
    title: "During Your Session",
    icon: "self_improvement",
    description:
      "The room is warm, quiet, and held with intention. Leah works intuitively, checking in with you on pressure and adjusting as needed. You\u2019re encouraged to breathe deeply and let your body relax fully. Communication is always welcome.",
  },
  {
    title: "After Your Session",
    icon: "water_drop",
    description:
      "Take your time getting up \u2014 there\u2019s no rush. Drink plenty of water in the hours that follow. Some clients feel immediate relief, while others notice shifts over the next day or two. Gentle movement and rest are recommended.",
  },
];

const faqs = [
  {
    question: "What\u2019s the difference between deep tissue and calming?",
    answer:
      "Deep tissue is more intense \u2014 brutal but releasing and strangely addictive. Calming massage is lighter pressure, ideal for hectic nervous systems. Both are tailored to what your body needs on the day.",
  },
  {
    question: "What is the Women\u2019s Pelvic Health Massage?",
    answer:
      "A 40-minute specialist massage great for tight hips, post-pregnancy recovery, endometriosis, PCOS, scar tissue, and PMS. You\u2019ll be led on each side, face down, and a little facing up. If you\u2019re shy you can wear loose shorts over your undies and Leah will cover you as much as possible. It\u2019s really not half as invasive as a Brazilian wax \u2014 don\u2019t worry.",
  },
  {
    question: "What is the Scalp Pressure Ritual?",
    answer:
      "A 30-minute relaxing face massage mixed with trigger points (can be tender) to ease up tension. Great for lymphatic flow. An oil hair mask is massaged into your scalp and hair for you to leave on as long as you wish.",
  },
  {
    question: "What\u2019s your cancellation policy?",
    answer:
      "Leah is always happy to reschedule with enough notice \u2014 life is nuts sometimes and she fully understands. But she does need to charge if it\u2019s less than 24 hours notice.",
  },
  {
    question: "How do I book?",
    answer:
      "Just pick the treatment and time that works for you. If you\u2019re not sure what to book, message Leah on +447425018335.",
  },
];

export default function MassagePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src="/images/therapeutic-massage.png"
          alt="Therapeutic massage treatment"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        <div className="relative z-10 px-6 md:px-12 pb-12 max-w-7xl mx-auto w-full">
          <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-on-primary-container mb-3 block">
            Body Work
          </span>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Massage Therapy
          </h1>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-3xl mx-auto text-center">
        <p className="font-body text-on-surface-variant text-lg md:text-xl leading-relaxed mb-4">
          Deep to fix, relaxing to soothe or a bit of both &mdash; you pick.
        </p>
        <p className="font-body text-on-surface-variant text-base leading-relaxed">
          Leah&apos;s massage work is personal and tailored to what your body needs on the day. Choose between deep tissue or calming, from a focused 30-minute session to a luxurious 90-minute full body treatment. Every session is different because every body is different.
        </p>
      </section>

      {/* ── Treatment Cards ── */}
      <section className="pb-20 md:pb-28 px-6 md:px-12 max-w-3xl mx-auto space-y-8">
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
                <h2 className="font-headline text-xl md:text-2xl font-bold text-on-surface">
                  {treatment.name}
                </h2>
              </div>
            </div>
            <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
              {treatment.description}
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {treatment.prices.map((p) => (
                <span
                  key={p.duration}
                  className="bg-surface-container rounded-full px-4 py-2 text-sm font-body"
                >
                  <span className="font-bold text-on-surface">{p.price}</span>
                  <span className="text-on-surface-variant ml-1.5">{p.duration}</span>
                </span>
              ))}
            </div>
            <a
              href="/booking"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all duration-300"
            >
              Book This Treatment
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        ))}
      </section>

      {/* ── Botanical Divider ── */}
      <MysticalDivider />

      {/* ── What to Expect ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3 block">
            Your Visit
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface">
            What to Expect
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="bg-surface-container-low rounded-xl p-8 shadow-sm text-center"
            >
              <div className="w-10 h-10 bg-secondary text-on-secondary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-sm">
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

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 bg-surface-container-low">
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
                className="group bg-surface rounded-xl shadow-sm overflow-hidden"
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
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-primary-container mb-4">
            Ready to Release &amp; Restore?
          </h2>
          <p className="font-body text-on-primary-container/80 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Your body is ready to let go. Book your massage session with Leah today.
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
      </section>
    </>
  );
}
