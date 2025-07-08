'use client';
import React from 'react';

interface Props {
  enabled: boolean;
  onChange(enabled: boolean): void;
}

export function AlertPreferences({ enabled, onChange }: Props) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
        className="form-checkbox"
      />
      Receive alerts
    </label>
  );
}

