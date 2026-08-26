"use client";

import React from 'react';
import { Reveal } from '../../components/animations/Reveal';
import type { ConversionStat } from '../../data/conversionsData';

/**
 * A figure plus the CMS field ids for its own two fields.
 *
 * Per-item, never per-list: an id taken from the list itself opens an empty
 * form instead of the card that was clicked.
 */
export type OpportunityStat = ConversionStat & {
  tina?: Partial<Record<'label' | 'value', string>>;
};

interface OpportunityProps {
  copy: string;
  stats: OpportunityStat[];
  /**
   * The eyebrow is the same on all five sector pages, so it comes from the
   * Expertise Overview document rather than from each sector's record. Falls
   * back to the standing wording when the page is rendered without the CMS.
   */
  eyebrow?: string;
  /** CMS field ids for this section's own copy. */
  tina?: Partial<Record<'eyebrow' | 'copy', string>>;
}

const EYEBROW_FALLBACK = 'The Opportunity';

// The opportunity section: short framing copy plus three stat cards.
export const Opportunity: React.FC<OpportunityProps> = ({
  copy,
  stats,
  eyebrow = EYEBROW_FALLBACK,
  tina,
}) => (
  <section className="bg-white py-fl-section px-fl-margin">
    <div className="max-w-[1000px] mx-auto">
      <div className="text-center mb-fl-8 max-w-2xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4" data-tina-field={tina?.eyebrow}>{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-fluid-base text-thistle-black/80 leading-relaxed" data-tina-field={tina?.copy}>
            {copy}
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-fl-4">
          {/* Keyed by position rather than by label: the label is a live form
              value in the editor, so keying on it remounts the card on every
              keystroke. The markers go on the two spans, not on the card, which
              is a wrapper — a marker there would swallow clicks on both. */}
          {stats.map((s, i) => (
            <div key={i} className="bg-thistle-white rounded-2xl border border-thistle-black/[0.06] p-fl-6 text-center">
              <span className="block text-[10px] uppercase tracking-widest text-thistle-green font-semibold mb-fl-3" data-tina-field={s.tina?.label}>{s.label}</span>
              <span className="block text-fluid-h3 font-medium tracking-tight text-thistle-black leading-none" data-tina-field={s.tina?.value}>{s.value}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);
