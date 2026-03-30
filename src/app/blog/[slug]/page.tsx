import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title,
    description: `Read about ${title} on The Divine Grimoire — healing insights from Healing with Boo.`,
  };
}

const relatedPosts = [
  {
    slug: "working-with-the-lunar-cycles",
    title: "Working with the Lunar Cycles",
    excerpt: "Learn how to align your self-care practices with the lunar phases for deeper healing.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCu_pm7CNgTfmllkqLgGpNZpK56Uh7xe0VkU9S-MRmrgPFw8Q-pB0zTMhzq6GeRvphb_AhKCk_-nqvtKlPP7F_SBLzYVdaaR8hgQG8ga4ooUDIv99fLbCJijlzMv2AsXRlsqXAaUuI2cE5dgsL9GPxmASvIF5DvgI4kNr8iYjrl-a8thfPBJoOC9P-r07gDQgoaSadn7D5C3KAz-48kL_L93dDyeNaN4sX9CsEsPUikzKb4jFWXz99usxWUqFv_vc8uKxX3ZIqalmc",
    category: "Wellness",
  },
  {
    slug: "what-is-shamanic-healing",
    title: "What is Shamanic Healing?",
    excerpt: "A beginner-friendly guide to the ancient practice of shamanic healing.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRXSyAU8Oni-kVOzl9L2HYJgaFeY6V0Gb3fQYvv3ZndRBrAhfpQdrd9iVKBH3qrHPvIJASp8zkyuD-thdfRbnWEzsV-XKtTZT7fvDOQzH0_5tvOgDAIVW2E2VmwH5VmKt-Ebb430rv1nBQVialypyM0WOIDMgqGDvs6uXkaaBXqkSPjJoQLPsjQlegUpQE8A6GeZ_CVUe9G22fGI8thVrYfBjApUZV2I6RR3_6uRWiwUh7fg53eOlkA6R6KP4MmvcDrOhUDyCF0J0",
    category: "Shamanic",
  },
];

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-surface">
      <article className="max-w-3xl mx-auto px-4 py-16">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors mb-8 font-label text-sm"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-primary/10 text-primary text-xs font-label font-medium px-3 py-1 rounded-full">
            Shamanic
          </span>
          <span className="text-sm text-on-surface-variant">March 22, 2026</span>
          <span className="text-sm text-outline">|</span>
          <span className="text-sm text-on-surface-variant">6 min read</span>
        </div>

        {/* Title */}
        <h1 className="font-headline text-3xl md:text-5xl text-on-surface mb-8 leading-tight">
          {title}
        </h1>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoR8BAXIOFyUVO5b3NwUDIEXGztEPlenFGoR8JnEJXxdd34rci8XrhSpoOeyVBZ0lHf1IE-yYo9GaiwWhok-uPA4lWU28RcELZ8-yl_JMqIZDCekIU8WcRNz5LGNrK75DLoY91PcxPFj_G1YuDwaWgGSTEjEcaV7oaT_WSB-vNrQO65wzMT2nLbIUZinQXbsahbXAnYkagUfgC2xtJZPNBdKPCFSnu9_rm9-fT1DaBQL-CdVhXEfxAZPh1ZvCEmT-FxSY35vEZ8Yg"
            alt={title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Article Body */}
        <div className="prose-custom">
          <p className="text-on-surface-variant leading-relaxed mb-6">
            Every space holds energy. From the moment we wake up until we rest at night, our homes absorb the
            emotions, thoughts, and experiences of everyone who passes through. Over time, this accumulated
            energy can feel heavy, stagnant, or even unsettling. The ancient practice of energy cleansing
            offers a way to clear these invisible layers and restore a sense of peace and vitality to your
            living space.
          </p>

          <p className="text-on-surface-variant leading-relaxed mb-6">
            In shamanic traditions, the home is considered a living entity with its own spirit. When we
            honour this relationship through regular cleansing, we create a sanctuary that supports our
            wellbeing and nurtures our healing journey. Whether you are new to energy work or have been
            practising for years, these techniques can transform your home into a true place of power.
          </p>

          <h2 className="font-headline text-2xl text-primary mb-4 mt-10">Understanding Stagnant Energy</h2>

          <p className="text-on-surface-variant leading-relaxed mb-6">
            Stagnant energy often accumulates in corners, cluttered areas, and rooms where conflict or
            illness has occurred. You might notice it as a heaviness when you enter a room, a persistent
            feeling of unease, or even as physical symptoms like headaches or fatigue when spending time
            in certain spaces. Animals and children, who are naturally more sensitive to subtle energies,
            may avoid these areas or behave differently within them.
          </p>

          <p className="text-on-surface-variant leading-relaxed mb-6">
            The first step in any cleansing practice is awareness. Walk through your home slowly and notice
            how each room makes you feel. Pay attention to areas where you feel resistance, discomfort, or
            a noticeable shift in mood. These are the places that need the most attention.
          </p>

          <blockquote className="border-l-4 border-secondary pl-6 py-2 my-8 italic">
            <p className="text-on-surface leading-relaxed text-lg font-headline">
              &ldquo;The home is a mirror of the soul. When we cleanse our spaces, we are also tending to the
              landscape of our inner world.&rdquo;
            </p>
          </blockquote>

          <h2 className="font-headline text-2xl text-primary mb-4 mt-10">Simple Cleansing Techniques</h2>

          <p className="text-on-surface-variant leading-relaxed mb-6">
            <strong className="text-on-surface">Smoke Cleansing:</strong> Burning dried herbs such as
            rosemary, lavender, or mugwort is one of the most accessible ways to shift energy. Light your
            chosen herb bundle, allow it to smoulder, and carry it through each room. Focus on corners,
            doorways, and windows. As the smoke rises, set an intention for what you wish to release and
            what you wish to invite in.
          </p>

          <p className="text-on-surface-variant leading-relaxed mb-6">
            <strong className="text-on-surface">Sound Clearing:</strong> Sound is a powerful tool for
            breaking up stagnant energy. A simple hand drum, singing bowl, or even clapping can be used
            to move energy through a space. Start at the front door and work your way through each room,
            paying extra attention to corners and closed spaces. The vibrations physically move the air
            and help dislodge any heaviness that has settled.
          </p>

          <p className="text-on-surface-variant leading-relaxed mb-6">
            <strong className="text-on-surface">Salt Purification:</strong> Salt has been used for
            protection and purification across cultures for thousands of years. Place small bowls of sea
            salt in the corners of rooms that feel particularly heavy. Leave them for 24 hours, then
            dispose of the salt in running water (never reuse it). You can also dissolve salt in water
            and use it to wash doorways and window sills.
          </p>

          <h2 className="font-headline text-2xl text-primary mb-4 mt-10">Creating a Regular Practice</h2>

          <p className="text-on-surface-variant leading-relaxed mb-6">
            Energy cleansing is most effective when it becomes a regular practice rather than a one-time
            event. Many traditions recommend cleansing during the new moon, when the energy naturally
            supports release and new beginnings. Seasonal transitions are also powerful times to refresh
            your space, aligning your home with the rhythms of nature.
          </p>

          <p className="text-on-surface-variant leading-relaxed mb-6">
            Remember that intention is the most important element of any cleansing practice. The herbs,
            sounds, and rituals are tools that help focus your intention, but it is your awareness and
            presence that truly transforms the energy of your space. Approach each cleansing with
            reverence, gratitude, and an open heart.
          </p>
        </div>

        {/* Botanical Divider */}
        <div className="botanical-divider my-12" />

        {/* Author Card */}
        <div className="flex items-center gap-5 bg-surface-container rounded-xl p-6 mb-16">
          <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBi6aKf_FpJld2xpDHGvhxbwOmSuGTCPTZgwWcTATIbLh0J6WCvyAjYIbc4ouflCYXQzj6seE-WimwsFfCU8rbQn7saeeFPqNLt0FqjL9oLqekEPJB9nnb65l_zBunItaEYsrOXvcN9rCejgJ-5QLpetm6TFwVqGtw8PNiXOdr-E1CMM30kflkLBs4DQ8TN8wRul5Wto4tJGLhxZt6rnltXmnFY9nnXGmHT1Z4HX44U5mTi0GD00NZ6DMdiRputmG3euAWRZP0gxk"
              alt="Leah"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <p className="font-label font-medium text-on-surface">Leah</p>
            <p className="text-sm text-on-surface-variant">
              Holistic therapist, shamanic practitioner, and founder of Healing with Boo. Leah blends
              ancient wisdom with modern bodywork to create deeply transformative healing experiences.
            </p>
          </div>
        </div>

        {/* Related Posts */}
        <section className="mb-16">
          <h2 className="font-headline text-2xl text-on-surface mb-6">Continue Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/20 hover:border-outline-variant/50 transition-colors">
                  <div className="relative h-40">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-label font-medium text-secondary mb-2 block">{post.category}</span>
                    <h3 className="font-headline text-lg text-on-surface group-hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant line-clamp-2">{post.excerpt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-surface-container rounded-2xl p-10">
          <h2 className="font-headline text-2xl text-on-surface mb-3">Ready to experience healing?</h2>
          <p className="text-on-surface-variant mb-6 max-w-md mx-auto">
            Let the wisdom of these practices come alive through a personal session with Leah.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-secondary text-on-secondary font-label font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Book a Session
          </Link>
        </section>
      </article>
    </div>
  );
}
