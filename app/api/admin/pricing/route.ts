import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { plan, price } = await req.json();
  if (!plan || typeof price !== 'number') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  // Placeholder - would update Stripe price or DB
  return NextResponse.json({ message: 'Custom pricing updated' });
}
