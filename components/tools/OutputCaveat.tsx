import React from 'react';

/**
 * Item 89. Both calculators return money: projected GDV, total cost, margin, a
 * verdict, an indicative value at yield, profit over cost. The existing notes
 * addressed accuracy only, and Ed's point is that accuracy is not the risk. The
 * risk is somebody treating an on-screen figure as a valuation and taking it to
 * a lender or an auction.
 *
 * The wording is his, supplied verbatim in the item, and it is deliberately in
 * code rather than the CMS. Same reasoning as lib/disclaimer.ts: this is a
 * disclaimer of reliance, not copy to be polished.
 *
 * It sits with the OUTPUTS rather than the inputs, because a caveat under the
 * form is read before there is anything to be cautious about.
 */
export const OUTPUT_CAVEAT =
  'Indicative only. These figures are a guide based on the numbers you have entered. ' +
  'They are not a valuation, a cost plan, or financial advice, and should not be relied ' +
  'on for a purchase, a loan application or an investment decision. A feasibility models ' +
  'comparables, voids, planning risk and build cost properly.';

export const OutputCaveat: React.FC = () => (
  <p className="text-xs text-thistle-black/55 leading-relaxed mt-fl-4 pt-fl-4 border-t border-thistle-black/[0.06]">
    {OUTPUT_CAVEAT}
  </p>
);
