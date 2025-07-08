import { NextRequest, NextResponse } from 'next/server';
import { trackOpen, trackClick } from '@/services/emailService';

export async function POST(req: NextRequest) {
  const payload = await req.json();
  if (payload.event === 'open') {
    await trackOpen(payload.emailId);
  }
  if (payload.event === 'click') {
    await trackClick(payload.emailId, payload.url);
  }
  return NextResponse.json({ received: true });
}
