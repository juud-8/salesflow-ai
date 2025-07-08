import { NextResponse } from 'next/server';

export async function GET() {
  // placeholder - would return email performance metrics
  return NextResponse.json({ opens: 0, clicks: 0, bounces: 0 });
}
