export type CaseStudyKind = 'feasibility' | 'project';

/** The four conversion types the site sells, matching data/conversionsData.ts. */
export type ConversionType =
  | 'commercial-to-residential'
  | 'hmo'
  | 'mixed-use-commercial'
  | 'high-end-residential';

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
  /**
   * Which conversion-type tabs a completed project appears under. An array
   * because Ed asked for projects to show under more than one where they fit.
   * Left unset where the project genuinely is not one of the four; those still
   * appear under All, rather than being filed somewhere wrong.
   */
  conversionTypes?: ConversionType[];
  /**
   * Set only where the work was delivered by another Thistle Group practice
   * rather than by Thistle Architecture. Publishing group work is fine, but the
   * page must not imply Thistle did the job itself.
   */
  provenance?: string;
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
    conversionTypes: ['commercial-to-residential'],
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
    // The Design and Access Statement for this scheme is authored by
    // incollective.works, the group's parent company (confirmed by Akash
    // 2026-07-17), so it is group work and fine to publish here.
    slug: "bereweeke-avenue",
    conversionTypes: ['high-end-residential'],
    kind: "project",
    title: "1930s House, Extended And Remade",
    location: "Winchester, Hampshire",
    image: "/images/projects/bereweeke-1.jpg",
    tag: "High-End Residential",
    stats: [
      { label: "Existing", value: "1930s detached" },
      { label: "Extensions", value: "Single and two storey" },
      { label: "Change of use", value: "None" },
    ],
    desc: "A tired 1930s detached house in Winchester, reworked with new extensions and a full fenestration change.",
    challenge: "The house was a two-storey 1930s detached property with a masonry facade and a red clay tile roof, and it had accumulated the usual additions. The windows and doors were dilapidated steel and the rainwater goods were black uPVC. Nothing about it was protected, which is a freedom and a trap: no listing and no conservation area means the constraint is simply whether the design is good enough to be worth doing.",
    approach: "The existing extensions come down and are replaced with a single-storey rear and side extension and two-storey side extensions, keeping the use as a C3 dwellinghouse throughout. The fenestration changes across the whole house, which is what does the real work: steel-framed glazing to the garden, and openings sized to the way the rooms are actually used rather than the way they were in 1935. Access off Bereweeke Avenue is unchanged, the driveway keeps its off-street parking, and no trees or hedges are removed.",
    outcome: "Taken through RIBA Stage 2 and pre-application advice with Winchester City Council, then built. The finished house has a kitchen and dining space opening to the garden under a rooflight, herringbone floors, and a rear elevation that reads as one house rather than a house plus additions.",
    galleryImages: [
      "/images/projects/bereweeke-2.jpg",
      "/images/projects/bereweeke-3.jpg",
      "/images/projects/bereweeke-4.jpg",
    ],
    buildingType: "1930s detached house (C3)",
    planningRoute: "Full planning, extensions and alterations",
    status: "Complete",
  },
  {
    slug: "monument-house",
    conversionTypes: ['commercial-to-residential'],
    kind: "project",
    title: "Monument House",
    location: "Winchester, Hampshire",
    image: "/images/projects/monument-house-1.png",
    tag: "Office to Flats",
    stats: [
      { label: "Apartments", value: "4" },
      { label: "Apartment sizes", value: "46.6 to 90.4 sqm" },
      { label: "Windows", value: "Sash, reinstated" },
    ],
    desc: "A building on Winchester's Upper High Street converted into four apartments, with the modern uPVC swapped back for traditional sash windows.",
    challenge: "5 Upper High Street sits in the middle of Winchester, a city where what the building looks like from the street is not a detail. It had picked up modern uPVC windows along the way, which is the sort of thing that reads as wrong on a High Street elevation long before anyone can say why.",
    approach: "Four apartments: two at ground floor of 90 and 90.4 sqm, and two above at 46.6 and 69.9 sqm, each with its own kitchen and lounge, bathroom and hall. All the modern uPVC windows are replaced with traditional design sash windows, sized to the existing openings, with the contractor pricing both timber and uPVC alternatives so the client could make that call on cost rather than have it made for them. A new front courtyard was proposed to the street.",
    outcome: "Documented to tender. The fire strategy does the heavy lifting on a conversion like this: a 60-minute protected stairwell serving all four flats, every steel encased to 60 minutes, and a 60-minute rating to the hallway and landings. The drone footage on our homepage is this building's own street.",
    galleryImages: [
      "/images/projects/monument-house-1.png",
      "/images/projects/monument-house-2.png",
    ],
    buildingType: "Period building, Upper High Street",
    planningRoute: "Office to residential conversion",
    unitsAfter: "4 apartments",
    status: "Complete",
  },
  {
    slug: "wigan-church",
    kind: "project",
    title: "Methodist Church To Offices",
    location: "Leigh, Greater Manchester",
    image: "/images/projects/wigan-church-1.jpg",
    tag: "Commercial Conversion",
    stats: [
      { label: "Offices", value: "10" },
      { label: "Conference rooms", value: "2" },
      { label: "Office sizes", value: "12.7 to 19.9 sqm" },
    ],
    desc: "A Gothic Methodist church on Wigan Road, converted into offices without losing the stained glass or the vaulted roof.",
    challenge: "The building is a red-brick Gothic Methodist church with stone tracery, stained glass and an open vaulted timber roof, and it had ended up in use as storage. Everything worth keeping about it was also the thing that made an office conversion difficult: you cannot cut a church nave into cellular offices without either wrecking the interior or ending up with rooms nobody wants to work in.",
    approach: "The scheme works within the existing envelope. Ten offices from 12.7 to 19.9 sqm and two conference rooms of 22.1 and 22.9 sqm sit alongside a 31.3 sqm open office, a 21.6 sqm waiting area at the entrance, a kitchen, showers and changing rooms, with a 176.5 sqm storage space retained at the rear. The stained glass stays: existing stone frames and stained glass are repaired and made good, with secondary triple glazing introduced inside the existing reveals rather than replacing the windows. Original windows to the frontage are retained and made good like for like. Card access control runs to all exterior and connecting doors.",
    outcome: "The conversion is documented through to Rev G. The result keeps a landmark building in use and in one piece, which is usually the argument that carries a scheme like this: the alternative for a redundant church is rarely a better outcome for the street.",
    galleryImages: [
      "/images/projects/wigan-church-2.jpg",
      "/images/projects/wigan-church-3.jpg",
      "/images/projects/wigan-church-4.jpg",
    ],
    buildingType: "Former Methodist church",
    planningRoute: "Change of use to offices",
    status: "Complete",
  },
  {
    slug: "162-millbrook",
    conversionTypes: ['hmo'],
    kind: "project",
    title: "162 Millbrook Road",
    location: "Southampton, Hampshire",
    image: "/images/projects/millbrook-1.png",
    tag: "HMO",
    stats: [
      { label: "Bedrooms, all en suite", value: "8" },
      { label: "Room sizes", value: "9 to 17 sqm" },
      { label: "Kitchens", value: "2" },
    ],
    desc: "A Southampton house taken to an eight-bedroom large sui generis HMO, every room en suite, alongside its neighbour at 160.",
    challenge: "162 Millbrook Road is half of a pair: number 160 next door runs as a separate scheme, and the two share a boundary and a party structure. The building had to reach a room count that works commercially while clearing the local authority's HMO standards on room sizes, communal amenity, kitchen provision and refuse storage, which is where schemes like this usually come unstuck.",
    approach: "Eight bedrooms, all en suite, across ground and first floors, from 9 sqm up to 16.95 sqm. Two kitchens serve the house: an 18 sqm kitchen and dining space on the ground floor and a 9 sqm kitchen on the first, so no cluster of rooms is far from a kitchen. The existing conservatory came down and a new beam and block floor went in behind it. Every tea station is a wet area only, with no cooking facilities, which keeps the kitchen count honest against the standards. The external alterations were completed under permitted development rights, so the planning exposure sat where it could be controlled.",
    outcome: "Documented to Building Regulations stage. The technical detail is where a large HMO is won or lost: acoustic bar on stud partitions between rooms, separating floors upgraded to Part E, a Category LD2 alarm system, and a fire strategy agreed with the fire consultant rather than assumed.",
    galleryImages: [
      "/images/projects/millbrook-1.png",
      "/images/projects/millbrook-2.png",
    ],
    buildingType: "Existing dwelling",
    planningRoute: "Large sui generis HMO, external works under PDR",
    status: "Complete",
  },
  // ---------------------------------------------------------------------
  // Added 2026-07-29 from Ed's Google Drive folder ("Eds Home Reno" >
  // HMO Marketing). These three are THISTLE'S OWN work, not HMO Designers':
  // the client's own `03 New Website/Finished Projects/HMO/` folder lists
  // exactly 162 Millbrook, 81 Crecent [sic] and Bishopstoke. Those folders were
  // empty, which is why Bishopstoke was deleted from the site on 2026-07-17 and
  // 81 The Crescent was never listed at all. The Drive folder has the
  // photography the local folders were missing.
  //
  // Every shot is a Canon 5D Mark IV frame edited in Lightroom, so these are
  // proper marketing sets, not phone snaps. Imported at 1600px.
  //
  // WHAT WE DO NOT HAVE: any document. No feasibility study, no drawings, no
  // schedule of accommodation. So these entries claim NO room counts, NO floor
  // areas and NO planning routes. Everything below is either a folder-name fact
  // or something visible in the photographs. Completion years are the EXIF
  // capture dates, which prove the building was finished by then and nothing
  // more. All open questions are in docs/case-study-confirmations.md.
  // ---------------------------------------------------------------------
  {
    slug: "bishopstoke-road",
    conversionTypes: ['hmo'],
    kind: "project",
    title: "Bishopstoke Road",
    location: "Eastleigh, Hampshire",
    image: "/images/projects/bishopstoke-road/bishopstoke-1.jpg",
    tag: "HMO",
    stats: [
      { label: "Communal", value: "Kitchen and dining" },
      { label: "Outside", value: "Walled courtyard" },
      { label: "En suites", value: "Marble tiled" },
    ],
    desc: "A house converted to an HMO in Eastleigh, built around a full-length navy kitchen that runs the depth of the plan into a rooflit dining room.",
    approach: "The whole ground floor is given over to one move: a navy shaker kitchen running the full depth of the house, brass handles, stone worktops, integrated ovens and laundry built in, opening at the far end into a dining room lit from above by a flat rooflight. Panelling to dado height carries through the dining room and up the staircase, all in the same navy, so the circulation reads as part of the design rather than as leftover space. The en suites are tiled floor to ceiling in white marble with backlit round mirrors.",
    outcome: "Complete and photographed in March 2025. The rear opens onto a walled courtyard with paved terrace and planting beds, which on a mid-terrace plot is what stops a house at this occupancy feeling closed in.",
    galleryImages: [
      "/images/projects/bishopstoke-road/bishopstoke-2.jpg",
      "/images/projects/bishopstoke-road/bishopstoke-3.jpg",
      "/images/projects/bishopstoke-road/bishopstoke-4.jpg",
      "/images/projects/bishopstoke-road/bishopstoke-5.jpg",
      "/images/projects/bishopstoke-road/bishopstoke-6.jpg",
      "/images/projects/bishopstoke-road/bishopstoke-7.jpg",
      "/images/projects/bishopstoke-road/bishopstoke-8.jpg",
      "/images/projects/bishopstoke-road/bishopstoke-9.jpg",
      "/images/projects/bishopstoke-road/bishopstoke-10.jpg",
      "/images/projects/bishopstoke-road/bishopstoke-11.jpg",
      "/images/projects/bishopstoke-road/bishopstoke-12.jpg",
      "/images/projects/bishopstoke-road/bishopstoke-13.jpg",
      "/images/projects/bishopstoke-road/bishopstoke-14.jpg",
    ],
    buildingType: "Existing dwelling",
    completionDate: "2025",
    status: "Complete",
  },
  {
    slug: "eastleigh-hmo",
    conversionTypes: ['hmo'],
    kind: "project",
    title: "Eastleigh HMO",
    location: "Eastleigh, Hampshire",
    image: "/images/projects/eastleigh-hmo/eastleigh-1.jpg",
    tag: "HMO",
    stats: [
      { label: "Roof", value: "Converted, rooflit" },
      { label: "En suites", value: "Throughout" },
      { label: "Communal", value: "Galley kitchen" },
    ],
    desc: "An HMO conversion in Eastleigh finished in a warmer register than most: brass bedsteads, patterned rugs and sage green en suites, with the roof taken as living space.",
    approach: "The roof does the heavy lifting. The top floor is a full room under a pitched ceiling with two rooflights and fitted panelled wardrobes built into the low wall, which turns the least useful part of the house into the best room in it. Downstairs the kitchen is a galley running to the rear with the dining space at the end. The stairwell is panelled and painted olive, and the en suites pick the same green up in glass splashbacks behind the basins.",
    outcome: "Complete and photographed in October 2024. The specification deliberately avoids the flat-pack look that HMO fit-outs default to: brass bed frames, patterned rugs, wall lights either side of the bed, and a desk in each room facing the window.",
    galleryImages: [
      "/images/projects/eastleigh-hmo/eastleigh-2.jpg",
      "/images/projects/eastleigh-hmo/eastleigh-3.jpg",
      "/images/projects/eastleigh-hmo/eastleigh-4.jpg",
      "/images/projects/eastleigh-hmo/eastleigh-5.jpg",
      "/images/projects/eastleigh-hmo/eastleigh-6.jpg",
      "/images/projects/eastleigh-hmo/eastleigh-7.jpg",
      "/images/projects/eastleigh-hmo/eastleigh-8.jpg",
      "/images/projects/eastleigh-hmo/eastleigh-9.jpg",
      "/images/projects/eastleigh-hmo/eastleigh-10.jpg",
      "/images/projects/eastleigh-hmo/eastleigh-11.jpg",
      "/images/projects/eastleigh-hmo/eastleigh-12.jpg",
      "/images/projects/eastleigh-hmo/eastleigh-13.jpg",
      "/images/projects/eastleigh-hmo/eastleigh-14.jpg",
    ],
    buildingType: "Existing dwelling",
    completionDate: "2024",
    status: "Complete",
  },
  {
    // LOCATION UNKNOWN. "The Crescent" is a street name and nothing in the
    // Drive folder, the client's folder tree or the photographs gives a town.
    // The sibling projects are all Hampshire, but that is an inference, not a
    // fact, so this publishes without a town rather than with a wrong one.
    // Top item on the confirmations list.
    slug: "81-the-crescent",
    conversionTypes: ['hmo'],
    kind: "project",
    title: "81 The Crescent",
    location: "England",
    image: "/images/projects/crescent-81/crescent-1.jpg",
    tag: "HMO",
    stats: [
      { label: "En suites", value: "Every room" },
      { label: "In room", value: "Desk and tea station" },
      { label: "Joinery", value: "Oak and cane" },
    ],
    desc: "An en suite HMO finished to a high specification, with a desk and a tea station in every room and oak joinery running throughout.",
    approach: "Each room is a self-contained unit rather than a bedroom with a shared bathroom down the hall: its own en suite behind an oak door, a slatted timber headboard panel wired with sockets and switches at the bed, a desk under the window, and a wardrobe and chest in cane-fronted oak. The en suites are tiled in large-format stone with quadrant showers and backlit round mirrors. Separate tea stations sit outside the rooms, which is the arrangement that keeps a scheme like this the right side of the licensing standards on kitchen provision.",
    outcome: "Complete and photographed in September 2025. The palette is warm throughout, oak, cream, terracotta and mustard, which is a deliberate step away from the grey-and-white that most rooms at this rent level default to.",
    galleryImages: [
      "/images/projects/crescent-81/crescent-2.jpg",
      "/images/projects/crescent-81/crescent-3.jpg",
      "/images/projects/crescent-81/crescent-4.jpg",
      "/images/projects/crescent-81/crescent-5.jpg",
      "/images/projects/crescent-81/crescent-6.jpg",
      "/images/projects/crescent-81/crescent-7.jpg",
      "/images/projects/crescent-81/crescent-8.jpg",
      "/images/projects/crescent-81/crescent-9.jpg",
      "/images/projects/crescent-81/crescent-10.jpg",
      "/images/projects/crescent-81/crescent-11.jpg",
      "/images/projects/crescent-81/crescent-12.jpg",
      "/images/projects/crescent-81/crescent-13.jpg",
      "/images/projects/crescent-81/crescent-14.jpg",
    ],
    buildingType: "Existing dwelling",
    completionDate: "2025",
    status: "Complete",
  },
  // ---------------------------------------------------------------------
  // HMO Designers projects, ported 2026-07-29 from
  // ~/Downloads/Projects/hmo_designer/site/content/projects/*.json.
  // HMO Designers is a sister practice under the same group, so this is group
  // work and fine to publish, but every entry carries `provenance` so no page
  // implies Thistle Architecture did the job itself.
  //
  // The source records are thin: a title, a one-line subtitle and a short body,
  // with no feasibility documents behind them. So these entries state only what
  // the source asserts (room counts, specification, scope of involvement, year
  // where given) plus what the photography itself shows. No sqm figures, no
  // planning routes and no fire strategies are claimed, unlike the entries above
  // which were written from real documents.
  //
  // THREE SOURCE PROJECTS ARE DELIBERATELY NOT HERE, because slug, title and
  // body disagree about where they are and we will not publish a wrong location:
  //   - hmo-project-bedhampton  slug says Bedhampton (Hampshire), title says
  //                             "London Surrey", which is not a place. Also the
  //                             only one crediting third parties (L&K Estates
  //                             and roost), which needs its own decision.
  //   - hmo-project-crawley     slug says Crawley, title says Gillingham, and
  //                             its subtitle "Project Burlington" collides with
  //                             the unrelated Burlington Road in Southampton.
  //   - hmo-project-chalkridge  title says London, but Chalk Ridge is a
  //                             Basingstoke street and the photography shows a
  //                             suburban semi with a garden, not London.
  // All three are ready to add the moment Ed confirms locations. See
  // docs/case-study-confirmations.md.
  // ---------------------------------------------------------------------
  {
    slug: "derby-road",
    conversionTypes: ['hmo'],
    kind: "project",
    title: "Derby Road",
    location: "South Coast, England",
    image: "/images/projects/hmo-derby-road/derby-road-1.jpg",
    tag: "HMO",
    provenance: "By HMO Designers, part of Thistle Group",
    stats: [
      { label: "Bedrooms", value: "8" },
      { label: "Specification", value: "Ultra luxury" },
      { label: "Communal space", value: "Living and dining" },
    ],
    desc: "An eight-bedroom ultra luxury HMO on the south coast, built around a rooflit living and dining space at the back of the house.",
    approach: "The communal heart of the house is a rear living and dining room lit by a large flush rooflight, with French doors to the outside. The finish is pitched well above the standard letting specification: wall lights either side of a sculptural panel, cane and black timber dining chairs, and a soft palette that reads as a home rather than a room let by the week.",
    outcome: "Complete and let. HMO Designers worked as part of the wider project team on this scheme rather than as sole designer, so the credit is shared with the others involved.",
    galleryImages: [
      "/images/projects/hmo-derby-road/derby-road-2.jpg",
      "/images/projects/hmo-derby-road/derby-road-3.jpg",
      "/images/projects/hmo-derby-road/derby-road-4.jpg",
      "/images/projects/hmo-derby-road/derby-road-5.jpg",
      "/images/projects/hmo-derby-road/derby-road-6.jpg",
      "/images/projects/hmo-derby-road/derby-road-7.jpg",
      "/images/projects/hmo-derby-road/derby-road-8.jpg",
      "/images/projects/hmo-derby-road/derby-road-9.jpg",
      "/images/projects/hmo-derby-road/derby-road-10.jpg",
    ],
    buildingType: "Existing dwelling",
    status: "Complete",
  },
  {
    slug: "george-street-eastleigh",
    conversionTypes: ['hmo'],
    kind: "project",
    title: "George Street",
    location: "Eastleigh, Hampshire",
    image: "/images/projects/hmo-george-street-eastleigh/george-street-eastleigh-1.jpg",
    tag: "HMO",
    provenance: "By HMO Designers, part of Thistle Group",
    stats: [
      { label: "Bedrooms", value: "7" },
      { label: "Scope", value: "Design to construction" },
      { label: "Market", value: "Professional lets" },
    ],
    desc: "A seven-bedroom luxury HMO for professionals in the centre of Eastleigh, taken from first design through to finished build.",
    approach: "The client was carried through every stage: design, planning, interior design and construction. The ground floor is the part that does the work. A full-length shaker kitchen in deep grey, with brass handles and integrated ovens down one side, opens straight into a rooflit dining room at the rear, so the shared space reads as one long room rather than a corridor with a table at the end of it.",
    outcome: "Complete. It is the clearest example in this group of what the extra effort buys at the top of the professional letting market.",
    galleryImages: [
      "/images/projects/hmo-george-street-eastleigh/george-street-eastleigh-2.jpg",
      "/images/projects/hmo-george-street-eastleigh/george-street-eastleigh-3.jpg",
      "/images/projects/hmo-george-street-eastleigh/george-street-eastleigh-4.jpg",
      "/images/projects/hmo-george-street-eastleigh/george-street-eastleigh-5.jpg",
      "/images/projects/hmo-george-street-eastleigh/george-street-eastleigh-6.jpg",
      "/images/projects/hmo-george-street-eastleigh/george-street-eastleigh-7.jpg",
      "/images/projects/hmo-george-street-eastleigh/george-street-eastleigh-8.jpg",
      "/images/projects/hmo-george-street-eastleigh/george-street-eastleigh-9.jpg",
      "/images/projects/hmo-george-street-eastleigh/george-street-eastleigh-10.jpg",
      "/images/projects/hmo-george-street-eastleigh/george-street-eastleigh-11.jpg",
      "/images/projects/hmo-george-street-eastleigh/george-street-eastleigh-12.jpg",
      "/images/projects/hmo-george-street-eastleigh/george-street-eastleigh-13.jpg",
      "/images/projects/hmo-george-street-eastleigh/george-street-eastleigh-14.jpg",
      "/images/projects/hmo-george-street-eastleigh/george-street-eastleigh-15.jpg",
    ],
    buildingType: "Existing dwelling",
    status: "Complete",
  },
  {
    slug: "queens-road",
    conversionTypes: ['hmo'],
    kind: "project",
    title: "Queens Road",
    location: "South Coast, England",
    image: "/images/projects/hmo-queens-road/queens-road-1.jpg",
    tag: "HMO",
    provenance: "By HMO Designers, part of Thistle Group",
    stats: [
      { label: "Bedrooms", value: "7" },
      { label: "Before", value: "3 bed family house" },
      { label: "En suite", value: "Every room" },
    ],
    desc: "A three-bedroom city centre family house turned into a seven-bedroom high-end HMO, every room en suite.",
    challenge: "The starting point was an ordinary three-bedroom family house in a city centre. Getting seven en suite rooms out of that means finding the rooms and the drainage for seven bathrooms at the same time, without leaving the shared space so thin that the house stops working for the people actually living in it.",
    approach: "Managed end to end: existing surveys, proposals, planning and building regulations approval, then construction. The rear of the house opens into a communal living space under a glazed lantern, with bifold doors onto a small walled courtyard. On a tight urban plot that courtyard is how the shared amenity space gets won, and it is why the lounge does not feel like a leftover.",
    outcome: "Complete, and in use as seven high-end en suite rooms.",
    galleryImages: [
      "/images/projects/hmo-queens-road/queens-road-2.jpg",
      "/images/projects/hmo-queens-road/queens-road-3.jpg",
      "/images/projects/hmo-queens-road/queens-road-4.jpg",
      "/images/projects/hmo-queens-road/queens-road-5.jpg",
      "/images/projects/hmo-queens-road/queens-road-6.jpg",
    ],
    buildingType: "Three-bed family house (C3)",
    status: "Complete",
  },
  {
    slug: "shadwell-road",
    conversionTypes: ['hmo'],
    kind: "project",
    title: "Shadwell Road",
    location: "Portsmouth, Hampshire",
    image: "/images/projects/hmo-shadwell-road/shadwell-road-1.jpg",
    tag: "HMO",
    provenance: "By HMO Designers, part of Thistle Group",
    stats: [
      { label: "Bedrooms", value: "7" },
      { label: "Completed", value: "2023" },
      { label: "Scope", value: "Feasibility to approvals" },
    ],
    desc: "A seven-bedroom HMO in Portsmouth, taken from a feasibility study of the existing property through to planning and building regulations approval.",
    approach: "The instruction started with a feasibility study of the building as it stood, then the relevant surveys, then planning and building regulations approval. The communal room sits at the rear under a glazed lantern with French doors to the yard, finished in sage green with pale timber, so the shared space is the brightest room in the house rather than the one nobody uses.",
    outcome: "Completed in 2023.",
    galleryImages: [
      "/images/projects/hmo-shadwell-road/shadwell-road-2.jpg",
      "/images/projects/hmo-shadwell-road/shadwell-road-3.jpg",
      "/images/projects/hmo-shadwell-road/shadwell-road-4.jpg",
      "/images/projects/hmo-shadwell-road/shadwell-road-5.jpg",
      "/images/projects/hmo-shadwell-road/shadwell-road-6.jpg",
      "/images/projects/hmo-shadwell-road/shadwell-road-7.jpg",
    ],
    buildingType: "Existing dwelling",
    completionDate: "2023",
    status: "Complete",
  },
  {
    slug: "burlington-road",
    conversionTypes: ['hmo'],
    kind: "project",
    title: "Burlington Road",
    location: "Southampton, Hampshire",
    image: "/images/projects/hmo-burlington-road/burlington-road-1.jpg",
    tag: "HMO",
    provenance: "By HMO Designers, part of Thistle Group",
    stats: [
      { label: "Bedrooms", value: "7" },
      { label: "Completed", value: "2023" },
      { label: "Specification", value: "Essential" },
    ],
    desc: "A seven-bedroom HMO in Southampton delivered to an essential specification, with en suite rooms worked into the roof under new rooflights.",
    approach: "A feasibility study of the existing property came first, then the surveys, then planning and building regulations approval. The loft rooms take their light from new rooflights set into the slope, and each has its own shower room off the bedroom. That is what keeps a seven-bed count workable in a house of this size without any room feeling like the short straw.",
    outcome: "Completed in 2023.",
    galleryImages: [
      "/images/projects/hmo-burlington-road/burlington-road-2.jpg",
      "/images/projects/hmo-burlington-road/burlington-road-3.jpg",
      "/images/projects/hmo-burlington-road/burlington-road-4.jpg",
      "/images/projects/hmo-burlington-road/burlington-road-5.jpg",
      "/images/projects/hmo-burlington-road/burlington-road-6.jpg",
      "/images/projects/hmo-burlington-road/burlington-road-7.jpg",
      "/images/projects/hmo-burlington-road/burlington-road-8.jpg",
      "/images/projects/hmo-burlington-road/burlington-road-9.jpg",
    ],
    buildingType: "Existing dwelling",
    completionDate: "2023",
    status: "Complete",
  },
  {
    slug: "project-prince",
    conversionTypes: ['hmo'],
    kind: "project",
    title: "Project Prince",
    location: "Southend-on-Sea, Essex",
    image: "/images/projects/hmo-project-prince/project-prince-1.jpg",
    tag: "HMO",
    provenance: "By HMO Designers, part of Thistle Group",
    stats: [
      { label: "Bedrooms", value: "7" },
      { label: "Let", value: "Individually" },
      { label: "Amenities", value: "En suite plus shared" },
    ],
    desc: "A high-end seven-bedroom HMO in Southend-on-Sea, with seven individually let en suite rooms and shared amenities.",
    approach: "Seven rooms, each individually let and each with its own en suite, alongside the shared amenity space. The bedrooms carry the high-end brief properly rather than decoratively: deep colour taken across the walls and the ceiling, slatted timber panelling behind the bed, and a pendant hung either side instead of one light in the middle of the room.",
    outcome: "Complete, and let to professionals in the area. It is a fair demonstration of what a high-end brief buys when the team specialises in HMOs.",
    galleryImages: [
      "/images/projects/hmo-project-prince/project-prince-2.jpg",
      "/images/projects/hmo-project-prince/project-prince-3.jpg",
      "/images/projects/hmo-project-prince/project-prince-4.jpg",
      "/images/projects/hmo-project-prince/project-prince-5.jpg",
      "/images/projects/hmo-project-prince/project-prince-6.jpg",
      "/images/projects/hmo-project-prince/project-prince-7.jpg",
      "/images/projects/hmo-project-prince/project-prince-8.jpg",
      "/images/projects/hmo-project-prince/project-prince-9.jpg",
      "/images/projects/hmo-project-prince/project-prince-10.jpg",
    ],
    buildingType: "Existing dwelling",
    status: "Complete",
  },
  {
    // Address identified 2026-07-29 from Ed's Drive: the film
    // "7FESTINGRD_16x9_V3.mp4" opens on this exact terrace (pale blue house,
    // Pizza Hut next door) and its interior shots match this gallery frame for
    // frame. HMO Designers' own record had no street, only "South Sea".
    slug: "southsea-co-living",
    conversionTypes: ['hmo'],
    kind: "project",
    title: "Southsea Co-Living",
    location: "Festing Road, Southsea, Portsmouth",
    image: "/images/projects/hmo-southsea-co-living/southsea-co-living-3.jpg",
    tag: "HMO",
    provenance: "By HMO Designers, part of Thistle Group",
    stats: [
      { label: "Bedrooms", value: "8" },
      { label: "Format", value: "Luxury co-living" },
      { label: "Building", value: "Victorian terrace" },
    ],
    desc: "An eight-bedroom luxury co-living conversion inside a bay-fronted Victorian terrace in Southsea.",
    approach: "The building is a bay-fronted Victorian terrace on Festing Road, dormers already in the roof, shops either side. Inside, the communal floor runs open plan: kitchen, dining and living in one length on a herringbone floor, with the kitchen tucked along the far wall rather than closed off. That single decision is what makes co-living work here. Eight people sharing a corridor is a house share; eight people sharing a room this size is somewhere you would choose to live.",
    outcome: "Complete, and the most recent of the practice's Portsmouth HMO projects.",
    galleryImages: [
      "/images/projects/hmo-southsea-co-living/southsea-co-living-1.jpg",
      "/images/projects/hmo-southsea-co-living/southsea-co-living-2.jpg",
      "/images/projects/hmo-southsea-co-living/southsea-co-living-4.jpg",
      "/images/projects/hmo-southsea-co-living/southsea-co-living-5.jpg",
      "/images/projects/hmo-southsea-co-living/southsea-co-living-6.jpg",
      "/images/projects/hmo-southsea-co-living/southsea-co-living-7.jpg",
      "/images/projects/hmo-southsea-co-living/southsea-co-living-8.jpg",
      "/images/projects/hmo-southsea-co-living/southsea-co-living-9.jpg",
      "/images/projects/hmo-southsea-co-living/southsea-co-living-10.jpg",
      "/images/projects/hmo-southsea-co-living/southsea-co-living-11.jpg",
      "/images/projects/hmo-southsea-co-living/southsea-co-living-12.jpg",
      "/images/projects/hmo-southsea-co-living/southsea-co-living-13.jpg",
      "/images/projects/hmo-southsea-co-living/southsea-co-living-14.jpg",
      "/images/projects/hmo-southsea-co-living/southsea-co-living-15.jpg",
    ],
    buildingType: "Victorian terraced house",
    status: "Complete",
  },
  // Bishopstoke and Forest Home were removed 2026-07-17. Both folders are empty
  // in the shared drive AND in the 6.25GB archive, so both entries were a stock
  // image, a guessed location and "coming soon". That is the same reason
  // 81 Crescent and School House were never listed (see
  // docs/case-study-confirmations.md). Restore from history the moment Ed sends
  // photos and a write-up.
];

export const feasibilityStudies = caseStudies.filter((c) => c.kind === 'feasibility');
export const completedProjects = caseStudies.filter((c) => c.kind === 'project');
