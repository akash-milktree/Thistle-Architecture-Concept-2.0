/**
 * GA4, and the funnel events from Ed's brief.
 *
 * Ed's email of 27 August 2026: "set up GA4 on thistlearchitecture.co.uk ...
 * Once it is live I would like the funnel events from the brief configured on
 * top of it: calculator started and completed, payment started, paid and
 * abandoned, Jodi calls and bookings."
 *
 * DORMANT UNTIL THE PROPERTY EXISTS. Nothing loads and every call here is a
 * no-op unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set on the Vercel project. That
 * is deliberate: the property has to be created inside Ed's own Google account
 * for ownership to sit with Thistle, which is not something this repo can do.
 * So the whole measurement layer ships first and switches on with one
 * environment variable, no code change and no second deploy.
 *
 * CONSENT. The site is UK facing and analytics cookies need opt-in consent
 * under PECR, so this runs Google Consent Mode v2 with every storage type
 * denied by default. Until a visitor accepts, GA4 sets no cookies and sends
 * only cookieless pings. See components/analytics/CookieBanner.tsx.
 */

/** The property. Absent on any environment where analytics is not wired yet. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

export const analyticsEnabled = () => GA_MEASUREMENT_ID !== '';

/**
 * The funnel, named once here.
 *
 * GA4 event names are snake_case, up to 40 characters, and must not start with
 * the reserved "ga_" or "google_" prefixes. They are also permanent in the
 * sense that renaming one splits its history in two, so these are written to
 * match Ed's brief line by line rather than to read nicely in code.
 */
export const EVENTS = {
  /** A visitor answered the first question of a calculator. */
  calculatorStarted: 'calculator_started',
  /** A calculator produced its result. */
  calculatorCompleted: 'calculator_completed',
  /** Checkout was requested, before Stripe has been reached. */
  paymentStarted: 'payment_started',
  /** Stripe returned the customer to the confirmation page. */
  paymentPaid: 'payment_paid',
  /** The customer backed out of Stripe and landed back on the site. */
  paymentAbandoned: 'payment_abandoned',
  /** A call with Jodi was requested, whether by form or by booking link. */
  callRequested: 'call_requested',
  /** A booking was completed on the booking tool. */
  bookingCompleted: 'booking_completed',
} as const;

export type AnalyticsEvent = (typeof EVENTS)[keyof typeof EVENTS];

/**
 * Which calculator or form an event came from.
 *
 * Passed as an event parameter rather than baked into the event name, so the
 * four calculators report into one funnel that can still be split by source in
 * GA4. Registering `source` as a custom dimension in the property is what makes
 * it visible in reports; the data is collected either way.
 */
export type AnalyticsSource =
  | 'hmo-calculator'
  | 'gdv-calculator'
  | 'class-ma-checker'
  | 'feasibility-calculator'
  | 'expert-session'
  | 'automated-checkout';

type Params = Record<string, string | number | boolean | undefined>;

interface GtagWindow extends Window {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}

/**
 * Send one event.
 *
 * Safe to call from anywhere, including during a render on the server or before
 * the gtag snippet has finished loading: it checks for the function each time
 * rather than caching it. Undefined parameters are dropped, because GA4 records
 * the literal string "undefined" otherwise.
 */
export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === 'undefined' || !analyticsEnabled()) return;

  const gtag = (window as GtagWindow).gtag;
  if (typeof gtag !== 'function') return;

  const clean: Params = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) clean[k] = v;
  }

  gtag('event', event, clean);
}

/**
 * Fire an event once per mounted component, whatever re-renders happen around
 * it.
 *
 * "Calculator started" is the case this exists for: it hangs off the first
 * answer, and every later answer re-runs the same code path. Without a guard
 * the event would fire on every click and the started-to-completed rate would
 * be meaningless. The caller owns the ref, so the guard resets when the
 * calculator does.
 */
export function trackOnce(
  guard: { current: boolean },
  event: AnalyticsEvent,
  params: Params = {},
): void {
  if (guard.current) return;
  guard.current = true;
  track(event, params);
}

/* ------------------------------------------------------------------ consent */

/** Where the visitor's choice is remembered. Read by the banner and the loader. */
export const CONSENT_KEY = 'thistle-cookie-consent';

export type ConsentChoice = 'granted' | 'denied';

/**
 * The stored choice, or null if they have not answered yet.
 *
 * Wrapped because localStorage throws outright in some privacy modes rather
 * than returning null, and a thrown error here would take the whole page down.
 */
export function readConsent(): ConsentChoice | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

/** Record the choice and tell gtag about it in the same breath. */
export function writeConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // A visitor who has blocked storage cannot be remembered between pages.
    // The consent update below still applies for this one, which is the more
    // important half.
  }
  applyConsent(choice);
}

/**
 * Push the choice into Consent Mode.
 *
 * Only analytics storage is ever granted. The three advertising types stay
 * denied because the site runs no advertising, and the cookie policy says so
 * in as many words.
 */
export function applyConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as GtagWindow).gtag;
  if (typeof gtag !== 'function') return;

  gtag('consent', 'update', {
    analytics_storage: choice,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}
