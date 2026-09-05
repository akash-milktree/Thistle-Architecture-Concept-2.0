"use client";

import React, { useEffect } from 'react';
import Script from 'next/script';
import { Reveal } from '../components/animations/Reveal';
import { pruneEmpty } from '../lib/tina';
import { EVENTS, track } from '../lib/analytics';

/**
 * Jodi's booking card: the "not sure what I need" route from Ed's August 2026
 * brief, "Book a Free Expert Session with Jodi, direct Calendly booking."
 *
 * Until 5 September 2026 this was a stand-in form (name, email, phone, best
 * time) because the Calendly link had not been supplied. The link turned out
 * to be in use already on the HMO Designers site, so the form is gone and the
 * live calendar is here instead. One form on the contact page now, the general
 * enquiry, and the call is booked rather than requested.
 */

/** Jodi's calendar. A route, not copy, so it stays in code. */
export const JODI_CALENDLY_URL = 'https://calendly.com/jodi-thistle-architecture/30min';

// Calendly's inline embed, coloured to the site. The widget script reads the
// URL from data-url and sizes its own iframe to the calendar, which a fixed
// iframe cannot do; it also posts messages the analytics listener below uses.
const EMBED_URL = `${JODI_CALENDLY_URL}?hide_gdpr_banner=0&primary_color=8f9952&text_color=2f3b36&background_color=ffffff`;

interface ExpertSessionCopy {
  personName: string;
  personRole: string;
  pitch: string;
}

interface ExpertSessionCardProps {
  copy?: Partial<ExpertSessionCopy>;
  tina?: Partial<Record<keyof ExpertSessionCopy, string>>;
}

const COPY_FALLBACK: ExpertSessionCopy = {
  personName: 'Jodi',
  personRole: 'Business Development & Expert Sessions',
  pitch: 'Not sure which route fits your project? Book a free call with Jodi to talk through the opportunity and be pointed at the right feasibility. Pick a time below and it goes straight into her diary.',
};

export const ExpertSessionCard: React.FC<ExpertSessionCardProps> = ({ copy, tina }) => {
  const c: ExpertSessionCopy = { ...COPY_FALLBACK, ...pruneEmpty(copy) };
  const initial = c.personName.trim().charAt(0).toUpperCase() || 'J';

  // "Bookings" in Ed's funnel. Calendly's embed tells the parent page when a
  // slot is confirmed, which is the first time this event has had a source.
  // Origin-checked so nothing else on the page can fire it.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return;
      if (e.data?.event === 'calendly.event_scheduled') {
        track(EVENTS.bookingCompleted, { source: 'expert-session' });
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <Reveal>
      <div className="rounded-2xl border border-thistle-green/25 bg-thistle-green/[0.06] p-fl-6 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-fl-6 items-start">
        <div>
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
          <p className="text-fluid-sm text-thistle-black/70 leading-relaxed" data-tina-field={tina?.pitch}>
            {c.pitch}
          </p>
          <p className="text-xs text-thistle-black/45 mt-fl-4">
            Free, no obligation. If the calendar does not load,{' '}
            <a
              href={JODI_CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-thistle-black transition-colors"
            >
              open it on calendly.com
            </a>
            .
          </p>
        </div>

        <div className="rounded-xl overflow-hidden bg-white border border-thistle-black/[0.06]">
          {/* The widget script replaces this div's contents with the calendar
              iframe and keeps its height in step with the step the visitor is
              on. min-height stops the card collapsing before it arrives. */}
          <div
            className="calendly-inline-widget"
            data-url={EMBED_URL}
            style={{ minWidth: '280px', height: '700px' }}
          />
          <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
        </div>
      </div>
    </Reveal>
  );
};
