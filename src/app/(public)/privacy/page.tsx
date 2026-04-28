import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Healing with Boo handles your personal data — what we collect, why, where it's stored, and your rights under UK GDPR.",
};

function EditMe({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-yellow-100/70 text-on-surface px-1.5 py-0.5 rounded text-sm">
      [edit me — {children}]
    </mark>
  );
}

export default function PrivacyPage() {
  return (
    <div className="bg-surface">
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-3xl mx-auto">
        <h1 className="font-headline text-3xl md:text-4xl font-medium text-on-surface mb-4">
          Privacy Policy
        </h1>
        <p className="text-on-surface-variant text-sm mb-12">
          Last updated: 28 April 2026
        </p>

        <div className="space-y-10 text-on-surface text-base leading-relaxed font-body">
          <section>
            <p>
              This privacy policy explains how Healing with Boo handles your
              personal data when you book a session, register an account, or
              get in touch through this website. We aim to keep things
              straightforward and only collect what we genuinely need to
              deliver our service.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Who we are
            </h2>
            <p>
              The data controller for personal information collected on this
              website is{" "}
              <EditMe>Leah Cook trading as Healing with Boo (your full legal name if different)</EditMe>
              , based at 22 Churchill Road, Boscombe, BH1 4ES.
            </p>
            <p className="mt-4">
              <span className="text-on-surface-variant">ICO registration number:</span>{" "}
              <EditMe>your ICO number, or remove this line if not registered</EditMe>
            </p>
            <p className="mt-4">
              You can contact us at{" "}
              <a href="mailto:zonedoutbeauty@gmail.com" className="text-secondary hover:underline">
                zonedoutbeauty@gmail.com
              </a>{" "}
              or on +44 7425 018335 with any questions about this policy or
              your data.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              What we collect
            </h2>
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li>Your name, email address, and phone number — when you register an account or book a session as a guest.</li>
              <li>Your booking history (services, dates, prices, any notes you add).</li>
              <li>Optional health and preference notes you choose to share so Leah can tailor your sessions.</li>
              <li>Payment details — handled entirely by Stripe; we never see or store your full card number.</li>
              <li>Your hashed password, if you set up an account (we cannot recover or read it).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Why we collect it
            </h2>
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li>To take and manage your bookings.</li>
              <li>To send confirmation, reminder, and cancellation emails.</li>
              <li>To prepare for your sessions safely (preferences, contraindications).</li>
              <li>To meet HMRC&apos;s record-keeping requirements as a UK business.</li>
            </ul>
            <p className="mt-4 text-on-surface-variant">
              The legal basis is <em>contract</em> (we need this data to provide the
              service you booked) and <em>legal obligation</em> (tax and insurance
              record-keeping).
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Where it&apos;s stored, and who we share it with
            </h2>
            <p>
              Your data lives in our own self-hosted PostgreSQL database; we
              don&apos;t use third-party booking platforms. The only services
              that touch your data are:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2 mt-4">
              <li><strong>Stripe</strong> — to process card payments. Stripe is PCI-compliant and stores its own copy of payment data under their privacy policy.</li>
              <li><strong>Resend</strong> — to send you booking confirmation and reminder emails. Your email address is processed for delivery only.</li>
            </ul>
            <p className="mt-4">
              We never sell, rent, or trade your personal information. We will
              only share data when legally required (e.g., a court order).
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              How long we keep it
            </h2>
            <p>
              We keep booking and client records for <strong>six years</strong>{" "}
              after your last interaction, in line with UK tax and professional
              insurance requirements. After that, we delete or anonymise the
              records.
            </p>
            <p className="mt-4">
              You can ask us to delete your data sooner — see your rights
              below. Where we have a legal obligation to keep records, we will
              minimise what we hold rather than delete entirely until the
              retention period ends.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Your rights
            </h2>
            <p>Under UK GDPR you have the right to:</p>
            <ul className="list-disc list-outside pl-5 space-y-2 mt-4">
              <li>See a copy of the personal data we hold about you.</li>
              <li>Correct anything that&apos;s wrong.</li>
              <li>Ask us to delete your data (subject to the retention rules above).</li>
              <li>Restrict or object to certain uses of your data.</li>
              <li>Receive a copy of your data in a portable format.</li>
            </ul>
            <p className="mt-4">
              To exercise any of these, just email{" "}
              <a href="mailto:zonedoutbeauty@gmail.com" className="text-secondary hover:underline">
                zonedoutbeauty@gmail.com
              </a>
              . We&apos;ll respond within one calendar month.
            </p>
            <p className="mt-4">
              If you&apos;re unhappy with how we handle your data, you can also
              complain to the{" "}
              <a
                href="https://ico.org.uk/make-a-complaint/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline"
              >
                Information Commissioner&apos;s Office
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Cookies
            </h2>
            <p>
              We only set one cookie on this site — a session cookie used to
              keep you logged into your account. We don&apos;t use any
              analytics, advertising, or tracking cookies. See the{" "}
              <Link href="/cookies" className="text-secondary hover:underline">
                Cookie Notice
              </Link>{" "}
              for details.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Changes to this policy
            </h2>
            <p>
              If we make significant changes we&apos;ll update this page and
              the &quot;Last updated&quot; date at the top. For minor wording
              tweaks, we&apos;ll just update the date.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
