import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export interface SendOptions {
  to: string[];
  from: string;
  subject: string;
  html: string;
}

export const emailSchema = z.object({
  to: z.array(z.string().email()),
  from: z.string().email(),
  subject: z.string().min(1),
  html: z.string().min(1),
});

export async function sendTransactionalEmail(options: SendOptions) {
  const parsed = emailSchema.safeParse(options);
  if (!parsed.success) {
    throw new Error('Invalid email options');
  }
  return resend.emails.send({
    ...options,
    tags: ['transactional'],
  });
}

export async function sendBulkCampaign(options: SendOptions) {
  const parsed = emailSchema.safeParse(options);
  if (!parsed.success) {
    throw new Error('Invalid campaign options');
  }
  return resend.emails.send({
    ...options,
    tags: ['campaign'],
  });
}

export async function trackOpen(emailId: string) {
  // Placeholder for open tracking logic
  console.log(`Email opened: ${emailId}`);
}

export async function trackClick(emailId: string, url: string) {
  // Placeholder for click tracking logic
  console.log(`Email ${emailId} clicked: ${url}`);
}

export async function unsubscribe(email: string) {
  // Placeholder for unsubscribe handling
  console.log(`Unsubscribed: ${email}`);
}
