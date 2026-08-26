import type { Collection } from 'tinacms';
import { joinKeyField } from '../fields';

// The homepage. Four sections and nothing else, which is deliberate — Ed's
// video feedback 2026-07-08: "really simplify this home page... example
// projects underneath trusted by developers, then the five step feasibility
// process, and that's it." So this collection covers the hero, the developer
// logo strip, the example-projects band and the five-step process, and nothing
// more. The closing CTA band and the footer below them belong to Site
// Settings, because they are the same on every page.
//
// Staying in code, on purpose: the Vimeo id behind the hero film and the
// poster image path (both configuration, not copy); the logo image files; the
// three featured case-study slugs and the slugs the stage lines are keyed on
// (they are lookups, and several are the source of a 301 in next.config.ts);
// and the lucide icon on each process step.
export const homeCollection: Collection = {
  name: 'home',
  label: 'Home Page',
  path: 'content/home',
  format: 'json',

  ui: {
    // One document, so creating and deleting are off. The router is what gives
    // the editor a live preview instead of a bare form.
    allowedActions: { create: false, delete: false },
    router: () => '/',
  },

  fields: [
    {
      type: 'object',
      name: 'hero',
      label: 'Hero',
      description:
        'The full-height opening section. The background film is set in code (it is hosted on Vimeo); the still image behind it, which is what shows on phones and before the film loads, is editable below.',
      fields: [
        {
          type: 'string',
          name: 'badge',
          label: 'Badge',
          description: 'The small pill above the headline, next to the green dot.',
        },
        {
          type: 'string',
          name: 'heading',
          label: 'Headline',
          ui: { component: 'textarea' },
          description:
            'A line break in this field becomes a line break on the page. Ed’s August 2026 final brief set this as "Feasibility-First Architecture", with "Nationwide" kept in the supporting paragraph rather than forced into the headline.',
        },
        { type: 'string', name: 'lede', label: 'Supporting paragraph', ui: { component: 'textarea' } },
        {
          type: 'string',
          name: 'primaryCtaLabel',
          label: 'Main button label',
          description: 'Goes to the pricing calculator. The destination is set in code.',
        },
        {
          type: 'string',
          name: 'secondaryCtaLabel',
          label: 'Second button label',
          description: 'Goes to the feasibility package page. The destination is set in code.',
        },
        {
          type: 'string',
          name: 'reassurance',
          label: 'Reassurance line',
          description: 'The small print under the buttons.',
        },
        {
          type: 'image',
          name: 'posterImage',
          label: 'Background image',
          description:
            'The still behind the hero. It is what visitors see on phones, and before the film loads on desktop, so it should read well on its own. A wide landscape photograph works best — it is cropped to fill the screen.',
        },
        {
          type: 'string',
          name: 'posterAlt',
          label: 'Background image description (alt text)',
          description:
            'Not visible on the page. Screen readers read it aloud, and it shows if the image fails to load, so describe what the still behind the film shows.',
        },
        {
          type: 'object',
          name: 'metrics',
          label: 'Impact numbers',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.value }) },
          description:
            'The three cards along the bottom of the hero. These are factual claims a reader can ask you to stand behind: the 98.5% planning success rate and the 86% faster figure are both still flagged unconfirmed in docs/case-study-confirmations.md and docs/dns-migration.md, and the identical 86% claim has already been replaced on the About page. On the 2026-08-25 call Ed gave "350 plus feasibilities" and "500 plus completed projects", which are his own numbers and safer to publish.',
          fields: [
            { type: 'string', name: 'value', label: 'Number' },
            { type: 'string', name: 'label', label: 'What it measures' },
            {
              type: 'string',
              name: 'detail',
              label: 'Qualifier',
              description: 'The small grey line underneath, which says what the number is measured against.',
            },
          ],
        },
      ],
    },

    {
      type: 'object',
      name: 'logos',
      label: 'Developer logo strip',
      description:
        'The scrolling band of client logos under the hero. The logo images themselves are set in code — each row below names one of them and carries only its wording.',
      fields: [
        { type: 'string', name: 'label', label: 'Strip label' },
        {
          type: 'object',
          name: 'items',
          label: 'Logos',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.name }) },
          description:
            'Neither field here is visible on the page — the logo image is. They are what a screen reader announces, and what a search engine reads in place of a picture of a name.',
          fields: [
            joinKeyField({ name: 'key', label: 'Logo (fixed)', description: 'Identifies which logo image this row belongs to. Read-only: changing it would attach the wording to the wrong logo.' }),
            {
              type: 'string',
              name: 'name',
              label: 'Company name',
              description:
                'Also used as the image description unless you set one below. Goldgate Properties is spelt the way its own logo spells it, not "Goldengate" as it appeared on Ed’s list.',
            },
            {
              type: 'string',
              name: 'alt',
              label: 'Image description (alt text)',
              description: 'Only needed where the company name alone would not describe the image. Leave empty to use the name.',
            },
          ],
        },
      ],
    },

    {
      type: 'object',
      name: 'projects',
      label: 'Example projects',
      description:
        'The three project cards. Which three they are, and everything printed on the card itself, comes from the case studies and is edited there. Only the wording around them lives here.',
      fields: [
        { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
        {
          type: 'string',
          name: 'heading',
          label: 'Heading',
          ui: { component: 'textarea' },
          description: 'A line break in this field becomes a line break on the page.',
        },
        {
          type: 'string',
          name: 'buttonLabel',
          label: 'Button label',
          description: 'The link through to all the work. Its destination is set in code.',
        },
        {
          type: 'object',
          name: 'stageLines',
          label: 'Stage lines',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.slug }) },
          description:
            'The short green line on each card, from Ed’s August 2026 final brief, section 01: "add a subtle stage or outcome line where useful". It summarises facts that already live on the project (status, units, recommendation), written per card here rather than stored on the project itself.',
          fields: [
            joinKeyField({ name: 'slug', label: 'Project (fixed)', description: 'Identifies which card this line sits on. Read-only: it has to match the case study’s own web address.' }),
            { type: 'string', name: 'line', label: 'Stage line' },
          ],
        },
      ],
    },

    {
      type: 'object',
      name: 'process',
      label: 'Five-step process',
      fields: [
        { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
        { type: 'string', name: 'heading', label: 'Heading, first line' },
        {
          type: 'string',
          name: 'headingAccent',
          label: 'Heading, second line (green)',
          description: 'Two fields because the second line is picked out in green.',
        },
        {
          type: 'object',
          name: 'steps',
          label: 'Steps',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title }) },
          description:
            'The icon on each step is set in code, by position: the first step gets the upload icon, the second the phone, and so on. Reordering the steps here moves the wording but not the icons. The last step in the list is always the one given the full width and the green treatment.',
          fields: [
            {
              type: 'string',
              name: 'num',
              label: 'Step number',
              description:
                'Shown large beside the icon. Ed’s video feedback 2026-07-08: step numbers must read clearly at a glance.',
            },
            { type: 'string', name: 'title', label: 'Title' },
            { type: 'string', name: 'desc', label: 'Description', ui: { component: 'textarea' } },
          ],
        },
        {
          type: 'string',
          name: 'bridge',
          label: 'Closing paragraph',
          ui: { component: 'textarea' },
          description:
            'Ed’s August 2026 final brief asked for one short bridge after the five steps, so the architecture side of the practice stays visible without a services section.',
        },
        {
          type: 'string',
          name: 'ctaLabel',
          label: 'Button label',
          description: 'The button under the steps. Its destination is set in code.',
        },
      ],
    },

    {
      type: 'object',
      name: 'seo',
      label: 'Search engine listing',
      description:
        'Not visible on the page. This is what Google and link previews show. Leave both empty and the homepage keeps the site-wide defaults, which were written for this page anyway.',
      fields: [
        {
          type: 'string',
          name: 'metaTitle',
          label: 'Title',
          description:
            'Empty means the site-wide default, "Thistle Architecture | Feasibility Solved". Anything typed here is used exactly as typed, with no "| Thistle Architecture" added on the end, so include it yourself if you want it.',
        },
        {
          type: 'string',
          name: 'metaDescription',
          label: 'Description',
          ui: { component: 'textarea' },
          description:
            'Empty means the site-wide default, "Data-driven feasibility for commercial conversions, HMOs, and high-end residential across the UK." Google shows roughly the first 155 characters.',
        },
      ],
    },
  ],
};
