import type { Collection } from 'tinacms';

// Everything on /contact that is prose, and nothing that is machinery.
//
// The split matters more on this page than anywhere else on the site, because
// this page is the lead capture. The enquiry form is not represented here at
// all: its field labels, placeholders, button states, success and error
// messages and the /api/leads endpoint stay in sections/ContactForm.tsx. A typo
// in a heading is embarrassing; a typo in a form is a lost enquiry.
//
// Deliberately NOT here, and staying in code:
//
// - Everything inside the form, per the above, including its "within one
//   working day" line.
// - Jodi's calendar. The Calendly URL is a route, not copy; it is set in
//   sections/ExpertSessionCard.tsx. Only the three lines introducing it are
//   editable, below.
// - The email address and phone number beside the form. Those ARE editable,
//   from Site Settings (Footer > Email address / Phone number / Hours), which is
//   the same set the footer of every page renders. The page reads them from
//   there rather than keeping its own copy, because two numbers that have
//   drifted apart is a caller who reaches nobody.
//
// Ed's September 2026 list, item 76, is what the page is now built around: one
// address, one booking route, one number, each saying what it is for.
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
            'Names the ways to get in touch: Jodi\'s calendar, the enquiry form, one address and one number. If a route is ever added or dropped, this line has to be re-read.',
        },
      ],
    },

    // --- Jodi's card, above the calendar ---
    {
      type: 'object',
      name: 'expertSession',
      label: 'Expert session card',
      description:
        "The green book-a-call card. Jodi's live Calendly calendar sits inside it; the calendar itself and its link are set in code. These three lines introduce it.",
      fields: [
        { type: 'string', name: 'personName', label: 'Name', description: 'Also sets the initial shown in the circle.' },
        { type: 'string', name: 'personRole', label: 'Role line' },
        { type: 'string', name: 'pitch', label: 'Pitch', ui: { component: 'textarea' }, description: 'The paragraph beside the calendar.' },
      ],
    },
  ],
};
