"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EVENTS, track, type AnalyticsSource } from '../../lib/analytics';
import { PrivacyNote } from './PrivacyNote';

const UNLOCK_KEY = 'thistle-tool-unlocked';
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

interface ToolGateProps {
  /** Lead source tag sent to /api/leads, and the funnel event's `source`. */
  source: AnalyticsSource;
  /** Extra payload merged into the lead (e.g. the user's inputs). */
  extra?: Record<string, unknown>;
  children: React.ReactNode;
}

// Soft email gate for free-tool detail. The headline result stays visible
// outside this wrapper; the detail inside is blurred until an email is left.
// Unlock persists in localStorage so returning users are not gated twice.
export const ToolGate: React.FC<ToolGateProps> = ({ source, extra, children }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');

  useEffect(() => {
    setUnlocked(window.localStorage.getItem(UNLOCK_KEY) === '1');
    setHydrated(true);
  }, []);

  // "Calculator completed" in Ed's funnel is the moment the visitor has the
  // whole result in front of them, so it hangs off the unlock rather than off
  // the form submit. That way a returning visitor, who is already unlocked and
  // never sees the form, still counts: measuring only first-time submits would
  // report the completion rate as falling every week the tools got repeat use.
  const completed = useRef(false);
  useEffect(() => {
    if (!unlocked || completed.current) return;
    completed.current = true;
    track(EVENTS.calculatorCompleted, { source });
  }, [unlocked, source]);

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
      window.localStorage.setItem(UNLOCK_KEY, '1');
      setUnlocked(true);
    } catch {
      setStatus('error');
    }
  };

  if (!hydrated || unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="blur-[6px] pointer-events-none select-none" aria-hidden="true">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-fl-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-thistle-black/[0.08] shadow-lg p-fl-5 max-w-sm w-full text-center">
          <p className="text-fluid-sm font-medium text-thistle-black mb-fl-2">See the full breakdown.</p>
          <p className="text-xs text-thistle-black/50 mb-fl-4">Enter your email and the detail unlocks instantly.</p>
          <div className="flex flex-col gap-fl-2">
            <input
              type="email"
              placeholder="you@company.co.uk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              className="w-full border border-thistle-black/10 rounded-full px-4 py-2.5 text-sm bg-thistle-white/50 focus:border-thistle-green focus:ring-1 focus:ring-thistle-green/20 outline-none transition-colors placeholder:text-thistle-black/25"
            />
            <button
              onClick={submit}
              disabled={!emailOk(email) || status === 'submitting'}
              className="inline-flex items-center justify-center gap-1.5 text-sm font-medium px-5 py-2.5 rounded-full bg-thistle-green text-thistle-black hover:bg-thistle-green/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Unlocking…' : 'Unlock the detail'}
              <ArrowUpRight size={14} />
            </button>
          </div>
          {status === 'error' && (
            <p className="text-xs text-red-700 mt-fl-2">Something went wrong. Please try again.</p>
          )}
          {/* Item 77: said where the address goes, beside the field it is typed
              into, rather than only on a page nobody opens mid-form. */}
          <PrivacyNote
            className="mt-fl-3"
            purpose="We use your email to send this breakdown and to follow up about your project."
          />
        </div>
      </div>
    </div>
  );
};
