"use client";

import React from 'react';
import { Upload, Check } from 'lucide-react';

// Small form primitives shared by the feasibility steps. Structure and sizing
// follow the HMO Designers form; colours and type come from the Thistle system.

export const inputClass =
  'w-full rounded-xl border border-thistle-black/10 bg-white px-4 py-3 text-sm text-thistle-black placeholder:text-thistle-black/25 focus:border-thistle-pink focus:ring-1 focus:ring-thistle-pink/20 outline-none transition-colors';

export const labelClass = 'mb-1.5 block text-xs font-medium text-thistle-black/50';

export const errorClass = 'mt-1.5 block text-xs text-red-700';

export function Field({ label, error, children, plain }: { label: string; error?: string; children: React.ReactNode; plain?: boolean }) {
  // plain: for composite children (tile groups, dropzones with their own
  // <label>). A wrapping <label> would grab the first labelable descendant
  // and break its accessible name, and nested labels are invalid HTML.
  const Tag = plain ? 'div' : 'label';
  return (
    <Tag className="block">
      <span className={labelClass}>{label}</span>
      {children}
      {error && <span className={errorClass}>{error}</span>}
    </Tag>
  );
}

/** Wraps an input with an inline unit adornment (£ prefix / m² suffix). */
export function Adorned({ prefix, suffix, children }: { prefix?: string; suffix?: string; children: React.ReactNode }) {
  return (
    <span className="relative block">
      {prefix && (
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-thistle-black/40">
          {prefix}
        </span>
      )}
      {children}
      {suffix && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-thistle-black/40">
          {suffix}
        </span>
      )}
    </span>
  );
}

export function FileChip({ name }: { name: string }) {
  return (
    <span className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-full border border-thistle-black/10 bg-white px-3 py-1 text-xs text-thistle-black">
      <Check size={12} className="shrink-0 text-thistle-green" strokeWidth={2.5} />
      <span className="truncate">{name}</span>
    </span>
  );
}

export function DropZone({
  accept, multiple, onFile, onFiles, uploading, current, currentList, title, hint, compact,
}: {
  accept: string;
  multiple?: boolean;
  onFile?: (f: File | undefined) => void;
  onFiles?: (l: FileList | null) => void;
  uploading?: boolean;
  current?: string;
  currentList?: string[];
  title: string;
  hint: string;
  compact?: boolean;
}) {
  return (
    <div>
      <label
        className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border border-dashed border-thistle-black/15 bg-white/60 px-6 text-center transition-colors hover:border-thistle-green ${
          compact ? 'py-5' : 'py-8'
        }`}
      >
        <Upload size={20} className="text-thistle-black/40" strokeWidth={1.6} />
        <span className="text-sm text-thistle-black/70">{uploading ? 'Uploading…' : title}</span>
        <span className="text-xs text-thistle-black/40">{hint}</span>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => {
            if (multiple) onFiles?.(e.target.files);
            else onFile?.(e.target.files?.[0]);
            // Allow re-selecting the same file after a failed upload.
            e.target.value = '';
          }}
        />
      </label>
      {current && !uploading && <FileChip name={current} />}
      {currentList && currentList.length > 0 && (
        <ul className="mt-2 space-y-1">
          {currentList.map((n, i) => (
            <li key={i}>
              <FileChip name={n} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
