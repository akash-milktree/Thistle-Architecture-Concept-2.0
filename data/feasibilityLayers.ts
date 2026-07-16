export interface FeasibilityLayer {
  eyebrow: string;
  title: string;
}

// The six data layers of the Feasibility Engine. Shared between the homepage
// FeasibilityEngine section and the How It Works page so layer names cannot drift.
// Ed's video feedback 2026-07-08: the old "Local Policy Analysis" and "Targeted
// Policy Analysis" layers said the same thing and are merged; the old "Spatial
// layout optimisation" layer splits into the data work (space standards, Building
// Regs, licensing) and the architect-led sketch scheme that follows it.
export const feasibilityLayers: FeasibilityLayer[] = [
  { eyebrow: "Layer 01", title: "Planning history & policy analysis" },
  { eyebrow: "Layer 02", title: "Policy analysis" },
  { eyebrow: "Layer 03", title: "Comparable schemes" },
  { eyebrow: "Layer 04", title: "GDV and viability" },
  { eyebrow: "Layer 05", title: "Spatial analysis" },
  { eyebrow: "Layer 06", title: "Architectural sketch scheme & video call" },
];
