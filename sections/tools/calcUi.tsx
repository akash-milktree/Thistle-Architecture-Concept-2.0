"use client";

import React from 'react';

// Shared presentation bits for the tool calculators. Extracted when the HMO
// calculator was added so the two tools cannot drift apart visually.

export const formatGBP = (n: number) => {
  if (Math.abs(n) >= 1_000_000) return `£${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000) return `£${(n / 1_000).toFixed(0)}k`;
  return `£${Math.round(n)}`;
};

interface NumberInputProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  step?: number;
  onChange: (value: number) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({ label, value, prefix, suffix, step, onChange }) => (
  <label className="block">
    <span className="block text-[10px] uppercase tracking-widest text-thistle-black/40 font-semibold mb-fl-2">{label}</span>
    <span className="relative block">
      {prefix && (
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-thistle-black/40">{prefix}</span>
      )}
      <input
        type="number"
        value={Number.isFinite(value) ? value : ''}
        step={step}
        onChange={(e) => {
          const n = parseFloat(e.target.value);
          onChange(Number.isFinite(n) ? n : 0);
        }}
        className={`w-full border border-thistle-black/10 rounded-xl py-3 text-sm text-thistle-black bg-white focus:border-thistle-pink focus:ring-1 focus:ring-thistle-pink/20 outline-none transition-colors tabular-nums ${
          prefix ? 'pl-8' : 'pl-4'
        } ${suffix ? 'pr-16' : 'pr-4'}`}
      />
      {suffix && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-thistle-black/40">{suffix}</span>
      )}
    </span>
  </label>
);

export const OutputRow: React.FC<{ label: string; value: string; accent?: boolean }> = ({ label, value, accent }) => (
  <div className="flex items-baseline justify-between gap-fl-4 pb-fl-3 border-b border-thistle-black/[0.05] last:border-b-0 last:pb-0">
    <span className="text-fluid-sm text-thistle-black/60">{label}</span>
    <span className={`text-fluid-h5 font-medium tracking-tight tabular-nums ${accent ? 'text-thistle-green' : 'text-thistle-black'}`}>
      {value}
    </span>
  </div>
);
