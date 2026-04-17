"use client";

import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { InlineCTA } from '../components/ui/InlineCTA';

// Styled SVG "mark + wordmark" cards that evoke the real organisation logos.
// These are typographic representations — for launch, swap with licensed official logos.

interface LogoCardProps {
  name: string;
  subtitle?: string;
  glyph: React.ReactNode;
}

const LogoCard: React.FC<LogoCardProps> = ({ name, subtitle, glyph }) => (
  <div className="group bg-white rounded-xl border border-thistle-black/[0.06] h-20 px-5 flex items-center gap-3 hover:border-thistle-green/25 transition-colors">
    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-thistle-black/60 group-hover:text-thistle-green transition-colors">
      {glyph}
    </div>
    <div className="min-w-0">
      <div className="text-[12px] font-semibold tracking-tight text-thistle-black leading-tight truncate">{name}</div>
      {subtitle && <div className="text-[10px] text-thistle-black/40 truncate">{subtitle}</div>}
    </div>
  </div>
);

const sources: LogoCardProps[] = [
  {
    name: "Ordnance Survey",
    subtitle: "Mapping & address",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "HM Land Registry",
    subtitle: "Ownership & title",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <path d="M4 10l8-6 8 6v10H4V10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Environment Agency",
    subtitle: "Flood & ground risk",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <path d="M3 16c2-2 4 0 6 0s4-2 6 0 4 0 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 12c2-2 4 0 6 0s4-2 6 0 4 0 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
        <path d="M3 8c2-2 4 0 6 0s4-2 6 0 4 0 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
  },
  {
    name: "Rightmove",
    subtitle: "Sale comparables",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <path d="M4 11l8-7 8 7v9h-5v-6H9v6H4v-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Historic England",
    subtitle: "Heritage & listings",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <path d="M5 20V10l7-5 7 5v10M8 20v-6h3v6M13 20v-6h3v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Royal Mail",
    subtitle: "Postcode data",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <rect x="3" y="6" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Companies House",
    subtitle: "Company filings",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <rect x="4" y="4" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 10h16M10 10v10M14 10v10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "National Grid",
    subtitle: "Utilities & infra.",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <path d="M12 3l-3 6 3 3 3-3-3-6zM12 12v9M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "MHCLG",
    subtitle: "Housing & planning",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <path d="M4 20V9l8-6 8 6v11M4 20h16M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "London Datastore",
    subtitle: "Open borough data",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Planning Portal",
    subtitle: "Applications feed",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <rect x="5" y="3" width="14" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "ONS",
    subtitle: "Demographic stats",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <path d="M4 20V14M9 20V8M14 20V11M19 20V5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Natural England",
    subtitle: "Protected species",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <path d="M12 3c0 6-4 8-4 12a4 4 0 008 0c0-4-4-6-4-12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "EPC Register",
    subtitle: "Energy performance",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Local Authorities",
    subtitle: "Council licensing",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <path d="M4 21V9M20 21V9M12 21V3M8 21V12M16 21V12M2 21h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export const DataSources: React.FC = () => {
  return (
    <section className="bg-thistle-white py-fl-section px-fl-margin">
      <div className="max-w-[1360px] mx-auto">
        <div className="text-center mb-fl-8 max-w-2xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-3">Data provenance</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-4">
              Powered by 15+ authoritative data sources.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fluid-sm text-thistle-black/55 leading-relaxed">
              Every analysis cross-references the UK's most trusted planning, property and environmental databases. More data means fewer surprises — at every stage.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-fl-3">
            {sources.map((s, i) => (
              <LogoCard key={i} {...s} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-fl-7">
            <InlineCTA label="Start your feasibility" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
