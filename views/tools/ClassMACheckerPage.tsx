"use client";

import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { ToolShell } from '../../components/ui/ToolShell';
import { EligibilityChecker, type EligibilityVerdict } from '../../sections/tools/EligibilityChecker';
import { outcomeCopy } from '../../sections/tools/calcUi';
import { getToolBySlug } from '../../data/toolsData';
import { f, type TinaQuery, EMPTY_QUERY } from '../../lib/tina-fields';
import { str, pruneEmpty } from '../../lib/tina';

/* eslint-disable @typescript-eslint/no-explicit-any */

const tool = getToolBySlug('class-ma-checker');

// The page's own copy is now also in content/tools/class-ma-checker.json,
// seeded byte-for-byte from these literals. They stay here as the fallback so
// the page renders unchanged if it is ever mounted without a CMS query, and so
// a cleared field leaves the standing words up rather than blanking the page.
//
// Nothing the screener reasons with is in the CMS: the four questions, their
// answer options, and the hard-fail rules are all in
// sections/tools/EligibilityChecker.tsx. The option values are the keys
// computeVerdict() branches on, so an edit there would change the verdict
// rather than the wording — and the reader would have no way to tell.
const FALLBACK = {
  heroHeading: 'Class MA: Does Your Building Qualify?',
  heroDescription:
    'Four quick questions to screen your building against the main Class MA prior-approval tests. Around a minute.',
  // A regulatory caveat, not marketing: it is the line that keeps a free
  // screener from reading as a planning opinion.
  disclaimer: 'This screener is a quick check, not a planning determination. A full feasibility is the final word.',
};

interface ClassMACheckerPageProps {
  /**
   * This page's copy, passed straight through from the server page so that
   * useTina can re-run the query live inside the editor. Optional so the page
   * still renders if it is mounted without it.
   */
  page?: TinaQuery;
}

export const ClassMACheckerPage: React.FC<ClassMACheckerPageProps> = ({ page }) => {
  // useTina returns the server data verbatim on the public site and swaps in
  // the live form values inside the editor. Passing a null-ish query is not
  // allowed, so the hook runs against a stub when the prop is absent and the
  // result is discarded below.
  const { data: live } = useTina(page ?? EMPTY_QUERY);
  const t = page ? (live as any)?.tool : undefined;

  if (!tool) throw new Error('class-ma-checker tool missing from toolsData');

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
      <EligibilityChecker
        verdicts={outcomeCopy<EligibilityVerdict>(t?.outcomes)}
        emailOffer={{ heading: str(t?.emailOffer?.heading), blurb: str(t?.emailOffer?.blurb) }}
        ctaLabel={str(t?.ctaLabel) || undefined}
        tina={{
          ctaLabel: f(t, 'ctaLabel'),
          emailOffer: { heading: f(t?.emailOffer, 'heading'), blurb: f(t?.emailOffer, 'blurb') },
        }}
      />
    </ToolShell>
  );
};
