"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';
import { blogPosts, blogCategories, type BlogCategory } from '../data/blogData';

type Filter = 'All' | BlogCategory;

export const BlogPage: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('All');

  const posts = filter === 'All' ? blogPosts : blogPosts.filter((p) => p.category === filter);
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        label="Blog"
        heading="Insights For Developers."
        description={`Practical articles on planning, feasibility, and the commercial conversion market, written by architects, for developers. ${blogPosts.length} articles and growing.`}
      />

      {/* Category filters */}
      <section className="px-fl-margin bg-thistle-white pb-fl-6">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-wrap gap-fl-2">
            {(['All', ...blogCategories] as Filter[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
                  filter === cat
                    ? 'bg-thistle-black text-white border-thistle-black'
                    : 'bg-white text-thistle-black/60 border-thistle-black/[0.08] hover:border-thistle-black/25'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
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
                      </div>
                      <h3 className="text-fluid-h6 font-medium tracking-tight group-hover:text-thistle-green transition-colors">{post.title}</h3>
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
