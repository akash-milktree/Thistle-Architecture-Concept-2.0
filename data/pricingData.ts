// Pricing and feasibility routing, from Ed's "Pricing & Feasibility Calculator
// Brief", August 2026, emailed 12 August in the "Thistle Rebrand" thread.
//
// The brief carries a reference implementation. This follows it exactly rather
// than reinterpreting it, because the numbers are commercial decisions and the
// worked examples at the end of the brief are the acceptance test. Those seven
// examples are asserted in scripts/pricing-check.mjs.
//
// Where the brief contradicts itself, the choice made is recorded at the point
// it matters. See "development strategies" below.

export type ProjectType =
  | 'conversion'
  | 'refurbishment'
  | 'extension'
  | 'mixed_use'
  | 'new_build_development'
  | 'vacant_land'
  | 'unknown';

export type HeritageGrade = 'none' | 'conservation_area' | 'Grade II' | 'Grade II*' | 'Grade I';

export interface ProjectInput {
  /** Existing gross internal area in m². Null when the user does not know it. */
  gia: number | null;
  projectType: ProjectType;
  /** 1, 2 or 3+. 3+ is a hard stop. */
  numberOfBuildings: number;
  isMasterplan: boolean;
  heritageGrade: HeritageGrade;
  /** Distinct development strategies to test. 3+ is a hard stop. */
  numberOfDevelopmentStrategies: number;
  /** Enough drawings, surveys or photos to define the existing building. */
  sufficientExistingInformation: boolean;
  /** False when the user picks "not sure" or "other" for the proposed use. */
  proposedUseKnown: boolean;
  mixedUse: boolean;
  significantExtension: boolean;
  /** Exactly one alternative design option on top of the preferred one. */
  additionalDesignOption: boolean;
  specialPlanningConstraint: boolean;
}

export type FeasibilityRoute =
  | { route: 'instant_payment'; price: number; base: number; uplift: number; factors: number }
  | { route: 'expert_session'; price: null; reason: string };

/** Base fee by gross internal area, for display. The formula below is the source of truth. */
export const AREA_BANDS = [
  { label: 'Up to 150m²', fee: 298 },
  { label: '151 to 250m²', fee: 348 },
  { label: '251 to 350m²', fee: 398 },
  { label: '351 to 450m²', fee: 448 },
  { label: '451 to 550m²', fee: 498 },
  { label: '551 to 600m²', fee: 548 },
  { label: 'Over 600m²', fee: null },
] as const;

export const COMPLEXITY_UPLIFTS = [
  { label: 'Straightforward single-use conversion', uplift: 0 },
  { label: 'Mixed-use development', uplift: 100 },
  { label: 'Conservation Area', uplift: 50 },
  { label: 'Grade II listed building', uplift: 150 },
  { label: 'Two separate buildings', uplift: 75 },
  { label: 'Significant extension element', uplift: 75 },
  { label: 'One additional design option', uplift: 75 },
  { label: 'Significant special planning constraint', uplift: 50 },
] as const;

export const BASE_FEE = 298;
export const AREA_INCLUDED = 150;
export const AREA_STEP = 100;
export const AREA_STEP_FEE = 50;
export const MAX_AUTOMATIC_GIA = 600;
export const MAX_AUTOMATIC_UPLIFT = 250;
export const MAX_COMPLEXITY_FACTORS = 3;

const expert = (reason: string): FeasibilityRoute => ({ route: 'expert_session', price: null, reason });

/**
 * The eligibility gate and price calculation from section 6 of the brief.
 *
 * Returns either an instant payable price or a route to a free Expert Session.
 * Never returns a price for anything the brief calls a hard stop, and never
 * prices a project whose complexity has run past the safety thresholds.
 */
export function getFeasibilityRoute(project: ProjectInput): FeasibilityRoute {
  // Hard stops, in the brief's order. Each returns before any price exists, so
  // a stopped project cannot leak a number into the UI.
  if (!project.gia || project.gia <= 0) return expert('We could not establish the floor area.');
  if (project.gia > MAX_AUTOMATIC_GIA) return expert('The building is larger than 600m².');
  if (project.projectType === 'vacant_land' || project.projectType === 'new_build_development') {
    return expert('Development land and new build need a bespoke scope.');
  }
  if (project.numberOfBuildings >= 3) return expert('Three or more separate buildings.');
  if (project.isMasterplan) return expert('Masterplanning and whole-site redevelopment need a bespoke scope.');
  if (project.heritageGrade === 'Grade I' || project.heritageGrade === 'Grade II*') {
    return expert('Grade I and Grade II* listed buildings need a bespoke scope.');
  }
  // The brief's bullet list says "two or more fundamentally different
  // development strategies", but both its own reference code and its
  // questionnaire routing say three or more: the questionnaire prices "+1
  // alternative" as a £75 uplift and only sends "several" to an Expert Session.
  // Two of the three agree, and pricing a second option is clearly intended, so
  // the threshold is 3. Flagged to Ed.
  if (project.numberOfDevelopmentStrategies >= 3) return expert('Several different strategies to test.');
  if (!project.sufficientExistingInformation) return expert('Not enough information about the existing building.');
  if (!project.proposedUseKnown) return expert('The proposed use is not yet settled.');

  // Area fee. £298 covers 150m²; every started 100m² above that adds £50.
  let price = BASE_FEE;
  if (project.gia > AREA_INCLUDED) {
    price += Math.ceil((project.gia - AREA_INCLUDED) / AREA_STEP) * AREA_STEP_FEE;
  }

  let uplift = 0;
  let factors = 0;

  if (project.mixedUse) { uplift += 100; factors++; }
  // Heritage does not stack: a Grade II listing absorbs the Conservation Area
  // uplift rather than adding to it.
  if (project.heritageGrade === 'Grade II') { uplift += 150; factors++; }
  else if (project.heritageGrade === 'conservation_area') { uplift += 50; factors++; }
  if (project.numberOfBuildings === 2) { uplift += 75; factors++; }
  if (project.significantExtension) { uplift += 75; factors++; }
  if (project.additionalDesignOption) { uplift += 75; factors++; }
  if (project.specialPlanningConstraint) { uplift += 50; factors++; }

  // Safety stop. Keeps automatic pricing away from scopes that have quietly
  // become involved, even when every individual answer was priceable.
  if (factors >= MAX_COMPLEXITY_FACTORS || uplift > MAX_AUTOMATIC_UPLIFT) {
    return expert('This one has enough moving parts to be worth a conversation.');
  }

  return { route: 'instant_payment', price: price + uplift, base: price, uplift, factors };
}

/** The four customer-facing products, in order. */
export const PRODUCTS = [
  {
    id: 'hmo-check',
    name: 'HMO Property Check',
    price: '£15.99',
    strapline: 'Automated HMO screening.',
    body: 'Planning and Article 4 checks, local HMO information, property and location data, key planning considerations and initial development indicators.',
    cta: 'Check an HMO',
    href: 'https://hmochecker.co.uk',
    external: true,
    turnaround: null,
  },
  {
    id: 'automated-feasibility',
    name: 'Automated Site Feasibility',
    price: '£49.99',
    strapline: 'Detailed data-led appraisal.',
    body: 'For existing buildings nationwide: commercial to residential, apartments, HMOs, co-living, mixed use and similar opportunities.',
    cta: 'Analyse My Site',
    href: '/feasibility-package',
    external: false,
    turnaround: 'Around 30 minutes',
  },
  {
    id: 'architectural-feasibility',
    name: 'Architectural Feasibility',
    price: 'From £298',
    strapline: 'Data, architectural judgement and design.',
    body: 'Architect review, sketch scheme, proposed layout, unit and bedroom testing, a one-hour architect meeting, a project review and recommended next steps.',
    cta: 'Get My Instant Feasibility Price',
    href: '/pricing#calculator',
    external: false,
    turnaround: '5 working days',
  },
  {
    id: 'bespoke',
    name: 'Bespoke',
    price: 'Expert Session',
    strapline: 'Complex and larger projects.',
    body: 'Anything over 600m², development land, new build, masterplanning or a scheme with several strategies to test. We scope it properly first, then quote a fixed fee.',
    cta: 'Book a Free Expert Session',
    href: '/contact',
    external: false,
    turnaround: null,
  },
] as const;

/** What the £49.99 automated appraisal covers, per the brief. */
export const AUTOMATED_CONTENTS = [
  'Property and site overview, location and surrounding context',
  'Existing use, potential development routes and relevant planning policy',
  'Planning history, nearby precedents, constraints and planning-risk assessment',
  'Local space and amenity standards, and indicative development capacity',
  'Indicative bedroom or unit potential',
  'Local rental and sales comparables, indicative income and GDV',
  'High-level viability indicators',
  'Building Regulations and technical constraint flags',
  'Heritage, highways and parking considerations',
  'Recommended development strategy, roadmap and next steps',
];

/** The boundary line the brief asks to be stated plainly. */
export const AUTOMATED_BOUNDARY =
  'The £49.99 appraisal is fully automated and data-led. It does not include architectural drawings or an architect review.';
