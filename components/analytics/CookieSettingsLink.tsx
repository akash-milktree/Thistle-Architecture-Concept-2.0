"use client";

import React from 'react';
import { analyticsEnabled, reopenConsentPrompt } from '../../lib/analytics';

/**
 * "Cookie settings" in the footer. Withdraws consent and asks again.
 *
 * The prompt only ever shows itself to a visitor who has not answered, so
 * without a way back to it an accept was permanent. Consent has to be as easy
 * to withdraw as it was to give, which is what this is for.
 *
 * Renders nothing when analytics is switched off, because there is then no
 * consent to change and the link would lead to a prompt that never appears.
 */
export const CookieSettingsLink: React.FC<{ className?: string }> = ({ className }) => {
  if (!analyticsEnabled()) return null;

  return (
    <button type="button" onClick={reopenConsentPrompt} className={className}>
      Cookie settings
    </button>
  );
};
