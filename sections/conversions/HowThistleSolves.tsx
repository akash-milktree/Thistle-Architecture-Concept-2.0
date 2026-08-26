"use client";

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Reveal } from '../../components/animations/Reveal';
import { deliverableFor } from '../../data/conversionsData';

/**
 * A highlight plus the CMS field id for the one line this page owns.
 *
 * `deliverableId` is a plain string rather than the DeliverableId union,
 * because the same value also arrives from the CMS, where it is a read-only
 * text field. deliverableFor() returns undefined for anything it does not
 * recognise and the card is dropped, rather than pointing at the wrong one.
 */
export type HighlightItem = {
  deliverableId: string;
  forThisType: string;
  tina?: Partial<Record<'forThisType', string>>;
};

interface HowThistleSolvesProps {
  tinted?: boolean;
  typeLabel: string;
  highlights: HighlightItem[];
  /**
   * Eyebrow and the first line of the heading are shared by all five sector
   * pages and come from the Expertise Overview document; the green second line
   * is the sector's own name.
   */
  eyebrow?: string;
  heading?: string;
  tina?: Partial<Record<'eyebrow' | 'heading' | 'typeLabel', string>>;
}

const EYEBROW_FALLBACK = 'How We Solve It';
const HEADING_FALLBACK = 'Built For';

// Type-specific deliverable highlights. For each highlight, render a card with
// the deliverable's canonical title and description (from howItWorksData) plus
// the per-type "for this type" framing line (from the conversion record).
//
// The lookup is by id via deliverableFor(), not by position. It used to be a
// raw index into the deliverables array, which meant reordering that list —
// something an editor can now do — silently repointed every card on every
// sector page at the wrong deliverable.
export const HowThistleSolves: React.FC<HowThistleSolvesProps> = ({
  typeLabel,
  highlights,
  tinted = false,
  eyebrow = EYEBROW_FALLBACK,
  heading = HEADING_FALLBACK,
  tina,
}) => (
  <section className={`${tinted ? 'bg-thistle-white' : 'bg-white'} py-fl-section px-fl-margin`}>
    <div className="max-w-[1360px] mx-auto">
      <div className="text-center mb-fl-8 max-w-2xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4" data-tina-field={tina?.eyebrow}>{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black" data-tina-field={tina?.heading}>
            {heading}<br /><span className="text-thistle-green" data-tina-field={tina?.typeLabel}>{typeLabel}.</span>
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-fl-4">
        {highlights.map((h, i) => {
          const deliverable = deliverableFor(h.deliverableId);
          if (!deliverable) return null;
          return (
            <Reveal key={i} delay={i * 0.08}>
              <div className="bg-thistle-white rounded-2xl border border-thistle-black/[0.06] p-fl-6 h-full flex flex-col">
                <div className="flex items-center gap-fl-3 mb-fl-4">
                  <div className="w-9 h-9 rounded-xl bg-thistle-green/10 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-thistle-green" />
                  </div>
                  {/* The title and description below are the deliverable's own
                      wording, shared with the feasibility package page and
                      edited there. They carry no marker here: this page never
                      loads that document, so a marker would resolve to nothing
                      and still swallow the click. */}
                  <h3 className="text-fluid-h6 font-medium tracking-tight text-thistle-black">{deliverable.title}</h3>
                </div>
                <p className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-4">
                  {deliverable.desc}
                </p>
                <p className="text-fluid-sm text-thistle-black/55 leading-relaxed mt-auto pt-fl-4 border-t border-thistle-black/[0.06]" data-tina-field={h.tina?.forThisType}>
                  {h.forThisType}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
