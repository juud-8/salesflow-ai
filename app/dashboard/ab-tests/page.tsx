'use client';

const results = [
  { id: 1, name: 'Subject line test', winner: 'Variant A' },
  { id: 2, name: 'Content test', winner: 'Variant B' },
];

export default function ABTestPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">A/B Test Results</h2>
      <ul className="bg-white dark:bg-gray-800 rounded shadow divide-y">
        {results.map((r) => (
          <li key={r.id} className="p-3 flex justify-between">
            <span>{r.name}</span>
            <span className="text-sm text-gray-500">{r.winner}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
