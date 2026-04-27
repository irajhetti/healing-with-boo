import type { Metadata } from "next";
import { getServices } from "@/app/(public)/booking/actions";
import { BookingWizard } from "@/app/(public)/booking/_components/BookingWizard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book Your Session",
  description:
    "Book a massage therapy, shamanic healing, or signature session with Boo at Healing with Boo in Boscombe, Bournemouth.",
};

export default async function BookingPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="py-16 px-4 text-center">
        <p className="font-label text-sm tracking-widest uppercase text-secondary mb-3">
          Appointments
        </p>
        <h1 className="font-headline text-3xl md:text-3xl text-on-surface mb-4">
          Book Your Session with Boo
        </h1>
        <p className="text-on-surface-variant max-w-xl mx-auto">
          Choose your service, pick a time that works for you, and
          you&apos;re all set.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-20">
        <BookingWizard services={services} />

        {/* Cancellation Policy */}
        <section className="bg-surface-container-low rounded-2xl p-8 md:p-10 mt-16">
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
