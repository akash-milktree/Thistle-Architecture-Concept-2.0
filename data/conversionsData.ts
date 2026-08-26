import { deliverables, type Deliverable } from './howItWorksData';

export interface ConversionStat {
  label: string;
  value: string;
}

export interface ConversionChallenge {
  title: string;
  detail: string;
}

/**
 * The five deliverables in data/howItWorksData.ts, addressed by a stable name
 * rather than by their position in that array.
 *
 * This was `deliverableIndex: number` — a raw index into `deliverables`. That
 * held while the array was only ever edited in code, but the deliverables are
 * moving into the CMS, and an editor reordering them there would silently
 * repoint every highlight on every conversion page at the wrong deliverable:
 * the right cards, the wrong "for this type" line under each. No error, no
 * 404, nothing to notice until a client reads it.
 *
 * So the join is by identity instead of position. The id is matched to the
 * deliverable's canonical title below, which survives a reorder. It does not
 * survive a retitle — but a retitle is a deliberate act and the check at the
 * bottom of this file throws on it at import time, where a reorder was silent.
 */
export type DeliverableId =
  | 'sketch-schemes'
  | 'schedule-of-accommodation'
  | 'planning-policy'
  | 'risk-register'
  | 'full-feasibility';

/**
 * id -> the title the deliverable carries in data/howItWorksData.ts.
 *
 * Kept here rather than added to the Deliverable records themselves because
 * that array belongs to the feasibility-package pages; this map is the
 * conversions unit's own view of it, and the only place the two are tied
 * together.
 */
const DELIVERABLE_TITLES: Record<DeliverableId, string> = {
  'sketch-schemes': 'Sketch Schemes',
  'schedule-of-accommodation': 'Schedule of Accommodation & Space Standards',
  'planning-policy': 'Planning Policy Analysis',
  'risk-register': 'Risk Register',
  'full-feasibility': 'Full Feasibility Document',
};

/**
 * The deliverable a highlight points at, or undefined if the id no longer
 * matches anything. Takes a plain string because the id also arrives from the
 * CMS, where it is a read-only text field rather than a union type.
 */
export const deliverableFor = (id: string): Deliverable | undefined => {
  const title = DELIVERABLE_TITLES[id as DeliverableId];
  return title ? deliverables.find((d) => d.title === title) : undefined;
};

export interface DeliverableHighlight {
  /** Which of the five deliverables this card is about. */
  deliverableId: DeliverableId;
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

export interface ConversionFaq {
  question: string;
  answer: string;
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
  /**
   * Sector-specific planning/design questions. Ed's August 2026 final brief:
   * "Replace repeated generic feasibility FAQs with sector-specific planning/
   * design questions." Falls back to the generic FAQ list in sections/FAQ.tsx
   * when unset, so a page can ship before its own FAQs are written.
   */
  faqs?: ConversionFaq[];
}

export const conversions: Conversion[] = [
  {
    slug: "commercial-to-residential",
    reviewTopic: "commercial",
    label: "Commercial to Residential",
    // Ed's August 2026 final brief: search-intent-led H1, with the previous
    // punchy line kept as the supporting copy underneath it.
    heroHeading: "Commercial to Residential Conversion Architects",
    heroDescription: "Turn a commercial building into viable homes. A feasibility built for developers buying offices, retail upper parts, and small commercial blocks to convert into housing.",
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
      { deliverableId: 'sketch-schemes', forThisType: "Tested against the building's real structural grid and core positions, not an assumed plan." },
      { deliverableId: 'planning-policy', forThisType: "Class MA eligibility, Article 4 directions, conservation, and noise mapping covered before you bid." },
      { deliverableId: 'risk-register', forThisType: "Every conversion risk named and costed, so the deal model reflects reality." },
      { deliverableId: 'full-feasibility', forThisType: "Net-to-gross and commercial position set out in full, since commercial-to-resi often loses more area than developers expect." },
    ],
    relatedCaseStudySlug: "axis-house",
    metaTitle: "Commercial to Residential Conversion Architects | Thistle Architecture",
    metaDescription: "Data-driven feasibility for converting commercial buildings into residential schemes, including office conversions under Class MA. Five-day turnaround, fixed fee.",
    faqs: [
      {
        question: "Does my building qualify for Class MA prior approval?",
        answer: "Only if it has been in genuine Class E use, which covers offices, shops, restaurants, and similar commercial or business uses. The building needs two years in that use, and the site must sit outside an Article 4 direction removing the right. Our feasibility checks both before you commit to a purchase.",
      },
      {
        question: "What if the building isn't in Class E, or Class MA doesn't apply?",
        answer: "A full planning application is still a route to residential use, it just loses the 56-day prior approval clock and the more limited set of tests. We assess which route actually applies to your building rather than assuming Class MA by default.",
      },
      {
        question: "How do you deal with daylight to lower or rear-facing floors?",
        answer: "It's one of the tests that quietly kills commercial conversions. We model which units are at risk from the floor plate depth before you commit, so you know whether a layout change or a different unit mix is needed rather than finding out at decision stage.",
      },
      {
        question: "What extra costs catch people out in commercial conversions?",
        answer: "Fire compartmentation, means of escape, and routing new bathroom and kitchen services through a structure built for open-plan commercial use. These rarely show up on a headline GDV, which is why our risk register prices them in rather than leaving them as a surprise.",
      },
    ],
  },
  {
    slug: "hmo",
    reviewTopic: "hmo",
    label: "HMO",
    heroHeading: "HMO Architects & Feasibility Specialists",
    heroDescription: "HMO feasibility, without the guesswork. Houses of multiple occupation work on tight margins, so we pressure-test density, licensing, and layout before you put in an offer.",
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
      { deliverableId: 'planning-policy', forThisType: "HMO density saturation, Article 4 exposure, and licensing scheme overlap mapped at desk-study stage." },
      { deliverableId: 'sketch-schemes', forThisType: "Room layouts checked against HMO minimum sizes and amenity standards, not just optimistic plans." },
      { deliverableId: 'risk-register', forThisType: "Licensing costs, planning risks, and standards-compliance gaps each costed and ranked." },
      { deliverableId: 'full-feasibility', forThisType: "Net-to-gross and per-room yield projections benchmarked against local market data." },
    ],
    relatedCaseStudySlug: "st-johns-aylesbury",
    metaTitle: "HMO Architects & Feasibility Specialists | Thistle Architecture",
    metaDescription: "HMO conversion feasibility. Density, Article 4, licensing, and layout pressure-tested in five days. Fixed fee, clear Go or No-Go.",
    faqs: [
      {
        question: "Is this address inside an Article 4 direction?",
        answer: "It depends entirely on the local authority; Article 4 removes the permitted-development right to convert to a small HMO borough by borough, sometimes street by street. We check the specific address rather than assuming the area's general position applies to your site.",
      },
      {
        question: "Which licensing scheme applies to my HMO?",
        answer: "Mandatory licensing applies nationally above five occupants; many councils layer additional or selective licensing on top, each with its own thresholds and standards. We identify which schemes bite on your specific property and what they will require.",
      },
      {
        question: "How many bedrooms will actually fit, not just on paper?",
        answer: "We test room sizes against local and national space standards and realistic communal amenity requirements, not an optimistic brochure layout. That number is usually lower than a quick sketch suggests, and it is the number that survives a licensing inspection.",
      },
      {
        question: "What's the difference between a standard HMO and a large or co-living scheme?",
        answer: "Once you're above the typical five-to-nine room range, or into shared amenity space, management and fire strategy change materially, and planning usually shifts to a Sui Generis application rather than Class C4. Larger schemes are a distinct specialism of ours.",
      },
    ],
  },
  // Added on Ed's video feedback 2026-07-08: he wants four conversion types,
  // "high-end residential, commercial to residential, HMO, a mixed-use
  // commercial". He also wants Scarlett's input on these and on the SEO
  // structure, so treat the copy below as a first pass.
  {
    slug: "mixed-use-commercial",
    reviewTopic: "commercial",
    label: "Mixed-Use Commercial",
    heroHeading: "Mixed-Use Development Architects",
    heroDescription: "Keep the shop, build homes above it. High-street buildings where the ground floor has to stay commercial and the value sits in the floors above.",
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
      { deliverableId: 'sketch-schemes', forThisType: "Layouts that keep the commercial unit working while the floors above become homes, with genuinely independent access." },
      { deliverableId: 'planning-policy', forThisType: "The ground-floor retention policy read properly, including whether a change is arguable and what evidence it would take." },
      { deliverableId: 'risk-register', forThisType: "The risks of running two uses in one building named and costed, from acoustics to refuse strategy." },
      { deliverableId: 'full-feasibility', forThisType: "The commercial case for the mixed scheme against the pure-residential fallback, so you can see which is actually worth more." },
    ],
    relatedCaseStudySlug: "bath-street-cheddar",
    metaTitle: "Mixed-Use Development Architects | Thistle Architecture",
    metaDescription: "Feasibility for mixed-use conversions: retained commercial at ground floor with residential above. Ground-floor policy, access separation, and viability tested in five days.",
    faqs: [
      {
        question: "Can I lose the ground-floor commercial use altogether?",
        answer: "Often not without a fight. Many local and neighbourhood plans specifically resist losing active commercial frontage in a centre. If that's the ambition, you generally need evidence: a documented marketing exercise, sustained vacancy, or a viability appraisal showing the commercial use is no longer sustainable.",
      },
      {
        question: "How do you separate the commercial and residential parts of the building?",
        answer: "Independent access, fire separation between uses, acoustic separation, and separate services all have to be designed in from the outset. Retrofitting them onto a layout that ignored them is where most mixed-use schemes lose money and time.",
      },
      {
        question: "What extra servicing does a mixed-use scheme need?",
        answer: "Two uses under one roof usually means two sets of bins, deliveries, and cycle storage, which officers scrutinise closely on tight high-street sites. We test whether the site can actually accommodate this before you commit to the scheme.",
      },
      {
        question: "Does the residential above still need its own front door?",
        answer: "In almost every case, yes. Shared access through a commercial unit is a common reason for refusal or for a licensing condition later, so genuinely independent residential access is something we check for at feasibility stage, not left to detailed design.",
      },
    ],
  },
  {
    slug: "high-end-residential",
    reviewTopic: "planning",
    label: "High-End Residential",
    heroHeading: "High-End Residential Architects",
    heroDescription: "Extend, remodel, or convert to something better. Feasibility for high-end residential projects, where the question is what the house could become rather than how many units fit in it.",
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
      { deliverableId: 'sketch-schemes', forThisType: "Options drawn over your existing plans, so you can see what the house becomes before committing to a route." },
      { deliverableId: 'planning-policy', forThisType: "Conservation, listing, and permitted development allowances checked before you spend on design." },
      { deliverableId: 'risk-register', forThisType: "The risks that move a high-end budget, from structure to heritage objection, named early." },
      { deliverableId: 'full-feasibility', forThisType: "A clear view of whether the project is worth doing, and which option is worth doing." },
    ],
    relatedCaseStudySlug: "bereweeke-avenue",
    metaTitle: "High-End Residential Architects | Thistle Architecture",
    metaDescription: "Feasibility for high-end residential projects: extensions, remodels, and conversions. Heritage, permitted development, and existing fabric tested before you commit to design.",
    faqs: [
      {
        question: "My house isn't listed, does heritage still apply?",
        answer: "Possibly. A conservation area, or simply sitting near a listed building, can shape what's acceptable externally even without your own house being listed. It's one of the constraints most often discovered too late, so we check it at feasibility stage rather than after design has started.",
      },
      {
        question: "How much can I do under permitted development before I need a full application?",
        answer: "More than most people expect, but the volume allowances are cumulative: a previous extension, a loft conversion, or an outbuilding can all eat into what's left. We check what has already been used against the property before assuming a route is available.",
      },
      {
        question: "Why do you need a survey before scoping the design?",
        answer: "Older houses rarely match their existing drawings. Head heights, structural spans, and floor levels decide what a remodel can actually deliver, and only a measured survey settles those questions with certainty.",
      },
      {
        question: "Can a feasibility test more than one design option?",
        answer: "Yes, and for a high-end project it's often worth it. One additional design option can be added to the fixed fee, so you're comparing two genuine routes rather than committing to the first idea that came up.",
      },
    ],
  },
  // Added for Ed's August 2026 final brief: a dedicated Co-Living & Large HMO
  // page, differentiated from the standard HMO page by Sui Generis planning,
  // shared amenity, larger-building circulation, management and fire/acoustic
  // standards. highbury-buildings-cosham is a genuine Thistle example at this
  // scale (eleven en-suite co-living rooms, on site).
  {
    slug: "co-living-large-hmo",
    reviewTopic: "hmo",
    label: "Co-Living & Large HMO",
    heroHeading: "Co-Living & Large HMO Architects",
    heroDescription: "Beyond the standard HMO. Feasibility for co-living and large shared-living schemes, where amenity, management and fire strategy carry as much weight as the room count.",
    opportunityCopy: "Co-living and large HMOs work on a different model to a five- or six-bed conversion: more generous shared amenity, on-site management, and a building designed around communal living rather than a house with extra locks on the doors. Done well, the yield and the planning case are both stronger for it.",
    opportunityStats: [
      { label: "Typical scale", value: "10+ rooms" },
      { label: "Planning route", value: "Sui Generis" },
      { label: "Defining factor", value: "Shared amenity provision" },
    ],
    challenges: [
      { title: "Sui Generis, not Class C4", detail: "Once a scheme moves beyond the small-HMO thresholds, it falls outside Class C4 and needs its own planning permission, judged on its own merits rather than against a permitted-development fallback." },
      { title: "Shared amenity that actually works", detail: "Communal kitchens, lounges and laundry have to be sized and located for the number of residents actually using them, not a token room ticked off a policy checklist." },
      { title: "Fire strategy and acoustics at scale", detail: "More occupants and more shared circulation raise the fire engineering and acoustic separation bar well above a standard house conversion, and getting it wrong is expensive to fix after the event." },
      { title: "Management and licensing", detail: "Larger schemes usually need a formal management plan and sit across more than one licensing regime at once, which has to be designed for, not bolted on afterwards." },
    ],
    deliverableHighlights: [
      { deliverableId: 'sketch-schemes', forThisType: "Circulation and layout tested for a larger building, including how residents actually move through shared spaces." },
      { deliverableId: 'planning-policy', forThisType: "Sui Generis precedent, licensing regimes and amenity policy read together, not treated as a bigger version of a small-HMO check." },
      { deliverableId: 'risk-register', forThisType: "Fire strategy, acoustic separation and management-plan risk named and costed at feasibility stage." },
      { deliverableId: 'full-feasibility', forThisType: "Yield and viability modelled against the shared-amenity space the scheme actually needs to provide." },
    ],
    relatedCaseStudySlug: "highbury-buildings-cosham",
    metaTitle: "Co-Living & Large HMO Architects | Thistle Architecture",
    metaDescription: "Feasibility for co-living and large HMO schemes: Sui Generis planning, shared amenity, fire and acoustic strategy, and management plans, tested in five days.",
    faqs: [
      {
        question: "What's the difference between a large HMO and co-living?",
        answer: "There's overlap, but co-living usually implies more generous, better-designed shared amenity and often on-site management, marketed as a lifestyle rather than simply a shared house. Planning officers increasingly expect that distinction to be visible in the design, not just the marketing.",
      },
      {
        question: "Do I need Sui Generis planning permission?",
        answer: "Once a scheme moves beyond the small-HMO thresholds (typically more than six unrelated occupants, though the exact figure depends on the council), it falls outside permitted development and Class C4 and needs its own planning permission as a Sui Generis use.",
      },
      {
        question: "How much shared amenity space do I actually need?",
        answer: "There's no single national figure. Local space and amenity standards set minimums per occupant for kitchens, lounges and laundry, and officers on larger schemes expect that provision to be realistic for the number of residents, not the minimum technically compliant.",
      },
      {
        question: "What fire and acoustic standards apply to larger shared buildings?",
        answer: "Fire compartmentation, escape strategy and acoustic separation requirements step up materially once you're managing a larger number of unrelated occupants and more shared circulation space. We flag where the building's existing structure will make this straightforward or expensive before you commit to a layout.",
      },
    ],
  },
];

export const getConversion = (slug: string): Conversion | undefined =>
  conversions.find((c) => c.slug === slug);

// A highlight whose deliverable has gone is dropped silently by the renderer
// (`if (!deliverable) return null`), which is how removing "Efficiency Metrics"
// on Ed's instruction quietly deleted cards from four pages. Fail loudly
// instead — now also covering a deliverable that has been retitled out from
// under DELIVERABLE_TITLES, which is the one way the id join can break.
for (const c of conversions) {
  for (const h of c.deliverableHighlights) {
    if (!deliverableFor(h.deliverableId)) {
      throw new Error(
        `conversionsData: "${c.slug}" references deliverable "${h.deliverableId}", which no longer matches any of the ${deliverables.length} deliverables in howItWorksData.`,
      );
    }
  }
}
