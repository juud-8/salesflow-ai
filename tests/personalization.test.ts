import { describe, it, expect } from 'vitest';
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
