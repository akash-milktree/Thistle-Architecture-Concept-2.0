"use client";

import React from 'react';
import Link from 'next/link';

// Shared switch between the two Our Work pages. Real links now rather than
// buttons flipping a query param, so each side has its own URL, can be linked
// to, and back and forward behave.
const TABS = [
  { key: 'feasibility', label: 'Feasibility Studies', href: '/case-studies/feasibility-studies' },
  { key: 'projects', label: 'Completed Projects', href: '/case-studies/completed-projects' },
] as const;

export const WorkTabs: React.FC<{ active: 'feasibility' | 'projects' }> = ({ active }) => (
  <div className="flex flex-wrap gap-fl-2">
    {TABS.map((tab) => (
      <Link
        key={tab.key}
        href={tab.href}
        aria-current={active === tab.key ? 'page' : undefined}
        className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors ${
          active === tab.key
            ? 'bg-thistle-black text-white border-thistle-black'
            : 'bg-white text-thistle-black/60 border-thistle-black/[0.08] hover:border-thistle-black/25'
        }`}
      >
        {tab.label}
      </Link>
    ))}
  </div>
);
