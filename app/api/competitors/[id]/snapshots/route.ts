import { NextResponse } from 'next/server';

export async function GET() {
  // placeholder - would fetch snapshots from DB
  return NextResponse.json({ snapshots: [] });
}

