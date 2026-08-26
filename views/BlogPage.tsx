"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTina } from 'tinacms/dist/react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';
import { blogPosts, blogCategories, categorySlug, type BlogCategory, type BlogPost } from '../data/blogData';
import { useViewCounts } from '../data/blogViews';
import { f, type TinaQuery, EMPTY_QUERY } from '../lib/tina-fields';
import { str, arr, pruneEmpty, normalizeImage } from '../lib/tina';

/**
 * An article plus the CMS field ids for its own editable fields.
 *
 * Filled in by the merge below from the documents in content/posts/*.json.
 * Every card element already carried its marker before those existed, and an
 * undefined id makes React omit the attribute entirely, so a card with no
 * document behind it renders exactly as it did.
 *
 * Per-item, never per-list. `tinaField(posts[2], 'title')` resolves to that one
 * article's title; an id taken from the list itself opens an empty form.
 *
 * `authorName` rather than `author`: the element it marks renders
 * `post.author.name`, and `author` is an object on BlogPost, so the old name
 * read as a marker for the whole byline. The id itself is f(node.author,
 * 'name') — f(node, 'author') would open the group, not the name in it.
 */
export type BlogPostItem = BlogPost & {
  tina?: Partial<Record<'title' | 'excerpt' | 'image' | 'readTime' | 'authorName' | 'date', string>>;
};

// The standing copy, kept in code as the fallback so the page renders exactly
// as before when it is mounted without a CMS query, and so a field an editor
// has cleared leaves the page reading properly rather than blank. Same merge as
// sections/Footer.tsx.
const COPY_FALLBACK = {
  label: 'Blog',
  heading: 'Insights For Developers.',
  description: 'Practical articles on planning, feasibility, and the commercial conversion market, written by architects, for developers.',
  allLabel: 'All',
};

interface BlogPageProps {
  /** Omitted on /blog, which lists everything. Set on a category page. */
  category?: BlogCategory;
  /** The category page supplies its own H1 and intro. */
  heading?: string;
  description?: string;
  /**
   * This page's own copy, from content/listings/blog.json. Passed straight
   * through from the server page so useTina can re-run it live inside the
   * editor. Optional so the page still renders if mounted without it.
   *
   * The category pages pass it too: they share this chrome, so the eyebrow and
   * the "All" chip come from the same document. Only the heading and intro are
   * theirs.
   */
  page?: TinaQuery;
  /**
   * The articles to list. Defaults to the data module, so a page that passes
   * nothing renders exactly as before.
   *
   * This stays the source of the SET and of the order: data/blogData.ts sorts
   * newest first, and it is also what generateStaticParams builds the article
   * routes from. The CMS documents below are merged onto it rather than
   * replacing it.
   */
  posts?: BlogPostItem[];
  /**
   * Every article's document, from content/posts/*.json, passed straight
   * through from the server page so useTina can re-run it live inside the
   * editor.
   *
   * Only /blog passes it. The category pages are still generated from
   * data/blogData.ts — their route, their counts and their filtering all read
   * it — so until that route reads this collection too, an edit made here shows
   * on /blog and on the article itself but not on the category listing. The
   * note in tina/collections/post.ts records the same gap.
   */
  postsQuery?: TinaQuery;
}

// Shared by /blog and /blog/category/[slug].
//
// The category chips were buttons driving useState, so every category lived at
// /blog with one title and one H1 and none could be indexed. They are links to
// real routes now. Filtering happens on the server from the route, so a category
// page is a real page rather than a view of this one.
export const BlogPage: React.FC<BlogPageProps> = ({
  category,
  heading,
  description,
  page,
  // Widened explicitly: the fallback is a plain BlogPost[] with no field ids,
  // and without this the binding is inferred as the union and loses `tina`.
  posts = blogPosts as BlogPostItem[],
  postsQuery,
}) => {
  // useTina returns the server data verbatim on the public site and swaps in
  // the live form values inside the editor. Passing a null-ish query is not
  // allowed, and hooks cannot be called conditionally, so it runs against a
  // stub when the prop is absent and the result is discarded below.
  const { data: live } = useTina(page ?? EMPTY_QUERY);
  const cms = page ? (live as any)?.listings : undefined;

  // Spread over the fallbacks with pruneEmpty, exactly as the footer does: a
  // field the editor has cleared comes back as '' and would otherwise blank the
  // page, so an empty field simply leaves the standing copy in place.
  const copy = { ...COPY_FALLBACK, ...pruneEmpty({
    label: str(cms?.hero?.label),
    heading: str(cms?.hero?.heading),
    description: str(cms?.hero?.description),
    allLabel: str(cms?.allLabel),
  }) };

  // The articles' own documents, merged onto the records in code by slug. The
  // filename IS the slug (tina/collections/post.ts), so `_sys.filename` is what
  // matches a document back to the article it edits — there is no slug field to
  // drift out of step with it.
  //
  // Merged rather than listed straight off the connection, so the reading order
  // stays the order in code (newest first, sorted in data/blogData.ts) and an
  // article whose document has not loaded still renders its standing copy.
  // The connection returns 50 documents unless asked otherwise, which covers
  // all fourteen; a fifteenth past that limit would simply show the copy in
  // code rather than disappearing.
  const { data: livePosts } = useTina(postsQuery ?? EMPTY_QUERY);
  const bySlug = new Map<string, any>(
    postsQuery
      ? arr<any>((livePosts as any)?.postConnection?.edges)
          .map((e: any) => e?.node)
          .filter(Boolean)
          .map((n: any) => [str(n?._sys?.filename), n] as [string, any])
      : []
  );

  const articles: BlogPostItem[] = posts.map((p) => {
    const n = bySlug.get(p.slug);
    if (!n) return p;
    return {
      ...p,
      // Same merge as everywhere else: a field the editor has cleared comes
      // back as '' and would otherwise blank the card, so an empty field simply
      // leaves the standing copy in place.
      ...pruneEmpty({
        title: str(n.title),
        excerpt: str(n.excerpt),
        image: normalizeImage(n.image),
        readTime: str(n.readTime),
        date: str(n.date),
        category: str(n.category) as BlogCategory,
      }),
      // Only the name is merged: the job title and initials are the byline on
      // the article page, and nothing on a card renders them.
      author: { ...p.author, ...pruneEmpty({ name: str(n.author?.name) }) },
      tina: {
        title: f(n, 'title'),
        excerpt: f(n, 'excerpt'),
        image: f(n, 'image'),
        readTime: f(n, 'readTime'),
        authorName: f(n?.author, 'name'),
        date: f(n, 'date'),
      },
    };
  });

  const visible = category ? articles.filter((p) => p.category === category) : articles;
  const views = useViewCounts();
  const [featured, ...rest] = visible;

  return (
    <>
      <PageHero
        label={copy.label}
        heading={heading ?? copy.heading}
        description={
          description ??
          `${copy.description} ${posts.length} articles and growing.`
        }
        tina={{
          label: f(cms?.hero, 'label'),
          // Only /blog renders the CMS heading. A category page passes its own,
          // from categoryMeta in data/blogData.ts, so a marker there would open
          // the blog index heading for a click on text that did not come from
          // it.
          heading: heading ? undefined : f(cms?.hero, 'heading'),
          // No marker on the intro on either route, deliberately, and this is
          // the one editable string on these three pages without one.
          //
          // PageHero renders the whole description in a single <p>, and on both
          // routes that paragraph is composed: on /blog it is the CMS sentence
          // plus a sentence counting the published articles, and on a category
          // page it is categoryMeta plus the same kind of count. A marker on
          // that <p> would claim text the field does not contain, so clicking
          // the count would open the sentence and clicking the sentence would
          // imply the count is editable. It is edited in the Tina form instead.
          //
          // The alternative — splitting the count into a second paragraph so
          // each half could carry its own marker — changes the page to suit the
          // CMS, which is the wrong way round. The count itself stays in code:
          // typed into a form it would be wrong the next time an article is
          // published, silently, in the hero.
        }}
      />

      {/* Category filters */}
      <section className="px-fl-margin bg-thistle-white pb-fl-6">
        <div className="max-w-[1360px] mx-auto">
          <nav aria-label="Blog categories" className="flex flex-wrap gap-fl-2">
            {[{ label: copy.allLabel, href: '/blog', active: !category, tina: f(cms, 'allLabel') }, ...blogCategories.map((c) => ({
              label: c,
              href: `/blog/category/${categorySlug(c)}`,
              active: category === c,
              // The rest of the chips are the category names carried on the
              // articles, and the URL under each one is derived from the same
              // string, so they are not editable copy — see the note in
              // tina/collections/listings.ts.
              tina: undefined as string | undefined,
            }))].map(({ label, href, active, tina }) => (
              // Keyed on href rather than label: the first chip's label is
              // editable now, and two chips sharing a key if it were renamed to
              // match a category would be a silent React bug.
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                // The chip renders nothing but this label, so the marker sits
                // on the link itself rather than on a span inside it.
                data-tina-field={tina}
                className={`inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
                  active
                    ? 'bg-thistle-black text-white border-thistle-black'
                    : 'bg-white text-thistle-black/60 border-thistle-black/[0.08] hover:border-thistle-black/25'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="pb-fl-7 px-fl-margin bg-thistle-white">
          <div className="max-w-[1360px] mx-auto">
            <Reveal>
              <Link href={`/blog/${featured.slug}`}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-fl-5 rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.06] hover:border-thistle-black/[0.12] hover:shadow-xl hover:shadow-thistle-black/[0.04] transition-all duration-500"
                >
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] overflow-hidden bg-thistle-white/60">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 1024px) 90vw, 660px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      data-tina-field={featured.tina?.image}
                    />
                  </div>
                  <div className="p-fl-6 flex flex-col justify-center">
                    <div className="flex items-center gap-fl-3 mb-fl-4">
                      {/* The category is unmarked on purpose: it is the value the
                          filters and the /blog/category/<slug> URL are built
                          from, so it is a lookup key rather than copy. The view
                          count next to it is derived from /api/views. */}
                      <span className="px-3 py-1 rounded-full bg-thistle-green/10 text-[10px] uppercase tracking-widest text-thistle-green font-semibold">{featured.category}</span>
                      <span className="text-xs text-thistle-black/30" data-tina-field={featured.tina?.readTime}>{featured.readTime}</span>
                      <span className="text-xs text-thistle-black/30">{(views[featured.slug] ?? 0).toLocaleString('en-GB')} views</span>
                    </div>
                    <h2 className="text-fluid-h3 font-medium tracking-tight leading-tight mb-fl-4 group-hover:text-thistle-green transition-colors" data-tina-field={featured.tina?.title}>{featured.title}</h2>
                    <p className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-5" data-tina-field={featured.tina?.excerpt}>{featured.excerpt}</p>
                    {/* Author and date are two fields on one line, so each takes
                        its own marker and the " · " between them takes none. */}
                    <span className="text-xs text-thistle-black/40">
                      <span data-tina-field={featured.tina?.authorName}>{featured.author.name}</span> · <span data-tina-field={featured.tina?.date}>{featured.date}</span>
                    </span>
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Post Grid */}
      <section className="pb-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fl-5">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i * 0.06, 0.3)}>
                <Link href={`/blog/${post.slug}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="group h-full rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.06] hover:border-thistle-black/[0.12] hover:shadow-lg hover:shadow-thistle-black/[0.03] transition-all duration-500"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-thistle-white/60">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 90vw, 420px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        data-tina-field={post.tina?.image}
                      />
                    </div>
                    <div className="p-fl-5">
                      <div className="flex items-center gap-fl-3 mb-fl-3">
                        <span className="px-3 py-1 rounded-full bg-thistle-green/10 text-[10px] uppercase tracking-widest text-thistle-green font-semibold">{post.category}</span>
                        <span className="text-xs text-thistle-black/30" data-tina-field={post.tina?.readTime}>{post.readTime}</span>
                        <span className="text-xs text-thistle-black/30">{(views[post.slug] ?? 0).toLocaleString('en-GB')} views</span>
                      </div>
                      <h3 className="text-fluid-h6 font-medium tracking-tight group-hover:text-thistle-green transition-colors" data-tina-field={post.tina?.title}>{post.title}</h3>
                      <span className="block text-xs text-thistle-black/40 mt-fl-3">
                        <span data-tina-field={post.tina?.authorName}>{post.author.name}</span> · <span data-tina-field={post.tina?.date}>{post.date}</span>
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
