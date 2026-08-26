"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../../components/animations/Reveal';
import { Button } from '../../components/ui/Button';
import { packageFaqs } from '../../data/feasibilityPackageData';
import { pruneEmpty } from '../../lib/tina';

/**
 * One question, plus the CMS field ids for that one question.
 */
export interface PackageFaqItem {
  question: string;
  answer: string;
  /** Rendered as a bulleted list under the answer, when present. */
  list?: { label: string; tina?: string }[];
  /**
   * Per-item, never per-list: an id taken from the list itself opens an empty
   * form instead of the question that was clicked.
   */
  tina?: Partial<Record<'question' | 'answer', string>>;
}

// Now a fallback rather than this section's only copy: the same strings live in
// content/feasibility/package.json, seeded byte-for-byte from here and from
// packageFaqs in data/feasibilityPackageData.ts.
const HEADER_FALLBACK = {
  eyebrow: 'The Questions',
  heading: 'The Practical Questions.',
  lede: 'Fee, scope, VAT, what happens on a No-Go. The things that matter once you are ready to instruct.',
  ctaLabel: 'Get Your Instant Fixed Fee',
};

interface PackageFAQProps {
  eyebrow?: string;
  heading?: string;
  lede?: string;
  ctaLabel?: string;
  /**
   * All-or-nothing rather than merged question by question: an editor deleting
   * a question has to be able to delete it, not have it reappear.
   */
  faqs?: PackageFaqItem[];
  /** CMS field ids for this section's own copy. */
  tina?: Partial<Record<'eyebrow' | 'heading' | 'lede' | 'ctaLabel', string>>;
}

// Package-specific accordion FAQ. Same UX as the general site FAQ, different
// content focused on the package itself (fee, revisions, VAT, scope changes).
export const PackageFAQ: React.FC<PackageFAQProps> = ({ eyebrow, heading, lede, ctaLabel, faqs, tina }) => {
  const [openIndex, setOpenIndex] = useState(0);

  // pruneEmpty: a field the editor has cleared arrives as '' and would blank the
  // heading, so an empty field leaves the standing copy in place.
  const copy = { ...HEADER_FALLBACK, ...pruneEmpty({ eyebrow, heading, lede, ctaLabel }) };
  const rows: PackageFaqItem[] = faqs?.length
    ? faqs
    : packageFaqs.map((f) => ({
        question: f.question,
        answer: f.answer,
        list: f.list?.map((label) => ({ label })),
      }));

  return (
    <section className="py-fl-section px-fl-margin bg-thistle-white">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-fl-8">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-5" data-tina-field={tina?.eyebrow}>{copy.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black mb-fl-5" data-tina-field={tina?.heading}>
                {copy.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-fluid-base text-thistle-black/80 leading-relaxed mb-fl-6 max-w-sm" data-tina-field={tina?.lede}>
                {copy.lede}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a href="#instant-quote">
                <Button variant="primary" icon={<ArrowUpRight size={16} />} data-tina-field={tina?.ctaLabel}>
                  {copy.ctaLabel}
                </Button>
              </a>
            </Reveal>
          </div>

          <div className="flex flex-col gap-fl-3">
            {rows.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div
                  className={`rounded-xl border transition-colors duration-300 ${
                    openIndex === i
                      ? 'border-thistle-black/[0.1] bg-white'
                      : 'border-thistle-black/[0.06] bg-transparent hover:border-thistle-black/[0.1]'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className="w-full flex items-center justify-between gap-fl-4 px-fl-5 py-fl-4 text-left group"
                  >
                    {/* The marker is on the span that renders the question, not
                        on the button around it: a marker on the button would be
                        a wrapper, closest() would find it from the plus icon
                        too, and clicking to open a question would open a form
                        instead. */}
                    <span className={`text-fluid-sm font-medium tracking-tight transition-colors duration-300 ${
                      openIndex === i ? 'text-thistle-black' : 'text-thistle-black/70 group-hover:text-thistle-black'
                    }`} data-tina-field={faq.tina?.question}>
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === i ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        openIndex === i
                          ? 'bg-thistle-black text-white'
                          : 'bg-thistle-black/[0.05] text-thistle-black/40'
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-fl-5 pb-fl-4">
                          <p className="text-fluid-base text-thistle-black/80 leading-relaxed" data-tina-field={faq.tina?.answer}>{faq.answer}</p>
                          {faq.list && (
                            <ul className="mt-fl-3 space-y-2">
                              {/* Keyed by position, not by the line itself: the
                                  text is a live form value in the editor, so
                                  keying on it remounts the bullet on every
                                  keystroke. */}
                              {faq.list.map((item, j) => (
                                <li key={j} className="flex items-start gap-2.5 text-fluid-sm text-thistle-black/65 leading-relaxed" data-tina-field={item.tina}>
                                  <span className="mt-2 w-1 h-1 rounded-full bg-thistle-black/30 shrink-0" />
                                  {item.label}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
