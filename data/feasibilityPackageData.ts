export type DeliverableGraphicKey =
  | 'sketch-scheme'
  | 'schedule'
  | 'constraints'
  | 'risk-register'
  | 'feasibility-document';

export interface DeliverableDetail {
  why: string;
  graphic: DeliverableGraphicKey;
}

export interface SampleReportPage {
  label: string;
  title: string;
}

export interface PackageFaq {
  question: string;
  answer: string;
  /** Rendered as a bulleted list under the answer, when present. Used for the
   *  exclusions entry, folded in here per Ed's August 2026 final brief once
   *  the standalone "One Fee. Everything In." section was removed. */
  list?: string[];
}

// "From £X" anchor for the whole feasibility range, not just the
// Architectural Feasibility. Ed's August 2026 final brief made the Automated
// Site Feasibility (£49.99) the accessible entry point; £298 was the
// Architectural-only anchor before that, set from his video feedback
// 2026-07-08 ("it starts at 298 from the lowest package"), and £1,800 before
// that.
export const pricingFrom = "£49.99";

// Indexed to match the deliverables array in data/howItWorksData.ts.
export const deliverableDetail: DeliverableDetail[] = [
  {
    why: "The part our architects spend their time on, because automation cannot do it. Real layouts you can show a buyer, a lender, or a JV partner.",
    graphic: "sketch-scheme",
  },
  {
    why: "The single document a QS, a valuer, or a planning officer asks for first. You will not be chasing it from a separate consultant.",
    graphic: "schedule",
  },
  {
    why: "We surface the planning risks that quietly kill schemes before you have spent money on a pre-app or a survey.",
    graphic: "constraints",
  },
  {
    why: "Every risk is named, sized, and assigned a cost. You go into the deal with eyes open, not optimism.",
    graphic: "risk-register",
  },
  {
    why: "The whole picture in one place, ending in a clear answer. We will tell you to walk away if the numbers do not stack up, even if you wanted a Go.",
    graphic: "feasibility-document",
  },
];

export const sampleReportPages: SampleReportPage[] = [
  { label: "Page 01", title: "Executive summary and recommendation" },
  { label: "Page 02", title: "Layout options and accommodation schedule" },
  { label: "Page 03", title: "Financial appraisal and risk register" },
];

export const packageFaqs: PackageFaq[] = [
  {
    question: "Is the fee really fixed?",
    answer: "Yes. The price you see is the price you pay, regardless of how the analysis unfolds. We absorb the cost if a deliverable takes longer than expected.",
  },
  {
    question: "What isn't included in the fixed fee?",
    answer: "Honest scope from the start. We can quote separately if any of these are needed.",
    list: [
      "Planning application submission and full planning drawings.",
      "Structural engineering surveys, party wall, or measured surveys.",
      "Pre-application meetings with the local authority.",
      "Detailed design or construction-stage architectural services.",
      "Specialist reports such as daylight, transport, or ecology.",
    ],
  },
  {
    question: "What if the recommendation is No-Go?",
    answer: "You still receive the full report, the risk register, and the reasoning. You will know exactly why the scheme does not stack up and what would need to change. The fee is the same either way.",
  },
  {
    question: "Do you charge VAT?",
    answer: "All our feasibility fees are inclusive of VAT, so the price you see is the price you pay. VAT-registered businesses can normally reclaim the VAT element.",
  },
  {
    question: "How quickly can you start?",
    // Ed's August 2026 final brief, Feasibility Journey & Pricing Structure:
    // "Define the five-working-day SLA as starting once both payment and all
    // required project information are complete." That's payment plus the
    // detailed brief, not payment alone, since the brief is what the analysis
    // actually runs from.
    answer: "The five-day clock starts once both your payment and your full project brief are in, not just from payment. That's the point we have everything we need to actually begin the analysis.",
  },
  {
    question: "Are revisions included?",
    answer: "One round of layout revisions is included if the architect-led stage surfaces options worth comparing. Beyond that we agree a fixed fee for further iteration.",
  },
  {
    question: "What if my building is more complex than the package assumes?",
    answer: "If the desk study flags genuine complexity, we will pause and agree a revised scope and fee with you before continuing. No surprises mid-feasibility.",
  },
  {
    question: "Can the report be used to apply for funding?",
    answer: "Yes. Reports include GDV projections, accommodation schedules, and a risk register, all structured to support lender, investor, and JV partner conversations.",
  },
  {
    question: "What happens after a Go recommendation?",
    answer: "You receive a fee proposal for the full project and a clear programme showing exactly what happens next. There is no obligation to proceed with us.",
  },
];
