export type CaseStudyKind = 'feasibility' | 'project';

export interface CaseStudy {
  slug: string;
  /** 'feasibility' = a feasibility study; 'project' = a completed build. */
  kind: CaseStudyKind;
  title: string;
  location: string;
  image: string;
  tag: string;
  stats: { label: string; value: string }[];
  desc: string;
  challenge?: string;
  approach?: string;
  outcome?: string;
  galleryImages: string[];
  buildingType: string;
  floorArea?: string;
  planningRoute?: string;
  completionDate?: string;
  recommendation?: "Go" | "No-Go" | "Options Tested";
  /** Completed-project entries only. Defaults to Complete when unset. */
  status?: "Complete" | "On site";
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
    kind: "feasibility",
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
    kind: "feasibility",
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
    kind: "feasibility",
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
    kind: "feasibility",
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
    kind: "feasibility",
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
    kind: "feasibility",
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
  {
    slug: "beech-house-road-croydon",
    kind: "feasibility",
    title: "Six-Bed HMO To Thirteen",
    location: "Croydon, South London",
    image: "/images/projects/beech-house-sketch-1.png",
    tag: "HMO",
    stats: [
      { label: "Bedrooms, all en suite", value: "13" },
      { label: "Room sizes", value: "12.6 to 27 sqm" },
      { label: "Indicative value at 8.5% yield", value: "£1.24m" },
    ],
    desc: "A four-storey period house already running as a six-bed HMO, tested for more than double the room count using internal works only.",
    challenge: "The house was a lawful six-bedroom HMO in a Croydon conservation area, and the owner wanted to know how far it could go. The obstacle was not policy but politics: ward councillors had opposed HMO schemes nearby, a seven-bed application on Woodstock Road had been refused at committee, and Croydon has no allowed HMO appeal on record since 2021. Any scheme had to be designed to pass at first determination.",
    approach: "The analysis confirmed the strongest possible location case: East Croydon station 540 metres away, PTAL 6a to 6b, and a Central controlled parking zone that supports a car-free scheme. It also found the lead precedent, a 13-bed sui generis HMO approved at 51 Addiscombe Road in 2022 against 353 objections, in the same high-PTAL context. The sketch scheme then matched that precedent on every measurable point: 13 en-suite rooms from 12.6 to 27 sqm against a 12.5 sqm standard, around 40 sqm of internal communal space, three kitchen sets, and no external alterations at all, which largely removed the conservation area from the assessment.",
    outcome: "A Go. Because the property is already a lawful HMO, no family dwelling is lost, the logic Croydon officers used to approve 6 Ledbury Road. Indicative figures: £900 per room per month gives £140,400 gross a year and roughly £105,300 net, supporting a value in the order of £1.24m against a conversion cost of about £429,000. The recommendation was to proceed straight to planning drawings and a complete first-time submission.",
    galleryImages: [
      "/images/projects/beech-house-sketch-1.png",
    ],
    buildingType: "Existing HMO (C4)",
    floorArea: "Four levels, basement to second floor",
    planningRoute: "Full planning (Sui Generis)",
    completionDate: "June 2026",
    recommendation: "Go",
    projectedGDV: "£1.24m",
  },
  {
    slug: "claremont-road-luton",
    kind: "feasibility",
    title: "Three-Bed House To Seven-Bed HMO",
    location: "Luton, Bedfordshire",
    image: "/images/projects/claremont-sketch-1.png",
    tag: "HMO",
    stats: [
      { label: "Bedrooms, all en suite", value: "7" },
      { label: "Communal space provided", value: "32 sqm" },
      { label: "Indicative value at 8.5% yield", value: "£500,000" },
    ],
    desc: "A mid-terrace house tested for a seven-bed HMO, delivered in two stages so the riskiest room is argued from the strongest position.",
    challenge: "The client was looking at a three-bedroom terrace guided around £350,000 and wanted seven en-suite rooms out of it. The planning designations were clean, no Article 4, conservation area, flood zone or green belt, so a six-bed C4 HMO was permitted development. The seventh bedroom was the problem: it tips the scheme into sui generis and runs into Luton's protection of family housing.",
    approach: "Rather than apply for seven rooms in one go, the study phased it. Stage one takes the six-bed C4 HMO plus a rear dormer loft, both permitted development, confirmed by a Lawful Development Certificate. Stage two adds the seventh bedroom by full planning, once the six-bed HMO is established and tenanted. The sequence matters: once the property is a lawful HMO there is no family dwelling left to lose, so the seventh room is judged as an addition to an existing HMO rather than the loss of a family home. A nearby approval at 39 Hazelbury Crescent granted a seventh person on exactly that basis.",
    outcome: "A Go, with the phasing as the core recommendation. Every bedroom exceeds 10 sqm against a 6.51 sqm legal minimum, and communal space lands at about 32 sqm against a 23.5 sqm target. A 20 sqm outbuilding becomes shared co-working space, which strengthens the seventh-bed case because officers view extra amenity favourably. Seven rooms at an indicative £675 per month give about £56,700 gross a year, roughly £42,500 net, implying about £500,000 of value against a build cost of £200,000 to £220,000. The loft head height was flagged as the main survey item.",
    galleryImages: [
      "/images/projects/claremont-sketch-1.png",
    ],
    buildingType: "Existing dwelling (C3)",
    planningRoute: "Permitted development (C4), then full planning",
    completionDate: "July 2026",
    recommendation: "Go",
    projectedGDV: "£500,000",
    unitsBefore: "3-bed house",
    unitsAfter: "7-bed HMO",
  },
  {
    slug: "gyfford-walk-cheshunt",
    kind: "feasibility",
    title: "Two-Bed Semi To Six-Bed HMO",
    location: "Cheshunt, Hertfordshire",
    image: "/images/projects/gyfford-optiona-1.png",
    tag: "HMO",
    stats: [
      { label: "Options tested", value: "2" },
      { label: "Bedrooms, all en suite", value: "5 or 6" },
      { label: "Planning permission", value: "Not required" },
    ],
    desc: "A two-bed semi tested for a six-bed HMO that needs no planning permission at all, with a five-bed fallback drawn for the loft risk.",
    challenge: "The client already ran an HMO nearby and wanted the same product here. The prize was staying inside Use Class C4, because a six-person HMO is then permitted development and needs no planning permission, while seven rooms would push it to sui generis and pull in a full application and a parking survey. Everything depended on whether the loft could take two bedrooms, which had not been measured.",
    approach: "The scheme was designed to use the existing footprint, reusing the substantial rear extension already built under permitted development and relocating services to the ground floor utility room to free the loft. Because only floor area with a ceiling height above 1.5 metres counts toward room sizes, and the loft was unmeasured, two options were drawn rather than one. Option A takes six bedrooms if the headroom is sufficient, with loft rooms of 12.3 and 9.7 sqm. Option B takes five, with a single 22 sqm loft bedroom. The client priority was generous bedrooms over a large communal room, so the kitchen and dining space is held at a functional 17 sqm.",
    outcome: "Both options confirmed as permitted development, with Broxbourne holding no Article 4 direction and recent certificates granted locally at 42 Bury Green Road and 92 Great Cambridge Road. A directly comparable seven-bed all en-suite conversion with a rear dormer has been approved at 11 Grenville Close, placing the six-bed scheme comfortably within precedent. The single planning risk is the roof: a combined hip-to-gable and full-width rear dormer may exceed the 50 cubic metre permitted development allowance, which would make the roof works a householder application rather than the change of use.",
    galleryImages: [
      "/images/projects/gyfford-optiona-1.png",
      "/images/projects/gyfford-optionb-1.png",
    ],
    buildingType: "Existing dwelling (C3)",
    planningRoute: "Permitted development (C4)",
    completionDate: "July 2026",
    recommendation: "Options Tested",
    unitsBefore: "2-bed semi",
    unitsAfter: "5 or 6-bed HMO",
  },
  {
    slug: "hathaway-road-croydon",
    kind: "feasibility",
    title: "When The HMO Is The Wrong Answer",
    location: "Croydon, South London",
    image: "/images/projects/hathaway-sketch-1.png",
    tag: "Supported Living",
    stats: [
      { label: "HMO refusal risk", value: "~95%" },
      { label: "Bedrooms via C3(b)", value: "5" },
      { label: "Planning permission", value: "Not required" },
    ],
    desc: "A feasibility that told the client not to do what they asked for, then found a route that needs no planning permission at all.",
    challenge: "The client wanted an HMO in a highly sustainable Croydon location: PTAL 6a, a short walk from West Croydon station, generously sized rooms, and full permitted development rights intact. On the face of it the property looked ideal.",
    approach: "One fact decided it. The gross internal floor area is below 130 sqm, and Croydon protects family homes below that threshold from HMO conversion under Policies SP2 and DM1.2 of its Local Plan. The council measures the original floor area and disregards any extension or loft space, so neither a rear extension nor a loft conversion overcomes the policy, and reducing the room count does not help because the loss of the family house is the objection. The local planning authority indicated it would not even recommend a pre-application enquiry. Rather than stop there, the study tested an alternative: C3(b) supported living, a dwellinghouse for up to six adults living as a single household where care is provided.",
    outcome: "A No-Go on the HMO, with a recommended route instead. Because C3(b) stays within Use Class C3, a genuine change from a family dwelling is not development and needs no planning permission, and neither the family housing policy nor the Article 4 direction applies. The sketch layout shows five bedrooms from 11 to 18 sqm and 16 sqm of communal amenity within the existing building, without touching the loft or extending. This is not an HMO by another name: it requires a genuine care provider, contracts evidenced to the council, and confirmation by a Lawful Development Certificate.",
    galleryImages: [
      "/images/projects/hathaway-sketch-1.png",
    ],
    buildingType: "Existing dwelling (C3)",
    floorArea: "Below 130 sqm",
    planningRoute: "C3(b) supported living, confirmed by LDC",
    completionDate: "July 2026",
    recommendation: "No-Go",
    riskAvoided: "An HMO application with a ~95% expected refusal",
  },
  {
    slug: "bath-street-cheddar",
    kind: "feasibility",
    title: "Former Bank To Eleven-Bed HMO And Shop",
    location: "Cheddar, Somerset",
    image: "/images/projects/cheddar-sketch-1.png",
    tag: "Mixed Use",
    stats: [
      { label: "Bedrooms, all en suite", value: "11" },
      { label: "Retail unit retained", value: "45.2 sqm" },
      { label: "Room sizes", value: "10 to 22 sqm" },
    ],
    desc: "A closed high-street bank going to auction, tested for a mixed-use scheme that keeps the shopfront working and puts eleven en-suite rooms above it.",
    challenge: "The former Lloyds Bank closed in January 2023 and was heading to auction at a guide of around £400,000, with two cottages alongside and all three buildings needing a full back-to-brick refurbishment. The site sits in the Cheddar Conservation Area, and the Market Cross at the top of Bath Street is both Grade II* listed and a Scheduled Monument, so its setting carries the highest level of heritage protection. A prior approval already established that the bank and cottages could become four dwellings, which set the fallback the scheme had to beat.",
    approach: "The recommended scheme is mixed use rather than pure residential. The 45.2 sqm Class E unit stays in place at the Bath Street frontage with its shopfront active, and an eleven-bed sui generis HMO sits above and behind it across ground, first, second and a new mansard. Keeping the commercial unit answers Cheddar Neighbourhood Plan Policy EE1, which resists converting commercial centre properties to residential at ground floor level, and follows the approved approach at 75 High Street in Burnham. The consented 20-space rear car park takes the highways and parking question off the table under Policy D14, and the new mansard sits behind the existing front parapet so the view from the Market Cross junction reads as before.",
    outcome: "A Go on the mixed-use scheme. All eleven rooms are en suite and exceed the proxy minimum, from 10 sqm in the mansard to 22 sqm on the ground floor, with a 27.5 sqm communal kitchen and lounge on the first floor and a second kitchen serving the upper cluster. The quantum stays well clear of the 37-bed Hillview Nursing Home refusal. Removing the commercial unit would free space for two more bedrooms, but that upside was deliberately parked: Policy EE1 would need a documented marketing exercise and evidenced vacancy to overturn, so the safer route is to secure the eleven-bed scheme now and return for the extra rooms later.",
    galleryImages: [
      "/images/projects/cheddar-sketch-1.png",
    ],
    buildingType: "Former bank (Class E) and two cottages",
    planningRoute: "Full planning (Sui Generis), mixed use",
    completionDate: "June 2026",
    recommendation: "Go",
    purchasePrice: "~£400,000 auction guide",
  },

  // ---------------------------------------------------------------------
  // Completed projects. PLACEHOLDERS: names come from the client's project
  // folders, but imagery and copy are stand-ins until Ed supplies real
  // photography and write-ups. Tracked in docs/case-study-confirmations.md.
  // ---------------------------------------------------------------------
  {
    slug: "beauchamp-house",
    kind: "project",
    title: "Beauchamp House",
    location: "Royal Leamington Spa, Warwickshire",
    image: "/images/projects/beauchamp-elevation-1.png",
    tag: "Office to Flats",
    stats: [
      { label: "Flats", value: "4" },
      { label: "Flat sizes", value: "73.4 to 80.3 sqm" },
      { label: "Status", value: "On site" },
    ],
    desc: "A Regency building on Kenilworth Road being converted from offices into four flats, from the basement up into the roof.",
    challenge: "Beauchamp House is a period property on Kenilworth Road, and everything that gives it character also constrains it: sash and bay windows to keep, chimneys to retain, and a roof that had to take new accommodation without changing how the building reads from the street.",
    approach: "The conversion works the full height of the building. Flat 1 takes the basement at 74.9 sqm, Flat 2 the ground floor at 80.3 sqm, and Flat 4 the loft at 73.4 sqm, each with en suites and its own kitchen and dining space. The existing windows are retained and upgraded with secondary glazing matched to the profile of the originals, the chimneys stay, and new rooflights are conservation pattern so the roofline is not disturbed. A vaulted ceiling was added to the second floor during the design. External walls are thermally lined rather than replaced, which is what keeps a building like this workable.",
    outcome: "The scheme is on site. Drawings are at Building Regulations stage and have been through five revisions, several of them amendments following site meetings, which is the normal rhythm of a retrofit where the building tells you things the survey did not.",
    galleryImages: [
      "/images/projects/beauchamp-plans-1.png",
      "/images/projects/beauchamp-site-1.jpg",
      "/images/projects/beauchamp-site-2.jpg",
    ],
    buildingType: "Period office building",
    planningRoute: "Office to residential conversion",
    unitsAfter: "4 flats",
    status: "On site",
  },
  {
    slug: "monument-house",
    kind: "project",
    title: "Monument House",
    location: "South of England",
    image: "/images/generated/package-hero.jpg",
    tag: "Office to Flats",
    stats: [
      { label: "Project type", value: "Office to flats" },
      { label: "Status", value: "Complete" },
      { label: "Write-up", value: "Coming soon" },
    ],
    desc: "A completed office-to-residential conversion. Full project details and photography are being prepared.",
    galleryImages: [],
    buildingType: "Office",
  },
  {
    slug: "wigan-church",
    kind: "project",
    title: "Wigan Church",
    location: "Wigan, Greater Manchester",
    image: "/images/site/cta-band.jpg",
    tag: "Commercial Conversion",
    stats: [
      { label: "Project type", value: "Church conversion" },
      { label: "Status", value: "Complete" },
      { label: "Write-up", value: "Coming soon" },
    ],
    desc: "A completed conversion of a church building. Full project details and photography are being prepared.",
    galleryImages: [],
    buildingType: "Church",
  },
  {
    slug: "162-millbrook",
    kind: "project",
    title: "162 Millbrook",
    location: "Southampton, Hampshire",
    image: "/images/generated/terrace-scaffold.jpg",
    tag: "HMO",
    stats: [
      { label: "Project type", value: "HMO conversion" },
      { label: "Status", value: "Complete" },
      { label: "Write-up", value: "Coming soon" },
    ],
    desc: "A completed HMO conversion. Full project details and photography are being prepared.",
    galleryImages: [],
    buildingType: "Residential",
  },
  {
    slug: "bishopstoke",
    kind: "project",
    title: "Bishopstoke",
    location: "Eastleigh, Hampshire",
    image: "/images/site/hero-drone.jpg",
    tag: "HMO",
    stats: [
      { label: "Project type", value: "HMO conversion" },
      { label: "Status", value: "Complete" },
      { label: "Write-up", value: "Coming soon" },
    ],
    desc: "A completed HMO conversion. Full project details and photography are being prepared.",
    galleryImages: [],
    buildingType: "Residential",
  },
  {
    slug: "forest-home",
    kind: "project",
    title: "Forest Home",
    location: "Hampshire",
    image: "/images/generated/site-visit.jpg",
    tag: "High-End Residential",
    stats: [
      { label: "Project type", value: "High-end residential" },
      { label: "Status", value: "Complete" },
      { label: "Write-up", value: "Coming soon" },
    ],
    desc: "A completed high-end residential project. Full project details and photography are being prepared.",
    galleryImages: [],
    buildingType: "Residential",
  },
];

export const feasibilityStudies = caseStudies.filter((c) => c.kind === 'feasibility');
export const completedProjects = caseStudies.filter((c) => c.kind === 'project');
