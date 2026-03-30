import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what our clients say about their healing experiences at Healing with Boo.",
};

const filters = ["All", "Massage", "Shamanic", "Combined"];

const featuredTestimonials = [
  {
    name: "Sarah Jenkins",
    treatment: "Shamanic Healing",
    rating: 5,
    text: "Working with Leah was one of the most profound experiences of my life. I came in feeling disconnected and anxious after a difficult year, not really knowing what to expect from shamanic healing. From the moment I walked in, the space felt warm and sacred. Leah took the time to understand my journey and created a session that felt deeply personal. During the energy clearing, I felt layers of grief and tension releasing that I had been carrying for years without realising. Afterwards, I felt lighter, clearer, and more like myself than I had in a very long time. I have since returned for three more sessions, and each one has revealed something new. I cannot recommend Leah and Healing with Boo highly enough.",
  },
  {
    name: "David Thompson",
    treatment: "Deep Tissue Massage",
    rating: 5,
    text: "As someone who works at a desk all day, chronic neck and shoulder tension had become my normal. I had tried several massage therapists before but never experienced anything like a session with Leah. Her deep tissue work is incredibly skilled — she finds tension in places I did not even know existed. But what sets her apart is the intentionality behind every movement. It is not just a massage; it feels like a complete reset for the body and mind. After my first session, I could turn my neck freely for the first time in months. I now book regular monthly sessions and the improvement in my posture, sleep, and overall wellbeing has been remarkable. If you are looking for someone who truly understands the body, Leah is the one.",
  },
];

const testimonials = [
  { name: "Emma Richardson", treatment: "Relaxation Massage", rating: 5, text: "Absolute bliss from start to finish. The space is so peaceful and Leah has the most calming presence. I left feeling like I was floating." },
  { name: "James Hartwell", treatment: "Soul Retrieval", rating: 5, text: "I was sceptical going in but kept an open mind. The session was transformative. Things that had been weighing on me for years finally felt resolved. Leah is incredibly gifted at what she does." },
  { name: "Priya Patel", treatment: "Hot Stone Massage", rating: 5, text: "The hot stone massage was heavenly. Leah is attentive to every detail and the combination of heat and pressure melted away all my tension. I have already booked my next one." },
  { name: "Michael Chen", treatment: "Energy Clearing", rating: 4, text: "Very interesting experience. I felt a noticeable shift in my energy after the session. Leah explained everything clearly and made me feel completely comfortable throughout." },
  { name: "Rachel Morgan", treatment: "Combined Session", rating: 5, text: "The combined massage and shamanic session was exactly what I needed. Leah has a rare gift for holding space while working with both the physical and energetic body. I felt entirely held and cared for. Life changing." },
  { name: "Oliver Woods", treatment: "Therapeutic Massage", rating: 5, text: "I have been seeing Leah for therapeutic massage for about six months now. My chronic lower back pain has improved dramatically. She takes the time to understand what my body needs each visit." },
  { name: "Sophie Turner", treatment: "Shamanic Journey", rating: 5, text: "My shamanic journey session opened doorways I didn't know existed. Leah guided me with such gentleness and wisdom. I came away with clarity and a deep sense of peace that has stayed with me." },
  { name: "Daniel Okafor", treatment: "Deep Tissue Massage", rating: 5, text: "Best deep tissue massage I have ever had, hands down. Leah works with incredible precision and intuition. My shoulders have never felt this free." },
];

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
        <div className="botanical-divider mb-12" />
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
