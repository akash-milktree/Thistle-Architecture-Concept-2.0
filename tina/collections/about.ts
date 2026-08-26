import type { Collection } from 'tinacms';

// Every word on /about, in the order it appears down the page.
//
// The page had no data module of its own — all of this was string literals
// inside views/AboutPage.tsx — so this collection is the first time the copy
// has lived anywhere an editor can reach. The seeded content/about/index.json
// is a byte-for-byte migration of those literals, typos and all; nothing was
// tidied on the way through.
//
// Deliberately NOT here, and staying in code:
//
// - The Trustpilot reviews themselves. They are third-party statements under
//   real names and have their own collection (reviews.ts) with the rules about
//   verbatim quoting. This page only owns the eyebrow and heading above them.
// - Team photo alt text. It is built from the name and role fields below
//   ("Kaan, Design & Planning Lead at Thistle Architecture"), so it stays
//   correct on its own when either is edited. A separate field would just be a
//   second place to forget.
// - The featured review ("Sunny Berhane") and the section ordering, which are
//   layout decisions rather than copy.
export const aboutCollection: Collection = {
  name: 'about',
  label: 'About Page',
  path: 'content/about',
  format: 'json',

  ui: {
    // One page, one file: there is nothing to create and nothing to delete.
    allowedActions: { create: false, delete: false },
    router: () => '/about',
  },

  fields: [
    // --- Search engine listing. Never appears on the page itself. ---
    {
      type: 'string',
      name: 'metaTitle',
      label: 'Search result title',
      description:
        'The tab title and the blue headline in Google. "| Thistle Architecture" is added automatically, so type just the page name, e.g. "About". Around 50 characters works best.',
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
        },
      ],
    },

    // --- "Who We Are" ---
    {
      type: 'object',
      name: 'intro',
      label: '"Who We Are" section',
      description:
        'The photo and two paragraphs directly under the page header. Ed\'s August 2026 final brief asked for this to be about the practice rather than about the team buying and investing in buildings — the development experience is supporting credibility in the second paragraph, not the headline.',
      fields: [
        { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
        {
          type: 'string',
          name: 'heading',
          label: 'Heading (first line)',
          description: 'Shown in black, on its own line.',
        },
        {
          type: 'string',
          name: 'headingAccent',
          label: 'Heading (second line, green)',
          description: 'Shown in green underneath the first line. Both lines always appear; clearing this box restores the wording that is there now rather than removing the line.',
        },
        {
          type: 'image',
          name: 'image',
          label: 'Photograph',
          description:
            'The section is "Who We Are", so this wants to be the people, not a building. The current shot is from the August 2026 studio session; it replaced a strip-out photo of Beauchamp House, which said more about the work than about who does it.',
        },
        {
          type: 'string',
          name: 'imageAlt',
          label: 'Photograph description (alt text)',
          ui: { component: 'textarea' },
          description:
            'Read aloud to blind visitors and used by Google; it is never shown on the page. Describe what is actually happening in the photo. Change it whenever you change the photo.',
        },
        { type: 'string', name: 'body1', label: 'First paragraph', ui: { component: 'textarea' } },
        { type: 'string', name: 'body2', label: 'Second paragraph', ui: { component: 'textarea' } },
      ],
    },

    // --- The five theme cards ---
    {
      type: 'object',
      name: 'themes',
      label: 'Core themes',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title }) },
      description:
        'The row of small cards under "Who We Are". These are the five core themes from Ed\'s August 2026 final brief, section 07. The row is designed for five across; adding a sixth wraps it onto a second line.',
      fields: [
        { type: 'string', name: 'title', label: 'Title' },
        { type: 'string', name: 'body', label: 'Description', ui: { component: 'textarea' } },
      ],
    },

    // --- The black stats band ---
    {
      type: 'object',
      name: 'stats',
      label: 'Figures band',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.value }) },
      description:
        'The three figures in the black band. Every one of these is a public claim about the practice, so only put a number here you could evidence if a client asked. The band is built for three; a fourth will not sit evenly.',
      fields: [
        { type: 'string', name: 'value', label: 'Figure', description: 'The large text, e.g. "98.5%".' },
        { type: 'string', name: 'label', label: 'What it means', description: 'The small line underneath.' },
      ],
    },

    // --- The team roster ---
    {
      type: 'object',
      name: 'team',
      label: 'Team section',
      fields: [
        { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
        { type: 'string', name: 'heading', label: 'Heading (first line)', description: 'Shown in black, on its own line.' },
        {
          type: 'string',
          name: 'headingAccent',
          label: 'Heading (second line, green)',
          description: 'Shown in green underneath the first line. Both lines always appear; clearing this box restores the wording that is there now rather than removing the line.',
        },
        {
          type: 'object',
          name: 'members',
          label: 'Team members',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.name }) },
          description:
            'The cards run three to a row, so a roster of six fills two rows evenly. Onaiza is not on the page: there is no photograph of her and she is not on the live site either.',
          fields: [
            { type: 'string', name: 'name', label: 'Name' },
            {
              type: 'string',
              name: 'role',
              label: 'Job title',
              description:
                'Optional, and left blank on purpose where nobody has confirmed a title. Please do not invent one — a card with no title is better than a title that turns out to be wrong. Whatever is here is also read aloud to blind visitors as part of the photo description.',
            },
            {
              type: 'image',
              name: 'image',
              label: 'Photograph',
              description:
                'Portrait, cropped to 4:5. Five of the six are from the August 2026 studio shoot, all facing camera against the same background so the cards read as one set; Beverley supplied her own because she was not there on the day, and should be photographed next time. Use a real photograph, never an AI-generated one.',
            },
            {
              type: 'string',
              name: 'contribution',
              label: 'What they contribute',
              ui: { component: 'textarea' },
              description:
                'Ed\'s August 2026 final brief: write this around what the person contributes to projects, not as a CV-style list of previous jobs.',
            },
            {
              type: 'string',
              name: 'credential',
              label: 'Qualification line',
              description:
                'Optional. The small grey line at the bottom of the card, for confirmed qualifications only, e.g. "BArch in Architecture". Leave it blank rather than guessing.',
            },
          ],
        },
      ],
    },

    // --- Headings above the Trustpilot band ---
    {
      type: 'object',
      name: 'reviews',
      label: 'Reviews heading',
      description:
        'Just the two lines above the Trustpilot reviews on this page. The reviews themselves, and the supporting line and link under the heading, are edited under "Reviews" and "Site Settings".',
      fields: [
        { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
        { type: 'string', name: 'heading', label: 'Heading' },
      ],
    },

    // --- Closing statement ---
    {
      type: 'object',
      name: 'closing',
      label: '"How We Work" section',
      description: 'The centred statement that closes the page, above the standard CTA band.',
      fields: [
        { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
        { type: 'string', name: 'heading', label: 'Heading' },
        { type: 'string', name: 'body', label: 'Paragraph', ui: { component: 'textarea' } },
      ],
    },
  ],
};
