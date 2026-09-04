/**
 * The feasibility disclaimer, and the acceptance step in front of payment.
 *
 * Ed's brief of 25 August 2026, cut back by him on 2 September to: "On the
 * checkout page, the summary block with the full text one click away, and a box
 * the client has to tick before they can pay. Unticked by default, blocked
 * server side, the wording at section 5 verbatim."
 *
 * EVERY STRING BELOW IS HIS, REPRODUCED EXACTLY. The brief says "please use it
 * verbatim" and means it: a disclaimer only binds a client if they were shown
 * the wording that was agreed. These are in code rather than in the CMS for the
 * same reason. They are not copy to be polished, and a well-meant tidy of the
 * tick-box label is a change to what the client agreed to.
 *
 * The version and date live here too, and only here. The same pair appears at
 * the top of /feasibility-disclaimer and inside the tick-box label, and two
 * editable copies of a version number is two copies that can disagree. A client
 * has to be able to point at exactly what they accepted.
 *
 * CHANGING THE WORDING MEANS CHANGING THE VERSION. That is R5.1 of the brief and
 * it is not optional: "If we ask you to 'just change one line', that is a new
 * version."
 */

export const DISCLAIMER_VERSION = '1.0';
export const DISCLAIMER_VERSION_DATE = '25 August 2026';

/** Where the full text lives. Permanent: never move or delete this route. */
export const DISCLAIMER_URL = '/feasibility-disclaimer';

/** The document's own name, used in the label and the error. */
export const DISCLAIMER_TITLE = 'Feasibility Report — Basis and Limitations';

/** Section 5.1, the summary block that sits directly above the checkbox. */
export const DISCLAIMER_SUMMARY = {
  heading: 'Before you instruct us — what a feasibility report is, and is not',
  bullets: [
    'It is a high-level desktop appraisal. It is not a survey, a valuation, legal advice or investment advice.',
    'It cannot guarantee that planning permission or an HMO licence will be granted. Those decisions rest with the local authority.',
    'You should not bid at auction, exchange contracts or commit funds in reliance on it alone. Take your own advice from a solicitor, a surveyor and an RICS Registered Valuer first.',
    'Our liability for the report is limited. The limit, and everything above, is set out in full in the document linked below. Please read it before you go ahead.',
  ],
} as const;

/**
 * Section 5.2, the checkbox label, split around the document title.
 *
 * Split rather than held as one string because the brief says "the document
 * title carries the link to the disclaimer page", so the title has to be an
 * anchor inside the sentence rather than a separate "read it here" tacked on
 * the end.
 */
export const DISCLAIMER_LABEL = {
  before: 'I have read and accept the ',
  linkText: DISCLAIMER_TITLE,
  after:
    ` (version ${DISCLAIMER_VERSION}, ${DISCLAIMER_VERSION_DATE}). I understand that the feasibility report is a high-level appraisal based on publicly available and client-supplied information; that it is not a survey, a valuation, legal advice or investment advice; that it does not guarantee that planning permission or an HMO licence will be granted; and that Thistle Architecture's liability for it is limited as set out in that document.`,
} as const;

/** Section 5.3, shown if they try to proceed without ticking. */
export const DISCLAIMER_ERROR =
  'Please confirm you have read and accept the Feasibility Report — Basis and Limitations before continuing.';

/**
 * What the browser sends, and what the server checks.
 *
 * The version travels with the tick so the request records which wording was on
 * screen, rather than which wording happens to be deployed when it arrives.
 * Those are the same thing today and stop being the same thing the moment a new
 * version ships while somebody has the page open.
 */
export interface DisclaimerAcceptance {
  disclaimerAccepted?: boolean;
  disclaimerVersion?: string;
}

/**
 * Server-side gate. R2.5: "the block is enforced server-side as well as in the
 * browser. Client-side validation on its own is not enough."
 *
 * Deliberately strict about the type. A JSON body can carry the string "false",
 * or 0, or the word "on" from a form encoder, and every one of those is truthy
 * or falsy in a way that would surprise somebody reading `if (accepted)`.
 */
export const disclaimerAccepted = (body: DisclaimerAcceptance): boolean =>
  body?.disclaimerAccepted === true;
