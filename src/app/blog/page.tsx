import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MysticalDivider } from "@/components/ui/MysticalDivider";

export const metadata: Metadata = {
  title: "The Divine Grimoire",
  description: "Healing insights, wellness wisdom, and spiritual guidance from Healing with Boo.",
};

const categories = ["All", "Massage", "Shamanic", "Wellness", "Self-Care"];

const blogPosts = [
  {
    slug: "cleansing-your-homes-energy",
    title: "Cleansing Your Home's Energy",
    excerpt: "Learn simple yet powerful techniques to clear stagnant energy from your living space and invite fresh, positive vibrations into your home.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoR8BAXIOFyUVO5b3NwUDIEXGztEPlenFGoR8JnEJXxdd34rci8XrhSpoOeyVBZ0lHf1IE-yYo9GaiwWhok-uPA4lWU28RcELZ8-yl_JMqIZDCekIU8WcRNz5LGNrK75DLoY91PcxPFj_G1YuDwaWgGSTEjEcaV7oaT_WSB-vNrQO65wzMT2nLbIUZinQXbsahbXAnYkagUfgC2xtJZPNBdKPCFSnu9_rm9-fT1DaBQL-CdVhXEfxAZPh1ZvCEmT-FxSY35vEZ8Yg",
    date: "March 22, 2026",
    category: "Shamanic",
  },
  {
    slug: "the-bodys-hidden-language",
    title: "The Body's Hidden Language",
    excerpt: "Your body communicates through tension, discomfort, and pain. Discover what these signals are trying to tell you and how massage therapy can help you listen.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUzN4OYn93LhHTKr1lU7QUFpby-vOQIC_7QYUnYyPur2K4Pdp73QU8uomAYL1YaKUyQvnlrRu0IlgR6ODmzLE8h8FRavav6dwhej0r3DO19MVzbB8jWlniUb3Iv9QQ4mveS0N39kqnoHGdzyjaer4y1IRkAb0GFf45IjpLoyXTgbO5QZ6hrPGBM85HS-ZxfKLaf31CYm3tZDmxG_PkAnpSwKs0U1Ftbv8x_ZuYFConjh9tkTRH6X0jUz2xwtVWjrHbaHXdYRtFxrQ",
    date: "March 15, 2026",
    category: "Massage",
  },
  {
    slug: "working-with-the-lunar-cycles",
    title: "Working with the Lunar Cycles",
    excerpt: "The moon has guided healers for millennia. Learn how to align your self-care practices with the lunar phases for deeper healing and transformation.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCu_pm7CNgTfmllkqLgGpNZpK56Uh7xe0VkU9S-MRmrgPFw8Q-pB0zTMhzq6GeRvphb_AhKCk_-nqvtKlPP7F_SBLzYVdaaR8hgQG8ga4ooUDIv99fLbCJijlzMv2AsXRlsqXAaUuI2cE5dgsL9GPxmASvIF5DvgI4kNr8iYjrl-a8thfPBJoOC9P-r07gDQgoaSadn7D5C3KAz-48kL_L93dDyeNaN4sX9CsEsPUikzKb4jFWXz99usxWUqFv_vc8uKxX3ZIqalmc",
    date: "March 8, 2026",
    category: "Wellness",
  },
  {
    slug: "5-signs-your-body-holds-tension",
    title: "5 Signs Your Body Holds Tension",
    excerpt: "Chronic tension hides in places you might not expect. Here are five common signs that your body is holding onto stress and what you can do about it.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUzN4OYn93LhHTKr1lU7QUFpby-vOQIC_7QYUnYyPur2K4Pdp73QU8uomAYL1YaKUyQvnlrRu0IlgR6ODmzLE8h8FRavav6dwhej0r3DO19MVzbB8jWlniUb3Iv9QQ4mveS0N39kqnoHGdzyjaer4y1IRkAb0GFf45IjpLoyXTgbO5QZ6hrPGBM85HS-ZxfKLaf31CYm3tZDmxG_PkAnpSwKs0U1Ftbv8x_ZuYFConjh9tkTRH6X0jUz2xwtVWjrHbaHXdYRtFxrQ",
    date: "February 28, 2026",
    category: "Self-Care",
  },
  {
    slug: "what-is-shamanic-healing",
    title: "What is Shamanic Healing?",
    excerpt: "A beginner-friendly guide to the ancient practice of shamanic healing, what to expect during a session, and how it can complement modern wellness approaches.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRXSyAU8Oni-kVOzl9L2HYJgaFeY6V0Gb3fQYvv3ZndRBrAhfpQdrd9iVKBH3qrHPvIJASp8zkyuD-thdfRbnWEzsV-XKtTZT7fvDOQzH0_5tvOgDAIVW2E2VmwH5VmKt-Ebb430rv1nBQVialypyM0WOIDMgqGDvs6uXkaaBXqkSPjJoQLPsjQlegUpQE8A6GeZ_CVUe9G22fGI8thVrYfBjApUZV2I6RR3_6uRWiwUh7fg53eOlkA6R6KP4MmvcDrOhUDyCF0J0",
    date: "February 20, 2026",
    category: "Shamanic",
  },
  {
    slug: "self-massage-for-daily-wellness",
    title: "Self-Massage for Daily Wellness",
    excerpt: "Simple self-massage techniques you can do at home to relieve tension, improve circulation, and bring a moment of calm to your busy day.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCac-gzAkYFcSBQpwMVVybCFwF0pdI81MnMzKhCqZY0tbHYPVAy9w5864EdULJR82G8wNzZmyCVC2aBxQ1h_vY-5bAehSvlIEbmWRYa7yf2AltHqK5rMO8t3t8668Le6sD1nV-cpzFqE2rgwhucDUFOWVsOEulu5Pkl1vRi2GwjuitSqC0bdNikfAf-XrZFXw4SszQf-CDwB_CK9GCFBoHSGSbI-oEE5E6vzvyL3JrGZ4Hz5-FAhNCsZvkiEHIo4W9-u3VjEsHD4bc",
    date: "February 12, 2026",
    category: "Self-Care",
  },
];

export default function BlogPage() {
  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="py-16 px-4 text-center">
        <p className="font-label text-sm tracking-widest uppercase text-secondary mb-3">Healing Insights</p>
        <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-4">The Divine Grimoire</h1>
        <p className="text-on-surface-variant max-w-xl mx-auto">
          Wisdom, guidance, and practical tools for your healing journey.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Featured Post */}
        <Link href={`/blog/${featuredPost.slug}`} className="block mb-16 group">
          <div className="relative rounded-2xl overflow-hidden bg-surface-container">
            <div className="md:flex">
              <div className="md:w-3/5 relative h-64 md:h-96">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="md:w-2/5 p-8 md:p-10 flex flex-col justify-center">
                <span className="inline-block bg-primary/10 text-primary text-xs font-label font-medium px-3 py-1 rounded-full w-fit mb-4">
                  {featuredPost.category}
                </span>
                <p className="text-sm text-on-surface-variant mb-3">{featuredPost.date}</p>
                <h2 className="font-headline text-2xl md:text-3xl text-on-surface mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-on-surface-variant leading-relaxed mb-6">{featuredPost.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-secondary font-label font-medium text-sm">
                  Read Story
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full text-sm font-label font-medium transition-colors ${
                cat === "All"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/20 hover:border-outline-variant/50 transition-colors">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-label font-medium text-secondary">{post.category}</span>
                    <span className="text-xs text-outline">|</span>
                    <span className="text-xs text-on-surface-variant">{post.date}</span>
                  </div>
                  <h3 className="font-headline text-lg text-on-surface mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-secondary font-label font-medium text-sm">
                    Read Story
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Newsletter Section */}
        <MysticalDivider />
        <section className="text-center max-w-xl mx-auto">
          <span className="material-symbols-outlined text-secondary text-4xl mb-4 block">mail</span>
          <h2 className="font-headline text-3xl text-on-surface mb-3">Join the Healing Circle</h2>
          <p className="text-on-surface-variant mb-8">
            Receive monthly healing insights, seasonal rituals, and exclusive member content straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-surface-container-lowest border-b-2 border-outline-variant/20 rounded-t-lg focus:border-secondary focus:outline-none transition-colors text-on-surface"
            />
            <button
              type="button"
              className="bg-secondary text-on-secondary font-label font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
