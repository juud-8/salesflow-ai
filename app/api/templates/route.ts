import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const templateSchema = z.object({
  name: z.string().min(1),
  subject: z.string().min(1),
  html: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = templateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  // placeholder - would save to DB
  return NextResponse.json({ message: 'Template created', template: parsed.data });
}

export async function GET() {
  // placeholder - would fetch templates from DB
  return NextResponse.json({ templates: [] });
}
