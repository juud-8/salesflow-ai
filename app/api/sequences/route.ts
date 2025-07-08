import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const sequenceSchema = z.object({
  name: z.string().min(1),
  steps: z.array(
    z.object({
      template: z.string().min(1),
      delayHours: z.number().min(0),
    })
  ),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = sequenceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  // placeholder - would save to DB
  return NextResponse.json({ message: 'Sequence saved', sequence: parsed.data });
}

export async function GET() {
  // placeholder - would fetch sequences from DB
  return NextResponse.json({ sequences: [] });
}
