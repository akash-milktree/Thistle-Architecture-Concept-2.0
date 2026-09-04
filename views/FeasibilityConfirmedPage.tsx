"use client";

import React from 'react';
import Link from 'next/link';
import { Check, ArrowUpRight } from 'lucide-react';
import { useTina } from 'tinacms/dist/react';
import { CompleteBriefButton } from '../components/feasibility/CompleteBriefButton';
import type { FeasibilityTier } from '../components/feasibility/FeasibilityContext';
import { f, type TinaQuery, EMPTY_QUERY } from '../lib/tina-fields';
import { str, arr, pruneEmpty } from '../lib/tina';

/* eslint-disable @typescript-eslint/no-explicit-any */

// Where Stripe returns someone after a successful payment.
//
// Since Ed's August 2026 final brief this is also where the detailed brief
// unlocks, for both paid tiers: the Architectural Feasibility deposit or the
// Automated Site Feasibility's flat fee, either way the next step is the full
// project brief, with the calculator's answers carried forward.
//
// `tier` (from the Stripe success_url) only selects copy: the payment is
// confirmed by the Stripe webhook, not by the browser arriving here or by which
// tier string is in the URL. Anyone can visit this page with any tier value, so
// it must never be the thing that marks a payment as complete. Making the copy
// editable does not move that line an inch — the CMS supplies two sets of
// words, and code still decides which one is shown.
//
// It was a server component with only the brief button on the client. It is a
// client component now because useTina cannot run on the server, and without
// useTina the editor cannot re-run the query against the live form values, so
// nothing on the page would be clickable to edit. Nothing else about the page
// changed: no data is fetched here, and the payment boundary is where it was.

interface NextStep {
  title: string;
  body: string;
  /**
   * CMS field ids for this one step. Per-item, never per-list: an id taken from
   * the list itself opens an empty form instead of the step clicked.
   */
  tina?: Partial<Record<'title' | 'body', string>>;
}

// Now a fallback rather than this page's only copy: the same strings live in
// content/feasibility/confirmed.json, seeded byte-for-byte from here.
const NEXT_STEPS_FALLBACK: Record<FeasibilityTier, NextStep[]> = {
  architectural: [
    {
      title: 'A receipt from Stripe',
      body: 'In your inbox in the next few minutes, with your deposit amount and reference.',
    },
    {
      title: 'Complete your project brief',
      body: 'The button above opens it. Your calculator answers are carried forward, so nothing is asked twice. This is where you add plans, photos and anything else that defines the building.',
    },
    {
      title: 'A call to validate the brief',
      body: 'Once your brief is in, our team reviews it and books a short call to capture anything the form could not.',
    },
    {
      title: 'Your feasibility in five working days',
      body: 'Sketch scheme, proposed layout, unit and bedroom testing, and a one-hour call with the designer. The five days start once your brief and payment are complete.',
    },
  ],
  automated: [
    {
      title: 'A receipt from Stripe',
      body: 'In your inbox in the next few minutes, with the amount and reference. £49.99 paid in full, nothing further to pay.',
    },
    {
      title: 'Complete your project brief',
      body: 'The button above opens it. This is what your automated analysis is built from, so the more complete it is, the better the report.',
    },
    {
      title: 'Your report, by email',
      body: 'Fully automated, no design review at this tier: planning, standards, indicative capacity, risks and recommended next steps.',
    },
    {
      title: 'A free Expert Session, if it makes sense',
      body: 'Once you have the report, we will offer a short call with Jodi to talk through whether an Architectural Feasibility or another service is the right next step.',
    },
  ],
};

const HEADLINE_FALLBACK: Record<FeasibilityTier, { eyebrow: string; h1: string; lede: string }> = {
  architectural: {
    eyebrow: 'Deposit received',
    h1: 'Thank you. Your feasibility is secured.',
    lede: 'One thing left to do: tell us about the project properly, so the analysis starts from everything you know.',
  },
  automated: {
    eyebrow: 'Payment received',
    h1: 'Thank you. Your automated feasibility is underway.',
    lede: 'One thing left to do: tell us about the project properly, so the analysis starts from everything you know.',
  },
};

const SUPPORT_FALLBACK = {
  heading: 'Something to send us, or a question?',
  body: 'Reply to your receipt, or email us directly and we will pick it up.',
  linkLabel: 'See what a feasibility looks like',
};

// The address is both the link and the words it shows. It stays in code so the
// two can never disagree, which is the same reason the routes below do.
const SUPPORT_EMAIL = 'hello@thistlearchitecture.co.uk';

interface FeasibilityConfirmedPageProps {
  tier: FeasibilityTier;
  /** This page's own copy, from the `confirmed.json` document. */
  page?: TinaQuery;
}

export const FeasibilityConfirmedPage: React.FC<FeasibilityConfirmedPageProps> = ({ tier, page }) => {
  // useTina returns the server data verbatim on the public site and swaps in
  // the live form values inside the editor. Passing a null-ish query is not
  // allowed, so the hook runs against the shared stub when the prop is absent.
  const { data: livePage } = useTina(page ?? EMPTY_QUERY);
  const c = page ? (livePage as any)?.feasibilityPackage : undefined;

  // Which of the two groups this visit reads. The choice is still made here, in
  // code, from the tier: the CMS holds both sets of words and neither can
  // decide which is shown.
  const t = c?.[tier];

  const headline = { ...HEADLINE_FALLBACK[tier], ...pruneEmpty({
    eyebrow: str(t?.eyebrow),
    h1: str(t?.heading),
    lede: str(t?.lede),
  }) };

  const support = { ...SUPPORT_FALLBACK, ...pruneEmpty({
    heading: str(c?.support?.heading),
    body: str(c?.support?.body),
    linkLabel: str(c?.support?.linkLabel),
  }) };

  // All-or-nothing rather than merged step by step: an editor deleting a step
  // has to be able to delete it, not have it reappear.
  const cmsSteps = arr<any>(t?.steps);
  const steps: NextStep[] = cmsSteps.length
    ? cmsSteps.map((s) => ({
        title: str(s?.title),
        body: str(s?.body),
        tina: { title: f(s, 'title'), body: f(s, 'body') },
      }))
    : NEXT_STEPS_FALLBACK[tier];

  return (
    <section className="px-fl-margin py-fl-section-lg bg-thistle-white min-h-[70vh]">
      <div className="max-w-[760px] mx-auto">
        <div className="flex items-center gap-fl-3 mb-fl-5 text-thistle-green">
          <span className="w-10 h-10 rounded-full bg-thistle-green/15 flex items-center justify-center">
            <Check size={20} strokeWidth={2.5} />
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold" data-tina-field={f(t, 'eyebrow')}>{headline.eyebrow}</span>
        </div>

        <h1 className="text-fluid-h1 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5" data-tina-field={f(t, 'heading')}>
          {headline.h1}
        </h1>

        <p className="text-fluid-lg text-thistle-black/70 leading-relaxed mb-fl-6 max-w-xl" data-tina-field={f(t, 'lede')}>{headline.lede}</p>

        <div className="mb-fl-8">
          <CompleteBriefButton tier={tier} />
        </div>

        <ol className="space-y-fl-5 mb-fl-8">
          {/* Keyed by position rather than by title: the title is a live form
              value in the editor, so keying on it remounts the row on every
              keystroke. */}
          {steps.map((s, i) => (
            <li key={i} className="flex gap-fl-4">
              <span className="shrink-0 w-7 h-7 rounded-full border border-thistle-black/15 flex items-center justify-center text-xs font-semibold text-thistle-black/50">
                {i + 1}
              </span>
              <div>
                <p className="text-fluid-base font-medium text-thistle-black mb-fl-1" data-tina-field={s.tina?.title}>{s.title}</p>
                <p className="text-fluid-sm text-thistle-black/60 leading-relaxed" data-tina-field={s.tina?.body}>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="rounded-2xl border border-thistle-black/[0.08] bg-white p-fl-6">
          <p className="text-fluid-sm font-medium text-thistle-black mb-fl-2" data-tina-field={f(c?.support, 'heading')}>{support.heading}</p>
          <p className="text-fluid-sm text-thistle-black/60 leading-relaxed mb-fl-4" data-tina-field={f(c?.support, 'body')}>
            {support.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-fl-4 sm:items-center">
            {/* No marker: the link text is the address itself, and it is set in
                code so that it and the mailto can never disagree. */}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-black hover:text-thistle-green transition-colors"
            >
              {SUPPORT_EMAIL} <ArrowUpRight size={15} />
            </a>
            <Link
              href="/case-studies/feasibility-studies"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-black/60 hover:text-thistle-black transition-colors"
              data-tina-field={f(c?.support, 'linkLabel')}
            >
              {support.linkLabel} <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
