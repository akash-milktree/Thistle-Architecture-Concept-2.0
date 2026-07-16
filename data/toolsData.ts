export interface Tool {
  slug: string;
  label: string;
  summary: string;
  iconName: 'ListChecks' | 'Calculator';
  path: string;
  metaTitle: string;
  metaDescription: string;
}

export const tools: Tool[] = [
  {
    slug: "class-ma-checker",
    label: "Class MA Eligibility Checker",
    summary: "Four quick questions to see if your building qualifies for permitted-development conversion under Class MA.",
    iconName: "ListChecks",
    path: "/tools/class-ma-checker",
    metaTitle: "Class MA Eligibility Checker | Thistle Architecture",
    metaDescription: "Free Class MA eligibility checker. Four quick questions on use class, Article 4, and listing status. See whether your office-to-resi conversion qualifies for permitted development.",
  },
  // Ed's video feedback 2026-07-08: the old calculator did not say what kind of
  // property it was for. It is the apartment one; HMOs are valued on income, so
  // they get their own tool underneath it.
  {
    slug: "gdv-calculator",
    label: "Apartment GDV Calculator",
    summary: "A quick back-of-envelope check on whether an apartment scheme stacks up, before you spend a pound on a feasibility.",
    iconName: "Calculator",
    path: "/tools/gdv-calculator",
    metaTitle: "Apartment GDV & Viability Calculator | Thistle Architecture",
    metaDescription: "Free apartment GDV and viability calculator for conversion schemes. Enter purchase price, area, units, and sale prices; see projected margin and a quick verdict on whether the deal stacks up.",
  },
  {
    slug: "hmo-calculator",
    label: "HMO Valuation Calculator",
    summary: "HMOs are valued on income, not on comparable sales. Set the room count and rate to see the indicative value.",
    iconName: "Calculator",
    path: "/tools/hmo-calculator",
    metaTitle: "HMO Valuation Calculator | Thistle Architecture",
    metaDescription: "Free HMO valuation calculator. Enter room count, room rate, operating allowance, and target yield to see gross rent, net income, and the indicative capital value of an HMO conversion.",
  },
];

export const getToolBySlug = (slug: string): Tool | undefined =>
  tools.find((t) => t.slug === slug);
