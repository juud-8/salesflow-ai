import { NextResponse } from 'next/server';
import { calculateMetrics, DealMetricsInput, ActivityMetricInput } from '@/services/analytics';

export async function GET() {
  const deals: DealMetricsInput[] = [
    { id: '1', created_at: new Date('2024-01-01'), closed_at: new Date('2024-01-10'), value: 1000, status: 'won' },
    { id: '2', created_at: new Date('2024-01-05'), closed_at: new Date('2024-01-20'), value: 500, status: 'lost' },
    { id: '3', created_at: new Date('2024-01-07'), closed_at: new Date('2024-01-17'), value: 700, status: 'won' },
  ];
  const activities: ActivityMetricInput[] = [
    { deal_id: '1', type: 'call', date: new Date() },
    { deal_id: '1', type: 'email', date: new Date() },
    { deal_id: '3', type: 'email', date: new Date() },
  ];
  const metrics = calculateMetrics(deals, activities);
  return NextResponse.json(metrics);
}
