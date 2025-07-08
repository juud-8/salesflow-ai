'use client';
import React from 'react';
import { CompetitorTimeline } from './CompetitorTimeline';

export function CompetitorDashboard() {
  const items = [
    { date: '2024-01-01', description: 'Initial snapshot captured' },
  ];
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Competitor Insights</h2>
      <CompetitorTimeline items={items} />
    </div>
  );
}

