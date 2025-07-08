import { describe, it, expect } from 'vitest';
import { cn } from '../lib/utils';

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('a', undefined, 'b', false && 'c')).toBe('a b');
  });
});
