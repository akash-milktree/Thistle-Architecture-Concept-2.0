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
 * Microsoft Clarity, which is heatmaps and session replay rather than counting.
 *
 * Set separately from GA4 so either can run without the other, and absent
 * everywhere it has not been switched on, same as the measurement ID above.
 *
 * Clarity is held to a stricter rule than GA4 here: GA4 loads immediately and
 * runs cookieless under a denied consent default, whereas nothing of Clarity is
 * fetched at all until a visitor has actively accepted. Recording what someone
 * does on a page is a bigger ask than counting that they were on it, and it
 * should not begin on a maybe.
 */
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? '';

export const clarityEnabled = () => CLARITY_PROJECT_ID !== '';

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

/**
 * Fired when a visitor asks to change a choice they have already made.
 *
 * Consent has to be as easy to withdraw as it was to give, and the banner only
 * ever shows itself to someone who has not answered. Without this, accepting
 * once was final, which is not a real consent mechanism. The footer link
 * dispatches it and the banner listens for it.
 */
export const CONSENT_REOPEN_EVENT = 'thistle-consent-reopen';

/**
 * Fired whenever the answer changes, with the new choice in `detail`.
 *
 * GA4 needs nothing like this because Consent Mode is a running conversation
 * with an already-loaded script. Clarity is different: it is not loaded at all
 * until consent exists, so something has to tell it to start. This is that
 * signal, and it is deliberately generic rather than Clarity-shaped.
 */
export const CONSENT_CHANGED_EVENT = 'thistle-consent-changed';

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
  announceConsent(choice);
}

/** Tell anything that loads only on consent that the answer has moved. */
function announceConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: choice }));
}

/**
 * Forget the stored answer, withdraw consent, and ask again.
 *
 * Withdrawing first rather than waiting for the new answer matters: someone who
 * opens this and then walks away without choosing has still said no, and should
 * be treated as having said no for the rest of the visit.
 */
export function reopenConsentPrompt(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    // Nothing was stored to begin with if storage is blocked.
  }
  applyConsent('denied');
  announceConsent('denied');
  window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT));
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
