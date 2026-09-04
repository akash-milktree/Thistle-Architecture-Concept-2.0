export interface FeasibilityLayer {
  eyebrow: string;
  title: string;
  /**
   * The one-line description under the title on the card.
   *
   * These used to live in `rows` in sections/FeasibilityEngine.tsx while the
   * eyebrow and title lived here, so the six cards had two sources of truth and
   * a layer could be renamed in one file and described in another. They are one
   * record now, and one Tina field set ("What Is Analysed" → Layers) writes over
   * all three fields together.
   */
  body: string;
  /**
   * CMS field ids for this one layer. Per-item, never per-list: an id taken
   * from the list itself would open an empty form rather than the layer that
   * was clicked.
   */
  tina?: Partial<Record<'eyebrow' | 'title' | 'body', string>>;
}

// The six data layers of the Feasibility Engine. Shared between the homepage
// FeasibilityEngine section and the How It Works page so layer names cannot drift.
// Ed's video feedback 2026-07-08: the old "Local Policy Analysis" and "Targeted
// Policy Analysis" layers said the same thing and are merged; the old "Spatial
// layout optimisation" layer splits into the data work (space standards, Building
// Regs, licensing) and the design-led sketch scheme that follows it.
//
// Bodies stay as Ed rewrote them in round 1, when the layer titles changed too.
// Bodies shortened for Ed's August 2026 final brief: "keep 'What Is Analysed',
// but shorten the copy and let the data/graphics do more of the work."
//
// This array is now the FALLBACK for the CMS: the same strings are seeded into
// content/feasibility/package.json, so they still render unchanged if the page
// is ever mounted without a CMS query.
export const feasibilityLayers: FeasibilityLayer[] = [
  { eyebrow: "Layer 01", title: "Planning history & policy analysis", body: "What has been approved, refused, or is pending nearby." },
  { eyebrow: "Layer 02", title: "Policy analysis", body: "The policy and constraints that decide whether your scheme is viable." },
  { eyebrow: "Layer 03", title: "Comparable schemes", body: "Nearby conversions, unit counts, and achieved sale values." },
  { eyebrow: "Layer 04", title: "GDV and viability", body: "Build cost, margin, and ROI, before you commit." },
  { eyebrow: "Layer 05", title: "Spatial analysis", body: "Space standards, Building Regs, and licensing for your area." },
  { eyebrow: "Layer 06", title: "Architectural sketch scheme & video call", body: "The part automation cannot do: a designer draws the layout options over your plans." },
];
