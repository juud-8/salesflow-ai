import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createBillingPortalSession } from '@/services/billing';

const bodySchema = z.object({
  customerId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    const session = await createBillingPortalSession(
      parsed.data.customerId,
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
    );
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 });
  }
}
