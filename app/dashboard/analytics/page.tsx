'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AnalyticsPage() {
  const { data } = useSWR('/api/tracking', fetcher);
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Email Performance</h2>
      <p className="text-sm">Opens: {data?.opens}</p>
      <p className="text-sm">Clicks: {data?.clicks}</p>
      <p className="text-sm">Bounces: {data?.bounces}</p>
    </div>
  );
}
