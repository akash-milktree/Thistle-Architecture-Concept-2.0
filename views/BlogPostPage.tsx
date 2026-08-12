"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { seedFor } from '../data/blogViews';
import { motion } from 'framer-motion';

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const linkClass = "text-thistle-green underline underline-offset-2 hover:text-thistle-black transition-colors";

// Renders inline [text](/path) links inside a content string. Internal paths go
// through Link; anything absolute is an outbound citation from the original
// article and opens in a new tab.
//
// Outbound links are nofollow on purpose. The articles cite suppliers and
// builders alongside genuine sources like NACSBA, and a fair number of those
// suppliers compete with Thistle. Keeping the citations preserves the piece as
// it was written; nofollow stops it handing them ranking value.
const renderInline = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, label, href] = m;
    parts.push(
      href.startsWith('http') ? (
        <a key={m.index} href={href} target="_blank" rel="noopener noreferrer nofollow" className={linkClass}>
          {label}
        </a>
      ) : (
        <Link key={m.index} href={href} className={linkClass}>
          {label}
        </Link>
      )
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
};

type Block =
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'img'; src: string; alt: string }
  | { kind: 'p'; text: string };

const toBlocks = (content: string[]): Block[] => {
  const blocks: Block[] = [];
  for (const raw of content) {
    // ![alt](/path) is a body image, restored from the original article.
    const img = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(raw);
    if (img) blocks.push({ kind: 'img', src: img[2], alt: img[1] });
    else if (raw.startsWith('## ')) blocks.push({ kind: 'h2', text: raw.slice(3) });
    else if (raw.startsWith('### ')) blocks.push({ kind: 'h3', text: raw.slice(4) });
    else if (raw.startsWith('- ')) {
      const prev = blocks[blocks.length - 1];
      if (prev && prev.kind === 'ul') prev.items.push(raw.slice(2));
      else blocks.push({ kind: 'ul', items: [raw.slice(2)] });
    } else blocks.push({ kind: 'p', text: raw });
  }
  return blocks;
};

const MidArticleCTA: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className="my-fl-7 rounded-2xl border border-thistle-green/25 bg-thistle-green/[0.06] p-fl-6 text-center">
    <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-2">Thinking about a conversion?</h3>
    <p className="text-fluid-sm text-thistle-black/60 leading-relaxed mb-fl-4 max-w-md mx-auto">
      Get a clear Go or No-Go on your building in five days, for a fixed fee.
    </p>
    <Button variant="primary" size="md" icon={<ArrowUpRight size={15} />} onClick={onClick}>
      Book Your Feasibility
    </Button>
  </div>
);

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const post = blogPosts.find(p => p.slug === slug);

  // Views carry on from what the article had on the old site. The seed renders
  // immediately so the number is never blank or wrong on first paint; the live
  // total replaces it once the counter responds.
  // Both hooks sit above the not-found return: React requires the same hooks to
  // run on every render, and a missing post must not change how many are called.
  const [views, setViews] = useState(() => seedFor(slug));
  useEffect(() => {
    if (!slug || !post) return;
    let alive = true;
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive && typeof d?.views === 'number') setViews(d.views); })
      .catch(() => {});
    return () => { alive = false; };
  }, [slug, post]);

  if (!post) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-fluid-h2 font-medium tracking-tight mb-fl-4">Article not found.</h1>
          <Link href="/blog" className="text-sm text-thistle-green hover:underline">Back to all articles</Link>
        </div>
      </section>
    );
  }

  const goPackage = () => router.push('/feasibility-package');
  const blocks = toBlocks(post.content);
  const headings = blocks.filter((b): b is Extract<Block, { kind: 'h2' }> => b.kind === 'h2');
  const showToc = headings.length >= 3;
  const ctaAfter = Math.floor(blocks.length * 0.4);

  const sameCategory = blogPosts.filter(p => p.slug !== slug && p.category === post.category);
  const others = blogPosts.filter(p => p.slug !== slug && p.category !== post.category);
  const relatedPosts = [...sameCategory, ...others].slice(0, 3);

  return (
    <>
      {/* Article Header */}
      <section className="pt-fl-section-sm pb-fl-6 px-fl-margin bg-thistle-white">
        <div className="max-w-[720px] mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-thistle-black/40 hover:text-thistle-black transition-colors mb-fl-6">
            <ArrowLeft size={14} /> All Articles
          </Link>

          <Reveal>
            <div className="flex items-center gap-fl-3 mb-fl-4">
              <span className="px-3 py-1 rounded-full bg-thistle-green/10 text-[10px] uppercase tracking-widest text-thistle-green font-semibold">{post.category}</span>
              <span className="text-xs text-thistle-black/30">{post.readTime}</span>
              <span className="text-xs text-thistle-black/30">{views.toLocaleString('en-GB')} views</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex items-center gap-fl-3 mb-fl-6">
              <div className="w-9 h-9 rounded-full bg-thistle-green/10 flex items-center justify-center text-[10px] font-bold text-thistle-green">{post.author.initials}</div>
              <div>
                <span className="block text-sm font-medium text-thistle-black">{post.author.name}</span>
                <span className="text-xs text-thistle-black/40">
                  {post.author.role} · {post.date}{post.updated ? ` · Updated ${post.updated}` : ''}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-fl-margin mb-fl-7">
        <div className="max-w-[960px] mx-auto">
          <Reveal>
            <div className="relative aspect-[2/1] rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.06]">
              <Image src={post.image} alt={post.title} fill sizes="(max-width: 1024px) 95vw, 960px" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Article Body */}
      <section className="pb-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[720px] mx-auto">
          {showToc && (
            <div className="mb-fl-7 rounded-2xl bg-white border border-thistle-black/[0.06] p-fl-5">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-3">Jump to</span>
              <ul className="space-y-1.5">
                {headings.map((h) => (
                  <li key={h.text}>
                    <a href={`#${slugify(h.text)}`} className="text-sm text-thistle-green hover:text-thistle-black transition-colors">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {blocks.map((block, i) => (
            <React.Fragment key={i}>
              {block.kind === 'h2' ? (
                <h2 id={slugify(block.text)} className="text-fluid-h5 font-medium tracking-tight text-thistle-black mt-fl-7 mb-fl-4 scroll-mt-28">{block.text}</h2>
              ) : block.kind === 'h3' ? (
                <h3 className="text-fluid-h6 font-medium tracking-tight text-thistle-black mt-fl-5 mb-fl-3">{block.text}</h3>
              ) : block.kind === 'ul' ? (
                <ul className="list-disc pl-5 mb-fl-4 space-y-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="text-fluid-sm text-thistle-black/60 leading-[1.8]">{renderInline(item)}</li>
                  ))}
                </ul>
              ) : block.kind === 'img' ? (
                // Body image from the original article, at its original position.
                <figure className="my-fl-6 -mx-fl-2 sm:mx-0">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="w-full h-auto rounded-xl"
                  />
                </figure>
              ) : (
                <p className="text-fluid-sm text-thistle-black/60 leading-[1.8] mb-fl-4">{renderInline(block.text)}</p>
              )}
              {i === ctaAfter && <MidArticleCTA onClick={goPackage} />}
            </React.Fragment>
          ))}

          {/* Author Card */}
          <div className="mt-fl-8 pt-fl-6 border-t border-thistle-black/[0.06]">
            <Reveal>
              <div className="flex items-center gap-fl-4">
                <div className="w-12 h-12 rounded-full bg-thistle-green/10 flex items-center justify-center text-sm font-bold text-thistle-green">{post.author.initials}</div>
                <div>
                  <span className="block text-sm font-medium text-thistle-black">{post.author.name}</span>
                  <span className="text-xs text-thistle-black/40">{post.author.role}, Thistle Architecture</span>
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
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-6">Keep Reading</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-fl-5">
            {relatedPosts.map((rp, i) => (
              <Reveal key={rp.slug} delay={i * 0.1}>
                <Link href={`/blog/${rp.slug}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="group h-full rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.06] hover:border-thistle-black/[0.12] hover:shadow-lg hover:shadow-thistle-black/[0.03] transition-all duration-500"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-thistle-white/60">
                      <Image src={rp.image} alt={rp.title} fill sizes="(max-width: 768px) 90vw, 420px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-fl-5">
                      <span className="text-xs text-thistle-black/30 block mb-fl-2">{rp.category} · {rp.readTime}</span>
                      <h3 className="text-fluid-h6 font-medium tracking-tight group-hover:text-thistle-green transition-colors">{rp.title}</h3>
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
              Ready To Assess A Building?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button variant="glass" size="lg" icon={<ArrowUpRight size={18} />} onClick={goPackage} className="!bg-thistle-green !text-black !border-thistle-green hover:!bg-thistle-green/80 hover:!border-thistle-green/80">
              Book Your Feasibility
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
};
