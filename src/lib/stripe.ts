import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key, { typescript: true });
}

// Lazy initialization to avoid errors at build time when env vars aren't set
let _stripe: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (!_stripe) {
    _stripe = getStripe();
  }
  return _stripe;
}
