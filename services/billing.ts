import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY || '';

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2024-04-10',
  typescript: true,
});

export async function createCheckoutSession(options: {
  priceId: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: options.priceId, quantity: 1 }],
    customer_email: options.customerEmail,
    success_url: options.successUrl,
    cancel_url: options.cancelUrl,
  });
  return session;
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

export function verifyWebhookSignature(payload: Buffer, signature: string) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
  return stripe.webhooks.constructEvent(payload, signature, secret);
}
