import { describe, it, expect, vi } from 'vitest';

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: vi.fn().mockResolvedValue({ id: '123' }) };
  },
}));

import { sendTransactionalEmail } from '../services/emailService';

describe('sendTransactionalEmail', () => {
  it('sends email with tags', async () => {
    const res = await sendTransactionalEmail({
      to: ['test@example.com'],
      from: 'noreply@example.com',
      subject: 'Hello',
      html: '<p>Hi</p>',
    });
    expect(res).toEqual({ id: '123' });
  });
});
