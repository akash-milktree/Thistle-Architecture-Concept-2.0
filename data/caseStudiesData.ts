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
  floorArea: string;
  planningRoute: string;
  completionDate: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "croydon-office-conversion",
    title: "Office to Resi (Class MA)",
    location: "Croydon, South London",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    tag: "Class MA",
    stats: [
      { label: "Units Unlocked", value: "+14" },
      { label: "Above Target", value: "+5" },
      { label: "Feasibility", value: "5 days" },
    ],
    desc: "The client assumed 9 units. Our structural analysis and layout optimization unlocked 5 additional apartments within the same envelope.",
    challenge: "The client had secured exclusivity on a 3-storey office block in Croydon but was working from a basic agent's floor plan that suggested 9 units. With a tight exchange deadline and concerns about the building's unusual L-shaped footprint, they needed clarity on the maximum viable unit count before committing.",
    approach: "Our automated desk study flagged favourable planning precedent in the area — three similar Class MA conversions approved within 500m. The architect review revealed that the client's assumed corridor layout was wasting significant floor area. By repositioning the core circulation and introducing dual-aspect units along the building's longer wing, we unlocked additional frontage that the original plan had overlooked.",
    outcome: "The final feasibility report demonstrated 14 viable units — 5 more than the client's initial estimate. The accommodation schedule showed all units meeting NDSS minimum space standards, with an average efficiency ratio of 82%. The client exchanged within a week of receiving the report and submitted their Class MA application the following month.",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80",
    ],
    buildingType: "Office (B1a)",
    floorArea: "12,400 sqft",
    planningRoute: "Class MA",
    completionDate: "November 2025",
  },
  {
    slug: "reading-high-street",
    title: "High Street Upper Parts",
    location: "Reading, Berkshire",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
    tag: "Mixed Use",
    stats: [
      { label: "Projected Yield", value: "28%" },
      { label: "Retail Preserved", value: "100%" },
      { label: "Feasibility", value: "4 days" },
    ],
    desc: "A complex access issue was blocking development. We redesigned the core circulation to meet fire regs without sacrificing retail space.",
    challenge: "The developer had identified three adjoining high street retail units with unused upper floors — a common opportunity in town centres. However, the only access to the upper storeys was through the active retail units, and previous architects had deemed the building unconvertible without losing ground floor commercial space.",
    approach: "Our desk study identified a narrow service alley to the rear of the building that had been overlooked. The architect review designed a compliant staircore and escape route through the alley, creating independent residential access without touching the retail frontages. Fire engineering analysis confirmed the route met Building Regulations Approved Document B requirements.",
    outcome: "The feasibility report unlocked 6 one-bed apartments across the upper two floors while preserving 100% of the ground-floor retail. The projected yield of 28% made the scheme highly attractive to the developer's JV partner. The report was used directly in the funding application, which was approved within three weeks.",
    galleryImages: [
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80",
    ],
    buildingType: "Retail (A1) with upper floors",
    floorArea: "8,200 sqft",
    planningRoute: "Full Planning",
    completionDate: "September 2025",
  },
  {
    slug: "manchester-warehouse",
    title: "Warehouse Conversion",
    location: "Manchester, Greater Manchester",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80",
    tag: "Class MA",
    stats: [
      { label: "Units Unlocked", value: "22" },
      { label: "GDV Uplift", value: "£1.8m" },
      { label: "Feasibility", value: "5 days" },
    ],
    desc: "A disused warehouse with complex structural constraints. We identified a mezzanine strategy that maximised unit count without triggering full planning.",
    challenge: "A large single-storey warehouse with 6m floor-to-ceiling heights presented an unusual challenge: the open-plan space was ideal for conversion, but the client wanted to know if mezzanine levels could be inserted under Class MA without triggering a material change that would require full planning permission.",
    approach: "Our desk study researched recent Class MA precedent for mezzanine insertions and identified that internal alterations — including mezzanines — are generally permitted under Class MA provided the external appearance remains unchanged. The architect review designed a steel mezzanine structure that created 22 duplex-style apartments, each with generous double-height living spaces.",
    outcome: "The feasibility confirmed 22 units were achievable under Class MA, with an estimated GDV uplift of £1.8m over the client's original flat conversion estimate. The structural analysis confirmed the existing foundations could support the mezzanine loads. The client proceeded to full design and received Prior Approval within 56 days.",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    ],
    buildingType: "Warehouse (B8)",
    floorArea: "18,600 sqft",
    planningRoute: "Class MA",
    completionDate: "January 2026",
  },
  {
    slug: "bristol-office-block",
    title: "City Centre Office Block",
    location: "Bristol, South West",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80",
    tag: "Class O",
    stats: [
      { label: "Units Unlocked", value: "18" },
      { label: "Risk Avoided", value: "£340k" },
      { label: "Feasibility", value: "5 days" },
    ],
    desc: "Our feasibility identified a critical flood risk issue that would have blocked the conversion. The client pivoted to an alternative building before committing.",
    challenge: "The client was in advanced negotiations on a 1980s office block in Bristol city centre. The building appeared ideal for Class O conversion — good floor plates, regular grid, central location. But the client needed confirmation before exchanging contracts on a tight deadline.",
    approach: "Our automated desk study flagged the building as sitting within Flood Zone 3a — a critical constraint that the selling agent's particulars had not disclosed. Under Class O, residential conversions in Flood Zone 3 require a Sequential Test and Exception Test, which would significantly delay the project and introduce uncertainty. The architect review confirmed the floor plates were otherwise excellent for conversion but noted that the flood risk made the project high-risk.",
    outcome: "The feasibility report delivered a clear No-Go recommendation. The client withdrew from negotiations, saving an estimated £340k in abortive costs (survey fees, legal fees, and potential construction delays). Within two weeks, they instructed us on an alternative building 800m away that received a Go recommendation and is now in construction.",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    ],
    buildingType: "Office (B1a)",
    floorArea: "14,200 sqft",
    planningRoute: "Class O",
    completionDate: "August 2025",
  },
];
