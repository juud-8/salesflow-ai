import { NextResponse } from 'next/server';

export async function GET() {
  // placeholder - would fetch change history from DB
  return NextResponse.json({ changes: [] });
}

