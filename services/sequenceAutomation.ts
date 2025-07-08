import { sendTransactionalEmail } from './emailService';
import { generateEmailContent } from './personalization';

export interface SequenceStep {
  template: string;
  delayHours: number;
}

export interface Sequence {
  id: string;
  name: string;
  steps: SequenceStep[];
}

export async function runSequence(
  sequence: Sequence,
  recipient: { email: string; name: string }
) {
  for (const step of sequence.steps) {
    const content = await generateEmailContent(
      { name: recipient.name },
      step.template,
      'formal'
    );
    await sendTransactionalEmail({
      to: [recipient.email],
      from: 'no-reply@example.com',
      subject: 'Follow up',
      html: content,
    });
    await new Promise((resolve) => setTimeout(resolve, step.delayHours * 3600 * 1000));
  }
}
