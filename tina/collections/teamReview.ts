import type { Collection } from 'tinacms';
import { joinKeyField } from '../fields';

// /team-review: an INTERNAL page, not in the nav, noindex, and not linked from
// anywhere on the site. It puts three photography options side by side for each
// of the five people photographed — the current supplied snapshots, the same
// faces cut out onto one matched studio grey, and an AI-generated headshot — so
// Akash and Ed can pick one before anything replaces the real /about photos.
//
// It exists to settle one decision. Once that decision is made and the chosen
// set is on /about, this page, this collection, content/team-review/ and
// public/images/team-review/ can all be deleted together. Nothing else links to
// them. The schema is deliberately small for the same reason: it covers the
// wording Ed might want to reword while reviewing, and nothing else.
//
// Deliberately NOT here, and staying in code:
//
// - The people and the columns themselves. The page builds each image path by
//   interpolation, `/images/team-review/${slug}-${key}.jpg`, across 5 people x
//   3 columns = 15 files that exist on disk. The set of rows is therefore fixed
//   by what was photographed, not by what is typed here: adding a row would
//   render a broken image, and the identifiers are read-only for the same
//   reason. Each row below carries only the wording shown beside that image.
// - The image captions under each photo. They print the column heading, so they
//   are already edited once, above.
// - The alt text, which is built from the person's name and the column heading
//   ("Edward Kercher, A. Current option") and so stays correct on its own when
//   either is edited. A separate field would just be a second place to forget.
// - `robots: noindex`. The page is internal; whether it is hidden from Google is
//   not an editorial choice.
export const teamReviewCollection: Collection = {
  name: 'teamReview',
  label: 'Team Photo Review (internal)',
  path: 'content/team-review',
  format: 'json',

  ui: {
    // One page, one file, and the route is hand-built: nothing to create and
    // nothing to delete.
    allowedActions: { create: false, delete: false },
    router: () => '/team-review',
  },

  fields: [
    {
      type: 'string',
      name: 'metaTitle',
      label: 'Browser tab title',
      description:
        'Shown in the browser tab. This page is hidden from Google on purpose, so this is not a search listing — it is just what the tab says while you have the page open. "| Thistle Architecture" is added automatically.',
    },

    { type: 'string', name: 'eyebrow', label: 'Eyebrow', description: 'The small green line above the heading.' },
    { type: 'string', name: 'heading', label: 'Heading' },
    {
      type: 'string',
      name: 'intro',
      label: 'Introduction',
      ui: { component: 'textarea' },
      description: 'The paragraph under the heading that explains what the three columns are.',
    },
    {
      type: 'string',
      name: 'note',
      label: 'Reassurance line',
      ui: { component: 'textarea' },
      description:
        'The small grey line that says none of this is live yet. Worth keeping accurate: it is the line that stops anyone thinking the AI headshots are already on the site.',
    },

    {
      type: 'object',
      name: 'columns',
      label: 'Columns',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.label }) },
      description:
        'The three options being compared, left to right. Each heading appears twice on the page — once on the key at the top, once as the caption under every photo in that column — so editing it here changes both. There are three columns because there are three sets of photographs; adding a row here would only produce a broken image.',
      fields: [
        joinKeyField({
          name: 'key',
          label: 'Column (fixed)',
          description:
            'Identifies which set of photographs this column shows, and is part of each image filename. Read-only: changing it would leave the column with no images.',
        }),
        { type: 'string', name: 'label', label: 'Heading', description: 'Keep the A. / B. / C. prefix — the intro paragraph refers to the columns by letter.' },
        {
          type: 'string',
          name: 'note',
          label: 'Description',
          ui: { component: 'textarea' },
          description:
            'The explanation on the key at the top of the page. Column C’s says the AI option needs each person’s consent before it goes live; please do not drop that.',
        },
      ],
    },

    {
      type: 'object',
      name: 'people',
      label: 'People',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.name }) },
      description:
        'The heading above each row of three photos. These are the five people who were photographed, in the order the page shows them; adding or removing a row here does not add or remove a row of photographs.',
      fields: [
        joinKeyField({
          name: 'slug',
          label: 'Person (fixed)',
          description:
            'Identifies whose photographs this row shows, and is part of each image filename. Read-only: changing it would leave the row with no images.',
        }),
        {
          type: 'string',
          name: 'name',
          label: 'Name',
          description:
            'Also read aloud to blind visitors as part of each photo description, so it is worth spelling as the person spells it.',
        },
      ],
    },
  ],
};
