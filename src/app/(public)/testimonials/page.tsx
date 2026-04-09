import Link from "next/link";
import type { Metadata } from "next";
import { MysticalDivider } from "@/components/ui/MysticalDivider";
import { testimonials as allTestimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what our clients say about their healing experiences at Healing with Boo.",
};

const filters = ["All", "Massage", "Shamanic", "Combined"];

const featuredTestimonials = allTestimonials.filter((t) => t.featured);
const testimonials = allTestimonials.filter((t) => !t.featured);

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`material-symbols-outlined text-lg ${star <= rating ? "text-secondary" : "text-outline-variant"}`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="py-16 px-4 text-center">
        <p className="font-label text-sm tracking-widest uppercase text-secondary mb-3">What Our Clients Say</p>
        <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-4">Healing Journeys</h1>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="font-headline text-2xl text-on-surface">4.9</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="material-symbols-outlined text-xl text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            ))}
          </div>
          <span className="text-on-surface-variant text-sm">from 50+ clients</span>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-5 py-2 rounded-full text-sm font-label font-medium transition-colors ${
                filter === "All"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Featured Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredTestimonials.map((t) => (
            <div key={t.name} className="bg-surface-container rounded-2xl p-8">
              <StarRating rating={t.rating} />
              <p className="text-on-surface-variant leading-relaxed mt-4 mb-6">{t.text}</p>
              <div>
                <p className="font-label font-medium text-on-surface">{t.name}</p>
                <span className="inline-block bg-primary/10 text-primary text-xs font-label font-medium px-3 py-1 rounded-full mt-2">
                  {t.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 ${
                i === 4 || i === 7 ? "md:col-span-2" : ""
              }`}
            >
              <StarRating rating={t.rating} />
              <p className="text-on-surface-variant leading-relaxed mt-3 mb-4">{t.text}</p>
              <div className="flex items-center justify-between">
                <p className="font-label font-medium text-on-surface text-sm">{t.name}</p>
                <span className="text-xs font-label text-secondary">{t.treatment}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <MysticalDivider />
        <section className="text-center max-w-xl mx-auto">
          <h2 className="font-headline text-3xl text-on-surface mb-3">Experience It Yourself</h2>
          <p className="text-on-surface-variant mb-8">
            Join the growing community of people who have found healing, relief, and transformation with Healing with Boo.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-secondary text-on-secondary font-label font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Book a Session
          </Link>
        </section>
      </div>
    </div>
  );
}
