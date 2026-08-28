"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { EVENTS, analyticsEnabled, track } from '../../lib/analytics';

/**
 * The two ends of the payment funnel, both of which Stripe reports by sending
 * the customer back to a URL of ours.
 *
 * success_url is /feasibility-confirmed?session_id=...&tier=...
 * cancel_url is /pricing?cancelled=1 or /feasibility-package?cancelled=1
 *
 * Both live here rather than on the pages themselves, because the cancel URLs
 * land on two ordinary marketing pages that otherwise know nothing about
 * payment, and a copy of this logic on each would be two things to keep in step
 * with src/app/api/checkout/route.ts instead of one.
 *
 * NOT THE PAYMENT RECORD. This measures the customer arriving back, which is a
 * browser event and can be replayed by anyone typing the URL. The Stripe
 * webhook remains the only thing that decides whether money moved. Marketing
 * numbers and the payment boundary are deliberately different things.
 */
export const PaymentOutcome: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!analyticsEnabled() || !searchParams) return;

    const sessionId = searchParams.get('session_id');
    const cancelled = searchParams.get('cancelled');

    if (pathname === '/feasibility-confirmed' && sessionId) {
      // A refresh or a back-and-forward would otherwise count the same purchase
      // again, which is the one event where double counting really misleads.
      // Keyed on the Stripe session so a genuine second purchase still counts.
      if (once(`paid:${sessionId}`)) {
        track(EVENTS.paymentPaid, {
          tier: searchParams.get('tier') ?? 'architectural',
          transaction_id: sessionId,
          currency: 'GBP',
        });
      }
      return;
    }

    if (cancelled === '1' && once(`abandoned:${pathname}`)) {
      track(EVENTS.paymentAbandoned, {
        // Which page they were sent back to says which product they walked away
        // from, and those two are priced an order of magnitude apart.
        tier: pathname === '/feasibility-package' ? 'automated' : 'architectural',
        source: pathname,
      });
    }
  }, [pathname, searchParams]);

  return null;
};

/**
 * True the first time a key is seen in this tab, false afterwards.
 *
 * sessionStorage rather than localStorage on purpose: it should forget between
 * visits, so a customer who buys twice in a month is counted twice. Storage can
 * throw outright in private modes, and the event matters more than the
 * de-duplication, so a failure here lets it through.
 */
function once(key: string): boolean {
  try {
    const k = `thistle-analytics-${key}`;
    if (window.sessionStorage.getItem(k)) return false;
    window.sessionStorage.setItem(k, '1');
    return true;
  } catch {
    return true;
  }
}
