'use client';
import React from 'react';

interface Diff {
  field: string;
  before: string;
  after: string;
}

export function ChangeDiffViewer({ diffs }: { diffs: Diff[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr>
          <th className="text-left">Field</th>
          <th className="text-left">Before</th>
          <th className="text-left">After</th>
        </tr>
      </thead>
      <tbody>
        {diffs.map((d) => (
          <tr key={d.field} className="border-t">
            <td>{d.field}</td>
            <td className="text-gray-500">{d.before}</td>
            <td className="text-green-600">{d.after}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

