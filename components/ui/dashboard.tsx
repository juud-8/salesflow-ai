'use client';
import { useState } from 'react';
import { BarChart3, Mail, Users, TrendingUp, ClipboardList } from 'lucide-react';

export function MetricCards() {
  const metrics = [
    { label: 'Leads Scored', value: 1240, icon: Users },
    { label: 'Emails Sent', value: 3200, icon: Mail },
    { label: 'Deals in Pipeline', value: 86, icon: ClipboardList },
    { label: 'Win Rate', value: '28%', icon: TrendingUp },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map(({ label, value, icon: Icon }) => (
        <div key={label} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center gap-4">
          <Icon className="w-6 h-6 text-primary" />
          <div>
            <div className="text-2xl font-semibold leading-none">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ActivityFeed() {
  const items = [
    'John Doe was added as a lead',
    'Email campaign "Spring Promo" sent',
    'Deal "Acme Corp" moved to Negotiation',
    'Call scheduled with Jane Smith',
  ];
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Recent Activity</h2>
      <ul className="space-y-1 text-sm list-disc pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function PipelineChart() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col items-center justify-center">
      <BarChart3 className="w-24 h-24 text-gray-400" />
      <p className="text-sm text-gray-500 mt-2">Pipeline chart placeholder</p>
    </div>
  );
}

export function SequenceList() {
  const sequences = [
    { name: 'Onboarding Drip', performance: '42% open rate' },
    { name: 'Follow Up', performance: '37% reply rate' },
  ];
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Top Sequences</h2>
      <ul className="space-y-1 text-sm">
        {sequences.map((seq) => (
          <li key={seq.name} className="flex justify-between">
            <span>{seq.name}</span>
            <span className="text-gray-500">{seq.performance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TaskList() {
  const tasks = [
    { label: 'Call with Alice', due: 'Today 3pm' },
    { label: 'Send proposal to Beta Inc', due: 'Tomorrow' },
  ];
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Upcoming Tasks</h2>
      <ul className="space-y-1 text-sm">
        {tasks.map((task) => (
          <li key={task.label} className="flex justify-between">
            <span>{task.label}</span>
            <span className="text-gray-500">{task.due}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
