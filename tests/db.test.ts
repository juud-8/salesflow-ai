import { describe, it, expect, vi } from 'vitest';

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      user = {
        findUnique: vi.fn().mockResolvedValue({ id: '1', email: 'a@b.com' }),
      };
    },
  };
});

import { getUserByEmail } from '../services/db';

describe('getUserByEmail', () => {
  it('queries user by email', async () => {
    const user = await getUserByEmail('a@b.com');
    expect(user).toEqual({ id: '1', email: 'a@b.com' });
  });
});
