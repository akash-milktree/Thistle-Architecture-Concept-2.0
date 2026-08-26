"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { isDrawing } from '../components/case-study/imageFit';
import { caseStudies } from '../data/caseStudiesData';
import { pruneEmpty } from '../lib/tina';

// Ed's video feedback 2026-07-08: show example projects straight after the
// developer logos, before the process. Hand-picked rather than "latest three",
// because several completed-project entries are still stock placeholders and
// this section must only ever show real work: a scheme on site, a mixed-use
// conversion, and an HMO.
//
// This stays in code. It is structural, not copy: each slug is the address of a
// case study, several of the case-study slugs are the `source` of a 301 in
// next.config.ts, and a mistyped one here silently empties the section.
const FEATURED_SLUGS = ['beauchamp-house', 'bath-street-cheddar', 'beech-house-road-croydon'];

// Ed's August 2026 final brief, section 01: "add a subtle stage or outcome
// line where useful, e.g. 'Feasibility → Planning → Technical → Construction'
// or 'Commercial → 4 Apartments / Planning Approved'." Written per card here
// rather than as a generic field on CaseStudy, since it's a homepage-specific
// summary of facts that already live on each project (status, units,
// recommendation), not new data.
//
// Now the fallback for the same lines in the CMS, which are keyed on the same
// slugs. The card itself — image, title, location, tag — belongs to the case
// study rather than to this band, and comes in through `projects` below so that
// clicking it opens that case study's own form.
const STAGE_LINE_FALLBACK: Record<string, string> = {
  'beauchamp-house': 'Office → 4 Flats / On Site',
  'bath-street-cheddar': 'Feasibility → Go Recommendation',
  'beech-house-road-croydon': 'Feasibility → Go Recommendation',
};

const HEADER_FALLBACK = {
  eyebrow: 'Example Projects',
  heading: 'Buildings We Have Tested\nAnd Built.',
  buttonLabel: 'View All Our Work',
};

/** One stage line from the CMS, with the field id for that line alone. */
export interface StageLine {
  slug: string;
  line: string;
  tina?: { line?: string };
}

/**
 * One case study record from the CMS, matched to its card by slug.
 *
 * The values are what the card shows; the field ids point back at that case
 * study's own document, so a click on the picture opens that study's image
 * picker and a click on the title opens its title. Tina cancels the click on a
 * marked element, so inside the editor a marked card edits rather than
 * navigates — which is the point of marking it.
 */
export interface FeaturedProject {
  slug: string;
  title?: string;
  location?: string;
  tag?: string;
  image?: string;
  /** 'drawing' | 'photo' — see components/case-study/imageFit.ts. */
  imageKind?: string;
  tina?: Partial<Record<'title' | 'location' | 'tag' | 'image', string>>;
}

interface ExampleProjectsProps {
  /** CMS copy for the band's own wording. Falls back per field. */
  copy?: Partial<typeof HEADER_FALLBACK>;
  /** CMS stage lines, matched to the cards by slug. */
  stageLines?: StageLine[];
  /**
   * The case studies behind the three cards, matched by slug. Absent until the
   * home page passes them, in which case the cards render from
   * data/caseStudiesData.ts exactly as they do today.
   */
  projects?: FeaturedProject[];
  tina?: Partial<Record<keyof typeof HEADER_FALLBACK, string>>;
}

const display = FEATURED_SLUGS
  .map((slug) => caseStudies.find((c) => c.slug === slug))
  .filter((c): c is NonNullable<typeof c> => !!c);

export const ExampleProjects: React.FC<ExampleProjectsProps> = ({ copy, stageLines, projects, tina }) => {
  const c = { ...HEADER_FALLBACK, ...pruneEmpty(copy) };

  // Keyed by slug, so the line and its field id travel together and a card with
  // no line in the CMS falls back to the one above rather than losing it.
  const lines: Record<string, StageLine> = {};
  for (const s of stageLines ?? []) {
    if (s?.slug) lines[s.slug] = s;
  }

  // Same arrangement for the records themselves.
  const records: Record<string, FeaturedProject> = {};
  for (const p of projects ?? []) {
    if (p?.slug) records[p.slug] = p;
  }

  return (
    <section className="bg-white py-fl-section px-fl-margin">
      <div className="max-w-[1360px] mx-auto">
        <div className="text-center mb-fl-8 max-w-4xl mx-auto">
          <Reveal>
            <p
              className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4"
              data-tina-field={tina?.eyebrow}
            >
              {c.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            {/* whitespace-pre-line so a newline typed in the CMS breaks the
                line, which is how the two-line treatment survives editing. */}
            <h2
              className="text-fluid-h2 font-medium tracking-tight leading-tight text-thistle-black whitespace-pre-line"
              data-tina-field={tina?.heading}
            >
              {c.heading}
            </h2>
          </Reveal>
        </div>

        {/* items-stretch + fullHeight: a title that wraps to two lines must not
            make its card taller than the others. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-fl-5 items-stretch">
          {display.map((project, i) => {
            const stage = lines[project.slug]?.line || STAGE_LINE_FALLBACK[project.slug];
            // Per field, not per record: an editor who has changed the title
            // but not the picture still gets the picture from code.
            const record = records[project.slug];
            const title = record?.title || project.title;
            const location = record?.location || project.location;
            const tag = record?.tag || project.tag;
            const src = record?.image || project.image;
            const drawing = isDrawing(src, record?.imageKind);
            return (
              <Reveal key={project.slug} delay={i * 0.08} fullHeight>
                <Link href={`/case-studies/${project.slug}`} className="block h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="group h-full flex flex-col rounded-2xl overflow-hidden bg-thistle-white/70 border border-thistle-black/[0.06] hover:border-thistle-black/[0.12] hover:shadow-xl hover:shadow-thistle-black/[0.04] transition-all duration-500"
                  >
                    <div className={`relative aspect-[4/3] overflow-hidden ${drawing ? 'bg-white' : ''}`}>
                      <Image
                        src={src}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 90vw, 430px"
                        data-tina-field={record?.tina?.image}
                        className={
                          drawing
                            ? 'object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03]'
                            : 'object-cover transition-transform duration-700 group-hover:scale-105'
                        }
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-xl border border-white/10 text-[10px] uppercase tracking-widest text-white/85 font-medium"
                          data-tina-field={record?.tina?.tag}
                        >
                          {tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-fl-5 flex flex-1 items-center justify-between gap-fl-3">
                      <div>
                        {/* Each marker points at that field on that case study's
                            own document, so a click here edits the study rather
                            than this band. They used to carry none, because the
                            studies were not in the CMS yet. */}
                        <h3 className="text-fluid-h5 font-medium tracking-tight text-thistle-black" data-tina-field={record?.tina?.title}>{title}</h3>
                        <p className="text-[11px] text-thistle-black/40 uppercase tracking-wider mt-1" data-tina-field={record?.tina?.location}>{location}</p>
                        {stage && (
                          // The stage line is the one thing on the card that
                          // belongs to the home page rather than to the case
                          // study, so its marker points back here.
                          <p
                            className="text-[11px] text-thistle-green font-medium tracking-wide mt-1.5"
                            data-tina-field={lines[project.slug]?.tina?.line}
                          >
                            {stage}
                          </p>
                        )}
                      </div>
                      <div className="w-8 h-8 flex-shrink-0 rounded-full border border-thistle-black/[0.1] flex items-center justify-center group-hover:bg-thistle-black group-hover:border-thistle-black transition-colors">
                        <ArrowUpRight size={14} className="text-thistle-black/60 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.3}>
          <div className="flex justify-center mt-fl-7">
            <Link href="/case-studies">
              <Button size="md" variant="primary" icon={<ArrowUpRight size={16} />} data-tina-field={tina?.buttonLabel}>
                {c.buttonLabel}
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
