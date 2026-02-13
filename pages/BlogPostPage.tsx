import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { motion } from 'framer-motion';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openModal } = useFeasibility();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-fluid-h2 font-medium tracking-tight mb-fl-4">Article not found.</h1>
          <Link to="/blog" className="text-sm text-thistle-pink hover:underline">Back to all articles</Link>
        </div>
      </section>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

  return (
    <>
      {/* Article Header */}
      <section className="pt-fl-section-sm pb-fl-6 px-fl-margin bg-thistle-white">
        <div className="max-w-[720px] mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-thistle-black/40 hover:text-thistle-black transition-colors mb-fl-6">
            <ArrowLeft size={14} /> All Articles
          </Link>

          <Reveal>
            <div className="flex items-center gap-fl-3 mb-fl-4">
              <span className="px-3 py-1 rounded-full bg-thistle-black/[0.04] text-[10px] uppercase tracking-widest text-thistle-black/50 font-medium">{post.category}</span>
              <span className="text-xs text-thistle-black/30">{post.readTime}</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex items-center gap-fl-3 mb-fl-6">
              <div className="w-9 h-9 rounded-full bg-thistle-black/[0.06] flex items-center justify-center text-[10px] font-bold text-thistle-black/50">{post.author.initials}</div>
              <div>
                <span className="block text-sm font-medium text-thistle-black">{post.author.name}</span>
                <span className="text-xs text-thistle-black/40">{post.author.role} · {post.date}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-fl-margin mb-fl-7">
        <div className="max-w-[960px] mx-auto">
          <Reveal>
            <div className="aspect-[2/1] rounded-2xl overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Article Body */}
      <section className="pb-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[720px] mx-auto">
          {post.content.map((block, i) => (
            <Reveal key={i} delay={i * 0.03}>
              {block.startsWith('## ') ? (
                <h2 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mt-fl-7 mb-fl-4">{block.replace('## ', '')}</h2>
              ) : (
                <p className="text-fluid-sm text-thistle-black/60 leading-[1.8] mb-fl-4">{block}</p>
              )}
            </Reveal>
          ))}

          {/* Author Card */}
          <div className="mt-fl-8 pt-fl-6 border-t border-thistle-black/[0.06]">
            <Reveal>
              <div className="flex items-center gap-fl-4">
                <div className="w-12 h-12 rounded-full bg-thistle-black/[0.06] flex items-center justify-center text-sm font-bold text-thistle-black/50">{post.author.initials}</div>
                <div>
                  <span className="block text-sm font-medium text-thistle-black">{post.author.name}</span>
                  <span className="text-xs text-thistle-black/40">{post.author.role}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-fl-section px-fl-margin bg-thistle-white border-t border-thistle-black/[0.06]">
        <div className="max-w-[1360px] mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-6">More Articles</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-fl-5">
            {relatedPosts.map((rp, i) => (
              <Reveal key={rp.slug} delay={i * 0.1}>
                <Link to={`/blog/${rp.slug}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="group rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.06] hover:border-thistle-black/[0.12] hover:shadow-lg hover:shadow-thistle-black/[0.03] transition-all duration-500"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={rp.image} alt={rp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-fl-5">
                      <span className="text-xs text-thistle-black/30 block mb-fl-2">{rp.category} · {rp.readTime}</span>
                      <h3 className="text-fluid-h6 font-medium tracking-tight group-hover:text-thistle-pink transition-colors">{rp.title}</h3>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-fl-section-sm px-fl-margin bg-thistle-black text-white">
        <div className="max-w-[1360px] mx-auto text-center">
          <Reveal>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight mb-fl-5">
              Ready to assess a building?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button variant="glass" size="lg" icon={<ArrowUpRight size={18} />} onClick={openModal} className="!bg-thistle-green !text-thistle-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80">
              Start Feasibility
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
};
