'use client';
import React from 'react';

interface TimelineItem {
  date: string;
  description: string;
}

export function CompetitorTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.date} className="bg-white dark:bg-gray-800 p-2 rounded shadow">
          <div className="text-sm text-gray-500">{item.date}</div>
          <div>{item.description}</div>
        </li>
      ))}
    </ul>
  );
}

