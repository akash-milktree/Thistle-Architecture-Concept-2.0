export interface CaseStudy {
  slug: string;
  title: string;
  location: string;
  image: string;
  tag: string;
  stats: { label: string; value: string }[];
  desc: string;
  challenge: string;
  approach: string;
  outcome: string;
  galleryImages: string[];
  buildingType: string;
  floorArea?: string;
  planningRoute: string;
  completionDate?: string;
  recommendation: "Go" | "No-Go" | "Options Tested";
  // Financial figures appear only where a project document supports them.
  purchasePrice?: string;
  projectedGDV?: string;
  gdvUpliftPct?: string;
  riskAvoided?: string;
  unitsBefore?: string;
  unitsAfter?: string;
}

// All entries below are real Thistle Group projects, written from the
// documents and drawings in the client's project folder. Facts that still
// need Ed's confirmation are listed in docs/case-study-confirmations.md.
export const caseStudies: CaseStudy[] = [
  {
    slug: "st-johns-aylesbury",
    title: "Nine-Bed HMO Conversion",
    location: "Aylesbury, Buckinghamshire",
    image: "/images/projects/st-johns-sk001-1.png",
    tag: "HMO",
    stats: [
      { label: "Bedrooms, all en-suite", value: "9" },
      { label: "Room sizes", value: "12 to 16 sqm" },
      { label: "Communal amenity", value: "25 sqm" },
    ],
    desc: "A town-centre house tested for a large HMO. The scheme reached nine generously sized en-suite rooms while staying ahead of the refusal patterns seen locally.",
    challenge: "The client wanted to know whether a substantial HMO was achievable at 4 St John's Street. Local precedent supported larger HMOs, but recent refusals in the area had been driven by undersized kitchens and insufficient communal space. The scheme had to maximise bedrooms without triggering the overdevelopment concerns that had sunk nearby applications.",
    approach: "The desk study confirmed a sustainable town-centre location with strong precedent for 7 to 8 bedroom HMOs and no Article 4 direction, which preserved a six-bed fallback under permitted development. The sketch scheme tested a nine-bedroom Sui Generis layout with every room between 12 and 16 sqm, and deliberately split 25 sqm of communal amenity across two floors, an approach the council has been more receptive to in schemes above seven occupants.",
    outcome: "The feasibility confirmed nine bedrooms are achievable, with a planning-safe eight-bed fallback if design quality concerns arise at application stage. Loft head heights and parking were flagged as the key items to confirm through measured survey. Local room rates of £800 to £850 pcm support the income case. The client left with a clear Go, a fallback position, and a defined list of next steps.",
    galleryImages: [
      "/images/projects/st-johns-existing-1.png",
      "/images/projects/st-johns-proposed-1.png",
    ],
    buildingType: "Existing dwelling (C3)",
    planningRoute: "Full planning (Sui Generis)",
    completionDate: "March 2026",
    recommendation: "Go",
  },
  {
    slug: "harpenden-police-station",
    title: "Police Station To Flats",
    location: "Harpenden, Hertfordshire",
    image: "/images/projects/harpenden-sketch-1.png",
    tag: "Commercial to Residential",
    stats: [
      { label: "Existing use", value: "Sui Generis" },
      { label: "Setting", value: "Conservation Area" },
      { label: "Sketch scheme", value: "Flats" },
    ],
    desc: "A 1990s police station in a conservation area, wrapped in policy protections and a restrictive covenant. We mapped the planning route before sketching the flats.",
    challenge: "The former Harpenden Police Station sits in the town's conservation area, next to locally listed buildings, with a restrictive covenant limiting the site to community uses. As a police station it is a Sui Generis use, so any change of use needs full planning permission, and the emerging Local Plan protects community infrastructure through Policy SP7. The question was whether residential conversion was realistic at all.",
    approach: "We produced a planning appraisal covering the adopted and emerging Local Plans and the Neighbourhood Plan, the conservation area appraisal, and the site's planning history. The key test is Policy SP7: a change of use must show the police function has been re-provided or is no longer required, which the evidence supports. With the building only around 30 years old, reuse scored better than redevelopment, so we sketched flat layouts within the existing envelope, colour-coded by use, respecting daylight to the neighbouring office building.",
    outcome: "The appraisal concluded that a case could be made for residential and other town-centre uses, subject to the SP7 test and the covenant, and flagged the lack of outside amenity space as the main design constraint for housing. The sketch scheme shows how flats fit the existing building. The client went into negotiations knowing exactly which hurdles matter and in what order.",
    galleryImages: [
      "/images/projects/harpenden-sketch-1.png",
    ],
    buildingType: "Police station (Sui Generis)",
    planningRoute: "Full planning",
    completionDate: "November 2025",
    recommendation: "Options Tested",
  },
  {
    slug: "greyfriars-kings-lynn",
    title: "Office To Residential Or HMO",
    location: "King's Lynn, Norfolk",
    image: "/images/projects/greyfriars-option4-1.png",
    tag: "Mixed Use",
    stats: [
      { label: "Routes compared", value: "2" },
      { label: "HMO option", value: "9 en-suite" },
      { label: "Both options", value: "With extension" },
    ],
    desc: "One building, two viable futures. We drew both the conventional residential option and the nine-bed co-living option so the client could compare returns directly.",
    challenge: "The Greyfriars building could plausibly become conventional flats or a large co-living HMO, and each route carries different planning risk, build cost, and income. Committing to the wrong use class early would have meant abortive design fees and a weaker planning story. The client needed both options tested to the same standard before choosing.",
    approach: "We sketched the building both ways. Option 2 tests a residential conversion with an extension. Option 4 tests a nine-bedroom en-suite HMO with distributed shared spaces, also with the extension. Both layouts are colour-coded by room function, with bedroom sizes and shared amenity areas stated on the drawings, so the two schemes can be compared like for like.",
    outcome: "The client received two fully drawn options for the same envelope, each with its own unit and room schedule. That turned an abstract use-class decision into a straightforward comparison of income, build scope, and planning position.",
    galleryImages: [
      "/images/projects/greyfriars-option2-1.png",
      "/images/projects/greyfriars-option4-1.png",
    ],
    buildingType: "Office and mixed use",
    planningRoute: "Full planning",
    recommendation: "Options Tested",
  },
  {
    slug: "axis-house",
    title: "Office To High-End Houses",
    location: "Compton, Newbury",
    image: "/images/projects/axis-house-elevation-1.png",
    tag: "Commercial to Residential",
    stats: [
      { label: "Sketch proposals tested", value: "3" },
      { label: "Unit mix identified", value: "5 houses" },
      { label: "Three-bed units", value: "83 sqm" },
    ],
    desc: "A rural office building tested against three different sketch schemes, landing on a terrace of four three-bed houses and one two-bed unit.",
    challenge: "Axis House is an office building in a village setting, and the client wanted to understand its highest-value residential future. Flats, a small number of large houses, and a terrace of family homes were all plausible, with very different values and build scopes.",
    approach: "We tested three sketch proposals over the existing plans, working with the building's structural grid. The preferred scheme divides the building into four three-bed houses of around 83 sqm each plus one larger two-bed unit, using ground floor timber-frame extensions, new rear openings, dormers, and rooflights to make each house work over three floors.",
    outcome: "The client received drawn options with elevations for the preferred scheme, a clear unit mix, and the alterations list that planning and costing conversations need. Three rounds of sketch testing settled the direction before any detailed design fees were spent.",
    galleryImages: [
      "/images/projects/axis-house-plans-1.png",
      "/images/projects/axis-house-elevation-1.png",
    ],
    buildingType: "Office",
    planningRoute: "Full planning",
    completionDate: "October 2025",
    recommendation: "Options Tested",
  },
  {
    slug: "southgate-winchester",
    title: "Listed Building To Co-Living",
    location: "Winchester, Hampshire",
    image: "/images/projects/southgate-sketch-1.png",
    tag: "HMO",
    stats: [
      { label: "Co-living design", value: "10 beds" },
      { label: "Ground floor", value: "Shop retained" },
      { label: "Constraint", value: "Listed building" },
    ],
    desc: "A listed building on Southgate Street tested for a ten-bed co-living scheme above a retained shop, with private and shared gardens worked into the plan.",
    challenge: "Listed buildings are the hardest conversion category: every internal alteration needs justifying, and co-living intensity multiplies the scrutiny. The client wanted to know whether a ten-bed co-living scheme could work at 23 Southgate while keeping the existing shop trading on the ground floor.",
    approach: "The sketch study worked floor by floor through the building, testing en-suite provision against the existing wall layout, retaining the shop frontage, and allocating the rear garden between shared amenity and private space for the ground-floor rooms. Proposed ensuites and new partitions are drawn against the existing fabric so the listed building impact is visible from the start.",
    outcome: "The study shows a ten-bed co-living layout with the shop partially retained, sunken garden amenity for the basement room, and a shared garden strategy. The client can now brief heritage consultants and approach pre-application discussions with a concrete scheme rather than a hope.",
    galleryImages: [
      "/images/projects/southgate-sketch-1.png",
    ],
    buildingType: "Listed mixed use, shop and residential",
    planningRoute: "Full planning and listed building consent",
    recommendation: "Options Tested",
  },
  {
    slug: "beechmount-manchester",
    title: "Existing HMO Reconfiguration",
    location: "Manchester, Greater Manchester",
    image: "/images/projects/beechmount-sk001-1.png",
    tag: "HMO",
    stats: [
      { label: "Building type", value: "Existing HMO" },
      { label: "Study output", value: "Sketch layout" },
      { label: "Focus", value: "Room quality" },
    ],
    desc: "An existing Manchester HMO tested for reconfiguration, checking whether the current layout was leaving room count or room quality on the table.",
    challenge: "Beech Mount already operated as an HMO, but the client suspected the layout was underperforming: awkward room shapes, weak communal provision, and circulation that ate lettable space. The question was whether a reconfiguration could improve the room schedule without triggering disproportionate building work.",
    approach: "We redrew the building from the existing plans and tested a revised layout, room by room, against current HMO space and amenity standards. The sketch balances additional en-suite provision against the cost of moving services and structure.",
    outcome: "The client received a drawn reconfiguration option with a room schedule to compare against the building's current performance, giving a clear basis for the refurbishment decision.",
    galleryImages: [
      "/images/projects/beechmount-sk001-1.png",
    ],
    buildingType: "Existing HMO",
    planningRoute: "Licensing and building regulations led",
    recommendation: "Options Tested",
  },
];
