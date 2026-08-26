"use client";

import React from 'react';
import { Reveal } from '../../components/animations/Reveal';
import { howItWorksSteps } from '../../data/howItWorksData';
import { pruneEmpty } from '../../lib/tina';

/**
 * One step on the timeline, plus the CMS field ids for that one step.
 */
export interface HowItWorksItem {
  durationLabel: string;
  title: string;
  lead: string;
  detail: string;
  /**
   * Per-item, never per-list: an id taken from the list itself opens an empty
   * form instead of the step that was clicked.
   */
  tina?: Partial<Record<'durationLabel' | 'title' | 'lead' | 'detail', string>>;
}

// Now a fallback rather than this section's only copy: the same strings live in
// content/feasibility/package.json, seeded byte-for-byte from here, and the
// section renders unchanged if it is ever mounted without CMS props.
const HEADER_FALLBACK = {
  eyebrow: 'The Process',
  heading: 'Five Days,',
  headingAccent: 'Five Steps.',
};

interface HowItWorksProps {
  eyebrow?: string;
  heading?: string;
  headingAccent?: string;
  /**
   * All-or-nothing rather than merged step by step: an editor deleting the
   * third step has to be able to delete it, not have it reappear.
   */
  steps?: HowItWorksItem[];
  /** CMS field ids for this section's own copy. */
  tina?: Partial<Record<'eyebrow' | 'heading' | 'headingAccent', string>>;
}

// The five-step process, absorbed from the old How It Works page.
// Vertical timeline: number and duration on the left, narrative on the right.
export const HowItWorks: React.FC<HowItWorksProps> = ({ eyebrow, heading, headingAccent, steps, tina }) => {
  // pruneEmpty: a field the editor has cleared arrives as '' and would blank the
  // heading, so an empty field leaves the standing copy in place.
  const copy = { ...HEADER_FALLBACK, ...pruneEmpty({ eyebrow, heading, headingAccent }) };
  const rows: HowItWorksItem[] = steps?.length ? steps : howItWorksSteps;

  return (
    <section id="how-it-works" className="bg-thistle-white py-fl-section px-fl-margin scroll-mt-24">
      <div className="max-w-[1360px] mx-auto">
        <div className="text-center mb-fl-8 max-w-2xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4" data-tina-field={tina?.eyebrow}>{copy.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.1}>
            {/* Two fields, two markers. The h2 holds the first line, so it
                carries `heading`; the green span holds the second and carries
                its own, and closest() finds the span first for a click on the
                green words. */}
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black" data-tina-field={tina?.heading}>
              {copy.heading}<br /><span className="text-thistle-green" data-tina-field={tina?.headingAccent}>{copy.headingAccent}</span>
            </h2>
          </Reveal>
        </div>

        <div className="max-w-3xl mx-auto">
          {rows.map((step, i) => {
            const isFinal = i === rows.length - 1;
            // Counted rather than typed. It used to be a `num` string on the
            // record, which is one more thing to renumber after a reorder and
            // one more field for an editor to get out of step with the list it
            // labels. Positions 1..5 give exactly the "01".."05" that was there.
            const num = String(i + 1).padStart(2, '0');
            return (
              // Keyed by position rather than by that number, which is derived
              // from the position anyway, and by nothing an editor is typing
              // into: keying on a live form value remounts the row on every
              // keystroke and replays the reveal animation as you type.
              <Reveal key={i} delay={i * 0.06}>
                <div className="relative flex gap-fl-6 pb-fl-7">
                  {/* Rail */}
                  {!isFinal && (
                    <div className="absolute left-[22px] top-12 bottom-0 w-px bg-thistle-black/[0.08]" />
                  )}
                  <div className={`relative z-10 w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-lg font-semibold tabular-nums ${
                    isFinal ? 'bg-thistle-green text-white' : 'bg-thistle-green/10 text-thistle-green'
                  }`}>
                    {num}
                  </div>
                  <div className="pt-1.5">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-thistle-green font-semibold mb-1" data-tina-field={step.tina?.durationLabel}>
                      {step.durationLabel}
                    </span>
                    <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-2" data-tina-field={step.tina?.title}>{step.title}</h3>
                    <p className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-2" data-tina-field={step.tina?.lead}>{step.lead}</p>
                    <p className="text-fluid-sm text-thistle-black/55 leading-relaxed" data-tina-field={step.tina?.detail}>{step.detail}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
