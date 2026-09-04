import type { Collection } from 'tinacms';

// The legal pages: /terms, /privacy, /cookies and /feasibility-disclaimer.
//
// One collection rather than three singletons, because all three are the same
// document — a title, a date, and a run of headed sections — and the only thing
// separating them is which URL they answer. The filename IS the route:
// terms.json renders at /terms. There is no slug field to get out of step with
// it, and no lookup table to keep in sync.
//
// That also fixes the membership. Creating, renaming or deleting a document
// here would leave a page Tina thinks exists with no route in src/app to serve
// it (or, worse, take a live route away), so create and delete are off and the
// filename is read-only. Adding a fourth legal page is a code change: add
// src/app/<slug>/page.tsx and its view, then the JSON.
//
// The wording on these pages has legal effect — limitation of liability,
// governing law, the UK GDPR rights notice, the retention period tied to the
// PI insurance requirement. It is editable so a genuinely out-of-date clause
// can be corrected quickly, not so it can be tidied for tone, and the field
// descriptions say so where an editor will see them.
export const legalCollection: Collection = {
  name: 'legal',
  label: 'Legal Pages',
  path: 'content/legal',
  format: 'json',

  ui: {
    // Filename to URL, one to one: terms.json -> /terms.
    router: ({ document }) => `/${document._sys.filename}`,
    allowedActions: { create: false, delete: false },
    filename: {
      // Renaming a document here would 404 the page it belongs to, and the
      // legal URLs are linked from the footer of every page on the site, and the
      // disclaimer is linked from the tick-box a client has to accept to pay.
      readonly: true,
    },
  },

  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Page title',
      required: true,
      description:
        'The large heading at the top of the page. The full stop at the end is house style across the site — "Privacy Policy.", not "Privacy Policy".',
    },
    {
      type: 'string',
      name: 'lastUpdated',
      label: 'Last updated',
      description:
        'The date only, as it should read — e.g. "February 2026". The words "Last updated:" are added by the page, so do not type them here. Edited in this form rather than by clicking the page, because the line on the page includes that fixed label as well as the date.',
    },

    {
      type: 'object',
      name: 'sections',
      label: 'Sections',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.heading }) },
      description:
        'The body of the document, in order. This is legal wording: a change here changes what the practice has committed to. Have any edit checked by whoever advises on the contract before publishing, and correct clauses that are wrong rather than rewriting ones that merely read awkwardly.',
      fields: [
        {
          type: 'string',
          name: 'heading',
          label: 'Heading',
          required: true,
        },
        {
          type: 'string',
          name: 'body',
          label: 'Body',
          required: true,
          ui: { component: 'textarea' },
          description:
            'One paragraph, or several separated by a blank line. Several of these state a specific commitment — the 7-year retention period, the limitation of liability, the England and Wales jurisdiction, the privacy@ address people are told to write to. Check any of those still hold before changing them.',
        },
        {
          type: 'string',
          name: 'bullets',
          label: 'Bulleted list',
          list: true,
          description:
            'Optional, and shown under the paragraph above. Used by the feasibility disclaimer, where the list of what a report is not has to read as a list rather than as prose.',
        },
      ],
    },

    // The feasibility disclaimer needs three fields the other three documents
    // do not. They are optional here rather than in a collection of their own,
    // because splitting one document out would mean a second schema, a second
    // view and a second set of markers for a page that is otherwise identical.
    {
      type: 'string',
      name: 'intro',
      label: 'Opening paragraph',
      ui: { component: 'textarea' },
      description:
        'Feasibility disclaimer only. The paragraph between the title and the first numbered section, before any heading.',
    },
    // The version number and date are deliberately NOT here. They live in
    // lib/disclaimer.ts, because the same pair has to appear on this page and
    // inside the tick-box label at checkout, and two editable copies of a
    // version number is two copies that can disagree. A client needs to be able
    // to point at what they accepted, so that number has to be one thing.
    {
      type: 'string',
      name: 'liabilityCap',
      label: 'Liability cap',
      description:
        'Feasibility disclaimer only. The money figure in section 8, written as it should read, e.g. "£25,000". IT IS BLANK UNTIL ED SETS IT, and the page says so in place of the number rather than inventing one. Nobody here can decide this figure.',
    },
    {
      type: 'string',
      name: 'piLimit',
      label: 'Professional indemnity limit',
      description:
        'Feasibility disclaimer only. The limit of indemnity in section 8, e.g. "£1,000,000". Same as above: blank until confirmed, and it must match the actual policy.',
    },

    // Search-result copy. It never appears on the page itself, so it is edited
    // here and has no click-to-edit marker.
    {
      type: 'string',
      name: 'metaTitle',
      label: 'SEO title',
      description:
        'Shown in the browser tab and as the headline in Google results, not on the page. The site name is appended automatically.',
    },
    {
      type: 'string',
      name: 'metaDescription',
      label: 'SEO description',
      ui: { component: 'textarea' },
      description:
        'The grey summary under the title in Google results. Not shown on the page. Around 150 characters is the most that gets displayed.',
    },
  ],
};
