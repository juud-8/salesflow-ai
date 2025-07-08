'use client';
import useSWR from 'swr';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AnalyticsPage() {
  const { data } = useSWR('/api/analytics/metrics', fetcher);
  const trendData = [
    { month: 'Jan', revenue: 1000 },
    { month: 'Feb', revenue: 1500 },
    { month: 'Mar', revenue: 1800 },
  ];
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Sales Metrics</h2>
      <p className="text-sm">Pipeline Velocity: {data?.pipelineVelocity?.toFixed(2)}</p>
      <p className="text-sm">Win Rate: {data?.winRate?.toFixed(2)}%</p>
      <p className="text-sm">Avg Deal Size: ${data?.averageDealSize?.toFixed(2)}</p>
      <p className="text-sm">Avg Sales Cycle: {data?.averageSalesCycle?.toFixed(1)} days</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
