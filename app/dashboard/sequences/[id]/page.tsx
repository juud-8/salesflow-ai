'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SequenceEditor() {
  const router = useRouter();
  const [name, setName] = useState('');
  return (
    <div className="space-y-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Sequence name"
      />
      <button
        onClick={() => router.back()}
        className="bg-primary text-white px-3 py-1 rounded text-sm"
      >
        Save
      </button>
    </div>
  );
}
