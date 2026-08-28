"use client";

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';
import { pruneEmpty } from '../lib/tina';
import { EVENTS, track } from '../lib/analytics';

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// The "not sure what I need" route from Ed's August 2026 final brief's
// Contact page restructure: "Book a Free Expert Session with Jodi → direct
// Calendly booking." Jodi's Calendly link doesn't exist yet, so this captures
// the request and a preferred time instead of leaving a dead CTA; swapping in
// a real embed later is a like-for-like replacement of this one component.
interface ExpertSessionCopy {
  personName: string;
  personRole: string;
  pitch: string;
  buttonLabel: string;
  reassurance: string;
  successHeading: string;
  successUrgent: string;
  emailPrompt: string;
  email: string;
}

interface ExpertSessionCardProps {
  copy?: Partial<ExpertSessionCopy>;
  tina?: Partial<Record<keyof ExpertSessionCopy, string>>;
}

// The standing copy, kept here as the fallback so the card renders exactly as
// it did before if it is mounted without CMS values.
const COPY_FALLBACK: ExpertSessionCopy = {
  personName: 'Jodi',
  personRole: 'Business Development & Expert Sessions',
  pitch: 'Not sure which route fits your project? A free 15-minute call with Jodi to talk through the opportunity and point you at the right feasibility.',
  buttonLabel: 'Request a Call Back',
  reassurance: 'No obligation. Usually within one working day.',
  successHeading: 'Thanks. Jodi will be in touch to find a time, usually within one working day.',
  successUrgent: 'If it is urgent, reach her directly at',
  emailPrompt: 'Prefer email?',
  email: 'jodi@thistlearchitecture.co.uk',
};

export const ExpertSessionCard: React.FC<ExpertSessionCardProps> = ({ copy, tina }) => {
  const c: ExpertSessionCopy = { ...COPY_FALLBACK, ...pruneEmpty(copy) };
  // The avatar is the first letter of the name, so it follows a rename rather
  // than becoming a stale initial.
  const initial = c.personName.trim().charAt(0).toUpperCase() || 'J';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [when, setWhen] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const ready = name.trim().length > 1 && emailOk(email);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || status === 'submitting') return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'expert-session', email, Name: name, Phone: phone, 'Preferred time': when }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('done');
      // "Jodi calls" in Ed's funnel. Fired on the success branch only, so a
      // failed submission is not counted as a request that reached her.
      //
      // This is the stand-in form, not a booking: until Jodi's Calendly link
      // exists there is nothing to book against, so `booking_completed` has no
      // source yet and stays unfired. Wiring it is a two-line change once the
      // link lands, and until then the difference between a request and a
      // confirmed booking is real and worth keeping in the data.
      track(EVENTS.callRequested, { source: 'expert-session' });
    } catch {
      setStatus('error');
    }
  };

  const field =
    'w-full border border-thistle-black/10 rounded-xl px-4 py-3 text-fluid-sm bg-thistle-white/50 focus:border-thistle-green focus:ring-1 focus:ring-thistle-green/20 outline-none transition-colors placeholder:text-thistle-black/25';

  return (
    <Reveal>
      <div className="h-full rounded-2xl border border-thistle-green/25 bg-thistle-green/[0.06] p-fl-6 flex flex-col">
        <div className="flex items-center gap-fl-3 mb-fl-4">
          <div
            className="w-12 h-12 rounded-full bg-thistle-green/15 ring-2 ring-thistle-green/20 flex items-center justify-center text-base font-bold text-thistle-green shrink-0"
            aria-hidden="true"
          >
            {initial}
          </div>
          <div>
            <p className="text-fluid-base font-medium text-thistle-black" data-tina-field={tina?.personName}>
              {c.personName}
            </p>
            <p className="text-xs text-thistle-black/50" data-tina-field={tina?.personRole}>
              {c.personRole}
            </p>
          </div>
        </div>

        {status === 'done' ? (
          <>
            <p className="text-fluid-sm text-thistle-black/70 leading-relaxed mb-fl-3" data-tina-field={tina?.successHeading}>
              {c.successHeading}
            </p>
            <p className="text-fluid-sm text-thistle-black/60 leading-relaxed">
              <span data-tina-field={tina?.successUrgent}>{c.successUrgent}</span>{' '}
              <a href={`mailto:${c.email}`} className="text-thistle-black underline underline-offset-2 hover:text-thistle-green transition-colors" data-tina-field={tina?.email}>
                {c.email}
              </a>.
            </p>
          </>
        ) : (
          <>
            <p className="text-fluid-sm text-thistle-black/70 leading-relaxed mb-fl-4" data-tina-field={tina?.pitch}>
              {c.pitch}
            </p>
            <form onSubmit={submit} className="flex flex-col gap-fl-3">
              <div className="grid sm:grid-cols-2 gap-fl-3">
                <input
                  className={field}
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
                <input
                  type="email"
                  className={field}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-fl-3">
                <input
                  type="tel"
                  className={field}
                  placeholder="Phone (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
                <input
                  className={field}
                  placeholder="Best time to call (optional)"
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-fl-4">
                <button
                  type="submit"
                  disabled={!ready || status === 'submitting'}
                  className="inline-flex items-center justify-center gap-1.5 text-fluid-sm font-medium px-6 py-3 rounded-full bg-thistle-green text-thistle-black hover:bg-thistle-green/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {/* The busy state stays in code: it is functional UI, not
                      copy, and an editor blanking it would leave a button that
                      looks unresponsive mid-submit. */}
                  {status === 'submitting' ? 'Sending…' : c.buttonLabel}
                  <ArrowUpRight size={16} />
                </button>
                <p className="text-xs text-thistle-black/45" data-tina-field={tina?.reassurance}>{c.reassurance}</p>
              </div>
              {status === 'error' && (
                <p aria-live="polite" className="text-xs text-red-700">
                  Something went wrong. Please try again, or email hello@thistlearchitecture.co.uk.
                </p>
              )}
            </form>
          </>
        )}
        {status !== 'done' && (
          /* A named address that reaches a person, which matters while nobody
             has confirmed hello@ is monitored. Her Calendly still does not
             exist, so the form above remains the booking route. */
          <p className="text-xs text-thistle-black/45 mt-fl-4">
            <span data-tina-field={tina?.emailPrompt}>{c.emailPrompt}</span>{' '}
            <a href={`mailto:${c.email}`} className="underline underline-offset-2 hover:text-thistle-black transition-colors" data-tina-field={tina?.email}>
              {c.email}
            </a>
          </p>
        )}
      </div>
    </Reveal>
  );
};
