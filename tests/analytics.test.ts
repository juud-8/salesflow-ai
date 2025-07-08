import { describe, it, expect } from 'vitest';
import { calculateMetrics } from '../services/analytics';

describe('calculateMetrics', () => {
  it('computes metrics from deals and activities', () => {
    const deals = [
      {
        id: '1',
        created_at: new Date('2024-01-01'),
        closed_at: new Date('2024-01-10'),
        value: 1000,
        status: 'won' as const,
      },
      {
        id: '2',
        created_at: new Date('2024-01-05'),
        closed_at: new Date('2024-01-20'),
        value: 500,
        status: 'lost' as const,
      },
      {
        id: '3',
        created_at: new Date('2024-01-07'),
        closed_at: new Date('2024-01-17'),
        value: 700,
        status: 'won' as const,
      },
    ];
    const activities = [
      { deal_id: '1', type: 'call', date: new Date() },
      { deal_id: '1', type: 'email', date: new Date() },
      { deal_id: '3', type: 'email', date: new Date() },
    ];
    const metrics = calculateMetrics(deals, activities);
    expect(metrics.winRate).toBeCloseTo(66.6, 1);
    expect(metrics.averageDealSize).toBe(850);
    expect(metrics.activityCounts.email).toBe(2);
    expect(metrics.activityCounts.call).toBe(1);
  });
});
