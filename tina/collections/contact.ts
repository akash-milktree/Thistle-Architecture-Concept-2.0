import type { Collection } from 'tinacms';

// Everything on /contact that is prose, and nothing that is machinery.
//
// The split matters more on this page than anywhere else on the site, because
// this page is the lead capture. Two forms sit on it — the general enquiry
// form and Jodi's expert-session card — and neither is represented here at
// all. Their field labels, placeholders, button states, success and error
// messages and the /api/leads endpoint stay in sections/ContactForm.tsx and
// sections/ExpertSessionCard.tsx. A typo in a heading is embarrassing; a typo
// in a form is a lost enquiry.
//
// Deliberately NOT here, and staying in code:
//
// - Everything inside both forms, per the above. That includes both "within
//   one working day" lines, which sit inside the forms rather than in the
//   surrounding copy, and the whole of Jodi's card, whose copy cannot be
//   separated from the booking form it wraps.
// - The email address and phone number in the left-hand column. Those ARE
//   editable — from Site Settings (Footer > Email address / Phone number),
//   which is the same pair the footer of every page renders. The page reads
//   them from there rather than keeping its own copy, because two numbers that
//   have drifted apart is a caller who reaches nobody.
// - Where each button goes: /pricing#calculator, the #enquiry anchor, and
//   /feasibility-package. Routing, not copy.
//
// Ed's August 2026 final brief, section 08, is what the page is built around:
// three routes in, ordered by how ready the visitor is. The middle route is
// Jodi's card, so this collection covers the first and third only.
export const contactCollection: Collection = {
  name: 'contact',
  label: 'Contact Page',
  path: 'content/contact',
  format: 'json',

  ui: {
    // One page, one file: there is nothing to create and nothing to delete.
    allowedActions: { create: false, delete: false },
    router: () => '/contact',
  },

  fields: [
    // --- Search engine listing. Never appears on the page itself. ---
    {
      type: 'string',
      name: 'metaTitle',
      label: 'Search result title',
      description:
        'The tab title and the blue headline in Google. "| Thistle Architecture" is added automatically, so type just the page name, e.g. "Contact". Around 50 characters works best.',
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
      description: 'The pale band at the very top of the page.',
      fields: [
        { type: 'string', name: 'label', label: 'Eyebrow', description: 'The small grey word above the headline.' },
        { type: 'string', name: 'heading', label: 'Headline' },
        {
          type: 'string',
          name: 'description',
          label: 'Supporting paragraph',
          ui: { component: 'textarea' },
          description:
            'Names the ways to get in touch: one address, one number, and the call-back card. If a route is ever added or dropped, this line has to be re-read.',
        },
      ],
    },

    // --- Route 1 of 2 ---
    {
      type: 'object',
      name: 'routeReady',
      label: 'Card 1: ready to assess a property',
      description:
        'The first of the three cards under the page header, for the visitor who already knows what they want priced. Its button opens the fee calculator on the pricing page — that destination is set in code, so editing the label changes what the button says, not where it goes. The middle card, Jodi\u2019s free expert session, is not in this form: its wording is part of the booking form it wraps and lives in code with it.',
      fields: [
        { type: 'string', name: 'eyebrow', label: 'Card heading', description: 'The small green capitals at the top of the card.' },
        { type: 'string', name: 'body', label: 'Card text', ui: { component: 'textarea' } },
        { type: 'string', name: 'buttonLabel', label: 'Button label' },
      ],
    },

    // --- The nudge beside the enquiry form ---
    {
      type: 'object',
      name: 'feasibilityNudge',
      label: 'Feasibility prompt (beside the enquiry form)',
      description:
        'The small white card to the left of the enquiry form. Anyone with a live scheme gets more out of the feasibility form than a general message, so it is offered here rather than buried. The "five days" it promises is the guaranteed turnaround quoted across the rest of the site — keep the two saying the same thing.',
      fields: [
        { type: 'string', name: 'heading', label: 'Heading' },
        { type: 'string', name: 'body', label: 'Supporting text', ui: { component: 'textarea' } },
        {
          type: 'string',
          name: 'linkLabel',
          label: 'Link label',
          description: 'The green link at the bottom of the card. It always goes to the Feasibility Package page.',
        },
      ],
    },
    {
      type: 'object',
      name: 'expertSession',
      label: 'Expert session card',
      description:
        "The green book-a-call card. The August 2026 brief asked for a Calendly booking with Jodi; her link does not exist yet, so this card captures the request instead. When the Calendly embed replaces it, this group can go.",
      fields: [
        { type: 'string', name: 'personName', label: 'Name', description: 'Also sets the initial shown in the circle.' },
        { type: 'string', name: 'personRole', label: 'Role line' },
        { type: 'string', name: 'pitch', label: 'Pitch', ui: { component: 'textarea' } },
        { type: 'string', name: 'buttonLabel', label: 'Button label' },
        { type: 'string', name: 'reassurance', label: 'Reassurance line', description: 'The small print beside the button.' },
        { type: 'string', name: 'successHeading', label: 'Confirmation message', ui: { component: 'textarea' }, description: 'Shown after someone submits the card. The "if it is urgent" line that follows it uses the practice email and phone from Site Settings, so there is one address on the page rather than two.' },
      ],
    },
  ],
};
