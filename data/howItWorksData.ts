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
export const howItWorksSteps: HowItWorksStep[] = [
  {
    num: "01",
    durationLabel: "Under 2 minutes",
    title: "Upload Property Details",
    lead: "Share your property's address with a few basic details: size, floor count, and current use.",
    detail: "You do not need detailed drawings. Basic floor plans, an address, and your initial assumptions on unit count are enough. If you do not have floor plans, we can often source them ourselves.",
    graphic: "step1",
  },
  {
    num: "02",
    durationLabel: "Instant call",
    title: "Project Data Gathering Session",
    lead: "An instant call with Jodi, our property expert, to gather the details we need and walk through your goals for the site.",
    detail: "A short, focused conversation. Jodi captures anything specific to your plans for the building, so the analysis is pointed at the scheme you actually want.",
    graphic: "jodi-call",
  },
  {
    num: "03",
    durationLabel: "Automated, within 48 hours",
    title: "Automated Analysis",
    lead: "Our data engine checks planning history, site constraints, density data, and comparable schemes across your local area.",
    detail: "Hundreds of data points are cross-referenced across trusted sources before a human looks at the site. This is the desk study, done in hours, not weeks. Automating the laborious part is what frees our architects to spend their time on the sketch scheme, which is where the real value sits.",
    graphic: "step2",
  },
  {
    num: "04",
    durationLabel: "Days 3 to 4",
    title: "Sketch Scheme Stage",
    lead: "One of our architects carries out the sketch scheme analysis to find the best possible layout for the building.",
    detail: "The architect pressure-tests the data against the physical building, sketches the optimal unit layout, and works through the spatial problems automation cannot solve.",
    graphic: "step4",
  },
  {
    num: "05",
    durationLabel: "Day 5",
    title: "Final Meeting",
    lead: "We review the completed feasibility together on a video call, five days after you uploaded your details.",
    detail: "You leave the call with complete clarity: the full feasibility document, the sketch schemes, and a clear Go or No-Go. Enough to bid, to walk away, or to move into conveyancing with confidence.",
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
