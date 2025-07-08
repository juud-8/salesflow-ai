import { describe, it, expect, vi } from 'vitest';

vi.mock('openai', () => ({
  OpenAIApi: class {
    createChatCompletion = vi.fn().mockResolvedValue({
      data: { choices: [{ message: { content: 'Hi' } }] },
    });
  },
  Configuration: class {},
}));

import { generateSubjectLine } from '../services/personalization';

describe('generateSubjectLine', () => {
  it('returns trimmed subject', async () => {
    const subject = await generateSubjectLine({ name: 'Bob' }, 'Hello');
    expect(subject).toBe('Hi');
  });
});
