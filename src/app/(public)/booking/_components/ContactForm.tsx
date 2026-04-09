"use client";

type Props = {
  name: string;
  email: string;
  phone: string;
  notes: string;
  onChange: (field: string, value: string) => void;
};

export function ContactForm({ name, email, phone, notes, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="booking-name"
          className="block font-label text-sm font-medium text-on-surface mb-1.5"
        >
          Full Name *
        </label>
        <input
          id="booking-name"
          type="text"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Your full name"
          className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
          required
        />
      </div>

      <div>
        <label
          htmlFor="booking-email"
          className="block font-label text-sm font-medium text-on-surface mb-1.5"
        >
          Email *
        </label>
        <input
          id="booking-email"
          type="email"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
          required
        />
      </div>

      <div>
        <label
          htmlFor="booking-phone"
          className="block font-label text-sm font-medium text-on-surface mb-1.5"
        >
          Phone Number *
        </label>
        <input
          id="booking-phone"
          type="tel"
          value={phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="07xxx xxxxxx"
          className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
          required
        />
      </div>

      <div>
        <label
          htmlFor="booking-notes"
          className="block font-label text-sm font-medium text-on-surface mb-1.5"
        >
          Notes{" "}
          <span className="text-on-surface-variant font-normal">(optional)</span>
        </label>
        <textarea
          id="booking-notes"
          value={notes}
          onChange={(e) => onChange("notes", e.target.value)}
          placeholder="Anything you'd like Boo to know before your session..."
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
        />
      </div>
    </div>
  );
}
