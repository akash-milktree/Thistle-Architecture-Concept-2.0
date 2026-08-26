import type { Collection } from 'tinacms';

// /conversions — the Expertise overview — plus the wording that is repeated on
// all five of the sector pages underneath it.
//
// A singleton rather than a sixth document in the `conversion` collection. That
// collection has one invariant holding it together: filename == slug == a real
// /conversions/<slug> page, with create and delete off so it stays true. An
// overview document would break it, and it has none of the fields the other
// five are built from — no risks, no deliverable highlights, no FAQs — so every
// field description in that form would read wrongly for it and an editor would
// have to know which of the six documents to ignore.
//
// The shared wording lives here rather than being repeated on each of the five
// records for the same reason it is one component in code: it is one sentence
// shown five times, and five copies of it would drift. It is edited on this
// form, but it can also be clicked on any of the five pages, because those
// pages load this document as well as their own.
//
// Deliberately NOT here, and staying in code:
//
//  - The cards on the overview page. Each one is a sector's own name, headline
//    and standfirst, read straight from that sector's record, so there is one
//    place to edit them. The order the cards appear in is layout, not copy.
//  - "Explore <sector>" on each card, which is assembled from the sector name.
//  - The "How it works →" link beside the button in the page header. It is
//    wayfinding to another page, not a claim about the work.
export const conversionsIndexCollection: Collection = {
  name: 'conversionsIndex',
  label: 'Expertise Overview Page',
  path: 'content/conversions-index',
  format: 'json',

  ui: {
    // One page, one file: there is nothing to create and nothing to delete.
    allowedActions: { create: false, delete: false },
    router: () => '/conversions',
  },

  fields: [
    // --- Search engine listing. Never appears on the page itself. ---
    {
      type: 'string',
      name: 'metaTitle',
      label: 'Search result title',
      description:
        'The tab title and the blue headline in Google. "| Thistle Architecture" is added automatically, so type just the page name, e.g. "Expertise". Around 50 characters works best.',
    },
    {
      type: 'string',
      name: 'metaDescription',
      label: 'Search result description',
      ui: { component: 'textarea' },
      description:
        'The grey summary under the headline in Google. Not shown anywhere on the page. Google cuts it off after roughly 155 characters.',
    },

    // --- Page header ---
    {
      type: 'object',
      name: 'hero',
      label: 'Page header',
      description: 'The pale band at the top of /conversions, above the five sector cards.',
      fields: [
        { type: 'string', name: 'label', label: 'Eyebrow', description: 'The small green line above the headline.' },
        { type: 'string', name: 'heading', label: 'Headline' },
        {
          type: 'string',
          name: 'description',
          label: 'Standfirst',
          ui: { component: 'textarea' },
          description:
            'The short paragraph under the headline. Ed\'s August 2026 final brief, section 06, asked for this page to be a genuine overview rather than a redirect into Commercial to Residential, so this line has to say what the five have in common.',
        },
      ],
    },

    // --- The wording repeated on every sector page ---
    {
      type: 'object',
      name: 'shared',
      label: 'Wording shared by all five sector pages',
      description:
        'These appear on Commercial to Residential, HMO, Mixed-Use, High-End Residential and Co-Living & Large HMO alike, not on this page. Editing one here changes it on all five at once, which is the point: they are one sentence shown five times. You can also click any of them on a sector page and land back in this form.',
      fields: [
        {
          type: 'string',
          name: 'opportunityEyebrow',
          label: 'Opportunity eyebrow',
          description: 'The small green line above the opening paragraph of every sector page.',
        },
        {
          type: 'string',
          name: 'challengesEyebrow',
          label: 'Risks eyebrow',
          description: 'The small green line above the risks section.',
        },
        {
          type: 'string',
          name: 'challengesHeading',
          label: 'Risks heading (first line)',
          description:
            'The sector name is added on a second line in green, with a full stop, so this reads "The Risks Unique To" then "HMO." — write it as the start of that sentence, with no punctuation at the end.',
        },
        {
          type: 'string',
          name: 'solveEyebrow',
          label: 'Deliverables eyebrow',
          description: 'The small green line above the four deliverable cards.',
        },
        {
          type: 'string',
          name: 'solveHeading',
          label: 'Deliverables heading (first line)',
          description:
            'Finished by the sector name in green on the line below, the same way as the risks heading: "Built For" then "HMO." No punctuation at the end.',
        },
        {
          type: 'string',
          name: 'caseStudyEyebrow',
          label: 'Case study eyebrow',
          description: 'The small green line above the featured project. Which project each page features is set in code.',
        },
        { type: 'string', name: 'caseStudyHeading', label: 'Case study heading' },
        {
          type: 'string',
          name: 'ctaHeading',
          label: 'Closing heading',
          description: 'The heading on the band near the bottom that asks for the enquiry.',
        },
        {
          type: 'string',
          name: 'ctaBody',
          label: 'Closing paragraph',
          ui: { component: 'textarea' },
          description:
            'States the five-day turnaround and the fixed fee, both of which are promises the practice then has to keep. Check with Ed before changing either.',
        },
        {
          type: 'string',
          name: 'ctaLabel',
          label: 'Button label',
          description:
            'Used by both buttons on every sector page — the one in the header and the one at the bottom — so the two cannot end up saying different things. Where they go is set in code.',
        },
        {
          type: 'string',
          name: 'otherExpertiseEyebrow',
          label: 'Cross-links eyebrow',
          description:
            'The grey line above the row of links to the other four sectors at the very bottom. Those links are the two-way linking between Expertise pages from Ed\'s August 2026 final brief; their labels are each sector\'s own name.',
        },
      ],
    },
  ],
};
