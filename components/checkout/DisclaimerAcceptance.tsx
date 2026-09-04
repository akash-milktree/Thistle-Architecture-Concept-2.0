"use client";

import React from 'react';
import { AlertCircle } from 'lucide-react';
import {
  DISCLAIMER_ERROR,
  DISCLAIMER_LABEL,
  DISCLAIMER_SUMMARY,
  DISCLAIMER_URL,
} from '../../lib/disclaimer';

/**
 * The acceptance step, sitting directly above the pay button.
 *
 * Ed's brief, section 5, reproduced verbatim from lib/disclaimer.ts. The parts
 * that look like styling choices are requirements:
 *
 *  R2.2  The full text is one click away and opening it must not lose anything
 *        already typed into the form. Hence target="_blank" rather than a modal
 *        or an in-page route: a new tab cannot disturb the form at all, where a
 *        modal is one careless re-render away from clearing it.
 *  R2.3  Unticked by default, always. There is no persistence here and nothing
 *        is default-checked, and autoComplete is off so a browser restoring a
 *        form on back-navigation cannot tick it either.
 *  R2.4  One tick, for this and nothing else. It is not bundled with terms,
 *        privacy or marketing.
 *  R2.5  The block is enforced on the server as well. This component is the
 *        polite half; src/app/api/checkout/route.ts is the half that counts.
 *
 * The brief also lists what would make Thistle's position worse, and a
 * pre-ticked box is top of it: "treated as no consent at all". So `checked` is
 * driven entirely by the caller's state, which starts false.
 */
interface Props {
  checked: boolean;
  onChange: (next: boolean) => void;
  /** Set once the client has tried to pay without ticking. */
  showError?: boolean;
  id?: string;
}

export const DisclaimerAcceptance: React.FC<Props> = ({
  checked,
  onChange,
  showError = false,
  id = 'feasibility-disclaimer-accept',
}) => (
  <div className="mt-fl-5">
    {/* The summary block. Section 5.1: heading plus four bullets, verbatim. */}
    <div className="rounded-xl border border-thistle-black/[0.08] bg-thistle-white/60 p-fl-5">
      <p className="text-fluid-sm font-medium text-thistle-black mb-fl-3">
        {DISCLAIMER_SUMMARY.heading}
      </p>
      <ul className="list-disc pl-5 space-y-fl-2">
        {DISCLAIMER_SUMMARY.bullets.map((b) => (
          <li key={b} className="text-xs text-thistle-black/70 leading-relaxed">
            {b}
          </li>
        ))}
      </ul>
    </div>

    {/* A real checkbox rather than a styled div, so it is reachable by keyboard
        and announced by a screen reader as what it is. */}
    <label htmlFor={id} className="flex gap-fl-3 mt-fl-4 cursor-pointer">
      <input
        id={id}
        name="disclaimerAccepted"
        type="checkbox"
        checked={checked}
        autoComplete="off"
        onChange={(e) => onChange(e.target.checked)}
        aria-describedby={showError ? `${id}-error` : undefined}
        className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-thistle-black/25 text-thistle-green focus:ring-thistle-green/30 cursor-pointer"
      />
      <span className="text-xs text-thistle-black/70 leading-relaxed">
        {DISCLAIMER_LABEL.before}
        <a
          href={DISCLAIMER_URL}
          target="_blank"
          rel="noopener noreferrer"
          // stopPropagation, or clicking the link inside the label would toggle
          // the box on the way past. Ticking must be a deliberate act.
          onClick={(e) => e.stopPropagation()}
          className="font-medium text-thistle-green underline underline-offset-2"
        >
          {DISCLAIMER_LABEL.linkText}
        </a>
        {DISCLAIMER_LABEL.after}
      </span>
    </label>

    {showError && (
      <p
        id={`${id}-error`}
        role="alert"
        className="flex items-start gap-1.5 text-xs text-red-700 mt-fl-3"
      >
        <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
        {DISCLAIMER_ERROR}
      </p>
    )}
  </div>
);
