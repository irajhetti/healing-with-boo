import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Notice",
  description:
    "What cookies Healing with Boo sets, why, and how to manage them. Spoiler: barely any.",
};

export default function CookiesPage() {
  return (
    <div className="bg-surface">
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-3xl mx-auto">
        <h1 className="font-headline text-3xl md:text-4xl font-medium text-on-surface mb-4">
          Cookie Notice
        </h1>
        <p className="text-on-surface-variant text-sm mb-12">
          Last updated: 28 April 2026
        </p>

        <div className="space-y-10 text-on-surface text-base leading-relaxed font-body">
          <section>
            <p>
              We try to keep this site as quiet as possible — no marketing
              pixels, no analytics, no ad networks. Here&apos;s exactly what
              we do set, when, and why.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Cookies we set on this site
            </h2>
            <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/20">
              <p className="font-mono text-sm text-on-surface mb-2">
                __Secure-authjs.session-token
              </p>
              <p className="text-sm text-on-surface-variant">
                <strong>Purpose:</strong> keeps you logged in to your member
                account.
                <br />
                <strong>When set:</strong> only after you sign in.
                <br />
                <strong>Lifetime:</strong> 30 days.
                <br />
                <strong>Type:</strong> strictly necessary — required for the
                booking flow to work. No consent needed under UK GDPR.
              </p>
            </div>
            <p className="mt-4 text-on-surface-variant">
              That&apos;s it on our domain. If you never sign in, no cookies
              are set at all.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              What we don&apos;t use
            </h2>
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li>No Google Analytics or any other analytics provider.</li>
              <li>No advertising or remarketing pixels (Facebook, TikTok, Google Ads, etc.).</li>
              <li>No social media tracking widgets.</li>
              <li>No third-party trackers.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              When you pay through Stripe
            </h2>
            <p>
              When you click through to pay for a booking, you&apos;re
              redirected to Stripe&apos;s checkout page on{" "}
              <code className="font-mono text-sm">stripe.com</code>. Stripe
              sets its own cookies on its own domain to handle the payment and
              detect fraud. Those cookies are governed by{" "}
              <a
                href="https://stripe.com/cookies-policy/legal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline"
              >
                Stripe&apos;s cookie policy
              </a>{" "}
              — we have no control over them. Stripe doesn&apos;t set cookies
              on healingwithboo.co.uk.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              Managing cookies
            </h2>
            <p>
              You can clear cookies any time through your browser settings.
              Doing so will sign you out of your account, but won&apos;t affect
              anything else.
            </p>
            <p className="mt-4">
              Most modern browsers also let you block all cookies for a
              specific site. If you do that for this site, you won&apos;t be
              able to sign in or stay signed in to your account, but you can
              still browse and book as a guest.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-medium text-on-surface mb-4">
              See also
            </h2>
            <p>
              For the full picture of what data we collect and why, see our{" "}
              <Link href="/privacy" className="text-secondary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
