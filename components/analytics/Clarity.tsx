"use client";

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import {
  CLARITY_PROJECT_ID,
  CONSENT_CHANGED_EVENT,
  clarityEnabled,
  readConsent,
  type ConsentChoice,
} from '../../lib/analytics';

/**
 * Microsoft Clarity: heatmaps and session replay.
 *
 * NOTHING IS FETCHED UNTIL A VISITOR HAS ACCEPTED. That is a deliberate step up
 * from how GA4 is treated on this site. GA4 loads on every page and stays
 * cookieless until consent arrives, which is what Google's Consent Mode is for
 * and is proportionate for counting page views. Clarity records what a person
 * does on the page, and that should not start on a maybe. So the script tag
 * below does not exist in the document until the answer is yes.
 *
 * The practical effect is that a visitor who declines, or who has not answered
 * yet, has no request to clarity.ms in their network tab at all, rather than a
 * request that promises to behave.
 *
 * WHAT IT RECORDS, AND THE ONE SETTING THAT MATTERS. Clarity replays sessions,
 * so it sees the feasibility questionnaire and the checkout forms. Its masking
 * must stay on the strict setting in the Clarity dashboard, under Settings then
 * Masking, so that typed text is never captured. That is a dashboard control
 * rather than a code one, which is exactly why it is written down here: nothing
 * in this repository will stop it being turned off.
 */
export const Clarity: React.FC = () => {
  // Starts false and can only become true after mount, because the answer lives
  // in localStorage and the server has no way to know it.
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (!clarityEnabled()) return;

    setConsented(readConsent() === 'granted');

    // A visitor who accepts partway through a visit gets Clarity from that
    // point on, without a reload. Withdrawing sets this back to false, which
    // unmounts the tag: already-loaded Clarity keeps running for the rest of
    // that page, so the honest guarantee is that nothing new starts and the
    // next page is clean.
    const onChange = (e: Event) => {
      const choice = (e as CustomEvent<ConsentChoice>).detail;
      setConsented(choice === 'granted');
    };

    window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
  }, []);

  if (!clarityEnabled() || !consented) return null;

  return (
    <Script id="clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", ${JSON.stringify(CLARITY_PROJECT_ID)});`}
    </Script>
  );
};
