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
  excerpt: string;
  /** Content blocks: "## " renders an h2, "### " an h3, "- " a bullet,
   *  anything else a paragraph. Inline links use [text](/path). */
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
import { post as selfBuildCost } from './blog/how-much-does-it-cost-to-self-build-in-2023';
import { post as fundSelfBuild } from './blog/how-to-fund-a-self-build-home';
import { post as topTenConsiderations } from './blog/top-10-considerations-when-it-comes-to-self-building';
import { post as findSelfBuildArchitect } from './blog/how-to-find-the-right-self-build-architect';

const allPosts: BlogPost[] = [
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

export const blogCategories: BlogCategory[] = Array.from(
  new Set(blogPosts.map((p) => p.category))
) as BlogCategory[];
