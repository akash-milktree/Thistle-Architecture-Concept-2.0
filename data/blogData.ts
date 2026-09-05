// The fourteen journal articles.
//
// These records are now the FALLBACK rather than the only copy: the same words
// also live in content/posts/<slug>.json, seeded byte-for-byte from the modules
// below and editable through Tina (tina/collections/post.ts). They stay here
// because this file is still what defines the article set — generateStaticParams
// builds the routes from it, /blog/category/<slug> filters it, blogViews seeds
// the counters from it — and because a field an editor clears has to leave the
// page reading properly rather than blank.
//
// Which means the two have to be kept in step. Adding an article is still a
// code change: add data/blog/<slug>.ts, register it below, then add the JSON
// with the same filename. Changing an article's category needs both.

export type BlogCategory =
  | 'Planning'
  | 'Permitted Development'
  | 'Feasibility'
  | 'HMO'
  | 'Investment'
  | 'News'
  | 'Self Build';

export interface BlogPost {
  slug: string;
  title: string;
  /** Exact title tag when it must differ from the on-page h1 (rendered as an
   *  absolute title, so the layout template does not append the brand again). */
  metaTitle?: string;
  excerpt: string;
  /** Content blocks: "## " renders an h2, "### " an h3, "- " a bullet,
   *  anything else a paragraph. Inline links use [text](/path).
   *
   *  Plain strings, and deliberately not rich text. views/BlogPostPage.tsx
   *  parses this subset itself so that every outbound link keeps
   *  rel="noopener noreferrer nofollow" — the articles cite suppliers who
   *  compete with Thistle — and so the comparison tables keep their per-cell
   *  tinting. The CMS field mirrors the shape for the same reason. */
  content: string[];
  image: string;
  date: string;
  updated?: string;
  readTime: string;
  category: BlogCategory;
  author: {
    name: string;
    role: string;
    initials: string;
    /** Square head and shoulders. Falls back to the initials when absent. */
    photo?: string;
    /** Two or three sentences on the card at the foot of the article. */
    bio?: string;
    /** Full https address. Gives Google a second source for who this is. */
    linkedin?: string;
  };
}

// Migrated from the live thistlearchitecture.co.uk journal, original slugs kept.
import { post as classMaPriorApproval } from './blog/class-ma-prior-approval-what-you-need-to-know';
import { post as buyingVsBuilding } from './blog/buying-vs-building-a-home-in-the-uk';
import { post as ecoHome } from './blog/self-building-an-eco-home-in-the-uk';
import { post as brickStoneConcrete } from './blog/brick-vs-stone-vs-concrete-masonry-in-self-build-homes';
import { post as classQBarns } from './blog/class-q-barn-conversions';
import { post as masonryProsCons } from './blog/10-pros-and-cons-of-masonry-for-self-build-houses';
import { post as icfsConstruction } from './blog/self-build-icfs-construction';
import { post as timberFrame } from './blog/self-build-timber-frame-house';
import { post as sipsConstruction } from './blog/self-build-sips-construction';
import { post as selfBuildCost } from './blog/how-much-does-it-cost-to-self-build';
import { post as fundSelfBuild } from './blog/how-to-fund-a-self-build-home';
import { post as topTenConsiderations } from './blog/top-10-considerations-when-it-comes-to-self-building';
import { post as findSelfBuildArchitect } from './blog/how-to-find-the-right-self-build-architect';
import { post as thistleRebrand } from './blog/hmo-designers-thistle-architecture-rebrand';

const allPosts: BlogPost[] = [
  thistleRebrand,
  classMaPriorApproval,
  buyingVsBuilding,
  ecoHome,
  brickStoneConcrete,
  classQBarns,
  masonryProsCons,
  icfsConstruction,
  timberFrame,
  sipsConstruction,
  selfBuildCost,
  fundSelfBuild,
  topTenConsiderations,
  findSelfBuildArchitect,
];

// Newest first.
export const blogPosts: BlogPost[] = allPosts.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

// Same floor as lib/posts.ts: a category needs two articles before it gets a
// page or a filter chip (item 111).
export const blogCategories: BlogCategory[] = (Array.from(
  new Set(blogPosts.map((p) => p.category))
) as BlogCategory[]).filter((c) => blogPosts.filter((p) => p.category === c).length >= 2);

// Categories have their own URLs at /blog/category/<slug>. The filter on /blog
// used to be React state, so every category shared one URL and none of them
// could be indexed, given a title, or linked to.
//
// Derived from the posts, not from the BlogCategory union, on purpose. The union
// lists seven categories and only three are in use; generating pages for the
// other four would publish empty listings.
export const categorySlug = (c: BlogCategory): string =>
  c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const getCategoryBySlug = (slug: string): BlogCategory | undefined =>
  blogCategories.find((c) => categorySlug(c) === slug);

export const postsInCategory = (c: BlogCategory): BlogPost[] =>
  blogPosts.filter((p) => p.category === c);

// Written per category rather than generated from a template, so each page has
// a description that says something. A templated "Articles about X" on every
// page is the kind of thin duplication the category URLs are meant to avoid.
export const categoryMeta: Record<BlogCategory, { title: string; description: string }> = {
  'Self Build': {
    title: 'Self Build Guides',
    description:
      'Practical guides to building your own home in the UK: what it costs, how to fund it, which construction method to choose, and how to find the right architect.',
  },
  'Permitted Development': {
    title: 'Permitted Development',
    description:
      'How permitted development rights work in practice, including Class MA prior approval for commercial to residential and Class Q for barn conversions.',
  },
  Investment: {
    title: 'Property Investment',
    description:
      'Funding and viability for residential development projects, written for developers weighing up whether a scheme stacks up.',
  },
  Planning: {
    title: 'Planning',
    description: 'Articles on the UK planning system and how applications are decided.',
  },
  Feasibility: {
    title: 'Feasibility',
    description: 'How to test whether a building or site can become something more valuable.',
  },
  HMO: {
    title: 'HMOs',
    description: 'Licensing, layouts and viability for houses in multiple occupation.',
  },
  News: {
    title: 'News',
    description:
      'News from the practice, plus changes to planning policy and permitted development rights.',
  },
};
