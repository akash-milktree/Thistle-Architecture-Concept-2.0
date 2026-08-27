import type { Collection } from 'tinacms';

// The fourteen journal articles at /blog/<slug>.
//
// The filename IS the URL: content/posts/class-q-barn-conversions.json renders
// at /blog/class-q-barn-conversions. There is no slug field to drift out of
// step with it. Every one of those fourteen slugs is also the destination of a
// 301 in next.config.ts, migrated from the root-level URLs the articles had on
// the old Wix journal, so a rename here is not a rename — it is every inbound
// link the article has ever earned landing on a 404. Hence the read-only
// filename.
//
// Articles can be published from here. The SET is read from this collection
// now (lib/posts.ts): the routes, the /blog listing, the category pages, the
// sitemap and the view counter all build from it, so a document created here
// gets a page, appears in its category, and is counted. data/blogData.ts is
// still the per-field fallback for the fourteen that shipped in code, so a
// field an editor clears on one of those leaves the page reading properly.
//
// Delete stays off. Removing an article leaves a 404 where an indexed URL used
// to be, and the older ones carry 301s from the Wix journal pointing at them.
// Retiring one is a redirect decision, not an editing one.
//
// Deliberately NOT here, and staying in code:
//
//  - The article body's markup. `content` is a list of plain strings carrying a
//    small markdown subset that views/BlogPostPage.tsx parses itself. It is NOT
//    a rich-text field, and converting it to one would be a silent regression:
//    the custom renderer puts rel="noopener noreferrer nofollow" on all 83
//    outbound links — deliberate, because the articles cite suppliers who
//    compete with Thistle — and Tina's rich-text anchor has no rel at all. It
//    also tints the ranking words in the comparison tables. Both would go, with
//    nothing failing to say so.
//
//  - The view count under each headline. It comes from /api/views.
//
//  - The reading order on /blog, which is by date, newest first.
//
//  - The related articles at the foot of each piece, which are picked by
//    category.
export const postCollection: Collection = {
  name: 'post',
  label: 'Blog Articles',
  path: 'content/posts',
  format: 'json',

  ui: {
    // Filename to URL, one to one: class-q-barn-conversions.json -> /blog/class-q-barn-conversions.
    router: ({ document }) => `/blog/${document._sys.filename}`,
    allowedActions: { create: true, delete: false },
    filename: {
      // The filename is the URL. Built from the title on create so a new
      // article gets a readable address without anyone composing one.
      //
      // Not readonly, because a readonly filename cannot be set and creating
      // would be impossible. The cost is that one of the original fourteen can
      // now be renamed, and each of those is the destination of a 301 from the
      // old Wix journal — a rename sends every inbound link the article has
      // earned to a 404. The title field says so where an editor reads it.
      slugify: (values) =>
        String(values?.title ?? 'new-article')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .slice(0, 70) || 'new-article',
    },
  },

  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Headline',
      required: true,
      description:
        'The headline at the top of the article, and on its card on /blog. On a NEW article the web address is built from this, so get it right before saving; on an existing one the address is already fixed and changing the headline leaves it alone.',
    },

    // Search-result copy. Never appears on the page itself, so it carries no
    // click-to-edit marker and is edited here only.
    {
      type: 'string',
      name: 'metaTitle',
      label: 'Search result title',
      description:
        'Optional, and blank on nearly every article: leave it empty and Google shows the headline above. Fill it in only when the search listing has to differ from the headline. Unlike the other pages on the site, what you type here is used exactly as typed, so put "| Thistle Architecture" on the end yourself.',
    },
    {
      type: 'string',
      name: 'excerpt',
      label: 'Summary',
      required: true,
      ui: { component: 'textarea' },
      description:
        'Does two jobs: it is the paragraph under the headline on the card on /blog, and it is the grey summary under the title in Google. Google cuts it off after roughly 155 characters, so put the point first.',
    },

    {
      type: 'image',
      name: 'image',
      label: 'Main photograph',
      required: true,
      description:
        'Shown wide at the top of the article and again on the card on /blog. Landscape, near 2:1 — a portrait shot is cropped top and bottom. There is no separate description field for it: the headline above is read aloud to blind visitors in its place.',
    },

    {
      type: 'string',
      name: 'date',
      label: 'Published date',
      required: true,
      description:
        'Written out as it should read on the page, e.g. "January 17, 2025". Keep that format — it is also the date given to Google as the article\'s publication date, and a date it cannot read is no date at all.',
    },
    {
      type: 'string',
      name: 'updated',
      label: 'Updated date',
      description:
        'Optional. Fill this in when an article has been genuinely revised and the line under the byline gains "· Updated <date>". Same format as the published date. Leave it blank rather than refreshing it to look current: Google is told this is when the article last changed.',
    },
    {
      type: 'string',
      name: 'readTime',
      label: 'Reading time',
      required: true,
      description:
        'The small grey line beside the category, e.g. "5 min read". Typed rather than counted, so it is worth checking after a long addition. Roughly 200 words a minute.',
    },

    {
      type: 'string',
      name: 'category',
      label: 'Category',
      required: true,
      // A fixed list, never free text. The category is not only a label: the
      // chip under the headline links to /blog/category/<category>, and those
      // pages exist only for categories that have articles. Free text would put
      // a chip on the page pointing at a URL that 404s.
      //
      // OPEN QUESTION: only /blog reads this collection so far. The category
      // listing pages are still generated from data/blogData.ts, so moving an
      // article between categories here changes the chip on /blog and under the
      // article, but not which category page lists it. Until those routes read
      // this collection, a category change needs the matching edit in
      // data/blog/<slug>.ts — which is why the four options below are exactly
      // the four categories that have a page today.
      options: ['Self Build', 'Permitted Development', 'Investment', 'News'],
      description:
        'Decides which category page the article is filed under, and the chip shown under the headline. Please ask a developer before moving an article: the category pages are still built from the list in code, so a change made only here would leave the chip and the category page disagreeing.',
    },

    {
      type: 'object',
      name: 'author',
      label: 'Author',
      description:
        'The byline under the headline and the card at the foot of the article. Whoever is named here is credited to Google as the author, so it should be a real person at the practice.',
      fields: [
        { type: 'string', name: 'name', label: 'Name', required: true },
        {
          type: 'string',
          name: 'role',
          label: 'Job title',
          required: true,
          description:
            'Shown beside the date, and again under the author card as "<title>, Thistle Architecture" — so type the title on its own, without the practice name.',
        },
        {
          type: 'string',
          name: 'initials',
          label: 'Initials',
          required: true,
          description:
            'The two letters in the green circle beside the byline. Not worked out from the name, so change it when the name changes.',
        },
      ],
    },

    {
      type: 'string',
      name: 'content',
      label: 'Article',
      list: true,
      required: true,
      // Each block is its own box rather than one long editor, so a click on a
      // paragraph in the preview opens that paragraph. A textarea because most
      // of them are several lines of prose.
      ui: { component: 'textarea' },
      description:
        'The body of the article, one block per box, in order. A block is normally a paragraph. It can also be:\n\n• a heading — start the line with "## " (these are the ones that appear in the "Jump to" list at the top)\n• a smaller heading — start the line with "### "\n• a bullet — start the line with "- ". Consecutive bullets become one list.\n• a link inside a paragraph — [the words you want to show](https://example.com), or [the words](/pricing) for a page on this site\n• a picture — ![description of the picture](/images/blog/example.jpg)\n\nTables are one box per row, written with pipes: | Column | Column | with a | --- | --- | row underneath the headings.\n\nUse the drag handle to reorder blocks. Anything that is not one of the above is a plain paragraph.',
    },
  ],
};
