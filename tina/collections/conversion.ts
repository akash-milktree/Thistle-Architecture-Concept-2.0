import type { Collection } from 'tinacms';
import { joinKeyField } from '../fields';

// The five Expertise pages: /conversions/commercial-to-residential, /hmo,
// /mixed-use-commercial, /high-end-residential and /co-living-large-hmo.
//
// One repeatable collection, because all five are the same page rendered from
// one template (views/ConversionPage.tsx) with a different record: a header, an
// opportunity band, the risks, the deliverable highlights, a case study, a
// review, and the sector's own FAQs. The filename IS the slug and the slug IS
// the URL, so there is no separate slug field that could get out of step with
// the route.
//
// Create and delete are off, and the filename is read-only. A sixth document
// would give an editor a form for a page that cannot fully exist: which review
// a page shows, which case study it features, whether it has an extra band, and
// the order the five appear in on /conversions are all set in
// data/conversionsData.ts, and /conversions/office-to-resi-class-ma redirects to
// one of these slugs in next.config.ts. Adding a sector is a code change first,
// then the JSON.
//
// Deliberately NOT here, and staying in code:
//
//  - The slug, for the reason above.
//  - Which client review appears on each page (`reviewAuthor`) and which case
//    study is featured (`relatedCaseStudySlug`). Both select a record rather
//    than saying anything, and both are edited where that record lives.
//  - The anchor id on the extra band ("#office-to-resi-class-ma") and where its
//    link goes. The id is a link target and the href is a route.
//  - The titles and descriptions of the five deliverables. They are the same
//    five on every page and belong to the feasibility package, not to a sector;
//    only the one-line "for this type" framing under each is owned here.
//  - The wording shared by all five pages — the section eyebrows, the closing
//    CTA, "Other Expertise". That lives once in the Expertise Overview form
//    rather than five times over, so the five pages cannot end up disagreeing.
export const conversionCollection: Collection = {
  name: 'conversion',
  label: 'Expertise Pages (sectors)',
  path: 'content/conversions',
  format: 'json',

  ui: {
    // Filename to URL, one to one: hmo.json -> /conversions/hmo.
    router: ({ document }) =>
      document._sys.filename === 'high-end-residential'
        ? '/expertise/high-end-residential'
        : `/conversions/${document._sys.filename}`,
    allowedActions: { create: false, delete: false },
    filename: {
      // These five paths are linked from the navigation, from the case studies,
      // from each other and from the sitemap, and one of them is the
      // destination of a 301 in next.config.ts. A rename here is a broken link,
      // not a rename.
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
        'The tab title and the blue headline in Google. Unlike most pages on the site, this one is used exactly as typed, so keep "| Thistle Architecture" on the end. Around 60 characters works best.',
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
          label: 'Sector name',
          description:
            'The small green line above the headline — the short name for this kind of work, e.g. "HMO". It is reused in four other places: the green second line of "The Risks Unique To…" and "Built For…" further down this page, the card on the Expertise overview, and the links to this page from the other four. Keep it short enough to read as the end of those sentences.',
        },
        {
          type: 'string',
          name: 'heading',
          label: 'Headline',
          description:
            'The only h1 on the page, and what Google reads as the subject of it. Ed\'s August 2026 final brief asked for these to lead with what someone would actually search for ("HMO Architects & Feasibility Specialists") rather than with a slogan; the slogan moved into the paragraph underneath.',
        },
        {
          type: 'string',
          name: 'description',
          label: 'Standfirst',
          ui: { component: 'textarea' },
          description: 'The short paragraph under the headline.',
        },
      ],
    },

    // --- "The Opportunity" ---
    {
      type: 'object',
      name: 'opportunity',
      label: '"The Opportunity" section',
      description: 'The white band under the header: one paragraph, then three figures.',
      fields: [
        {
          type: 'string',
          name: 'copy',
          label: 'Paragraph',
          ui: { component: 'textarea' },
          description: 'Why this kind of scheme is worth doing at all, put in the reader\'s terms.',
        },
        {
          type: 'object',
          name: 'stats',
          label: 'Figures',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.label }) },
          description:
            'The three cards under the paragraph. Every one is a public claim about what this kind of scheme delivers — a yield, a decision period, a unit count — so only put a figure here you could evidence if a client asked. The row is built for three; a fourth will not sit evenly.',
          fields: [
            {
              type: 'string',
              name: 'label',
              label: 'What it measures',
              description: 'The small green line, e.g. "Typical room count".',
            },
            {
              type: 'string',
              name: 'value',
              label: 'Figure',
              description: 'The large text underneath, e.g. "5 to 9".',
            },
          ],
        },
      ],
    },

    // --- "What Is Hard" ---
    {
      type: 'object',
      name: 'challenges',
      label: '"What Is Hard" section',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title }) },
      description:
        'The risks specific to this sector, listed with an amber warning marker against each. This is the section that shows a reader we have done this before, so keep each one particular to this kind of building — a risk that would be true of any project says nothing. Three on most pages, four on Co-Living & Large HMO.',
      fields: [
        { type: 'string', name: 'title', label: 'The risk' },
        {
          type: 'string',
          name: 'detail',
          label: 'What it means in practice',
          ui: { component: 'textarea' },
        },
      ],
    },

    // --- The optional extra band ---
    {
      type: 'object',
      name: 'extraSection',
      label: 'Extra section (two pages only)',
      description:
        'The photo-and-text band between the risks and the deliverables. Only two pages have one — Commercial to Residential explains Class MA, HMO points at HMO Checker — and whether a page has this band is set in code, because it also decides how the pale and white bands alternate down the rest of the page. Filling this in on one of the other three will not make it appear; ask a developer.',
      fields: [
        { type: 'string', name: 'eyebrow', label: 'Eyebrow', description: 'The small green line above the heading.' },
        { type: 'string', name: 'title', label: 'Heading' },
        {
          type: 'object',
          name: 'body',
          label: 'Paragraphs',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.text }) },
          description:
            'One box per paragraph, in the order they read. Several of these state rules that change — the 56-day prior approval period, the March 2024 removal of the floorspace cap and the vacancy test, the £15.99 HMO Checker report — so check them against the current position before republishing, and the price against hmochecker.co.uk.',
          fields: [
            {
              type: 'string',
              name: 'text',
              label: 'Paragraph',
              ui: { component: 'textarea' },
            },
          ],
        },
        {
          type: 'image',
          name: 'image',
          label: 'Photograph',
          description:
            'Leave blank to keep the standing photograph of Beauchamp House, the period office building we converted to flats, which is what the Class MA band uses.',
        },
        {
          type: 'string',
          name: 'imageAlt',
          label: 'Photograph description (alt text)',
          ui: { component: 'textarea' },
          description:
            'Read aloud to blind visitors and used by Google; it is never shown on the page. Describe what is actually in the photograph, and change it whenever you change the photograph.',
        },
        {
          type: 'string',
          name: 'ctaLabel',
          label: 'Link label',
          description:
            'The green link at the end of the section. Where it goes is set in code — the free Class MA Checker on this site, hmochecker.co.uk from the HMO page — so the wording here has to keep matching the destination.',
        },
      ],
    },

    // --- "How We Solve It" ---
    {
      type: 'object',
      name: 'deliverableHighlights',
      label: '"How We Solve It" cards',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.deliverableId }) },
      description:
        'Four of the five feasibility deliverables, each with one line saying what it means for this sector. The card\'s title and its main description are the deliverable\'s own wording, shared with the feasibility package page and edited there; the grey line at the bottom of the card is the only part this page owns. Rows cannot usefully be added or removed here — each one names a deliverable, and that name is set in code.',
      fields: [
        joinKeyField({
          name: 'deliverableId',
          label: 'Deliverable (fixed)',
          description:
            'Which of the five feasibility deliverables this card is about. Set in code, and read-only: changing it would leave your line underneath attached to a different deliverable, or to none at all.',
        }),
        {
          type: 'string',
          name: 'forThisType',
          label: 'What it means for this sector',
          ui: { component: 'textarea' },
          description: 'The grey line at the bottom of the card, under the divider.',
        },
      ],
    },

    // --- Sector FAQs ---
    {
      type: 'reference',
      name: 'relatedCaseStudy',
      label: 'Related case study',
      collections: ['caseStudy'],
      description:
        'The single study featured near the bottom of this page. Picked from the case studies rather than typed, so it cannot point at one that does not exist. Leave it empty and the section is left out of the page entirely rather than rendering blank.',
    },
    {
      type: 'string',
      name: 'relatedCaseStudyNote',
      label: 'Why this project',
      ui: { component: 'textarea' },
      description:
        'Optional. One or two sentences under the case study heading saying why this project is the right proof for this page. Used on the mixed-use page, where the featured scheme keeps a shop below an HMO and a reader might otherwise take it for a plain HMO job. Leave empty on pages where the fit is obvious.',
    },
    {
      type: 'object',
      name: 'faqs',
      label: 'Questions & answers',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.question }) },
      description:
        'The accordion near the bottom of the page. Ed\'s August 2026 final brief: "Replace repeated generic feasibility FAQs with sector-specific planning/design questions." These are the questions a buyer of THIS kind of building actually asks; the generic price and turnaround questions are answered elsewhere on the site. Emptying the list falls the page back to that generic set rather than leaving the section blank. The first question is open when the page loads, so put the one most people ask first. Edited in this form only — the accordion is shared with the home and feasibility pages, so it has no click-to-edit marker yet.',
      fields: [
        { type: 'string', name: 'question', label: 'Question' },
        {
          type: 'string',
          name: 'answer',
          label: 'Answer',
          ui: { component: 'textarea' },
          description:
            'Several of these quote a threshold set nationally or by the council — two years in Class E use, five occupants for mandatory licensing, six for the small-HMO limit. Check any of those still hold before changing them, and keep the hedging that is there on purpose ("it depends entirely on the local authority"): these answers get read as advice.',
        },
      ],
    },
  ],
};
