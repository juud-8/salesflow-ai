import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/services/billing';

export async function POST(req: NextRequest) {
  const payload = await req.arrayBuffer();
  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  try {
    const event = verifyWebhookSignature(Buffer.from(payload), sig);
    switch (event.type) {
      case 'checkout.session.completed':
        // TODO handle subscription activation
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }
  return NextResponse.json({ received: true });
}
