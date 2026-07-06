export interface ConversionStat {
  label: string;
  value: string;
}

export interface ConversionChallenge {
  title: string;
  detail: string;
}

export interface DeliverableHighlight {
  deliverableIndex: number; // 0..5, index into deliverables in data/howItWorksData.ts
  forThisType: string;
}

export interface ConversionExtraSection {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
}

export interface Conversion {
  slug: string;
  label: string;
  heroHeading: string;
  heroDescription: string;
  heroImage?: string;
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
    },
    deliverableHighlights: [
      { deliverableIndex: 0, forThisType: "Tested against the building's real structural grid and core positions, not an assumed plan." },
      { deliverableIndex: 2, forThisType: "Class MA eligibility, Article 4 directions, conservation, and noise mapping covered before you bid." },
      { deliverableIndex: 3, forThisType: "Every conversion risk named and costed, so the deal model reflects reality." },
      { deliverableIndex: 5, forThisType: "Net-to-gross checked carefully, since commercial-to-resi often loses more area than developers expect." },
    ],
    relatedCaseStudySlug: "axis-house",
    metaTitle: "Commercial to Residential Feasibility | Thistle Architecture",
    metaDescription: "Data-driven feasibility for converting commercial buildings into residential schemes, including office conversions under Class MA. Five-day turnaround, fixed fee.",
  },
  {
    slug: "hmo",
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
    deliverableHighlights: [
      { deliverableIndex: 2, forThisType: "HMO density saturation, Article 4 exposure, and licensing scheme overlap mapped at desk-study stage." },
      { deliverableIndex: 0, forThisType: "Room layouts checked against HMO minimum sizes and amenity standards, not just optimistic plans." },
      { deliverableIndex: 3, forThisType: "Licensing costs, planning risks, and standards-compliance gaps each costed and ranked." },
      { deliverableIndex: 5, forThisType: "Net-to-gross and per-room yield projections benchmarked against local market data." },
    ],
    relatedCaseStudySlug: "st-johns-aylesbury",
    metaTitle: "HMO Feasibility | Thistle Architecture",
    metaDescription: "HMO conversion feasibility. Density, Article 4, licensing, and layout pressure-tested in five days. Fixed fee, clear Go or No-Go.",
  },
];

export const getConversion = (slug: string): Conversion | undefined =>
  conversions.find((c) => c.slug === slug);
