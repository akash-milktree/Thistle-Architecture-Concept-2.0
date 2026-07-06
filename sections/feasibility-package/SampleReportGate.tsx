"use client";

import React, { useState } from 'react';
import { ArrowUpRight, FileDown } from 'lucide-react';

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Email-gated download for the sample feasibility document.
// The lead is captured via /api/leads, then the PDF link is revealed.
export const SampleReportGate: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const submit = async () => {
    if (!emailOk(email)) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'sample-report', email }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-fl-7 bg-white rounded-2xl border border-thistle-black/[0.06] p-fl-6 text-center">
      {status === 'done' ? (
        <>
          <p className="text-fluid-base text-thistle-black mb-fl-4">
            Thanks. Your sample report is ready to download.
          </p>
          <a
            href="/downloads/thistle-sample-feasibility.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-full bg-thistle-black text-white hover:bg-thistle-green hover:text-thistle-black transition-colors"
          >
            <FileDown size={16} />
            Download the sample report
          </a>
        </>
      ) : (
        <>
          <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-2">Read a real report first.</h3>
          <p className="text-fluid-sm text-thistle-black/60 leading-relaxed mb-fl-5">
            Enter your email and we will send you a full sample feasibility document from a live project.
          </p>
          <div className="flex flex-col sm:flex-row gap-fl-3">
            <input
              type="email"
              placeholder="you@company.co.uk"
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
              {status === 'submitting' ? 'Sending…' : 'Get the sample'}
              <ArrowUpRight size={15} />
            </button>
          </div>
          {status === 'error' && (
            <p className="text-xs text-red-700 mt-fl-3">Something went wrong. Please try again.</p>
          )}
          <p className="text-[11px] text-thistle-black/40 mt-fl-3">No spam. Just the report and one follow-up.</p>
        </>
      )}
    </div>
  );
};
