"use client";

import React, { useState } from 'react';
import { FileText, Lock, ArrowUpRight, Check } from 'lucide-react';
import { FEASIBILITY_DOCUMENTS } from '../../data/caseStudiesData';

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// "What the client received", per Ed's template.
//
// The cards are deliberately inert. Every feasibility produces the same three
// documents, so the set is generic rather than this building's actual files:
// the real reports name the client and carry the full address and postcode on
// every page, and they used to be one click away from here. Ed's call: "we show
// what they get on the page but you can't click on it and see the PDF. If they
// want to see the PDFs, they need to get in touch and we can send them an
// example."
//
// So the links look like links and do not resolve to anything. Asking opens an
// email field, the address goes to the team through the same lead route as the
// other gates, and a person sends the documents back. Nothing is revealed on
// submit, because there is nothing publishable to reveal.
// The three cards themselves stay in code (FEASIBILITY_DOCUMENTS in
// data/caseStudiesData.ts): every feasibility produces the same set, so it is
// one shared constant rather than the same three cards repeated across 35
// documents. Only the guidance line below varies by study, so only it is
// editable and only it carries a marker.
export const DocumentCards: React.FC<{
  guidance?: { label: string; href?: string };
  /** CMS field id for the guidance line on THIS study. */
  tinaLabel?: string;
}> = ({ guidance, tinaLabel }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const submit = async () => {
    if (!emailOk(email)) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'feasibility-documents', email }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-fl-4">
        {FEASIBILITY_DOCUMENTS.map((d) => (
          <div key={d.title} className="flex flex-col h-full rounded-2xl border border-thistle-black/[0.08] bg-white p-fl-5">
            <div className="flex items-start justify-between gap-fl-3 mb-fl-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-thistle-green/10 text-thistle-green shrink-0">
                <FileText size={18} />
              </span>
            </div>

            <h3 className="text-fluid-h6 font-medium tracking-tight text-thistle-black mb-fl-2">{d.title}</h3>
            <p className="text-fluid-sm text-thistle-black/60 leading-relaxed mb-fl-5 flex-1">{d.summary}</p>

            {/* Looks like the link it used to be, and goes nowhere. Opening the
                request form is the only thing it can do. */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1.5 text-fluid-sm font-medium text-thistle-black/35 hover:text-thistle-black transition-colors w-fit"
            >
              <Lock size={13} />
              View document
            </button>
          </div>
        ))}
      </div>

      {/* The request form. Closed until someone asks, so the section stays a
          description of the deliverables rather than a lead capture. */}
      <div className="mt-fl-5 rounded-2xl border border-thistle-black/[0.08] bg-white p-fl-5">
        {status === 'done' ? (
          <div className="flex items-start gap-fl-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-thistle-green/15 text-thistle-green shrink-0">
              <Check size={16} />
            </span>
            <div>
              <p className="text-fluid-base text-thistle-black mb-1">Thanks. That is with the team.</p>
              <p className="text-fluid-sm text-thistle-black/55 leading-relaxed">
                We will email you a full example feasibility, with the client details removed, within one working day.
              </p>
            </div>
          </div>
        ) : open ? (
          <>
            <p className="text-fluid-sm text-thistle-black/70 leading-relaxed mb-fl-4">
              These are real client reports, so we do not publish them. Leave your email and the team will send you a
              full example with the client details removed.
            </p>
            <div className="flex flex-col sm:flex-row gap-fl-3">
              <input
                type="email"
                placeholder="you@company.co.uk"
                aria-label="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                className="flex-1 border border-thistle-black/10 rounded-full px-5 py-3 text-sm bg-thistle-white/50 focus:border-thistle-green focus:ring-1 focus:ring-thistle-green/20 outline-none transition-colors placeholder:text-thistle-black/25"
              />
              <button
                onClick={submit}
                disabled={!emailOk(email) || status === 'submitting'}
                className="inline-flex items-center justify-center gap-1.5 text-sm font-medium px-6 py-3 rounded-full bg-thistle-green text-thistle-black hover:bg-thistle-green/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending…' : 'Send them to me'}
                <ArrowUpRight size={15} />
              </button>
            </div>
            {status === 'error' && (
              <p className="text-xs text-red-700 mt-fl-3">Something went wrong. Please try again.</p>
            )}
          </>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-fl-3">
            <p className="text-fluid-sm text-thistle-black/60 leading-relaxed">
              These are real client reports, so they are not published here.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium px-5 py-2.5 rounded-full bg-thistle-black text-white hover:bg-thistle-green hover:text-thistle-black transition-colors"
            >
              Ask for an example
              <ArrowUpRight size={15} />
            </button>
          </div>
        )}
      </div>

      {/* The marker sits on the paragraph rather than on the text inside it.
          The paragraph renders this one field and nothing else, and the
          alternative — wrapping the words in a span — would change the markup
          of every page that has no CMS query behind it. */}
      {guidance && (
        <p className="text-xs text-thistle-black/40 mt-fl-4" data-tina-field={tinaLabel}>
          {guidance.href ? (
            <a href={guidance.href} target="_blank" rel="noopener noreferrer" className="hover:text-thistle-black transition-colors underline underline-offset-2">
              {guidance.label}
            </a>
          ) : (
            guidance.label
          )}
        </p>
      )}
    </div>
  );
};
