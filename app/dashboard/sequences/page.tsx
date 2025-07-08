'use client';
import { Plus } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { useState } from 'react';

interface Sequence {
  id: number;
  name: string;
  metric: string;
}

const sequences: Sequence[] = [
  { id: 1, name: 'Welcome', metric: '50% open rate' },
  { id: 2, name: 'Upsell', metric: '30% reply rate' },
];

export default function SequencesPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded text-sm"
      >
        <Plus className="w-4 h-4" /> New Sequence
      </button>
      <ul className="bg-white dark:bg-gray-800 rounded shadow divide-y">
        {sequences.map((s) => (
          <li key={s.id} className="p-3 flex justify-between">
            <span>{s.name}</span>
            <span className="text-sm text-gray-500">{s.metric}</span>
          </li>
        ))}
      </ul>
      <Modal title="Create Sequence" open={open} onOpenChange={setOpen}>
        <p className="text-sm">Create sequence flow placeholder.</p>
      </Modal>
    </div>
  );
}
