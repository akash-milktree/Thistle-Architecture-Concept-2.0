import { defineConfig } from 'tinacms';
import { settingsCollection } from './collections/settings';
import { reviewsCollection } from './collections/reviews';
import { homeCollection } from './collections/home';
import { aboutCollection } from './collections/about';
import { contactCollection } from './collections/contact';
import { pricingCollection } from './collections/pricing';
import { legalCollection } from './collections/legal';
import { listingsCollection } from './collections/listings';
import { toolCollection } from './collections/tool';
import { conversionCollection } from './collections/conversion';
import { conversionsIndexCollection } from './collections/conversionsIndex';
import { feasibilityPackageCollection } from './collections/feasibilityPackage';
import { postCollection } from './collections/post';
import { caseStudyCollection } from './collections/caseStudy';
import { teamReviewCollection } from './collections/teamReview';

// Vercel exposes the branch being built as VERCEL_GIT_COMMIT_REF, so preview
// deployments edit their own branch and production edits main. GITHUB_BRANCH
// and HEAD are the equivalents for other CI. Falling back to 'main' keeps
// local runs pointed somewhere sane.
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  branch,

  // Undefined locally, which puts Tina in local mode: no login, and edits are
  // written straight to content/**.json on disk. Set in Vercel for production,
  // where Tina commits through TinaCloud instead.
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    // Repo-based media, deliberately, rather than TinaCloud's media store.
    //
    // Two reasons, both load-bearing on this site:
    //
    // 1. Rendering keys off the image path. `isDrawing()` in
    //    views/CaseStudyDetailPage.tsx and sections/ExampleProjects.tsx tests
    //    src.startsWith('/images/projects/') to decide object-contain on white
    //    (architectural drawings) versus object-cover on tint (photography).
    //    An absolute CDN URL fails that test silently, and every drawing on the
    //    site would render cropped. No 404, no build error.
    //
    // 2. public/images is a curated, hand-optimised 50MB set with an explicit
    //    size and format budget (scripts/optimise-media.mjs). Files that live
    //    in the repo stay inside that budget; files on a CDN cannot.
    //
    // mediaRoot is a NEW dedicated folder rather than 'images', so the editor's
    // media browser shows only uploads and cannot overwrite the curated trees
    // (projects/, deliverables/, site/, team/).
    tina: {
      publicFolder: 'public',
      mediaRoot: 'images/uploads',
      static: false,
    },
  },

  schema: {
    // Order here is the order of the sidebar in the editor, so it runs
    // roughly in the order someone would think about the site: the global
    // chrome first, then pages, then the repeatable sets.
    collections: [
      settingsCollection,
      homeCollection,
      aboutCollection,
      feasibilityPackageCollection,
      pricingCollection,
      contactCollection,
      conversionsIndexCollection,
      conversionCollection,
      listingsCollection,
      caseStudyCollection,
      postCollection,
      toolCollection,
      legalCollection,
      reviewsCollection,
      teamReviewCollection,
    ],
  },
});
