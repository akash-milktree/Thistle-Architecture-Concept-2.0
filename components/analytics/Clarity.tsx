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
 * TWO DASHBOARD SETTINGS DECIDE WHETHER THIS IS SAFE TO RUN AT ALL, and neither
 * of them lives in this repository.
 *
 *  1. Sharing data with Microsoft Advertising must be OFF. Left at its default
 *     it is on, and switching Clarity on then also sets Microsoft advertising
 *     cookies (MUID, MR, SRM_B, ANONCHK) and fires a cookie sync to
 *     c.bing.com. That was measured on the live site on 2 September 2026, an
 *     hour after this component first shipped, and Clarity was switched back
 *     off the same day. It matters because the cookie policy on this site says
 *     no advertising cookies are used, and the GA4 consent config pins all
 *     three advertising types to denied. The default configuration makes both
 *     of those statements untrue.
 *  2. Masking must stay Strict, so that text typed into the feasibility
 *     questionnaire and the checkout is never captured in a replay.
 *
 * NEXT_PUBLIC_CLARITY_PROJECT_ID is deliberately unset in production until
 * both are confirmed. Re-enable by setting it, redeploying, and running
 * `npm run test:clarity`, which fails on exactly the advertising cookies that
 * caused this. The offline suite cannot see any of it: it intercepts
 * clarity.ms and so never reaches the real tag.
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
