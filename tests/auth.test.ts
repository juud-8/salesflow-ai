import { expect, it, describe } from 'vitest';
import * as z from 'zod';

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    company: z.string().min(1),
    terms: z.literal(true),
  })
  .required();

describe('signup schema', () => {
  it('fails when email invalid', () => {
    const result = schema.safeParse({
      email: 'bad',
      password: '123456',
      company: 'Acme',
      terms: true,
    });
    expect(result.success).toBe(false);
  });

  it('passes with valid data', () => {
    const result = schema.safeParse({
      email: 'test@example.com',
      password: '123456',
      company: 'Acme',
      terms: true,
    });
    expect(result.success).toBe(true);
  });
});
