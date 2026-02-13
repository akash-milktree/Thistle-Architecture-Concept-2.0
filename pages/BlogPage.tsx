import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../data/blogData';

export const BlogPage: React.FC = () => {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        label="Blog"
        heading="Insights for developers."
        description="Practical articles on planning, feasibility, and the commercial conversion market — written by architects, for developers."
      />

      {/* Featured Post */}
      <section className="py-fl-8 px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <Reveal>
            <Link to={`/blog/${featured.slug}`}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-fl-5 rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.06] hover:border-thistle-black/[0.12] hover:shadow-xl hover:shadow-thistle-black/[0.04] transition-all duration-500"
              >
                <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-fl-6 flex flex-col justify-center">
                  <div className="flex items-center gap-fl-3 mb-fl-4">
                    <span className="px-3 py-1 rounded-full bg-thistle-black/[0.04] text-[10px] uppercase tracking-widest text-thistle-black/50 font-medium">{featured.category}</span>
                    <span className="text-xs text-thistle-black/30">{featured.readTime}</span>
                  </div>
                  <h2 className="text-fluid-h3 font-medium tracking-tight leading-tight mb-fl-4 group-hover:text-thistle-pink transition-colors">{featured.title}</h2>
                  <p className="text-fluid-sm text-thistle-black/50 leading-relaxed mb-fl-5">{featured.excerpt}</p>
                  <div className="flex items-center gap-fl-3">
                    <div className="w-8 h-8 rounded-full bg-thistle-black/[0.06] flex items-center justify-center text-[10px] font-bold text-thistle-black/50">{featured.author.initials}</div>
                    <div>
                      <span className="block text-sm font-medium text-thistle-black">{featured.author.name}</span>
                      <span className="text-xs text-thistle-black/40">{featured.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Post Grid */}
      <section className="pb-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-fl-5">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.1}>
                <Link to={`/blog/${post.slug}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="group rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.06] hover:border-thistle-black/[0.12] hover:shadow-lg hover:shadow-thistle-black/[0.03] transition-all duration-500"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-fl-5">
                      <div className="flex items-center gap-fl-3 mb-fl-3">
                        <span className="px-3 py-1 rounded-full bg-thistle-black/[0.04] text-[10px] uppercase tracking-widest text-thistle-black/50 font-medium">{post.category}</span>
                        <span className="text-xs text-thistle-black/30">{post.readTime}</span>
                      </div>
                      <h3 className="text-fluid-h6 font-medium tracking-tight mb-fl-2 group-hover:text-thistle-pink transition-colors">{post.title}</h3>
                      <p className="text-fluid-sm text-thistle-black/50 leading-relaxed mb-fl-4">{post.excerpt}</p>
                      <div className="flex items-center gap-fl-3">
                        <div className="w-7 h-7 rounded-full bg-thistle-black/[0.06] flex items-center justify-center text-[9px] font-bold text-thistle-black/50">{post.author.initials}</div>
                        <span className="text-xs text-thistle-black/40">{post.author.name} · {post.date}</span>
                      </div>
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
