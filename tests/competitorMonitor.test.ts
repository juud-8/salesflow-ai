import { describe, it, expect } from 'vitest';
import { detectChanges } from '../services/competitorMonitor';

describe('detectChanges', () => {
  it('detects pricing changes', () => {
    const oldSnap = {
      url: 'https://example.com',
      html: '',
      pricing: ['$10'],
      features: [],
      marketingMessages: [],
      capturedAt: new Date(),
    };
    const newSnap = { ...oldSnap, pricing: ['$15'] };
    const changes = detectChanges(oldSnap, newSnap);
    expect(changes.pricing).toBeDefined();
  });
});

