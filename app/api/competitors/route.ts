import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.name || !data.website) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    // placeholder - would save to DB
    return NextResponse.json({ message: 'Competitor added' });
  } catch {
    return NextResponse.json({ error: 'Failed to add competitor' }, { status: 500 });
  }
}

