import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Session",
  description:
    "Book a massage therapy, shamanic healing, or signature session with Boo at Healing with Boo in Boscombe, Bournemouth. Easy online booking via Setmore.",
};

const massageServices = [
  { name: "Deep Tissue Massage", duration: "60 min", price: 55 },
  { name: "Therapeutic Massage", duration: "60 min", price: 50 },
  { name: "Relaxation Massage", duration: "60 min", price: 45 },
  { name: "Hot Stone Massage", duration: "75 min", price: 65 },
];

const healingServices = [
  { name: "Energy Clearing", duration: "60 min", price: 55 },
  { name: "Soul Retrieval", duration: "90 min", price: 85 },
  { name: "Power Animal Retrieval", duration: "60 min", price: 55 },
  { name: "Shamanic Journey", duration: "75 min", price: 65 },
];

const signatureServices = [
  { name: "Combined Healing Session", duration: "120 min", price: 95 },
];

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="py-16 px-4 text-center">
        <p className="font-label text-sm tracking-widest uppercase text-secondary mb-3">
          Appointments
        </p>
        <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-4">
          Book Your Session with Boo
        </h1>
        <p className="text-on-surface-variant max-w-xl mx-auto mb-8">
          Have a look at what&apos;s on offer below, then hit the button to book
          your slot. I use Setmore for all my bookings &mdash; it&apos;s quick
          and easy.
        </p>
        <a
          href="https://bookwithboo.setmore.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-on-primary font-label font-bold px-10 py-4 rounded-full text-base hover:opacity-90 transition-opacity active:scale-95"
        >
          Book on Setmore
        </a>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-20">
        {/* Massage Therapy */}
        <section className="mb-14">
          <h2 className="font-headline text-2xl text-on-surface mb-2">
            Massage Therapy
          </h2>
          <p className="text-on-surface-variant mb-6">
            Hands-on bodywork to release tension, ease pain, and restore flow.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {massageServices.map((service) => (
              <div
                key={service.name}
                className="p-5 rounded-xl border-2 border-outline-variant/30 bg-surface-container-lowest"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-label font-medium text-on-surface">
                      {service.name}
                    </p>
                    <p className="text-sm text-on-surface-variant mt-1">
                      {service.duration}
                    </p>
                  </div>
                  <p className="font-headline text-lg text-primary">
                    &pound;{service.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Healing */}
        <section className="mb-14">
          <h2 className="font-headline text-2xl text-on-surface mb-2">
            Shamanic &amp; Energy Healing
          </h2>
          <p className="text-on-surface-variant mb-6">
            Deep energetic work using shamanic traditions, sound, breathwork, and
            intuition.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {healingServices.map((service) => (
              <div
                key={service.name}
                className="p-5 rounded-xl border-2 border-outline-variant/30 bg-surface-container-lowest"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-label font-medium text-on-surface">
                      {service.name}
                    </p>
                    <p className="text-sm text-on-surface-variant mt-1">
                      {service.duration}
                    </p>
                  </div>
                  <p className="font-headline text-lg text-primary">
                    &pound;{service.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Signature */}
        <section className="mb-14">
          <h2 className="font-headline text-2xl text-on-surface mb-2">
            Signature Sessions
          </h2>
          <p className="text-on-surface-variant mb-6">
            The full experience &mdash; massage and healing woven together in one
            extended session.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {signatureServices.map((service) => (
              <div
                key={service.name}
                className="p-5 rounded-xl border-2 border-outline-variant/30 bg-surface-container-lowest"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-label font-medium text-on-surface">
                      {service.name}
                    </p>
                    <p className="text-sm text-on-surface-variant mt-1">
                      {service.duration}
                    </p>
                  </div>
                  <p className="font-headline text-lg text-primary">
                    &pound;{service.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Book CTA */}
        <section className="text-center mb-16">
          <a
            href="https://bookwithboo.setmore.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary text-on-secondary font-label font-bold px-10 py-4 rounded-full text-base hover:opacity-90 transition-opacity active:scale-95"
          >
            Book Your Session on Setmore
          </a>
        </section>

        {/* Cancellation Policy */}
        <section className="bg-surface-container-low rounded-2xl p-8 md:p-10">
          <h3 className="font-headline text-xl text-on-surface mb-4">
            Cancellation Policy
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            I am always happy to reschedule with enough notice, life is nuts
            sometimes and I fully understand, but getting my business head on, I
            do need to still charge if it&apos;s less than 24 hours notice.
          </p>
        </section>
      </div>
    </div>
  );
}
