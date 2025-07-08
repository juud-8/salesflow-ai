'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

interface Competitor {
  id: number;
  name: string;
  website: string;
}

const mockCompetitors: Competitor[] = [
  { id: 1, name: 'Competitor A', website: 'https://a.com' },
  { id: 2, name: 'Competitor B', website: 'https://b.com' },
];

export default function CompetitorsPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded text-sm"
      >
        <Plus className="w-4 h-4" /> Add Competitor
      </button>
      <ul className="bg-white dark:bg-gray-800 rounded shadow divide-y">
        {mockCompetitors.map((c) => (
          <li key={c.id} className="p-3 flex justify-between">
            <span>{c.name}</span>
            <span className="text-sm text-gray-500">{c.website}</span>
          </li>
        ))}
      </ul>
      <Modal title="Add Competitor" open={open} onOpenChange={setOpen}>
        <p className="text-sm">Add competitor form placeholder.</p>
      </Modal>
    </div>
  );
}
