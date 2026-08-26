"use client";

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Reveal } from '../../components/animations/Reveal';
import type { ConversionChallenge } from '../../data/conversionsData';

/** A challenge plus the CMS field ids for its own two fields, per item. */
export type ChallengeItem = ConversionChallenge & {
  tina?: Partial<Record<'title' | 'detail', string>>;
};

interface ChallengesProps {
  typeLabel: string;
  challenges: ChallengeItem[];
  /**
   * Eyebrow and the first line of the heading are the same on all five sector
   * pages, so they come from the Expertise Overview document. The second line
   * is the sector's own name, from its own record.
   */
  eyebrow?: string;
  heading?: string;
  tina?: Partial<Record<'eyebrow' | 'heading' | 'typeLabel', string>>;
}

const EYEBROW_FALLBACK = 'What Is Hard';
const HEADING_FALLBACK = 'The Risks Unique To';

// Type-specific challenges as a vertical list with a small warning indicator.
export const Challenges: React.FC<ChallengesProps> = ({
  typeLabel,
  challenges,
  eyebrow = EYEBROW_FALLBACK,
  heading = HEADING_FALLBACK,
  tina,
}) => (
  <section className="bg-thistle-white py-fl-section px-fl-margin">
    <div className="max-w-[1000px] mx-auto">
      <div className="text-center mb-fl-8 max-w-2xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4" data-tina-field={tina?.eyebrow}>{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          {/* Two fields, two markers, and they are in two different documents:
              the h2 carries the shared first line from the Expertise Overview,
              the green span carries this sector's own name. closest() finds the
              span first for a click on the green words, so each opens the form
              that actually owns it. */}
          <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black" data-tina-field={tina?.heading}>
            {heading}<br /><span className="text-thistle-green" data-tina-field={tina?.typeLabel}>{typeLabel}.</span>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <ul className="rounded-2xl border border-thistle-black/[0.06] bg-white overflow-hidden">
          {/* Keyed by position, not by title: the title is being typed into as
              you watch in the editor, and keying on it would remount the row. */}
          {challenges.map((c, i) => (
            <li key={i} className={`flex items-start gap-fl-4 px-fl-6 py-fl-5 ${i < challenges.length - 1 ? 'border-b border-thistle-black/[0.06]' : ''}`}>
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={16} className="text-amber-500" />
              </div>
              <div>
                <h3 className="text-fluid-h6 font-medium tracking-tight text-thistle-black mb-fl-2" data-tina-field={c.tina?.title}>{c.title}</h3>
                <p className="text-fluid-base text-thistle-black/70 leading-relaxed" data-tina-field={c.tina?.detail}>{c.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);
