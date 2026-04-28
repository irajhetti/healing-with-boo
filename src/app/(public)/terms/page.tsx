import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms covering bookings, payments, cancellations, and your sessions with Healing with Boo.",
};

function EditMe({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-yellow-100/70 text-on-surface px-1.5 py-0.5 rounded text-sm">
      [edit me — {children}]
    </mark>
  );
}

export default function TermsPage() {
  return (
    <div className="bg-surface">
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-3xl mx-auto">
        <h1 className="font-headline text-3xl md:text-4xl font-medium text-on-surface mb-4">
          Terms of Service
        </h1>
        <p className="text-on-surface-variant text-sm mb-12">
          Last updated: 28 April 2026
        </p>

        <div className="space-y-10 text-on-surface text-base leading-relaxed font-body">
          <section>
            <p>
              These terms cover bookings made through{" "}
              <strong>healingwithboo.co.uk</strong> with Leah Cook trading as
              Healing with Boo. By booking a session you agree to these terms.
              They&apos;re plain-English and only as long as they need to be.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              The service
            </h2>
            <p>
              Massage therapy and shamanic healing sessions are delivered at
              22 Churchill Road, Boscombe, BH1 4ES. Each session is tailored
              to what you need on the day. Leah will check in with you on
              pressure, comfort, and intention throughout.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Booking and payment
            </h2>
            <p>
              You can book online via this site or in person. Online bookings
              are paid via Stripe at the time of booking. Cash bookings are
              available for some sessions and are paid on the day in full.
            </p>
            <p className="mt-4">
              Prices on the website are in pounds sterling and inclusive of
              all applicable taxes. Confirmed bookings receive an email
              confirmation.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Cancellation and rescheduling
            </h2>
            <p>
              Life is unpredictable and Leah is always happy to reschedule
              with reasonable notice. To avoid a charge, please give at least{" "}
              <strong>24 hours&apos; notice</strong> by phone, email, or via
              the contact form.
            </p>
            <p className="mt-4">
              Cancellations made less than 24 hours before the session will be
              charged in full. Online-paid bookings will not be refunded;
              cash-pay bookings will be invoiced for the missed session.
            </p>
            <p className="mt-4">
              If Leah needs to cancel for any reason (illness, emergency), you
              will receive a full refund or your choice of a rescheduled
              session at no extra cost.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Late arrival
            </h2>
            <p>
              If you arrive late, your session will end at the originally
              booked time so the next client isn&apos;t affected. The full
              session price still applies. If you&apos;re running more than 15
              minutes late please call ahead so we can decide together whether
              to reschedule.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Health and safety
            </h2>
            <p>
              Massage and energy work aren&apos;t suitable for every condition.
              Please tell us about any of the following before booking, as
              they may require GP clearance or a different approach:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2 mt-4">
              <li>Pregnancy (especially the first trimester)</li>
              <li>Recent surgery or injuries</li>
              <li>Heart conditions, blood-clotting disorders, or active infections</li>
              <li>Skin conditions or contagious illnesses</li>
              <li>Severe mental health concerns where bodywork could be unsettling</li>
            </ul>
            <p className="mt-4">
              <EditMe>add or remove any conditions specific to your practice</EditMe>
            </p>
            <p className="mt-4">
              These sessions are complementary to medical care, not a
              replacement. If anything Leah notices during a session causes
              concern, she may recommend you see a GP.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Children and consent
            </h2>
            <p>
              Children&apos;s healing sessions are available with the consent
              of a parent or guardian, who must be present throughout. The
              minimum age is{" "}
              <EditMe>your minimum age, e.g. 8</EditMe>.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Conduct
            </h2>
            <p>
              Healing with Boo is a safe space. We reserve the right to refuse
              service or end a session at any time if a client behaves
              inappropriately. The session will still be charged in full in
              that situation.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Liability
            </h2>
            <p>
              Leah is professionally insured and qualified in the disciplines
              she practises. To the extent permitted by law, our liability for
              any claim arising from a session is limited to the price paid for
              that session. Nothing in these terms limits our liability for
              death or personal injury caused by negligence, or for anything
              else that cannot be excluded by law.
            </p>
            <p className="mt-4 text-on-surface-variant text-sm">
              Insurance provider:{" "}
              <EditMe>your insurance provider name (optional to disclose)</EditMe>
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Your data
            </h2>
            <p>
              How we handle your personal information is covered separately in
              our{" "}
              <Link href="/privacy" className="text-secondary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Governing law
            </h2>
            <p>
              These terms are governed by the laws of England and Wales. Any
              disputes will be handled by the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Changes to these terms
            </h2>
            <p>
              We may update these terms occasionally. The version that applies
              to your booking is the one published at the time you book.
              Significant changes will be highlighted by updating the
              &quot;Last updated&quot; date at the top.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
