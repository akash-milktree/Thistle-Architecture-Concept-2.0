"use client";

import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

interface ToolEmailOfferProps {
  /** Lead source tag sent to /api/leads. Matches the labels in that route. */
  source: string;
  /** Extra payload merged into the lead, e.g. the answers and the verdict. */
  extra?: Record<string, unknown>;
  /** What they get. Has to name something real that actually arrives. */
  heading: string;
  blurb: string;
  /**
   * CMS field ids for the two lines above. The email field, its button and its
   * error message stay in code: they are the mechanic, not copy.
   */
  tina?: { heading?: string; blurb?: string };
}

// The open counterpart to ToolGate: it asks for an email without holding
// anything back.
//
// ToolGate is still right for the two calculators, where the free number is a
// teaser and the money numbers behind it are worth an address. It was wrong for
// the Class MA checker, where the verdict was already visible above the gate and
// the only thing withheld was a paragraph of supporting copy. That charged an
// email for nothing and was flagged in the August 2026 SEO audit.
//
// So the verdict is free and this sits underneath it as an offer. The rule for
// using it: the heading must name something that genuinely gets sent, otherwise
// it is the same broken promise in a friendlier shape.
export const ToolEmailOffer: React.FC<ToolEmailOfferProps> = ({ source, extra, heading, blurb, tina }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const submit = async () => {
    if (!emailOk(email)) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, email, ...extra }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="mt-fl-6 rounded-2xl border border-thistle-green/30 bg-thistle-green/[0.06] p-fl-5 flex items-start gap-fl-3">
        <Check size={18} className="text-thistle-green shrink-0 mt-0.5" />
        <div>
          <p className="text-fluid-sm font-medium text-thistle-black">On its way.</p>
          <p className="text-xs text-thistle-black/60 mt-1">
            Check {email}. If it has not arrived in a few minutes, look in your spam folder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-fl-6 rounded-2xl border border-thistle-black/[0.08] bg-white p-fl-5">
      <p className="text-fluid-sm font-medium text-thistle-black mb-fl-1" data-tina-field={tina?.heading}>{heading}</p>
      <p className="text-xs text-thistle-black/55 leading-relaxed mb-fl-4 max-w-md" data-tina-field={tina?.blurb}>{blurb}</p>
      <div className="flex flex-col sm:flex-row gap-fl-2 sm:items-center">
        <label htmlFor={`offer-${source}`} className="sr-only">
          Your email address
        </label>
        <input
          id={`offer-${source}`}
          type="email"
          placeholder="you@company.co.uk"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          className="flex-1 sm:max-w-xs border border-thistle-black/10 rounded-full px-4 py-2.5 text-sm bg-thistle-white/50 focus:border-thistle-green focus:ring-1 focus:ring-thistle-green/20 outline-none transition-colors placeholder:text-thistle-black/25"
        />
        <button
          onClick={submit}
          disabled={!emailOk(email) || status === 'submitting'}
          className="inline-flex items-center justify-center gap-1.5 text-sm font-medium px-5 py-2.5 rounded-full bg-thistle-black text-white hover:bg-thistle-black/85 transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'submitting' ? 'Sending…' : 'Send it to me'}
          <ArrowUpRight size={14} />
        </button>
      </div>
      {status === 'error' && (
        <p className="text-xs text-red-700 mt-fl-2" role="alert">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
};
