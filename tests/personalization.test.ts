import { describe, it, expect, vi } from 'vitest';

process.env.OPENAI_API_KEY = 'sk-test';

vi.mock('openai', () => ({
  OpenAIApi: class {},
  Configuration: class {},
}));

import { validateEmailAddress, checkSpamScore } from '../services/personalization';

describe('personalization utils', () => {
  it('validates email addresses', () => {
    expect(validateEmailAddress('test@example.com')).toBe(true);
    expect(validateEmailAddress('bad')).toBe(false);
  });

  it('calculates spam score', () => {
    expect(checkSpamScore('This is free money')).toBeGreaterThan(0);
    expect(checkSpamScore('Hello friend')).toBe(0);
  });
});
