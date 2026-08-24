export type StepGraphicKey = 'step1' | 'step2' | 'jodi-call' | 'step4' | 'final-meeting';

export interface HowItWorksStep {
  num: string;
  durationLabel: string;
  title: string;
  lead: string;
  detail: string;
  graphic: StepGraphicKey;
}

export interface Deliverable {
  title: string;
  desc: string;
}

// Duration labels are a proposal, flagged for confirmation with the client.
//
// Rewritten for Ed's August 2026 final brief: the journey now starts with
// payment (a 50% deposit for the Architectural Feasibility, or £49.99 in full
// for the Automated Site Feasibility), which secures the fixed fee and unlocks
// the detailed brief. The five-day clock itself still starts once the brief
// and payment are both complete, per the brief's Feasibility Journey section.
export const howItWorksSteps: HowItWorksStep[] = [
  {
    num: "01",
    durationLabel: "Under 2 minutes",
    title: "Secure Your Fixed Fee",
    lead: "Answer a few questions and pay online to lock in your fee. No obligation before this point, and no surprises after it.",
    detail: "The Architectural Feasibility takes a 50% holding deposit; the balance follows once your feasibility is delivered. The Automated Site Feasibility is £49.99, paid in full.",
    graphic: "step1",
  },
  {
    num: "02",
    durationLabel: "Under 10 minutes",
    title: "Complete Your Project Brief",
    lead: "Your calculator answers carry forward automatically, so you pick up straight into plans, photos and the details that define the building.",
    detail: "You do not need detailed drawings. Basic floor plans, an address, and your initial assumptions on unit count are enough. If you do not have floor plans, we can often source them ourselves.",
    graphic: "step1",
  },
  {
    num: "03",
    durationLabel: "Instant call, Architectural tier only",
    title: "Jodi Validates Your Brief",
    lead: "A short call with Jodi, our property expert, to check the brief and walk through your goals for the site.",
    detail: "Jodi captures anything specific to your plans for the building, so the analysis is pointed at the scheme you actually want. The Automated Site Feasibility skips this call and moves straight to analysis.",
    graphic: "jodi-call",
  },
  {
    num: "04",
    durationLabel: "Automated within hours, architect review over days 2 to 4",
    title: "Analysis, Then Architect Review",
    lead: "Our data engine checks planning history, site constraints, density data and comparable schemes, before an architect sketches the optimal layout.",
    detail: "Hundreds of data points are cross-referenced across trusted sources first. This is the desk study, done in hours, not weeks. On the Architectural Feasibility, an architect then pressure-tests the data against the physical building and works through the spatial problems automation cannot solve. The Automated Site Feasibility stops after the data stage.",
    graphic: "step2",
  },
  {
    num: "05",
    durationLabel: "Day 5",
    title: "Your Feasibility, Delivered",
    lead: "Architectural Feasibility: a final video call to review everything together. Automated Site Feasibility: your report, by email.",
    detail: "Either way you leave with complete clarity: the full feasibility document and a clear Go or No-Go. Enough to bid, to walk away, or to move into conveyancing with confidence.",
    graphic: "final-meeting",
  },
];

// One-line descriptions for the six compact layer cards nested under the
// analysis step. Indexed to match feasibilityLayers in data/feasibilityLayers.ts.
export const layerBlurbs: string[] = [
  "Five years of approvals and refusals around the site.",
  "Local and national policy, Article 4, and change-of-use thresholds.",
  "Nearby conversions, unit counts, and achieved sale values.",
  "Build cost, margin, and ROI before you commit capital.",
  "Local and national space standards, Building Regs, and licensing.",
  "Architect-led layouts, reviewed with you on a video call.",
];

// Ed's video feedback 2026-07-08: sketch schemes lead, "Efficiency Metrics" is
// gone, and the old Go/No-Go line is reframed around the full document.
export const deliverables: Deliverable[] = [
  { title: "Sketch Schemes", desc: "One to two layout options, drawn over your estate agent or measured plans." },
  { title: "Schedule of Accommodation & Space Standards", desc: "Unit-by-unit breakdown of GIA, room counts, and space standards compliance." },
  { title: "Planning Policy Analysis", desc: "Planning policy, flood risk, Article 4, conservation, and heritage assessment." },
  { title: "Risk Register", desc: "Structural, environmental, and commercial risks, quantified with cost implications." },
  { title: "Full Feasibility Document", desc: "Planning context and risk, development potential, Building Regs, and commercial position, with a clear Go or No-Go." },
];
