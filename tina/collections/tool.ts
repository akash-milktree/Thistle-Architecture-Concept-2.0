import type { Collection } from 'tinacms';
import { joinKeyField } from '../fields';

// The three free tools: the Class MA screener, the apartment GDV calculator,
// and the HMO valuation calculator.
//
// One repeatable collection rather than three singletons, because the three
// pages are structurally the same page — header, tool, disclaimer, closing CTA
// — and share a shell (components/ui/ToolShell.tsx). The filename is the slug
// and the slug is the URL (/tools/<filename>), so it is readonly here, and
// create and delete are off: a new document would hand an editor a form
// pointing at a route that does not exist, because the tool itself is code.
//
// Because one schema covers three different tools, a few groups apply to only
// some of them — the calculator panels are not on the screener, the email offer
// is not on the calculators. Each of those says so in its own description
// rather than sitting there unexplained. The alternative, three templates,
// would have split the shared header and closing copy three ways to hide two
// boxes.
//
// Deliberately NOT here, and staying in code. This is the one page group where
// a plausible-looking edit can publish a confidently wrong number:
//
// - Every figure the tools calculate with. The Class MA hard-fail rules, the
//   10% and 25% band boundaries, and the HMO benchmarks (25% operating
//   allowance, 8.5% target yield, £30k per bed) live in sections/tools/*. A
//   rate typed into a CMS field would change a valuation with nothing on the
//   page to say it had changed.
// - The screener's four questions and their answer options. The option values
//   are the keys computeVerdict() branches on, so editing them would break the
//   verdict rather than reword it.
// - Input labels, units, steps and placeholders ("Purchase price", "sqm", "%").
//   They name what the arithmetic expects, not what the page says.
// - The output row labels ("Total cost (purchase + build)", "Margin %"). Each
//   one names the figure printed beside it, so a reworded label is a
//   mislabelled number.
// - The email capture UI in ToolGate: its prompt, button states and error
//   message are the mechanic, not copy.
export const toolCollection: Collection = {
  name: 'tool',
  label: 'Tools (calculators & checkers)',
  path: 'content/tools',
  format: 'json',

  ui: {
    // Every tool is a hand-built page under /tools, so the set is fixed.
    allowedActions: { create: false, delete: false },
    router: ({ document }) => `/tools/${document._sys.filename}`,
    filename: {
      // The filename is the URL. These paths are the destination of redirects
      // in next.config.ts and are linked from the footer, so a rename is a
      // broken inbound link rather than a rename.
      readonly: true,
    },
  },

  fields: [
    // --- Search engine listing. Never appears on the page itself. ---
    {
      type: 'string',
      name: 'metaTitle',
      label: 'Search result title',
      description:
        'The tab title and the blue headline in Google. Unlike the other pages, this one is used exactly as typed, so keep "| Thistle Architecture" on the end. Around 60 characters works best.',
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
        {
          type: 'string',
          name: 'label',
          label: 'Eyebrow',
          description:
            'The small grey line above the headline. It is the name of the tool, e.g. "HMO Valuation Calculator".',
        },
        { type: 'string', name: 'heading', label: 'Headline' },
        {
          type: 'string',
          name: 'description',
          label: 'Standfirst',
          ui: { component: 'textarea' },
          description:
            'The short paragraph under the headline. It tells the reader what the tool will ask them for and how long it takes, so if the tool ever changes, this has to change with it.',
        },
      ],
    },

    // --- Calculator chrome ---
    {
      type: 'object',
      name: 'panels',
      label: 'Calculator panel headings',
      description:
        'The headings on the two white panels either side of the calculators. The Class MA checker has no panels, so leave this blank on that one.',
      fields: [
        { type: 'string', name: 'inputsHeading', label: 'Heading above the inputs' },
        { type: 'string', name: 'outputsHeading', label: 'Heading above the results' },
        {
          type: 'string',
          name: 'note',
          label: 'Note under the inputs',
          ui: { component: 'textarea' },
          description:
            'Small grey text under the input panel explaining what the starting figures assume. Only the HMO calculator has one. The starting figures themselves are set in code, so this text describes them rather than setting them — if one is ever adjusted, a developer has to bring the two back into line.',
        },
      ],
    },

    // --- Result copy ---
    {
      type: 'object',
      name: 'outcomes',
      label: 'Result messages',
      list: true,
      description:
        'What the tool says for each result it can reach. The tool decides which one to show; you are editing the words, not the rule. Every threshold quoted in them ("under 10%", "between 10 and 25%") is set in code, so changing a number here changes what the reader is told, not when they are told it, and the two would then disagree.',
      ui: { itemProps: (item) => ({ label: item?.label }) },
      fields: [
        joinKeyField({ name: 'key', label: 'Result (fixed)', description: 'Identifies which result this message belongs to. Read-only, and entries must not be added or removed.' }),
        {
          type: 'string',
          name: 'label',
          label: 'Headline',
          description:
            'On the calculators this is the one-word verdict badge ("Viable"). On the Class MA checker it is the full sentence across the top of the result card.',
        },
        {
          type: 'string',
          name: 'body',
          label: 'Explanation',
          ui: { component: 'textarea' },
          description:
            'The paragraph under the headline. This is the part that turns a number into advice, so it is worth more care than anything else on the page.',
        },
      ],
    },

    // --- The Class MA email offer ---
    {
      type: 'object',
      name: 'emailOffer',
      label: 'Email offer',
      description:
        'The box under the Class MA result that asks for an email address. The two calculators do not have one, so leave this blank on those.',
      fields: [
        {
          type: 'string',
          name: 'heading',
          label: 'Offer heading',
          description:
            'This has to name something that genuinely gets sent. The prior-approval checklist goes out on the Formspree autoresponse (formspree.json); promising anything else here means someone has to build it first.',
        },
        { type: 'string', name: 'blurb', label: 'Offer description', ui: { component: 'textarea' } },
      ],
    },

    // --- Disclaimer ---
    {
      type: 'string',
      name: 'disclaimer',
      label: 'Disclaimer line',
      ui: { component: 'textarea' },
      description:
        'The centred grey line under the tool. It is the only thing on the page saying the result is an indication rather than a professional opinion, which is what stops a free tool reading as advice the practice stands behind. Have it checked before rewording it, and do not remove it.',
    },

    // --- Closing CTA ---
    {
      type: 'string',
      name: 'ctaLabel',
      label: 'Button label',
      description:
        'Used by every "Get Your Fixed Fee" button on this page — the one in the result card and the one at the bottom — so the two cannot end up saying different things. Where the button goes is set in code.',
    },
    {
      type: 'object',
      name: 'closing',
      label: 'Closing section',
      description: 'The white band at the bottom, between the tool and the standard CTA band.',
      fields: [
        { type: 'string', name: 'heading', label: 'Heading, first line' },
        {
          type: 'string',
          name: 'headingAccent',
          label: 'Heading, second line',
          description:
            'Shown in green under the first line. Two fields because a single string cannot carry the colour change.',
        },
        {
          type: 'string',
          name: 'body',
          label: 'Paragraph',
          ui: { component: 'textarea' },
          description:
            'States the five-day turnaround and the fixed fee, both of which are promises the practice then has to keep. Check with Ed before changing either.',
        },
      ],
    },
  ],
};
