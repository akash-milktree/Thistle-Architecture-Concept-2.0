export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "class-ma-vs-full-planning",
    title: "Class MA vs Full Planning: Which Route Is Right for Your Building?",
    excerpt: "Understanding the key differences between permitted development rights and full planning applications for commercial-to-residential conversions.",
    content: [
      "One of the most common questions we hear from developers looking at commercial-to-residential conversions is whether to pursue Class MA (formerly Class O) permitted development rights or submit a full planning application. The answer, as with most things in property development, depends on the building.",
      "## What is Class MA?",
      "Class MA was introduced in August 2021, replacing the previous Class O permitted development right. It allows the change of use from commercial, business, and service use (Class E) to residential (Class C3) without needing full planning permission. Instead, you apply for Prior Approval — a simpler, faster process that the local planning authority must determine within 56 days.",
      "The key advantages of Class MA are speed and certainty. The local authority can only assess the application against a limited set of criteria: flooding, contamination, transport impacts, noise, natural light, fire safety, and the impact on the intended function of any conservation area or area of outstanding natural beauty.",
      "## When Class MA Works",
      "Class MA is ideal for straightforward office and retail conversions where the building has been in continuous commercial use and sits outside any Article 4 direction area. It's particularly effective for buildings with regular floor plates, adequate natural light, and no significant flood risk.",
      "Our data shows that Class MA applications have a significantly higher approval rate than full planning applications for similar conversion schemes — around 89% versus 72% in our experience. The process is also substantially faster, with most Prior Approval decisions taking 6-8 weeks compared to 12-16 weeks for full planning.",
      "## When You Need Full Planning",
      "Full planning becomes necessary in several scenarios. If the building is in an area covered by an Article 4 direction that removes Class MA rights, you have no choice but to apply through the full planning route. Similarly, if you want to extend the building, alter its external appearance significantly, or the building doesn't meet the Class E use class requirements, full planning is the only option.",
      "Full planning also gives you more flexibility. You can negotiate with the planning authority on unit sizes, mix, and design. You can propose extensions or rooftop additions that Class MA doesn't permit. And you can make a case for schemes that might not meet the strict Class MA criteria on issues like natural light or flooding.",
      "## Our Recommendation",
      "We always assess both routes as part of our feasibility studies. In many cases, Class MA is the clear winner — it's faster, more certain, and avoids the risk of planning refusal on design grounds. But for complex buildings or schemes that need to push beyond the existing envelope, full planning can unlock significantly more value despite the additional time and cost.",
      "The critical thing is to make this decision early — before you exchange contracts. Our feasibility reports include a clear recommendation on the optimal planning route, backed by local precedent analysis and a risk assessment for each option.",
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    date: "February 8, 2026",
    readTime: "6 min read",
    category: "Planning",
    author: {
      name: "Sarah Mitchell",
      role: "Head of Planning",
      initials: "SM",
    },
  },
  {
    slug: "five-red-flags-feasibility",
    title: "5 Red Flags in a Feasibility Report (and How to Spot Them)",
    excerpt: "Not all feasibility reports are created equal. Here's what to look for when reviewing a feasibility study for a commercial conversion project.",
    content: [
      "A feasibility report should give you confidence — either to proceed with a deal or to walk away. But too many reports we've reviewed from other practices leave developers with more questions than answers. Here are five red flags that suggest a feasibility report isn't doing its job.",
      "## 1. No Clear Go/No-Go Recommendation",
      "The whole point of a feasibility study is to answer one question: should I proceed with this building? If the report ends with vague conclusions like 'further investigation recommended' or 'subject to detailed design,' it hasn't done its job. A good feasibility report commits to a clear recommendation based on the evidence gathered.",
      "At Thistle, every report ends with an unambiguous Go or No-Go recommendation, supported by a risk register that quantifies the key uncertainties.",
      "## 2. Missing or Generic Constraints Analysis",
      "If the report doesn't mention the specific planning policies that apply to the building — the local plan allocation, any Article 4 directions, conservation area status, flood zone classification — it's likely based on assumptions rather than research. A proper desk study should surface all material constraints before the architect starts drawing.",
      "## 3. Unit Counts Without Space Standards",
      "Beware of reports that promise high unit counts without demonstrating compliance with the Nationally Described Space Standards (NDSS). It's easy to draw 20 units on a plan if you ignore the minimum space requirements. A credible feasibility will show you a schedule of accommodation with each unit's GIA clearly mapped against the NDSS minimums.",
      "## 4. No Efficiency Ratio",
      "The efficiency ratio — the percentage of gross internal area that becomes sellable residential space — is one of the most important metrics in a conversion project. If the report doesn't calculate this, you can't accurately estimate GDV or compare the scheme against alternative uses. We target a minimum 80% efficiency ratio for office conversions and flag anything below 75% as a risk.",
      "## 5. No Risk Register",
      "Every building has risks. Structural unknowns, services diversions, contamination, fire strategy complications — these are all normal parts of conversion projects. A good feasibility report doesn't pretend they don't exist. It identifies them, assesses their likely impact and cost, and tells you whether they're manageable or deal-breaking.",
      "## The Bottom Line",
      "A feasibility report should be the hardest-working document in your acquisition process. If it doesn't give you the clarity to make a confident decision — to bid, to walk, or to negotiate — it's not doing its job. Our reports are designed to be the single document you need to make that call.",
    ],
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80",
    date: "January 24, 2026",
    readTime: "5 min read",
    category: "Feasibility",
    author: {
      name: "Alex Thistle",
      role: "Founder & Director",
      initials: "AT",
    },
  },
  {
    slug: "commercial-to-resi-boom-2026",
    title: "Why Commercial-to-Residential Conversion Is Booming in 2026",
    excerpt: "Record office vacancy rates, supportive planning policy, and a chronic housing shortage are creating the perfect conditions for conversion projects.",
    content: [
      "Commercial-to-residential conversion has been growing steadily since the introduction of permitted development rights in 2013. But 2026 is shaping up to be a landmark year for the sector, driven by a convergence of market conditions, policy changes, and shifting work patterns.",
      "## Record Office Vacancy",
      "Post-pandemic working patterns have permanently reduced demand for traditional office space. National office vacancy rates hit 12.4% in Q4 2025 — the highest since records began. In many regional centres, the figure is even higher. This surplus of empty commercial stock represents an enormous opportunity for developers who can move quickly.",
      "## Supportive Planning Policy",
      "The expansion of Class MA in 2021 was a game-changer, but the government's continued commitment to brownfield-first development policy has created an even more favourable environment. The revised NPPF gives significant weight to the reuse of existing buildings, and many local authorities are now actively encouraging conversion schemes as part of their housing delivery strategies.",
      "## The Housing Shortage",
      "England needs approximately 300,000 new homes per year to meet demand. We're currently delivering around 220,000. The gap has to be filled somehow, and conversion of existing commercial buildings is one of the fastest routes to delivery. Unlike new-build projects, conversions don't require land acquisition or lengthy enabling works — you're starting with a building that already has foundations, a structure, and services connections.",
      "## The Economics Work",
      "For developers, the economics of conversion are compelling. Acquisition costs for vacant commercial buildings remain well below residential land values in most locations. Construction costs for conversion are typically 30-40% lower than new-build, and the build programme is significantly shorter — often 6-9 months from start on site to practical completion.",
      "Combined with strong rental demand in most urban areas, this means conversion projects can achieve yields that new-build developments struggle to match. Our feasibility data shows average projected yields of 22-28% for well-located conversion schemes.",
      "## What This Means for Developers",
      "The window is open, but it won't stay open forever. As more developers enter the market, competition for suitable buildings will increase and acquisition prices will rise. The developers who move fastest — with data-driven feasibility studies that let them bid with confidence — will capture the best opportunities.",
      "That's exactly what Thistle is built for. Our 5-day feasibility process is designed to give developers the speed and clarity they need to act on deals before the competition catches up.",
    ],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
    date: "January 10, 2026",
    readTime: "4 min read",
    category: "Market Insight",
    author: {
      name: "Sarah Mitchell",
      role: "Head of Planning",
      initials: "SM",
    },
  },
];
