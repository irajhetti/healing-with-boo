import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Massage Therapy",
  description:
    "Deep tissue, therapeutic, relaxation, and hot stone massage in Boscombe, Bournemouth. Personalised bodywork from £45 with Leah at Healing with Boo.",
};

const treatments = [
  {
    name: "Deep Tissue Massage",
    description:
      "Focused, firm pressure that reaches the deepest layers of muscle and fascia. Ideal for chronic tension, injury recovery, and stubborn knots that won\u2019t release with lighter work. Leah works slowly and intentionally, allowing your body to open at its own pace.",
    prices: [
      { duration: "60 min", price: "\u00a355" },
      { duration: "90 min", price: "\u00a375" },
    ],
    icon: "fitness_center",
  },
  {
    name: "Therapeutic Massage",
    description:
      "A tailored blend of techniques addressing your specific areas of concern. Whether it\u2019s a stiff neck from desk work, lower back tension, or general aches, this session adapts to what your body needs most on the day.",
    prices: [
      { duration: "60 min", price: "\u00a350" },
      { duration: "90 min", price: "\u00a370" },
    ],
    icon: "healing",
  },
  {
    name: "Relaxation Massage",
    description:
      "Long, flowing strokes designed to calm the nervous system and invite deep relaxation. Perfect if you\u2019re feeling overwhelmed, struggling with sleep, or simply need to let go. This is nurturing, gentle bodywork that soothes the soul as much as the muscles.",
    prices: [
      { duration: "60 min", price: "\u00a345" },
      { duration: "90 min", price: "\u00a365" },
    ],
    icon: "spa",
  },
  {
    name: "Hot Stone Massage",
    description:
      "Warm basalt stones are placed on key energy points and used as massage tools to melt away deep-seated tension. The heat penetrates layers of muscle that hands alone can\u2019t reach, creating a profoundly soothing and grounding experience.",
    prices: [
      { duration: "75 min", price: "\u00a365" },
      { duration: "90 min", price: "\u00a385" },
    ],
    icon: "local_fire_department",
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
    question: "Do I need to undress completely?",
    answer:
      "Not at all. You undress to your own comfort level. Leah uses professional draping throughout the session so only the area being worked on is exposed. Your comfort and dignity are always the priority.",
  },
  {
    question: "How often should I have a massage?",
    answer:
      "It depends on your needs. For chronic pain or tension, fortnightly sessions often work well initially. For general maintenance and wellbeing, monthly sessions can keep your body balanced. Leah will recommend a plan tailored to you.",
  },
  {
    question: "Is deep tissue massage painful?",
    answer:
      "Deep tissue work can involve firm pressure, but it should never be unbearable. Leah works within your comfort zone and checks in regularly. There\u2019s a difference between \u2018good pain\u2019 (a satisfying release) and actual discomfort \u2014 you\u2019ll always be in control.",
  },
  {
    question: "Can I book if I\u2019m pregnant?",
    answer:
      "Please get in touch before booking so Leah can discuss your stage of pregnancy and any considerations. Massage can be wonderfully supportive during pregnancy, but certain techniques and positions need to be adapted for your safety and comfort.",
  },
];

export default function MassagePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUzN4OYn93LhHTKr1lU7QUFpby-vOQIC_7QYUnYyPur2K4Pdp73QU8uomAYL1YaKUyQvnlrRu0IlgR6ODmzLE8h8FRavav6dwhej0r3DO19MVzbB8jWlniUb3Iv9QQ4mveS0N39kqnoHGdzyjaer4y1IRkAb0GFf45IjpLoyXTgbO5QZ6hrPGBM85HS-ZxfKLaf31CYm3tZDmxG_PkAnpSwKs0U1Ftbv8x_ZuYFConjh9tkTRH6X0jUz2xwtVWjrHbaHXdYRtFxrQ"
          alt="Massage therapy"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        <div className="relative z-10 px-6 md:px-12 pb-12 max-w-7xl mx-auto w-full">
          <span className="font-label text-[11px] font-bold tracking-[0.2em] uppercase text-secondary-container mb-3 block">
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
          This isn&apos;t a spa experience &mdash; it&apos;s something deeper.
        </p>
        <p className="font-body text-on-surface-variant text-base leading-relaxed">
          Leah&apos;s massage work is personal, intuitive, and deeply therapeutic. She listens to your body with her hands, finding the places where tension, pain, and stress have taken hold. Every session is tailored to you &mdash; because no two bodies carry the same story.
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
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all duration-300"
            >
              Book This Treatment
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        ))}
      </section>

      {/* ── Botanical Divider ── */}
      <div className="botanical-divider my-2" />

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
              <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-sm">
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
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-secondary-container mb-4">
            Ready to Release &amp; Restore?
          </h2>
          <p className="font-body text-on-primary-container/80 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Your body is ready to let go. Book your massage session with Leah today.
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
