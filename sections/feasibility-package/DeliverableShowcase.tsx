"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../../components/animations/Reveal';
import { deliverables } from '../../data/howItWorksData';
import { deliverableDetail } from '../../data/feasibilityPackageData';
import { caseStudies } from '../../data/caseStudiesData';
import { SampleReportGate } from './SampleReportGate';
import { pruneEmpty } from '../../lib/tina';

// The nine-bed HMO conversion, Ed's nominated compact "see it in practice"
// example (August 2026 final brief, section 03). st-johns-aylesbury is the
// first entry in caseStudiesData on purpose, so this is not a magic index.
const ninebedExample = caseStudies.find((c) => c.slug === 'st-johns-aylesbury');

// One real document per deliverable, all from 155 Windmill Lane, the example
// project Ed nominated. These replace the stock and unrelated sketch images that
// were standing in for them, which he described as wrong and muddled on
// 5 August: the risk register showed a photograph, the space standards showed a
// different project's sketch.
//
// Order follows `deliverables` in data/howItWorksData.ts. Each is a page from
// the report that deliverable actually produces, and the reports themselves are
// published on the study at /case-studies/windmill-lane-cheshunt.
//
// All are 'contain' on white: they are documents, and cropping one to fill a
// frame cuts off the part that shows what it is. `fit` stays in code for that
// reason — it is a rendering decision about the shape of the file, not copy.
const images: { src: string; alt: string; fit: 'contain' | 'cover' }[] = [
  { src: "/images/projects/windmill-lane-sketch-1.webp", alt: "Feasibility sketch showing six en-suite bedrooms across two floors with the garage brought into the house", fit: "contain" },
  { src: "/images/deliverables/schedule-of-accommodation.jpg", alt: "Space standards summary listing minimum room sizes, ceiling heights and communal room requirements", fit: "contain" },
  { src: "/images/deliverables/planning-policy-analysis.jpg", alt: "Planning policy analysis setting out the determinative HMO policy and the design and amenity policies engaged", fit: "contain" },
  { src: "/images/deliverables/risk-register.jpg", alt: "Risk dashboard rating each planning issue with its resolution", fit: "contain" },
  { src: "/images/deliverables/full-feasibility-document.jpg", alt: "First page of the feasibility overview, covering the property, the planning context and the proposed strategy", fit: "contain" },
];

/**
 * The editable half of one deliverable: why it matters, and the document shown
 * beside it.
 *
 * The deliverable's NAME and one-line description are deliberately not here.
 * They come from `deliverables` in data/howItWorksData.ts, which the four
 * /conversions pages render from as well, so an override on this page alone
 * would leave the two sets of pages describing the same five things
 * differently. `key` matches this record back to that array by title.
 */
export interface DeliverableCopy {
  key: string;
  why?: string;
  image?: string;
  imageAlt?: string;
  /**
   * Per-item, never per-list: an id taken from the list itself opens an empty
   * form instead of the deliverable that was clicked.
   */
  tina?: Partial<Record<'why' | 'image' | 'imageAlt', string>>;
}

/** One row of the selector, after the CMS values have been merged over code. */
interface Row {
  title: string;
  desc: string;
  why: string;
  image: string;
  imageAlt: string;
  fit: 'contain' | 'cover';
  tina?: DeliverableCopy['tina'];
}

// Now a fallback rather than this section's only copy: the same strings live in
// content/feasibility/package.json, seeded byte-for-byte from here.
const HEADER_FALLBACK = {
  eyebrow: 'What You Receive',
  heading: 'What You Actually',
  headingAccent: 'Receive.',
  lede: 'Five deliverables, drawn from a feasibility we actually delivered. Not a brochure: these are pages from the real report.',
  exampleEyebrow: 'See It In Practice',
  exampleLinkLabel: 'Read the full feasibility',
};

const Panel: React.FC<{ row: Row; tinaImage?: string; className?: string }> = ({ row, tinaImage, className = '' }) => (
  <div className={`relative aspect-[4/3] rounded-2xl border border-thistle-black/[0.06] overflow-hidden ${row.fit === 'contain' ? 'bg-white' : 'bg-thistle-white/60'} ${className}`}>
    <AnimatePresence mode="wait">
      <motion.div
        key={row.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="absolute inset-0"
      >
        {/* The marker goes on the image itself, not the rounded frame around
            it: the frame is a wrapper, and a marker there would swallow every
            click inside it. */}
        <Image
          src={row.image}
          alt={row.imageAlt}
          fill
          sizes="(max-width: 1024px) 92vw, 700px"
          className={row.fit === 'contain' ? 'object-contain p-3' : 'object-cover'}
          data-tina-field={tinaImage}
        />
      </motion.div>
    </AnimatePresence>
  </div>
);

interface DeliverableShowcaseProps {
  eyebrow?: string;
  heading?: string;
  headingAccent?: string;
  lede?: string;
  /** Per-deliverable overrides, matched to the five in code by `key`. */
  items?: DeliverableCopy[];
  /** The sample-report card's own copy, passed straight through. */
  sample?: { heading?: string; body?: string; privacyNote?: string };
  sampleTina?: Partial<Record<'heading' | 'body' | 'privacyNote', string>>;
  example?: { eyebrow?: string; linkLabel?: string };
  /** CMS field ids for this section's own copy. */
  tina?: Partial<Record<'eyebrow' | 'heading' | 'headingAccent' | 'lede' | 'exampleEyebrow' | 'exampleLinkLabel', string>>;
}

// Compact selector: every deliverable in one viewport instead of a stack of
// full-height alternating rows. Desktop shows the active image beside the
// list; mobile expands the image inside the open item.
//
// Ed's August 2026 final brief merges three former sections into this one:
// "Five Deliverables. One Decision." (the selector below), "Real Documents.
// Not A Brochure." (the sample report gate), and the nine-bed HMO example as a
// compact "see it in practice" proof. One heading, "What You Actually
// Receive.", covers all three.
export const DeliverableShowcase: React.FC<DeliverableShowcaseProps> = ({
  eyebrow,
  heading,
  headingAccent,
  lede,
  items,
  sample,
  sampleTina,
  example,
  tina,
}) => {
  const [active, setActive] = useState(0);

  // pruneEmpty: a field the editor has cleared arrives as '' and would blank the
  // heading, so an empty field leaves the standing copy in place.
  const copy = {
    ...HEADER_FALLBACK,
    ...pruneEmpty({
      eyebrow,
      heading,
      headingAccent,
      lede,
      exampleEyebrow: example?.eyebrow,
      exampleLinkLabel: example?.linkLabel,
    }),
  };

  // The loop is over the five deliverables in code, not over the CMS list: the
  // set of five is a product decision, not something to add a sixth to from a
  // form. Each one picks up its CMS row by key, and falls back to the copy and
  // the document that were here before.
  const rows: Row[] = deliverables.map((d, i) => {
    const cms = items?.find((it) => it.key === d.title);
    const img = images[i];
    return {
      title: d.title,
      desc: d.desc,
      why: deliverableDetail[i]?.why ?? '',
      image: img?.src ?? '',
      imageAlt: img?.alt ?? '',
      fit: img?.fit ?? 'contain',
      ...pruneEmpty({ why: cms?.why, image: cms?.image, imageAlt: cms?.imageAlt }),
      tina: cms?.tina,
    };
  });

  const activeRow = rows[active];

  return (
    <section className="bg-white py-fl-section px-fl-margin">
      <div className="max-w-[1360px] mx-auto">
        <div className="text-center mb-fl-8 max-w-2xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4" data-tina-field={tina?.eyebrow}>{copy.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.1}>
            {/* Two fields, two markers. The h2 holds the first line, so it
                carries `heading`; the green span holds the second and carries
                its own, and closest() finds the span first for a click on the
                green words. */}
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black" data-tina-field={tina?.heading}>
              {copy.heading}<br /><span className="text-thistle-green" data-tina-field={tina?.headingAccent}>{copy.headingAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fluid-base text-thistle-black/70 leading-relaxed mt-fl-4" data-tina-field={tina?.lede}>
              {copy.lede}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-fl-6 lg:items-start">
          {/* Selector list */}
          <div className="lg:col-span-5 flex flex-col gap-fl-2">
            {rows.map((d, i) => {
              const isActive = i === active;
              return (
                <Reveal key={d.title} delay={Math.min(i * 0.04, 0.2)}>
                  <button
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    className={`w-full text-left rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-thistle-white/70 border-thistle-green/30'
                        : 'bg-white border-thistle-black/[0.06] hover:border-thistle-black/20'
                    }`}
                  >
                    <div className="flex items-center gap-fl-4 px-fl-5 py-fl-4">
                      <span className={`text-sm font-semibold tabular-nums ${isActive ? 'text-thistle-green' : 'text-thistle-black/30'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {/* No marker on the title or the description: both come
                          from the shared list in code that the /conversions
                          pages render too. */}
                      <span className={`text-fluid-h6 font-medium tracking-tight ${isActive ? 'text-thistle-black' : 'text-thistle-black/70'}`}>
                        {d.title}
                      </span>
                    </div>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="px-fl-5 pb-fl-5">
                            <p className="text-fluid-sm text-thistle-black/75 leading-relaxed mb-fl-3">{d.desc}</p>
                            <p className="text-fluid-sm text-thistle-black/55 leading-relaxed" data-tina-field={d.tina?.why}>{d.why}</p>
                            {/* Image inside the open item on small screens */}
                            <div className="lg:hidden mt-fl-4">
                              <Panel row={d} tinaImage={d.tina?.image} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Image panel, desktop only */}
          <div className="hidden lg:block lg:col-span-7 lg:sticky lg:top-28">
            <Reveal delay={0.1}>
              {activeRow && <Panel row={activeRow} tinaImage={activeRow.tina?.image} />}
            </Reveal>
          </div>
        </div>

        {/* "Real Documents. Not A Brochure.", folded in here per the brief. */}
        <SampleReportGate
          heading={sample?.heading}
          body={sample?.body}
          privacyNote={sample?.privacyNote}
          tina={sampleTina}
        />

        {/* The nine-bed HMO, Ed's compact "see it in practice" example. Which
            project it is, its title, its description and its photograph all
            come from the case study record, so only the two lines around them
            are editable here. */}
        {ninebedExample && (
          <Reveal delay={0.1}>
            <div className="max-w-3xl mx-auto mt-fl-6 rounded-2xl border border-thistle-black/[0.06] bg-thistle-white/70 p-fl-6 flex flex-col sm:flex-row items-center gap-fl-5">
              <div className={`relative w-full sm:w-40 aspect-[4/3] shrink-0 rounded-xl overflow-hidden border border-thistle-black/[0.06] ${ninebedExample.image.startsWith('/images/projects/') ? 'bg-white' : 'bg-white/60'}`}>
                <Image
                  src={ninebedExample.image}
                  alt={ninebedExample.title}
                  fill
                  sizes="160px"
                  className={ninebedExample.image.startsWith('/images/projects/') ? 'object-contain p-2' : 'object-cover'}
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-2" data-tina-field={tina?.exampleEyebrow}>{copy.exampleEyebrow}</span>
                <h3 className="text-fluid-h6 font-medium tracking-tight text-thistle-black mb-fl-2">{ninebedExample.title}</h3>
                <p className="text-fluid-sm text-thistle-black/60 leading-relaxed mb-fl-3">{ninebedExample.desc}</p>
                <Link
                  href={`/case-studies/${ninebedExample.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-green hover:text-thistle-black transition-colors"
                  data-tina-field={tina?.exampleLinkLabel}
                >
                  {copy.exampleLinkLabel}
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};
