export interface DealMetricsInput {
  id: string;
  created_at: Date;
  closed_at?: Date;
  value: number;
  status: 'won' | 'lost' | 'open';
}

export interface ActivityMetricInput {
  deal_id: string;
  type: string;
  date: Date;
}

export interface AnalyticsMetrics {
  pipelineVelocity: number;
  winRate: number;
  averageDealSize: number;
  averageSalesCycle: number;
  activityCounts: Record<string, number>;
}

export function calculateMetrics(
  deals: DealMetricsInput[],
  activities: ActivityMetricInput[],
): AnalyticsMetrics {
  const wonDeals = deals.filter((d) => d.status === 'won');
  const lostDeals = deals.filter((d) => d.status === 'lost');

  const cycleLengths = wonDeals
    .filter((d) => d.closed_at)
    .map((d) =>
      (d.closed_at!.getTime() - d.created_at.getTime()) / (1000 * 60 * 60 * 24),
    );
  const averageSalesCycle =
    cycleLengths.length > 0
      ? cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length
      : 0;

  const averageDealSize =
    wonDeals.length > 0
      ? wonDeals.reduce((sum, d) => sum + d.value, 0) / wonDeals.length
      : 0;

  const winRate =
    wonDeals.length + lostDeals.length > 0
      ? (wonDeals.length / (wonDeals.length + lostDeals.length)) * 100
      : 0;

  const pipelineVelocity =
    averageSalesCycle > 0 ? wonDeals.length / averageSalesCycle : 0;

  const activityCounts: Record<string, number> = {};
  activities.forEach((a) => {
    activityCounts[a.type] = (activityCounts[a.type] || 0) + 1;
  });

  return {
    pipelineVelocity,
    winRate,
    averageDealSize,
    averageSalesCycle,
    activityCounts,
  };
}
