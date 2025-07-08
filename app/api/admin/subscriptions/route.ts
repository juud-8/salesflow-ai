import { NextResponse } from 'next/server';

export async function GET() {
  // Placeholder - would fetch subscriptions from Stripe or DB
  return NextResponse.json({ subscriptions: [] });
}
