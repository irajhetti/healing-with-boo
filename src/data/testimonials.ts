// ──────────────────────────────────────────────
// TESTIMONIALS — Leah, add your reviews here!
//
// To add a new review, copy one of the objects
// below and fill in your client's details.
// Set featured: true for longer reviews you
// want highlighted at the top of the page.
// ──────────────────────────────────────────────

export interface Testimonial {
  name: string;
  treatment: string;
  rating: number; // 1–5
  text: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  // ── Featured reviews (shown larger at top) ──
  {
    name: "Sarah Jenkins",
    treatment: "Shamanic Healing",
    rating: 5,
    text: "Working with Leah was one of the most profound experiences of my life. I came in feeling disconnected and anxious after a difficult year, not really knowing what to expect from shamanic healing. From the moment I walked in, the space felt warm and sacred. Leah took the time to understand my journey and created a session that felt deeply personal. During the energy clearing, I felt layers of grief and tension releasing that I had been carrying for years without realising. Afterwards, I felt lighter, clearer, and more like myself than I had in a very long time. I have since returned for three more sessions, and each one has revealed something new. I cannot recommend Leah and Healing with Boo highly enough.",
    featured: true,
  },
  {
    name: "David Thompson",
    treatment: "Deep Tissue Massage",
    rating: 5,
    text: "As someone who works at a desk all day, chronic neck and shoulder tension had become my normal. I had tried several massage therapists before but never experienced anything like a session with Leah. Her deep tissue work is incredibly skilled — she finds tension in places I did not even know existed. But what sets her apart is the intentionality behind every movement. It is not just a massage; it feels like a complete reset for the body and mind. After my first session, I could turn my neck freely for the first time in months. I now book regular monthly sessions and the improvement in my posture, sleep, and overall wellbeing has been remarkable. If you are looking for someone who truly understands the body, Leah is the one.",
    featured: true,
  },

  // ── Regular reviews ──
  {
    name: "Emma Richardson",
    treatment: "Relaxation Massage",
    rating: 5,
    text: "Absolute bliss from start to finish. The space is so peaceful and Leah has the most calming presence. I left feeling like I was floating.",
  },
  {
    name: "James Hartwell",
    treatment: "Soul Retrieval",
    rating: 5,
    text: "I was sceptical going in but kept an open mind. The session was transformative. Things that had been weighing on me for years finally felt resolved. Leah is incredibly gifted at what she does.",
  },
  {
    name: "Priya Patel",
    treatment: "Hot Stone Massage",
    rating: 5,
    text: "The hot stone massage was heavenly. Leah is attentive to every detail and the combination of heat and pressure melted away all my tension. I have already booked my next one.",
  },
  {
    name: "Michael Chen",
    treatment: "Energy Clearing",
    rating: 4,
    text: "Very interesting experience. I felt a noticeable shift in my energy after the session. Leah explained everything clearly and made me feel completely comfortable throughout.",
  },
  {
    name: "Rachel Morgan",
    treatment: "Combined Session",
    rating: 5,
    text: "The combined massage and shamanic session was exactly what I needed. Leah has a rare gift for holding space while working with both the physical and energetic body. I felt entirely held and cared for. Life changing.",
  },
  {
    name: "Oliver Woods",
    treatment: "Therapeutic Massage",
    rating: 5,
    text: "I have been seeing Leah for therapeutic massage for about six months now. My chronic lower back pain has improved dramatically. She takes the time to understand what my body needs each visit.",
  },
  {
    name: "Sophie Turner",
    treatment: "Shamanic Journey",
    rating: 5,
    text: "My shamanic journey session opened doorways I didn't know existed. Leah guided me with such gentleness and wisdom. I came away with clarity and a deep sense of peace that has stayed with me.",
  },
  {
    name: "Daniel Okafor",
    treatment: "Deep Tissue Massage",
    rating: 5,
    text: "Best deep tissue massage I have ever had, hands down. Leah works with incredible precision and intuition. My shoulders have never felt this free.",
  },
];

// ── Homepage preview picks (first 3 non-featured) ──
export const homepageTestimonials = [
  {
    name: "Sarah M.",
    text: "Leah has the most incredible healing hands. After my deep tissue session, tension I\u2019d carried for years simply dissolved. I felt like a completely new person.",
    rating: 5,
  },
  {
    name: "James R.",
    text: "I was sceptical about shamanic healing, but Leah created such a safe and sacred space that I was able to fully let go. The experience was profoundly transformative.",
    rating: 5,
  },
  {
    name: "Emily T.",
    text: "The combined massage and energy work session was unlike anything I\u2019ve ever experienced. Leah\u2019s intuition and skill are truly remarkable. I\u2019ve found my healer.",
    rating: 5,
  },
];
