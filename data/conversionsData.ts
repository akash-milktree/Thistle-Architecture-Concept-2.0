import { deliverables } from './howItWorksData';

export interface ConversionStat {
  label: string;
  value: string;
}

export interface ConversionChallenge {
  title: string;
  detail: string;
}

export interface DeliverableHighlight {
  deliverableIndex: number; // 0..4, index into deliverables in data/howItWorksData.ts
  forThisType: string;
}

export interface ConversionExtraSection {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  /** Defaults to the office exterior shot when unset. */
  image?: string;
  imageAlt?: string;
  /** Optional CTA. Set external for links off this site. */
  cta?: { label: string; href: string; external?: boolean };
}

export interface Conversion {
  slug: string;
  /**
   * Which client review to show on this page. Set per conversion so a reader
   * sees a review about the thing they are reading about, rather than the same
   * quote on all four pages.
   */
  reviewTopic?: 'feasibility' | 'hmo' | 'commercial' | 'planning';
  label: string;
  heroHeading: string;
  heroDescription: string;
  opportunityCopy: string;
  opportunityStats: ConversionStat[];
  challenges: ConversionChallenge[];
  extraSection?: ConversionExtraSection;
  deliverableHighlights: DeliverableHighlight[];
  relatedCaseStudySlug?: string;
  metaTitle: string;
  metaDescription: string;
}

export const conversions: Conversion[] = [
  {
    slug: "commercial-to-residential",
    reviewTopic: "commercial",
    label: "Commercial to Residential",
    heroHeading: "Turn A Commercial Building Into Viable Homes.",
    heroDescription: "A feasibility built for developers buying offices, retail upper parts, and small commercial blocks to convert into housing.",
    opportunityCopy: "Commercial-to-residential conversions are the fastest route from a tired commercial asset to a stabilised residential scheme. Less risk than ground-up, faster than full redevelopment, and supported by national permitted-development rights.",
    opportunityStats: [
      { label: "Typical unit yield", value: "6 to 14" },
      { label: "Planning route", value: "Class MA or full" },
      { label: "Prior approval decision", value: "56 days" },
    ],
    challenges: [
      { title: "Building Regs and fire compliance", detail: "Office and retail buildings often need significant work to meet residential Building Regulations, especially around fire compartmentation and means of escape." },
      { title: "Daylight to lower floors", detail: "Deep commercial floor plates can leave ground-floor or rear-facing units short of daylight, which tanks the scheme on planning and on resale." },
      { title: "Hidden structural costs", detail: "Removing walls, adding bathrooms, and routing services through a commercial structure can add cost that the headline GDV does not reveal." },
    ],
    extraSection: {
      id: "office-to-resi-class-ma",
      eyebrow: "Office To Residential",
      title: "Office Conversions Under Class MA.",
      body: [
        "Office-to-residential is the most-used permitted development route in the country. Class MA lets you change a qualifying commercial building (Class E) to residential (Class C3) through prior approval rather than full planning, with the council required to decide within 56 days.",
        "Since March 2024 the rules have loosened: the old 1,500 sqm floorspace cap and the vacancy requirement have both been removed. The building still needs two years in Class E use, and the prior approval tests on daylight, noise, flooding, contamination, transport, and fire safety all still apply.",
        "The route fails quietly when a building sits inside an Article 4 direction, or when deep floor plates cannot deliver acceptable natural light. That is exactly what our desk study screens before you commit to a purchase. You can run a first check yourself with our free Class MA Checker.",
      ],
      cta: { label: "Try the free Class MA Checker", href: "/tools/class-ma-checker" },
    },
    deliverableHighlights: [
      { deliverableIndex: 0, forThisType: "Tested against the building's real structural grid and core positions, not an assumed plan." },
      { deliverableIndex: 2, forThisType: "Class MA eligibility, Article 4 directions, conservation, and noise mapping covered before you bid." },
      { deliverableIndex: 3, forThisType: "Every conversion risk named and costed, so the deal model reflects reality." },
      { deliverableIndex: 4, forThisType: "Net-to-gross and commercial position set out in full, since commercial-to-resi often loses more area than developers expect." },
    ],
    relatedCaseStudySlug: "axis-house",
    metaTitle: "Commercial to Residential Feasibility | Thistle Architecture",
    metaDescription: "Data-driven feasibility for converting commercial buildings into residential schemes, including office conversions under Class MA. Five-day turnaround, fixed fee.",
  },
  {
    slug: "hmo",
    reviewTopic: "hmo",
    label: "HMO",
    heroHeading: "HMO Feasibility, Without The Guesswork.",
    heroDescription: "Houses of multiple occupation work on tight margins. A feasibility that pressure-tests density, licensing, and layout before you put in an offer.",
    opportunityCopy: "HMO conversions deliver strong yield in the right area, but Article 4 directions, density caps, and licensing thresholds can quietly kill a deal before it starts. The numbers only stack up when the regulatory picture is genuinely clear.",
    opportunityStats: [
      { label: "Typical room count", value: "5 to 9" },
      { label: "Planning route", value: "Full or Class C4" },
      { label: "Typical yield", value: "8% to 12%" },
    ],
    challenges: [
      { title: "Density and Article 4", detail: "Local HMO density caps and Article 4 directions vary borough by borough. The right address can sail through, the wrong one is blocked entirely." },
      { title: "Licensing thresholds", detail: "Mandatory, additional, and selective licensing schemes overlap unpredictably. Each adds cost, time, and standards the conversion must meet." },
      { title: "Space-standard compliance", detail: "HMO room sizes are tightly regulated. A scheme that looks viable on a brochure plan often fails the minimum-area tests for habitable rooms." },
    ],
    // Ed's video feedback 2026-07-08: link this page to HMO Checker, the sister
    // product in the Thistle Group. £15.99 verified on hmochecker.co.uk.
    extraSection: {
      id: "hmo-checker",
      eyebrow: "Sister Product",
      title: "Check The Address First.",
      body: [
        "HMO Checker is part of the Thistle Group, and it answers the first question about any HMO: does this address work at all? It pulls planning and licensing data for a property and reports the Article 4 position, the licensing schemes that apply, and what has been approved nearby.",
        "A single report is a £15.99 one-off, and there are free tools alongside it including an Article 4 checker and a conversion calculator. It is the cheapest way to rule an address out before you spend money on it.",
        "Where HMO Checker tells you whether the address is worth pursuing, a feasibility tells you what the building will actually give you: how many rooms, at what sizes, and whether the deal stacks up.",
      ],
      image: "/images/site/hero-winchester.jpg",
      imageAlt: "Aerial view over Winchester rooftops and streets",
      cta: { label: "Check an address on HMO Checker", href: "https://hmochecker.co.uk", external: true },
    },
    deliverableHighlights: [
      { deliverableIndex: 2, forThisType: "HMO density saturation, Article 4 exposure, and licensing scheme overlap mapped at desk-study stage." },
      { deliverableIndex: 0, forThisType: "Room layouts checked against HMO minimum sizes and amenity standards, not just optimistic plans." },
      { deliverableIndex: 3, forThisType: "Licensing costs, planning risks, and standards-compliance gaps each costed and ranked." },
      { deliverableIndex: 4, forThisType: "Net-to-gross and per-room yield projections benchmarked against local market data." },
    ],
    relatedCaseStudySlug: "st-johns-aylesbury",
    metaTitle: "HMO Feasibility | Thistle Architecture",
    metaDescription: "HMO conversion feasibility. Density, Article 4, licensing, and layout pressure-tested in five days. Fixed fee, clear Go or No-Go.",
  },
  // Added on Ed's video feedback 2026-07-08: he wants four conversion types,
  // "high-end residential, commercial to residential, HMO, a mixed-use
  // commercial". He also wants Scarlett's input on these and on the SEO
  // structure, so treat the copy below as a first pass.
  {
    slug: "mixed-use-commercial",
    reviewTopic: "commercial",
    label: "Mixed-Use Commercial",
    heroHeading: "Keep The Shop. Build Homes Above It.",
    heroDescription: "High-street buildings where the ground floor has to stay commercial and the value sits in the floors above.",
    opportunityCopy: "Plenty of high-street buildings are worth more as a mixed-use scheme than as either pure commercial or pure residential. Retaining an active ground-floor unit is often what makes the residential above acceptable in policy terms, and it keeps an income stream while the rest is converted.",
    opportunityStats: [
      { label: "Typical arrangement", value: "Retail below, homes above" },
      { label: "Planning route", value: "Full or prior approval" },
      { label: "Common blocker", value: "Ground-floor policy" },
    ],
    challenges: [
      { title: "Policy protects the ground floor", detail: "Many local and neighbourhood plans resist losing commercial frontage in a centre. Overturning that needs evidence: a documented marketing exercise, sustained vacancy, and ideally a viability appraisal." },
      { title: "Separating the uses", detail: "Independent access, fire separation, acoustics between commercial and residential, and separate services all have to be designed in from the start, not retrofitted onto a layout that ignored them." },
      { title: "Servicing and refuse", detail: "Two uses in one envelope means two sets of bins, deliveries, and cycle storage, all of which officers scrutinise closely on constrained high-street sites." },
    ],
    deliverableHighlights: [
      { deliverableIndex: 0, forThisType: "Layouts that keep the commercial unit working while the floors above become homes, with genuinely independent access." },
      { deliverableIndex: 2, forThisType: "The ground-floor retention policy read properly, including whether a change is arguable and what evidence it would take." },
      { deliverableIndex: 3, forThisType: "The risks of running two uses in one building named and costed, from acoustics to refuse strategy." },
      { deliverableIndex: 4, forThisType: "The commercial case for the mixed scheme against the pure-residential fallback, so you can see which is actually worth more." },
    ],
    relatedCaseStudySlug: "bath-street-cheddar",
    metaTitle: "Mixed-Use Commercial Feasibility | Thistle Architecture",
    metaDescription: "Feasibility for mixed-use conversions: retained commercial at ground floor with residential above. Ground-floor policy, access separation, and viability tested in five days.",
  },
  {
    slug: "high-end-residential",
    reviewTopic: "planning",
    label: "High-End Residential",
    heroHeading: "Extend, Remodel, Or Convert To Something Better.",
    heroDescription: "Feasibility for high-end residential projects, where the question is what the house could become rather than how many units fit in it.",
    opportunityCopy: "High-end residential works differently to a yield play. The value is in the quality of the finished house and how well the design uses what is already there, but the constraints are the same ones that catch developers: planning policy, heritage, and what the existing fabric will actually allow.",
    opportunityStats: [
      { label: "Typical scope", value: "Extension or remodel" },
      { label: "Planning route", value: "Full or permitted development" },
      { label: "Common blocker", value: "Heritage and conservation" },
    ],
    challenges: [
      { title: "Heritage and conservation", detail: "Listing, conservation areas, and the setting of nearby listed buildings all shape what is possible externally, and they are the constraints most often discovered too late." },
      { title: "What permitted development still allows", detail: "A surprising amount can be done without a full application, but volume allowances are cumulative and easy to exceed by accident, which turns a simple project into an application." },
      { title: "The existing fabric", detail: "Older houses rarely match their drawings. Head heights, structure, and floor levels decide what a remodel can actually deliver, and only a survey settles it." },
    ],
    deliverableHighlights: [
      { deliverableIndex: 0, forThisType: "Options drawn over your existing plans, so you can see what the house becomes before committing to a route." },
      { deliverableIndex: 2, forThisType: "Conservation, listing, and permitted development allowances checked before you spend on design." },
      { deliverableIndex: 3, forThisType: "The risks that move a high-end budget, from structure to heritage objection, named early." },
      { deliverableIndex: 4, forThisType: "A clear view of whether the project is worth doing, and which option is worth doing." },
    ],
    relatedCaseStudySlug: "bereweeke-avenue",
    metaTitle: "High-End Residential Feasibility | Thistle Architecture",
    metaDescription: "Feasibility for high-end residential projects: extensions, remodels, and conversions. Heritage, permitted development, and existing fabric tested before you commit to design.",
  },
];

export const getConversion = (slug: string): Conversion | undefined =>
  conversions.find((c) => c.slug === slug);

// deliverableIndex points into the deliverables array by position, so removing
// a deliverable silently drops any highlight pointing past the end (the
// renderer guards with `if (!deliverable) return null`). That happened when
// "Efficiency Metrics" was removed on Ed's instruction. Fail loudly instead.
for (const c of conversions) {
  for (const h of c.deliverableHighlights) {
    if (!deliverables[h.deliverableIndex]) {
      throw new Error(
        `conversionsData: "${c.slug}" references deliverableIndex ${h.deliverableIndex}, but only ${deliverables.length} deliverables exist.`,
      );
    }
  }
}
