import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exclusive Content",
  description: "Member-only healing resources, guides, and meditations from Healing with Boo.",
};

const contentItems = [
  {
    type: "Audio",
    icon: "headphones",
    title: "Morning Grounding Meditation",
    description: "A 15-minute guided meditation to ground your energy and set a healing intention for the day. Perfect for beginners and experienced practitioners alike.",
  },
  {
    type: "Guide",
    icon: "menu_book",
    title: "Self-Healing Chakra Guide",
    description: "A comprehensive guide to understanding your seven main chakras, recognising imbalances, and simple techniques to restore energetic flow.",
  },
  {
    type: "Video",
    icon: "play_circle",
    title: "Full Moon Release Ritual",
    description: "Join Leah in this recorded ritual for releasing what no longer serves you. Includes a guided visualisation and journaling prompts.",
  },
  {
    type: "Article",
    icon: "article",
    title: "Herbs for Home Cleansing",
    description: "Discover which herbs to burn, brew, or scatter to cleanse your home of stagnant energy. Includes sourcing tips and safety guidance.",
  },
  {
    type: "Audio",
    icon: "headphones",
    title: "Breathwork for Anxiety",
    description: "A calming breathwork session designed to activate the parasympathetic nervous system and ease feelings of anxiety and overwhelm.",
  },
  {
    type: "Guide",
    icon: "menu_book",
    title: "Seasonal Healing Calendar",
    description: "Align your self-care rituals with the wheel of the year. This guide covers key dates, seasonal herbs, and practices for each phase.",
  },
];

const typeColors: Record<string, string> = {
  Audio: "bg-primary/10 text-primary",
  Guide: "bg-secondary/10 text-secondary",
  Video: "bg-tertiary/10 text-tertiary",
  Article: "bg-primary-fixed text-on-primary-fixed",
};

export default function MembersContentPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="font-headline text-3xl text-on-surface mb-2">Exclusive Content</h1>
      <p className="text-on-surface-variant mb-10">Member-only resources for your healing journey.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contentItems.map((item) => (
          <div
            key={item.title}
            className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 hover:border-outline-variant/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 text-xs font-label font-medium px-3 py-1 rounded-full ${typeColors[item.type] || "bg-surface-container text-on-surface-variant"}`}>
                <span className="material-symbols-outlined text-sm">{item.icon}</span>
                {item.type}
              </span>
            </div>
            <h3 className="font-label font-medium text-on-surface text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-5">{item.description}</p>
            <button className="inline-flex items-center gap-1.5 bg-primary text-on-primary font-label font-medium text-sm px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-base">{item.icon}</span>
              Access
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
