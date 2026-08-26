"use client";

import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { ToolShell } from '../../components/ui/ToolShell';
import { GDVCalculator, type ViabilityBand } from '../../sections/tools/GDVCalculator';
import { outcomeCopy } from '../../sections/tools/calcUi';
import { getToolBySlug } from '../../data/toolsData';
import { f, type TinaQuery, EMPTY_QUERY } from '../../lib/tina-fields';
import { str, pruneEmpty } from '../../lib/tina';

/* eslint-disable @typescript-eslint/no-explicit-any */

const tool = getToolBySlug('gdv-calculator');

// The page's own copy is now also in content/tools/gdv-calculator.json, seeded
// byte-for-byte from these literals. They stay here as the fallback so the page
// renders unchanged if it is ever mounted without a CMS query, and so a cleared
// field leaves the standing words up rather than blanking the page.
//
// None of the arithmetic is in the CMS. The starting figures, the build-cost
// assumption and the 10% / 25% band boundaries are all in
// sections/tools/GDVCalculator.tsx, because a rate typed into a content field
// would change a valuation with nothing on the page to say it had changed.
const FALLBACK = {
  heroHeading: 'Do The Numbers Stack Up?',
  heroDescription: 'A quick back-of-envelope viability check. Five inputs, live outputs, sensible defaults to start.',
  // The line that keeps a back-of-envelope figure from reading as a valuation.
  disclaimer: 'Indicative numbers only. A real feasibility models comparables, voids, and risk.',
};

interface GDVCalculatorPageProps {
  /**
   * This page's copy, passed straight through from the server page so that
   * useTina can re-run the query live inside the editor. Optional so the page
   * still renders if it is mounted without it.
   */
  page?: TinaQuery;
}

export const GDVCalculatorPage: React.FC<GDVCalculatorPageProps> = ({ page }) => {
  // useTina returns the server data verbatim on the public site and swaps in
  // the live form values inside the editor. Passing a null-ish query is not
  // allowed, so the hook runs against a stub when the prop is absent and the
  // result is discarded below.
  const { data: live } = useTina(page ?? EMPTY_QUERY);
  const t = page ? (live as any)?.tool : undefined;

  if (!tool) throw new Error('gdv-calculator tool missing from toolsData');

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
      <GDVCalculator
        inputsHeading={str(t?.panels?.inputsHeading) || undefined}
        outputsHeading={str(t?.panels?.outputsHeading) || undefined}
        bands={outcomeCopy<ViabilityBand>(t?.outcomes)}
        ctaLabel={str(t?.ctaLabel) || undefined}
        tina={{
          inputsHeading: f(t?.panels, 'inputsHeading'),
          outputsHeading: f(t?.panels, 'outputsHeading'),
          ctaLabel: f(t, 'ctaLabel'),
        }}
      />
    </ToolShell>
  );
};
