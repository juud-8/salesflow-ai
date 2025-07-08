import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createCheckoutSession } from '@/services/billing';

const bodySchema = z.object({
  priceId: z.string(),
  customerEmail: z.string().email().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    const session = await createCheckoutSession({
      priceId: parsed.data.priceId,
      customerEmail: parsed.data.customerEmail,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
