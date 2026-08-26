import type { Collection, TinaField } from 'tinacms';
import { joinKeyField } from '../fields';

// The three listing pages — /blog, /case-studies/feasibility-studies and
// /case-studies/completed-projects — as one collection with one document each.
//
// These pages are furniture around records that are edited elsewhere. Every
// card on all three is rendered from data/blogData.ts or data/caseStudiesData.ts
// and those move into Tina separately; what lives here is only the copy around
// them: the page header, the filter chips that are our own wording rather than
// a value carried on an article or a project, and the note under the completed
// projects grid.
//
// One collection rather than three separate singletons because the forms are
// nearly identical and they read as one group in the sidebar — the pages that
// list things. Each page still has its own document, so nothing is shared
// between them by accident.
//
// Deliberately NOT here, and staying in code:
//
//  - Every count on these pages: "14 articles and growing" in the blog intro,
//    and the number beside each completed-projects chip. They are counted from
//    the records as the page renders. A number typed into a form is wrong the
//    next time an article or a project is added, and wrong silently, in the
//    page header.
//
//  - The `key` on each conversion-type chip. It is the ?type= value in the URL
//    and the value matched against a project's conversionTypes, so it is
//    routing and lookup, not copy.
//
//  - The blog category chip labels. Those are the category names carried on the
//    articles themselves, and /blog/category/<slug> is derived from the same
//    string, so renaming one here would leave a chip and the page it opens
//    disagreeing.
//
//  - The per-category headline and standfirst on /blog/category/<slug>. They
//    come from categoryMeta in data/blogData.ts and belong with the articles,
//    not with this page. They were written one per category on purpose — the
//    note there calls a templated "Articles about X" thin duplication — so
//    pulling them into a single field here would undo that.

// Search engine listing. Never appears on the page itself, so these two carry
// no click-to-edit marker anywhere — they are edited in this form only.
//
// Declared once because all three pages take the same pair. Only the guidance
// on the title differs, since the blog index has category pages beside it that
// write their own.
const seoFields = (titleDescription: string): TinaField[] => [
  {
    type: 'string',
    name: 'metaTitle',
    label: 'Search result title',
    description: titleDescription,
  },
  {
    type: 'string',
    name: 'metaDescription',
    label: 'Search result description',
    ui: { component: 'textarea' },
    description:
      'The grey summary under the headline in Google. Not shown anywhere on the page. Google cuts it off after roughly 155 characters.',
  },
];

// The page header is the same shape on all three pages, so it is declared once.
// Only the guidance on the standfirst differs, because the blog index composes
// its paragraph and the other two do not.
const heroField = (standfirstDescription: string): TinaField => ({
  type: 'object',
  name: 'hero',
  label: 'Page header',
  description: 'The pale band at the very top of the page.',
  fields: [
    {
      type: 'string',
      name: 'label',
      label: 'Eyebrow',
      description: 'The small grey line above the headline.',
    },
    {
      type: 'string',
      name: 'heading',
      label: 'Headline',
      description:
        'The only h1 on the page. Search engines read it as what the page is about, so keep it descriptive rather than clever.',
    },
    {
      type: 'string',
      name: 'description',
      label: 'Standfirst',
      ui: { component: 'textarea' },
      description: standfirstDescription,
    },
  ],
});

export const listingsCollection: Collection = {
  name: 'listings',
  label: 'Listing Pages',
  path: 'content/listings',
  format: 'json',

  ui: {
    // Three fixed pages. A fourth document would have no route to preview and
    // nothing rendering it, so creating and deleting are both off.
    allowedActions: { create: false, delete: false },

    // Every collection needs a router, or the editor opens the form with no
    // live preview beside it and click-to-edit never engages.
    //
    // There is no slug to interpolate here — these are three specific pages,
    // not a repeatable set — so each filename is mapped to its URL explicitly.
    // `_sys.filename` arrives without the extension, so 'blog.json' is 'blog'.
    // The same filenames are what the server pages ask for by relativePath, so
    // renaming a file breaks both halves at once rather than half of it.
    router: ({ document }) => {
      switch (document._sys.filename) {
        case 'blog':
          return '/blog';
        case 'feasibility-studies':
          return '/case-studies/feasibility-studies';
        case 'completed-projects':
          return '/case-studies/completed-projects';
        default:
          // Unreachable while create is off. Returning undefined would drop the
          // preview pane entirely, so fall back to somewhere real.
          return '/';
      }
    },
  },

  // Templates rather than one flat field list, because the three pages do not
  // carry the same copy. A single list would put the conversion-type chip
  // labels on the blog form, where they edit nothing — which is worse than not
  // offering them at all.
  templates: [
    {
      name: 'blog',
      label: 'Blog index',
      fields: [
        // --- Search engine listing ---
        ...seoFields(
          'The tab title and the blue headline in Google. "| Thistle Architecture" is added automatically, so type just the page name, e.g. "Blog". This does not affect the category pages, which write their own.'
        ),

        // --- Page header ---
        heroField(
          'The first sentence under the headline. The page adds a second sentence after it counting the articles currently published, so do not type a number here — it would be out of date the next time an article goes up. Because the paragraph on the page is this sentence plus that count, it is the one field on these three pages you cannot click on the page to edit; edit it here.'
        ),

        // --- Category filters ---
        {
          type: 'string',
          name: 'allLabel',
          label: 'First category chip',
          description:
            'The chip that clears the filter and shows every article. Currently "All". The chips after it are the category names carried on the articles themselves, and each one is also the address of its own category page, so they are not editable here.',
        },
      ],
    },

    {
      name: 'feasibilityStudies',
      label: 'Feasibility Studies index',
      fields: [
        // --- Search engine listing ---
        ...seoFields(
          'The tab title and the blue headline in Google. "| Thistle Architecture" is added automatically, so type just the page name, e.g. "Feasibility Studies".'
        ),

        // --- Page header ---
        heroField('The short paragraph under the headline.'),
      ],
    },

    {
      name: 'completedProjects',
      label: 'Completed Projects index',
      fields: [
        // --- Search engine listing ---
        ...seoFields(
          'The tab title and the blue headline in Google. "| Thistle Architecture" is added automatically, so type just the page name, e.g. "Completed Projects".'
        ),

        // --- Page header ---
        heroField('The short paragraph under the headline.'),

        // --- Conversion type filters ---
        {
          type: 'string',
          name: 'allLabel',
          label: 'First filter chip',
          description: 'The chip that clears the filter and shows every project. Currently "All".',
        },
        {
          type: 'object',
          name: 'typeLabels',
          label: 'Conversion type chips',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.label }) },
          description:
            'Renames the filter chips above the grid. Which chips exist, what order they come in, which projects each one shows, and the count beside it are all set in code — this changes only what a visitor reads. A chip whose row is deleted here keeps its standing label rather than disappearing.',
          fields: [
            joinKeyField({ name: 'key', label: 'Filter (fixed)', description: 'Identifies which chip this is, and appears in the page address while that filter is on. Read-only: a key matching no chip silently does nothing.' }),
            { type: 'string', name: 'label', label: 'Label' },
          ],
        },

        // --- Below the grid ---
        {
          type: 'string',
          name: 'footnote',
          label: 'Note under the grid',
          ui: { component: 'textarea' },
          description:
            'The small print below the projects. It credits HMO Designers for the projects that practice delivered, which is a factual attribution rather than marketing copy — keep it true if you reword it.',
        },
      ],
    },
  ],
};
