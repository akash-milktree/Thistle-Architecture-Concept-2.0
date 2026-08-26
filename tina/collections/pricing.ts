import type { Collection } from 'tinacms';
import { joinKeyField } from '../fields';

// The /pricing page: the four-product ladder, the calculator's framing copy,
// the fee factors, the £49.99-vs-£298 comparison, and what the automated
// appraisal covers.
//
// PRICES ARE DELIBERATELY NOT IN HERE.
//
// The headline figures exist in four places at once: BASE_FEE and the area
// ladder in data/pricingData.ts (which the calculator and /api/checkout both
// compute from), PRODUCTS[].price on the cards, pricingFrom in
// data/feasibilityPackageData.ts, and a dozen literal strings in the JSX across
// the pricing and feasibility pages. Only the engine's numbers decide what a
// customer is actually charged. Putting the card prices in the CMS would let an
// editor publish a fee the site does not honour — the page would say £250 and
// Stripe would take £298 — with nothing to catch it. So every figure that reads
// as the price OF a product stays in code, next to the engine, and moves with
// it. scripts/pricing-check.mjs asserts the engine against Ed's brief.
//
// Some editable copy still quotes a price, because the headings genuinely are
// sentences: "£49.99 Or From £298?" and "What You Get For £49.99." Those carry
// a warning in their description rather than being frozen, since a page whose
// headings cannot be edited is not much of a CMS.
//
// Also staying in code: the product `href`s (routes, and hmochecker.co.uk),
// the order of the four products, the pinned Maywood Group review, and every
// label inside the calculator form.
export const pricingCollection: Collection = {
  name: 'pricing',
  label: 'Pricing Page',
  path: 'content/pricing',
  format: 'json',

  ui: {
    allowedActions: { create: false, delete: false },
    router: () => '/pricing',
  },

  fields: [
    {
      type: 'object',
      name: 'hero',
      label: 'Page header',
      fields: [
        { type: 'string', name: 'label', label: 'Eyebrow' },
        { type: 'string', name: 'heading', label: 'Heading' },
        {
          type: 'string',
          name: 'description',
          label: 'Intro paragraph',
          ui: { component: 'textarea' },
          description:
            'This line quotes the £15.99 entry price. If a price ever changes, it has to change in code as well — ask the developer rather than editing the number here on its own.',
        },
      ],
    },

    {
      type: 'object',
      name: 'products',
      label: 'The four products',
      description:
        'The product ladder at the top of the page. Prices, links and the order of the four are set in code — reordering or removing an item here will not change the page.',
      fields: [
        {
          type: 'string',
          name: 'recommendedLabel',
          label: 'Badge on the preferred product',
          description:
            'The small badge on the Architectural Feasibility card. Ed asked for the architect-led product to be the visually preferred option, labelled explicitly.',
        },
        {
          type: 'object',
          name: 'items',
          label: 'Products',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.name }) },
          fields: [
            joinKeyField({ name: 'key', label: 'Product (fixed)', description: 'Identifies which card this copy belongs to. Read-only: changing it would stop the card reading this text.' }),
            { type: 'string', name: 'name', label: 'Product name' },
            { type: 'string', name: 'strapline', label: 'One-line summary' },
            { type: 'string', name: 'body', label: 'Description', ui: { component: 'textarea' } },
            {
              type: 'string',
              name: 'cta',
              label: 'Link label',
              description: 'The wording of the link at the bottom of the card. Where it goes is set in code.',
            },
            {
              type: 'string',
              name: 'turnaround',
              label: 'Turnaround line',
              description:
                'The small line above the link, e.g. "5 working days". This is a promise to the customer — leave it blank for products that do not make one.',
            },
          ],
        },
        {
          type: 'string',
          name: 'vatNote',
          label: 'Footnote under the products',
          description: 'Ed\'s final brief asks for this stated once for the whole ladder rather than repeated on every card.',
        },
      ],
    },

    {
      type: 'object',
      name: 'calculator',
      label: 'Fee calculator: introduction',
      description:
        'The copy above the calculator. The questions inside it, and the fee it works out, are code — they follow Ed\'s pricing brief and are checked against it.',
      fields: [
        { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
        { type: 'string', name: 'heading', label: 'Heading' },
        {
          type: 'string',
          name: 'lede',
          label: 'Supporting paragraph',
          ui: { component: 'textarea' },
          description:
            'Says how many questions there are. The calculator currently asks seven, so keep the two in step if a question is ever added or removed.',
        },
      ],
    },

    {
      type: 'object',
      name: 'feeFactors',
      label: 'What affects your fee',
      description:
        'The list of things that move the fee. Ed\'s final brief replaced the published fee tables with the factors alone: the customer sees exactly what they will pay in the calculator, without the pricing engine behind it being public. Adding amounts back here would undo that decision.',
      fields: [
        { type: 'string', name: 'heading', label: 'Heading' },
        { type: 'string', name: 'lede', label: 'Supporting paragraph', ui: { component: 'textarea' } },
        {
          type: 'object',
          name: 'items',
          label: 'Factors',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.label }) },
          fields: [
            {
              type: 'string',
              name: 'label',
              label: 'Factor',
              description: 'A few words. These render as pills across the page, so a long sentence will not sit well.',
            },
          ],
        },
        {
          type: 'string',
          name: 'footnote',
          label: 'Closing line',
          ui: { component: 'textarea' },
          description: 'The note about several factors at once routing to an Expert Session. That threshold is enforced in code.',
        },
      ],
    },

    {
      type: 'object',
      name: 'comparison',
      label: 'Automated vs architect-led',
      description: 'The two-card comparison. The prices shown on the cards are set in code so they cannot drift from what the site charges.',
      fields: [
        {
          type: 'string',
          name: 'heading',
          label: 'Heading',
          description:
            'This heading quotes both prices. If a price ever changes it must change in code too, so treat the numbers here as something to update alongside the developer, not on their own.',
        },
        { type: 'string', name: 'lede', label: 'Supporting line', ui: { component: 'textarea' } },
        { type: 'string', name: 'automatedLabel', label: 'Left card: label' },
        { type: 'string', name: 'automatedBody', label: 'Left card: description', ui: { component: 'textarea' } },
        { type: 'string', name: 'architecturalLabel', label: 'Right card: label' },
        { type: 'string', name: 'architecturalBody', label: 'Right card: description', ui: { component: 'textarea' } },
      ],
    },

    {
      type: 'object',
      name: 'automated',
      label: 'What the automated appraisal covers',
      fields: [
        {
          type: 'string',
          name: 'eyebrow',
          label: 'Eyebrow',
          description: 'Quotes the £49.99 price; see the note on the comparison heading before changing the number.',
        },
        {
          type: 'string',
          name: 'heading',
          label: 'Heading',
          description: 'Also quotes the £49.99 price.',
        },
        {
          type: 'object',
          name: 'items',
          label: 'What is included',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.text }) },
          fields: [
            {
              type: 'string',
              name: 'text',
              label: 'Inclusion',
              ui: { component: 'textarea' },
              description: 'This list is what the appraisal actually produces. Only add a line the report really contains.',
            },
          ],
        },
        {
          type: 'string',
          name: 'boundary',
          label: 'What it does not include',
          ui: { component: 'textarea' },
          description:
            'Ed asked for this boundary stated plainly rather than buried: the automated appraisal has no drawings and no architect. Softening it invites the complaint it exists to prevent.',
        },
      ],
    },

    {
      type: 'object',
      name: 'reviews',
      label: 'Reviews section',
      description:
        'Only the heading of the reviews band on this page. The reviews themselves live under "Reviews (Trustpilot)", and the supporting line and link label come from Site Settings.',
      fields: [
        { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
        { type: 'string', name: 'heading', label: 'Heading' },
      ],
    },

    {
      type: 'object',
      name: 'seo',
      label: 'Search engine listing',
      description: 'Not shown on the page. This is the title and summary Google shows in its results.',
      fields: [
        {
          type: 'string',
          name: 'metaTitle',
          label: 'Search result title',
          description: '"| Thistle Architecture" is added automatically, so this is just the page name.',
        },
        {
          type: 'string',
          name: 'metaDescription',
          label: 'Search result description',
          ui: { component: 'textarea' },
          description: 'Around 150 to 160 characters. Google cuts off anything longer.',
        },
      ],
    },
  ],
};
