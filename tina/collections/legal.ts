import type { Collection } from 'tinacms';

// The three legal pages: /terms, /privacy and /cookies.
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
      // three legal URLs are linked from the footer of every page on the site.
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
            'One paragraph. Several of these state a specific commitment — the 7-year retention period, the limitation of liability, the England and Wales jurisdiction, the privacy@ address people are told to write to. Check any of those still hold before changing them.',
        },
      ],
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
