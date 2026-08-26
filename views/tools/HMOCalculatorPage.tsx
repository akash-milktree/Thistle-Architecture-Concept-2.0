"use client";

import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { ToolShell } from '../../components/ui/ToolShell';
import { HMOCalculator, type HmoBand } from '../../sections/tools/HMOCalculator';
import { outcomeCopy } from '../../sections/tools/calcUi';
import { getToolBySlug } from '../../data/toolsData';
import { f, type TinaQuery, EMPTY_QUERY } from '../../lib/tina-fields';
import { str, pruneEmpty } from '../../lib/tina';

/* eslint-disable @typescript-eslint/no-explicit-any */

const tool = getToolBySlug('hmo-calculator');

// The page's own copy is now also in content/tools/hmo-calculator.json, seeded
// byte-for-byte from these literals. They stay here as the fallback so the page
// renders unchanged if it is ever mounted without a CMS query, and so a cleared
// field leaves the standing words up rather than blanking the page.
//
// None of the model is in the CMS. The benchmarks this tool values on — 25%
// operating allowance, 8.5% target yield, £30k per bed — and the 10% / 25% band
// boundaries are all in sections/tools/HMOCalculator.tsx. They are the figures
// our own feasibility documents adopt, and an HMO valuation moves further on a
// yield than on anything a reader types in, so they are not an editor's to
// change.
const FALLBACK = {
  heroHeading: 'What Is The HMO Worth?',
  heroDescription:
    'An HMO is valued on the income it produces, not on what the house next door sold for. Set the room count and rate, and see the indicative value.',
  // The line that keeps an indicative figure from reading as a valuation.
  disclaimer:
    'Indicative numbers only. The room count depends on planning and space standards, which is what a feasibility establishes.',
};

interface HMOCalculatorPageProps {
  /**
   * This page's copy, passed straight through from the server page so that
   * useTina can re-run the query live inside the editor. Optional so the page
   * still renders if it is mounted without it.
   */
  page?: TinaQuery;
}

export const HMOCalculatorPage: React.FC<HMOCalculatorPageProps> = ({ page }) => {
  // useTina returns the server data verbatim on the public site and swaps in
  // the live form values inside the editor. Passing a null-ish query is not
  // allowed, so the hook runs against a stub when the prop is absent and the
  // result is discarded below.
  const { data: live } = useTina(page ?? EMPTY_QUERY);
  const t = page ? (live as any)?.tool : undefined;

  if (!tool) throw new Error('hmo-calculator tool missing from toolsData');

  const c = { ...FALLBACK, ...pruneEmpty({
    heroHeading: str(t?.hero?.heading),
    heroDescription: str(t?.hero?.description),
    disclaimer: str(t?.disclaimer),
  }) };

  return (
    <ToolShell
      tool={tool}
      heroLabel={str(t?.hero?.label) || undefined}
      heroHeading={c.heroHeading}
      heroDescription={c.heroDescription}
      disclaimer={c.disclaimer}
      ctaLabel={str(t?.ctaLabel) || undefined}
      closing={{
        heading: str(t?.closing?.heading),
        headingAccent: str(t?.closing?.headingAccent),
        body: str(t?.closing?.body),
      }}
      tina={{
        label: f(t?.hero, 'label'),
        heading: f(t?.hero, 'heading'),
        description: f(t?.hero, 'description'),
        disclaimer: f(t, 'disclaimer'),
        ctaLabel: f(t, 'ctaLabel'),
        closing: {
          heading: f(t?.closing, 'heading'),
          headingAccent: f(t?.closing, 'headingAccent'),
          body: f(t?.closing, 'body'),
        },
      }}
    >
      <HMOCalculator
        inputsHeading={str(t?.panels?.inputsHeading) || undefined}
        outputsHeading={str(t?.panels?.outputsHeading) || undefined}
        note={str(t?.panels?.note) || undefined}
        bands={outcomeCopy<HmoBand>(t?.outcomes)}
        ctaLabel={str(t?.ctaLabel) || undefined}
        tina={{
          inputsHeading: f(t?.panels, 'inputsHeading'),
          outputsHeading: f(t?.panels, 'outputsHeading'),
          note: f(t?.panels, 'note'),
          ctaLabel: f(t, 'ctaLabel'),
        }}
      />
    </ToolShell>
  );
};
