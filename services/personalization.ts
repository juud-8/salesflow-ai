import { OpenAIApi, Configuration } from 'openai';
import { z } from 'zod';

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

export interface Recipient {
  name: string;
  company?: string;
}

export const recipientSchema = z.object({
  name: z.string().min(1),
  company: z.string().optional(),
});

export async function generateSubjectLine(recipient: Recipient, prompt: string) {
  recipientSchema.parse(recipient);
  const { data } = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You create catchy email subject lines.' },
      { role: 'user', content: `${prompt}\nName: ${recipient.name}` },
    ],
  });
  return data.choices[0]?.message?.content?.trim() ?? '';
}

export async function generateEmailContent(
  recipient: Recipient,
  prompt: string,
  tone: 'formal' | 'casual'
) {
  recipientSchema.parse(recipient);
  const { data } = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: `Write a ${tone} marketing email.` },
      { role: 'user', content: `${prompt}\nName: ${recipient.name}` },
    ],
  });
  return data.choices[0]?.message?.content?.trim() ?? '';
}

export async function generateVariants(
  recipient: Recipient,
  prompt: string,
  tone: 'formal' | 'casual'
) {
  const variantA = await generateEmailContent(recipient, prompt, tone);
  const variantB = await generateEmailContent(recipient, `${prompt} Variation B`, tone);
  return { variantA, variantB };
}

export function validateEmailAddress(email: string) {
  const schema = z.string().email();
  return schema.safeParse(email).success;
}

export function checkSpamScore(content: string) {
  const spamIndicators = ['free money', 'act now'];
  const lowercase = content.toLowerCase();
  let score = 0;
  spamIndicators.forEach((w) => {
    if (lowercase.includes(w)) score += 50;
  });
  return Math.min(score, 100);
}
