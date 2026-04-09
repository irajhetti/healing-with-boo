import type { ServiceCategory } from "@prisma/client";

export type ServiceSeed = {
  name: string;
  slug: string;
  category: ServiceCategory;
  description: string;
  duration: number; // minutes
  price: number; // pence
  sortOrder: number;
};

export const SERVICES: ServiceSeed[] = [
  // ── Massage: Deep Tissue ──
  {
    name: "Deep Tissue Massage - 30 min",
    slug: "deep-tissue-massage-30",
    category: "MASSAGE",
    description: "Brutal but releasing and strangely addictive",
    duration: 30,
    price: 3000,
    sortOrder: 1,
  },
  {
    name: "Deep Tissue Massage - 45 min",
    slug: "deep-tissue-massage-45",
    category: "MASSAGE",
    description: "Brutal but releasing and strangely addictive",
    duration: 45,
    price: 4000,
    sortOrder: 2,
  },
  {
    name: "Deep Tissue Massage - 60 min",
    slug: "deep-tissue-massage-60",
    category: "MASSAGE",
    description: "Brutal but releasing and strangely addictive",
    duration: 60,
    price: 5000,
    sortOrder: 3,
  },
  {
    name: "Deep Tissue Massage - 90 min",
    slug: "deep-tissue-massage-90",
    category: "MASSAGE",
    description: "Brutal but releasing and strangely addictive",
    duration: 90,
    price: 7000,
    sortOrder: 4,
  },

  // ── Massage: Calming ──
  {
    name: "Calming Massage - 30 min",
    slug: "calming-massage-30",
    category: "MASSAGE",
    description: "Ideal for hectic nervous systems",
    duration: 30,
    price: 2500,
    sortOrder: 5,
  },
  {
    name: "Calming Massage - 45 min",
    slug: "calming-massage-45",
    category: "MASSAGE",
    description: "Ideal for hectic nervous systems",
    duration: 45,
    price: 3500,
    sortOrder: 6,
  },
  {
    name: "Calming Massage - 60 min",
    slug: "calming-massage-60",
    category: "MASSAGE",
    description: "Ideal for hectic nervous systems",
    duration: 60,
    price: 4500,
    sortOrder: 7,
  },
  {
    name: "Calming Massage - 90 min",
    slug: "calming-massage-90",
    category: "MASSAGE",
    description: "Ideal for hectic nervous systems",
    duration: 90,
    price: 6500,
    sortOrder: 8,
  },

  // ── Massage: Specialist ─��
  {
    name: "Womens Pelvic Health Massage",
    slug: "womens-pelvic-health-massage",
    category: "MASSAGE",
    description:
      "Great for tight hips, post pregnancy, endometriosis, PCOS, scar tissue, PMS",
    duration: 40,
    price: 3700,
    sortOrder: 9,
  },
  {
    name: "Scalp Pressure Ritual",
    slug: "scalp-pressure-ritual",
    category: "MASSAGE",
    description:
      "Face massage with trigger points, great for lymphatic flow, oil hair mask",
    duration: 30,
    price: 2500,
    sortOrder: 10,
  },

  // ── Healing ──
  {
    name: "Chakra Balancing",
    slug: "chakra-balancing",
    category: "HEALING",
    description:
      "Energy healing, bringing in more of what your soul craves",
    duration: 55,
    price: 5500,
    sortOrder: 1,
  },
  {
    name: "Sacred Womb Activation",
    slug: "sacred-womb-activation",
    category: "HEALING",
    description:
      "Hip massage + womb healing to release emotional blockages",
    duration: 75,
    price: 7500,
    sortOrder: 2,
  },
  {
    name: "Shamanic Healing",
    slug: "shamanic-healing",
    category: "HEALING",
    description:
      "Deep spiritual healing with consultation and personalised plan",
    duration: 90,
    price: 9500,
    sortOrder: 3,
  },

  // ── Combined / Signature ──
  {
    name: "Total Chill Out",
    slug: "total-chill-out",
    category: "COMBINED",
    description:
      "Face, neck, scalp massage with energy healing and hand massage",
    duration: 60,
    price: 7000,
    sortOrder: 1,
  },
  {
    name: "Body & Soul Reset - 90 min",
    slug: "body-soul-reset-90",
    category: "COMBINED",
    description:
      "Full body massage + energy healing with spirit, drums, rattles, herbs",
    duration: 90,
    price: 9000,
    sortOrder: 2,
  },
  {
    name: "Body & Soul Reset - 2 hrs",
    slug: "body-soul-reset-120",
    category: "COMBINED",
    description:
      "Full body massage + energy healing with spirit, drums, rattles, herbs",
    duration: 120,
    price: 12000,
    sortOrder: 3,
  },
  {
    name: "Deep Release",
    slug: "deep-release",
    category: "COMBINED",
    description:
      "Spiritual healing, drums, rattles, breathwork + massage",
    duration: 90,
    price: 11500,
    sortOrder: 4,
  },
  {
    name: "The Intentional Pause",
    slug: "the-intentional-pause",
    category: "COMBINED",
    description:
      "3 hours massage + healing with spirit team, drum, rattle, herbs",
    duration: 180,
    price: 16500,
    sortOrder: 5,
  },
];
