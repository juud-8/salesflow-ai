import { describe, it, expect, vi, beforeAll } from 'vitest';
import Stripe from 'stripe';

let stripe: Stripe;
let createCheckoutSession: typeof import('../services/billing').createCheckoutSession;
let createBillingPortalSession: typeof import('../services/billing').createBillingPortalSession;
let verifyWebhookSignature: typeof import('../services/billing').verifyWebhookSignature;

beforeAll(async () => {
  process.env.STRIPE_SECRET_KEY = 'sk_test_123';
  const billing = await import('../services/billing');
  stripe = billing.stripe;
  createCheckoutSession = billing.createCheckoutSession;
  createBillingPortalSession = billing.createBillingPortalSession;
  verifyWebhookSignature = billing.verifyWebhookSignature;
});

describe('billing service', () => {
  it('creates checkout session', async () => {
    const spy = vi
      .spyOn(stripe.checkout.sessions, 'create')
      .mockResolvedValue({ url: 'https://test' } as unknown as Stripe.Checkout.Session);
    const session = await createCheckoutSession({
      priceId: 'price_123',
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel',
    });
    expect(session.url).toBe('https://test');
    spy.mockRestore();
  });

  it('creates billing portal session', async () => {
    const spy = vi
      .spyOn(stripe.billingPortal.sessions, 'create')
      .mockResolvedValue({ url: 'https://portal' } as unknown as Stripe.BillingPortal.Session);
    const session = await createBillingPortalSession('cus_123', 'https://example.com');
    expect(session.url).toBe('https://portal');
    spy.mockRestore();
  });

  it('verifies webhook signature failure', () => {
    expect(() => verifyWebhookSignature(Buffer.from(''), 'bad')).toThrow();
  });
});
