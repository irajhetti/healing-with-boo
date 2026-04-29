"use client";

import { useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

let _stripePromise: Promise<Stripe | null> | null = null;

function getStripePromise() {
  if (_stripePromise) return _stripePromise;
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    console.error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY not set");
    return Promise.resolve(null);
  }
  _stripePromise = loadStripe(key);
  return _stripePromise;
}

const appearance = {
  theme: "night" as const,
  variables: {
    colorPrimary: "#7bc47a",
    colorBackground: "#1a211c",
    colorText: "#e2e8e0",
    colorTextSecondary: "#8a9088",
    colorDanger: "#ffb4ab",
    fontFamily: 'Georgia, "Times New Roman", serif',
    spacingUnit: "4px",
    borderRadius: "10px",
  },
  rules: {
    ".Input": {
      backgroundColor: "#0e1210",
      border: "1px solid #343d32",
    },
    ".Input:focus": {
      border: "1px solid #7bc47a",
      boxShadow: "0 0 0 1px #7bc47a",
    },
    ".Label": {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: "12px",
      letterSpacing: "1px",
      textTransform: "uppercase" as const,
      color: "#a8a89c",
    },
  },
};

export function PaymentForm({
  clientSecret,
  amountLabel,
  onCancel,
}: {
  clientSecret: string;
  amountLabel: string;
  onCancel: () => void;
}) {
  return (
    <Elements
      stripe={getStripePromise()}
      options={{ clientSecret, appearance }}
    >
      <InnerForm amountLabel={amountLabel} onCancel={onCancel} />
    </Elements>
  );
}

function InnerForm({
  amountLabel,
  onCancel,
}: {
  amountLabel: string;
  onCancel: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://healingwithboo.co.uk";

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${baseUrl}/booking/confirmation`,
      },
    });

    // confirmError only fires for client-side or immediate failures.
    // 3DS redirects, success, etc. send the user to return_url.
    if (confirmError) {
      setError(confirmError.message ?? "Payment failed. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/20">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="text-sm text-on-surface-variant hover:text-on-surface px-4 py-2 transition-colors disabled:opacity-50"
        >
          ← Back to details
        </button>
        <button
          type="submit"
          disabled={!stripe || submitting}
          className="bg-secondary text-on-secondary px-8 py-3 rounded-lg font-label font-bold text-sm hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <span className="flex items-center gap-2 justify-center">
              <span className="w-4 h-4 border-2 border-on-secondary/30 border-t-on-secondary rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            `Pay ${amountLabel}`
          )}
        </button>
      </div>

      <p className="text-xs text-on-surface-variant/60 text-center pt-2">
        Payments are secured by Stripe. We never see your card details.
      </p>
    </form>
  );
}
