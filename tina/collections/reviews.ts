import type { Collection } from 'tinacms';

// The five real Trustpilot reviews shown across the site.
//
// These are third-party statements attributed to named people, not marketing
// copy we own. data/reviewsData.ts recorded the rule this collection has to
// carry forward: the quote is a verbatim contiguous excerpt, never reworded or
// reordered, and every card links to the public review so a reader can check
// it. Editing the wording here would publish a fabricated quote under a real
// person's name, so the field descriptions say so where an editor will see
// them.
export const reviewsCollection: Collection = {
  name: 'review',
  label: 'Reviews (Trustpilot)',
  path: 'content/reviews',
  format: 'json',

  ui: {
    // Reviews have no page of their own. They surface inside the testimonials
    // band, so the editor previews the About page, which renders all five.
    router: () => '/about',
    filename: {
      // The filename is the identity used by reviewFor() lookups, so it is not
      // something to regenerate from a changing field.
      readonly: true,
      slugify: (values) =>
        String(values?.author ?? 'review')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
    },
  },

  fields: [
    {
      type: 'string',
      name: 'author',
      label: 'Reviewer name',
      required: true,
      description: 'Exactly as published on Trustpilot. Do not tidy or abbreviate.',
    },
    {
      type: 'string',
      name: 'title',
      label: 'Review title',
      description: 'The headline as published, where the review has one.',
    },
    {
      type: 'string',
      name: 'quote',
      label: 'Quote',
      required: true,
      ui: { component: 'textarea' },
      description:
        'VERBATIM EXCERPT — do not reword, reorder or correct, including original typos. This is a real person’s published review; changing it misrepresents them. Shorten only by trimming whole sentences from the start or end.',
    },
    {
      type: 'string',
      name: 'date',
      label: 'Date (as displayed)',
      required: true,
      description: 'Human-readable, e.g. "30 June 2026".',
    },
    {
      type: 'string',
      name: 'datePublished',
      label: 'Date (machine-readable)',
      required: true,
      description:
        'ISO form of the same date, e.g. "2026-06-30". Used for schema.org markup, so it must match the displayed date.',
    },
    {
      type: 'number',
      name: 'rating',
      label: 'Star rating',
      required: true,
      description: 'Out of 5. Must match the published review.',
    },
    {
      type: 'string',
      name: 'topics',
      label: 'Topics',
      list: true,
      options: ['feasibility', 'hmo', 'commercial', 'planning'],
      description:
        'Which pages this review is eligible to appear on. Structural, not copy — it controls placement, not wording.',
    },
    {
      type: 'number',
      name: 'order',
      label: 'Display order',
      description: 'Lower numbers appear first.',
    },
  ],
};
