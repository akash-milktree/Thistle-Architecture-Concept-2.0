"use client";

import React, { Suspense, useEffect, useRef } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { CONSENT_KEY, GA_MEASUREMENT_ID, analyticsEnabled } from '../../lib/analytics';
import { PaymentOutcome } from './PaymentOutcome';

/**
 * Loads GA4 and keeps its page views in step with client-side navigation.
 *
 * Renders nothing at all until NEXT_PUBLIC_GA_MEASUREMENT_ID is set, so the
 * site ships with no third-party script and no cookies until the property Ed
 * owns actually exists. See lib/analytics.ts.
 */

/**
 * Everything that has to happen before a single hit leaves the browser, in one
 * script, in order.
 *
 * It is written as one block, and it appends the library tag itself, because
 * the ordering is the whole point and splitting it across two <Script> tags
 * makes that ordering a framework detail rather than something visible here:
 *
 *  1. the consent defaults are queued, all denied
 *  2. a previously stored choice is applied, so a returning visitor who already
 *     accepted is not measured as denied for the first few hundred milliseconds
 *  3. only then is gtag.js fetched, which drains the queue in that order
 *
 * Reading localStorage here rather than in an effect matters: an effect runs
 * after this script, so the first page view of every session would go out under
 * the denied default no matter what the visitor had chosen before.
 */
const bootstrap = (id: string) => `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
try {
  if (localStorage.getItem(${JSON.stringify(CONSENT_KEY)}) === 'granted') {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', ${JSON.stringify(id)}, { send_page_view: false });
var s = document.createElement('script');
s.async = true;
s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ${JSON.stringify(id)};
document.head.appendChild(s);
`;

/**
 * Page views on client-side navigation.
 *
 * The App Router changes the URL without a document load, so an automatic page
 * view would fire once on first paint and never again, and the whole site would
 * report as one page. send_page_view is switched off in the config above so
 * that the first view is sent from here too, rather than once by gtag and once
 * by this effect.
 */
const PageViews: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // The first run is the landing page and must be sent. Held in a ref so that a
  // re-render which does not change the route sends nothing.
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (!analyticsEnabled()) return;

    const qs = searchParams?.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    if (!url || url === lastSent.current) return;

    // Settled on a short delay rather than sent immediately, because a
    // redirecting route passes through this effect twice. /case-studies is a
    // server redirect to /case-studies/feasibility-studies, and on a
    // client-side navigation the router sets the intermediate URL before the
    // real one. Sent eagerly, that reports a page view for a URL nobody ever
    // saw and credits it with an instant exit. The timer is cleared by the
    // second run, so only the settled URL is ever sent.
    const timer = window.setTimeout(() => {
      lastSent.current = url;

      const gtag = (window as Window & { gtag?: (...a: unknown[]) => void }).gtag;
      if (typeof gtag !== 'function') return;

      gtag('event', 'page_view', {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
};

export const Analytics: React.FC = () => {
  if (!analyticsEnabled()) return null;

  return (
    <>
      <Script id="ga-bootstrap" strategy="afterInteractive">
        {bootstrap(GA_MEASUREMENT_ID)}
      </Script>
      {/* useSearchParams needs a Suspense boundary or it opts the whole route
          out of static rendering, which would turn every prerendered page into
          a server-rendered one just to count a page view. */}
      <Suspense fallback={null}>
        <PageViews />
        <PaymentOutcome />
      </Suspense>
    </>
  );
};
