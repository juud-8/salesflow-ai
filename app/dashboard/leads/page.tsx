'use client';
import { useState } from 'react';
import { Search, Mail, Phone, Plus } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

interface Lead {
  id: number;
  name: string;
  company: string;
  score: number;
}

const mockLeads: Lead[] = [
  { id: 1, name: 'Alice Johnson', company: 'Acme', score: 92 },
  { id: 2, name: 'Bob Smith', company: 'Beta Inc', score: 75 },
];

export default function LeadsPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Lead | null>(null);
  const filtered = mockLeads.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-2 py-2 border rounded"
            placeholder="Search leads"
          />
        </div>
      </div>
      <table className="w-full text-sm bg-white dark:bg-gray-800 rounded shadow">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Company</th>
            <th className="p-2">Score</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((lead) => (
            <tr key={lead.id} className="border-b last:border-b-0">
              <td className="p-2">{lead.name}</td>
              <td className="p-2">{lead.company}</td>
              <td className="p-2 font-medium">{lead.score}</td>
              <td className="p-2 space-x-2">
                <button className="text-primary" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </button>
                <button className="text-primary" aria-label="Call">
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  className="text-primary"
                  aria-label="Add to sequence"
                  onClick={() => setSelected(lead)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selected && (
        <Modal title={`Add ${selected.name}`} open={!!selected} onOpenChange={() => setSelected(null)}>
          <p className="text-sm">Lead detail modal placeholder.</p>
        </Modal>
      )}
    </div>
  );
}
