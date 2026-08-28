"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { CONSENT_REOPEN_EVENT, analyticsEnabled, readConsent, writeConsent } from '../../lib/analytics';

/**
 * The analytics consent prompt.
 *
 * Why this exists, given Ed asked for GA4 and not for a banner: analytics
 * cookies need opt-in consent under the UK PECR rules, so measurement cannot
 * simply be switched on for a UK audience without asking. The site's own cookie
 * policy already tells visitors that analytics cookies are used, which was
 * true of the policy but not of the site, and there was nothing to consent
 * with. This closes both halves of that gap.
 *
 * It renders nothing at all until analytics is actually wired, so nobody is
 * asked to consent to something that is not running.
 */
export const CookieBanner: React.FC = () => {
  // Starts hidden and is only shown once mounted, because the answer lives in
  // localStorage. Rendering it on the server would flash the banner at everyone
  // who has already answered.
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled()) return;
    if (readConsent() === null) setShow(true);

    // The footer's "Cookie settings" link fires this. Without it, accepting once
    // was final, and consent has to be as easy to withdraw as it was to give.
    const reopen = () => setShow(true);
    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
  }, []);

  const answer = (choice: 'granted' | 'denied') => {
    writeConsent(choice);
    setShow(false);
  };

  if (!analyticsEnabled()) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookies"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-[1360px] rounded-2xl border border-thistle-black/10 bg-white/95 backdrop-blur-xl shadow-xl shadow-thistle-black/[0.08] p-5 sm:p-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm leading-relaxed text-thistle-black/70 max-w-2xl">
              We would like to use analytics cookies to see how people find and use this
              site. They help us make it better and are never used to identify you or to
              advertise to you. You can say no and the site works exactly the same.{' '}
              <Link href="/cookies" className="text-thistle-green font-medium underline underline-offset-2">
                Our cookie policy
              </Link>
              .
            </p>

            {/* Accept and reject carry the same visual weight on purpose. A
                reject buried as small print is the pattern the ICO objects to,
                and it is also just poor manners. */}
            <div className="flex flex-shrink-0 gap-3">
              <button
                type="button"
                onClick={() => answer('denied')}
                className="inline-flex items-center justify-center rounded-full border border-thistle-black/20 px-6 py-3 text-sm font-medium tracking-tight text-thistle-black transition-all duration-300 hover:border-thistle-black hover:bg-thistle-green/10"
              >
                No thanks
              </button>
              <button
                type="button"
                onClick={() => answer('granted')}
                className="inline-flex items-center justify-center rounded-full border border-transparent bg-thistle-black px-6 py-3 text-sm font-medium tracking-tight text-white transition-all duration-300 hover:bg-thistle-green hover:text-thistle-black"
              >
                Allow analytics
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
