"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';
import { blogPosts, blogCategories, categorySlug, type BlogCategory } from '../data/blogData';
import { useViewCounts } from '../data/blogViews';

interface BlogPageProps {
  /** Omitted on /blog, which lists everything. Set on a category page. */
  category?: BlogCategory;
  /** The category page supplies its own H1 and intro. */
  heading?: string;
  description?: string;
}

// Shared by /blog and /blog/category/[slug].
//
// The category chips were buttons driving useState, so every category lived at
// /blog with one title and one H1 and none could be indexed. They are links to
// real routes now. Filtering happens on the server from the route, so a category
// page is a real page rather than a view of this one.
export const BlogPage: React.FC<BlogPageProps> = ({ category, heading, description }) => {
  const posts = category ? blogPosts.filter((p) => p.category === category) : blogPosts;
  const views = useViewCounts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        label="Blog"
        heading={heading ?? 'Insights For Developers.'}
        description={
          description ??
          `Practical articles on planning, feasibility, and the commercial conversion market, written by architects, for developers. ${blogPosts.length} articles and growing.`
        }
      />

      {/* Category filters */}
      <section className="px-fl-margin bg-thistle-white pb-fl-6">
        <div className="max-w-[1360px] mx-auto">
          <nav aria-label="Blog categories" className="flex flex-wrap gap-fl-2">
            {[{ label: 'All', href: '/blog', active: !category }, ...blogCategories.map((c) => ({
              label: c,
              href: `/blog/category/${categorySlug(c)}`,
              active: category === c,
            }))].map(({ label, href, active }) => (
              <Link
                key={label}
                href={href}
                aria-current={active ? 'page' : undefined}
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
                    />
                  </div>
                  <div className="p-fl-6 flex flex-col justify-center">
                    <div className="flex items-center gap-fl-3 mb-fl-4">
                      <span className="px-3 py-1 rounded-full bg-thistle-green/10 text-[10px] uppercase tracking-widest text-thistle-green font-semibold">{featured.category}</span>
                      <span className="text-xs text-thistle-black/30">{featured.readTime}</span>
                      <span className="text-xs text-thistle-black/30">{(views[featured.slug] ?? 0).toLocaleString('en-GB')} views</span>
                    </div>
                    <h2 className="text-fluid-h3 font-medium tracking-tight leading-tight mb-fl-4 group-hover:text-thistle-green transition-colors">{featured.title}</h2>
                    <p className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-5">{featured.excerpt}</p>
                    <span className="text-xs text-thistle-black/40">{featured.author.name} · {featured.date}</span>
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
                      />
                    </div>
                    <div className="p-fl-5">
                      <div className="flex items-center gap-fl-3 mb-fl-3">
                        <span className="px-3 py-1 rounded-full bg-thistle-green/10 text-[10px] uppercase tracking-widest text-thistle-green font-semibold">{post.category}</span>
                        <span className="text-xs text-thistle-black/30">{post.readTime}</span>
                        <span className="text-xs text-thistle-black/30">{(views[post.slug] ?? 0).toLocaleString('en-GB')} views</span>
                      </div>
                      <h3 className="text-fluid-h6 font-medium tracking-tight group-hover:text-thistle-green transition-colors">{post.title}</h3>
                      <span className="block text-xs text-thistle-black/40 mt-fl-3">{post.author.name} · {post.date}</span>
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
