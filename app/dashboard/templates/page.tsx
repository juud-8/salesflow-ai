'use client';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';

interface Template {
  id: number;
  name: string;
  subject: string;
}

const templates: Template[] = [
  { id: 1, name: 'Welcome', subject: 'Hello {{name}}' },
  { id: 2, name: 'Promo', subject: 'Special offer' },
];

export default function TemplatesPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      <button
        onClick={() => setOpen(true)}
        className="bg-primary text-white px-3 py-1 rounded text-sm"
      >
        New Template
      </button>
      <ul className="bg-white dark:bg-gray-800 rounded shadow divide-y">
        {templates.map((t) => (
          <li key={t.id} className="p-3 flex justify-between">
            <span>{t.name}</span>
            <span className="text-sm text-gray-500">{t.subject}</span>
          </li>
        ))}
      </ul>
      <Modal title="Create Template" open={open} onOpenChange={setOpen}>
        <p className="text-sm">Template editor placeholder.</p>
      </Modal>
    </div>
  );
}
