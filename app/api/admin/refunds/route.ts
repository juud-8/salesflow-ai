import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { subscriptionId, amount } = await req.json();
  if (!subscriptionId || !amount) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  // Placeholder - would call Stripe refunds API
  return NextResponse.json({ message: 'Refund issued' });
}
