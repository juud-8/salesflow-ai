import { describe, it, expect, vi } from 'vitest';
import Stripe from 'stripe';
import { stripe, createCheckoutSession, createBillingPortalSession, verifyWebhookSignature } from '../services/billing';

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
