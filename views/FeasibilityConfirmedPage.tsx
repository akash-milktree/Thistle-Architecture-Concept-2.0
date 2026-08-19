import React from 'react';
import Link from 'next/link';
import { Check, ArrowUpRight } from 'lucide-react';

// Where Stripe returns someone after a successful payment.
//
// It used to redirect to /feasibility-package?paid=1, which just showed the
// sales page again. Someone who has handed over several hundred pounds should
// be told it worked and what happens next, not sold the thing they have just
// bought.
//
// Deliberately not a client component and it reads nothing from the URL: the
// payment is confirmed by the Stripe webhook, not by the browser arriving here.
// Anyone can visit this page, so it must never be the thing that marks a
// payment as complete.

const NEXT_STEPS = [
  {
    title: 'A receipt from Stripe',
    body: 'In your inbox in the next few minutes, with the amount and reference.',
  },
  {
    title: 'We are already on it',
    body: 'Your answers came through with the payment, so nothing needs repeating.',
  },
  {
    title: 'We may ask for drawings',
    body: 'If we need plans, surveys or photos to define the existing building, we will email you.',
  },
  {
    title: 'Your feasibility in five working days',
    body: 'Sketch scheme, proposed layout, unit and bedroom testing, and a one-hour call with the architect.',
  },
];

export const FeasibilityConfirmedPage: React.FC = () => (
  <section className="px-fl-margin py-fl-section-lg bg-thistle-white min-h-[70vh]">
    <div className="max-w-[760px] mx-auto">
      <div className="flex items-center gap-fl-3 mb-fl-5 text-thistle-green">
        <span className="w-10 h-10 rounded-full bg-thistle-green/15 flex items-center justify-center">
          <Check size={20} strokeWidth={2.5} />
        </span>
        <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">Payment received</span>
      </div>

      <h1 className="text-fluid-h1 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
        Thank you. Your feasibility is booked.
      </h1>

      <p className="text-fluid-lg text-thistle-black/70 leading-relaxed mb-fl-8 max-w-xl">
        That is the hard part done. Here is exactly what happens next, so you are not left wondering.
      </p>

      <ol className="space-y-fl-5 mb-fl-8">
        {NEXT_STEPS.map((s, i) => (
          <li key={s.title} className="flex gap-fl-4">
            <span className="shrink-0 w-7 h-7 rounded-full border border-thistle-black/15 flex items-center justify-center text-xs font-semibold text-thistle-black/50">
              {i + 1}
            </span>
            <div>
              <p className="text-fluid-base font-medium text-thistle-black mb-fl-1">{s.title}</p>
              <p className="text-fluid-sm text-thistle-black/60 leading-relaxed">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-2xl border border-thistle-black/[0.08] bg-white p-fl-6">
        <p className="text-fluid-sm font-medium text-thistle-black mb-fl-2">Something to send us, or a question?</p>
        <p className="text-fluid-sm text-thistle-black/60 leading-relaxed mb-fl-4">
          Reply to your receipt, or email us directly and we will pick it up.
        </p>
        <div className="flex flex-col sm:flex-row gap-fl-4 sm:items-center">
          <a
            href="mailto:hello@thistlearchitecture.co.uk"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-black hover:text-thistle-green transition-colors"
          >
            hello@thistlearchitecture.co.uk <ArrowUpRight size={15} />
          </a>
          <Link
            href="/case-studies/feasibility-studies"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-black/60 hover:text-thistle-black transition-colors"
          >
            See what a feasibility looks like <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  </section>
);
