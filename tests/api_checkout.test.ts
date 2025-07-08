import { describe, it, expect, vi } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('../services/billing', () => {
  return {
    createCheckoutSession: vi.fn().mockResolvedValue({ url: 'https://pay' }),
  };
});

import { POST } from '../app/api/billing/checkout/route';

describe('POST /api/billing/checkout', () => {
  it('returns checkout url', async () => {
    const request = new Request('http://test', {
      method: 'POST',
      body: JSON.stringify({ priceId: 'price_123' }),
    });
    const req = new NextRequest(request);
    const res = await POST(req);
    const data = await res.json();
    expect(data.url).toBe('https://pay');
  });
});
