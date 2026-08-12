"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '../components/animations/Reveal';
import { DocumentCards } from '../components/case-study/DocumentCards';
import { SketchViewer } from '../components/case-study/SketchViewer';
import { ArrowUpRight, ArrowLeft, CheckCircle2, HardHat } from 'lucide-react';
import { caseStudies } from '../data/caseStudiesData';

// Drawings (converted sketch PDFs) live in /images/projects/ and must never
// be crop-covered; photography can fill its frame.
const isDrawing = (src: string) => src.startsWith('/images/projects/');

const Frame: React.FC<{ src: string; alt: string; aspect?: string; sizes?: string }> = ({
  src,
  alt,
  aspect = 'aspect-[4/3]',
  sizes = '(max-width: 1024px) 92vw, 640px',
}) => (
  <div className={`relative ${aspect} rounded-2xl border border-thistle-black/[0.06] overflow-hidden ${isDrawing(src) ? 'bg-white' : 'bg-thistle-white/60'}`}>
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={isDrawing(src) ? 'object-contain p-3' : 'object-cover'}
    />
  </div>
);

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = caseStudies.find(c => c.slug === slug);

  if (!caseStudy) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-fluid-h2 font-medium tracking-tight mb-fl-4">Case study not found.</h1>
          <Link href="/case-studies" className="text-fluid-sm text-thistle-green hover:underline">Back to all work</Link>
        </div>
      </section>
    );
  }

  const isProject = caseStudy.kind === 'project';
  const backHref = isProject ? '/case-studies/completed-projects' : '/case-studies/feasibility-studies';
  const backLabel = isProject ? 'All Completed Projects' : 'All Feasibility Studies';

  // Next link cycles within the same category, so a project never hands
  // over to a feasibility study mid-browse.
  const siblings = caseStudies.filter(c => c.kind === caseStudy.kind);
  const idx = siblings.findIndex(c => c.slug === slug);
  const nextCase = siblings[(idx + 1) % siblings.length];

  const narrative = [
    { num: '01', title: 'The Challenge', body: caseStudy.challenge },
    { num: '02', title: 'Our Approach', body: caseStudy.approach },
    { num: '03', title: 'The Outcome', body: caseStudy.outcome },
  ].filter((s): s is { num: string; title: string; body: string } => !!s.body);

  // Completed projects carry real photography, often a dozen shots or more.
  // Feasibility studies carry drawings, usually one or two.
  const photoGrid = isProject && caseStudy.galleryImages.length > 3;

  // One modest fact band replaces both the old display-size stats row and
  // the near-empty sidebar.
  const facts = [
    ...caseStudy.stats,
    { label: 'Building type', value: caseStudy.buildingType },
    ...(caseStudy.planningRoute ? [{ label: 'Planning route', value: caseStudy.planningRoute }] : []),
    ...(caseStudy.completionDate ? [{ label: isProject ? 'Completed' : 'Feasibility date', value: caseStudy.completionDate }] : []),
  ].slice(0, 6);

  return (
    <>
      {/* Split header: copy left, framed image right. Drawings never sit
          behind text. */}
      <section className="bg-thistle-white pt-32 pb-fl-8 px-fl-margin">
        <div className="max-w-[1360px] mx-auto">
          <Link href={backHref} className="inline-flex items-center gap-2 text-sm text-thistle-black/50 hover:text-thistle-black transition-colors mb-fl-6">
            <ArrowLeft size={14} /> {backLabel}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-fl-7 items-center">
            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-fl-2 mb-fl-4">
                  <span className="px-3 py-1.5 rounded-full bg-thistle-green/10 text-[10px] uppercase tracking-widest text-thistle-green font-semibold">
                    {caseStudy.tag}
                  </span>
                  {caseStudy.recommendation && (
                    <span className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold ${
                      caseStudy.recommendation === 'No-Go'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-thistle-black/[0.05] text-thistle-black/60'
                    }`}>
                      {caseStudy.recommendation}
                    </span>
                  )}
                  {isProject && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-thistle-black/[0.05] text-[10px] uppercase tracking-widest text-thistle-black/60 font-semibold">
                      {caseStudy.status === 'On site' ? (
                        <HardHat size={11} className="text-thistle-green" />
                      ) : (
                        <CheckCircle2 size={11} className="text-thistle-green" />
                      )}
                      {caseStudy.status ?? 'Complete'}
                    </span>
                  )}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-fluid-h1 font-medium tracking-tight leading-[1.05] text-thistle-black mb-fl-3">
                  {caseStudy.title}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className={`text-sm uppercase tracking-wider text-thistle-black/45 font-medium ${caseStudy.provenance ? 'mb-fl-2' : 'mb-fl-5'}`}>
                  {caseStudy.location}
                </p>
                {caseStudy.provenance && (
                  <p className="text-sm text-thistle-black/50 mb-fl-5">{caseStudy.provenance}</p>
                )}
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-fluid-lg text-thistle-black/75 leading-relaxed max-w-xl">
                  {caseStudy.desc}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <Frame src={caseStudy.image} alt={caseStudy.title} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Fact band. Hidden on template studies: the key information table below
          covers the same ground, and two rows of facts a few hundred pixels
          apart repeated the communal space and the planning route verbatim. */}
      {!caseStudy.feasibility && (
      <section className="bg-white border-y border-thistle-black/[0.06] px-fl-margin">
        <div className="max-w-[1360px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {facts.map((fact, i) => (
            <div
              key={i}
              className={`py-fl-5 px-fl-4 ${i > 0 ? 'sm:border-l sm:border-thistle-black/[0.05]' : ''}`}
            >
              <span className="block text-[10px] uppercase tracking-widest text-thistle-black/40 font-semibold mb-1.5">{fact.label}</span>
              <span className="block text-fluid-h6 font-medium tracking-tight text-thistle-black leading-snug">{fact.value}</span>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Ed's feasibility template. Only studies carrying `feasibility` data use
          it, so the rest keep the older layout until they are written up. */}
      {caseStudy.feasibility && (
        <>
          {/* 2. Key project information */}
          <section className="bg-thistle-white pt-fl-section-sm px-fl-margin">
            <div className="max-w-[1000px] mx-auto">
              <Reveal>
                <div className="rounded-2xl border border-thistle-black/[0.08] bg-white overflow-hidden">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-thistle-black/[0.06]">
                    {caseStudy.feasibility.keyInfo.map((f) => (
                      <div key={f.label} className="p-fl-4">
                        <span className="block text-[10px] uppercase tracking-widest text-thistle-black/35 font-semibold mb-fl-2">{f.label}</span>
                        <span className="block text-fluid-sm font-medium text-thistle-black leading-snug">{f.value}</span>
                      </div>
                    ))}
                  </div>
                  {caseStudy.feasibility.indicativeValue && (
                    <div className="border-t border-thistle-black/[0.06] px-fl-4 py-fl-3 bg-thistle-white/40">
                      <span className="text-fluid-sm text-thistle-black/60">
                        Indicative end value: <span className="text-thistle-black font-medium">{caseStudy.feasibility.indicativeValue}</span>
                      </span>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </section>

          {/* 3. Feasibility in brief */}
          <section className="bg-thistle-white py-fl-section px-fl-margin">
            <div className="max-w-[1000px] mx-auto">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-6">Feasibility In Brief</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-fl-6">
                {[
                  { h: 'The Brief', b: caseStudy.feasibility.brief },
                  { h: 'What We Found', b: caseStudy.feasibility.found },
                  { h: 'Our Recommendation', b: caseStudy.feasibility.recommendation },
                ].map((c, i) => (
                  <Reveal key={c.h} delay={i * 0.06}>
                    <h2 className="text-fluid-h6 font-medium tracking-tight text-thistle-black mb-fl-3">{c.h}</h2>
                    <p className="text-fluid-sm text-thistle-black/70 leading-relaxed">{c.b}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* 4. The sketch */}
          {caseStudy.galleryImages.length > 0 && (
            <section className="bg-white py-fl-section px-fl-margin">
              <div className="max-w-[1000px] mx-auto">
                <Reveal>
                  <h2 className="text-fluid-h4 font-medium tracking-tight text-thistle-black mb-fl-6">The Proposed Layout</h2>
                </Reveal>
                <Reveal>
                  <SketchViewer
                    images={caseStudy.galleryImages}
                    alt={`Feasibility sketch for ${caseStudy.title}`}
                    caption={caseStudy.feasibility.sketchCaption}
                  />
                </Reveal>
              </div>
            </section>
          )}

          {/* 5. What the client received */}
          <section className="bg-thistle-white py-fl-section px-fl-margin">
            <div className="max-w-[1000px] mx-auto">
              <Reveal>
                <h2 className="text-fluid-h4 font-medium tracking-tight text-thistle-black mb-fl-6">What The Client Received</h2>
              </Reveal>
              <Reveal>
                <DocumentCards documents={caseStudy.feasibility.documents} guidance={caseStudy.feasibility.guidance} />
              </Reveal>
            </div>
          </section>

          {/* 6. The decision */}
          <section className="bg-white py-fl-section px-fl-margin">
            <div className="max-w-[1000px] mx-auto">
              <Reveal>
                <h2 className="text-fluid-h4 font-medium tracking-tight text-thistle-black mb-fl-4">The Decision</h2>
              </Reveal>
              <Reveal>
                <p className="text-fluid-base text-thistle-black/75 leading-relaxed max-w-2xl mb-fl-7">{caseStudy.feasibility.decision}</p>
              </Reveal>
              <Reveal>
                <div className="flex flex-wrap items-center gap-fl-2">
                  {caseStudy.feasibility.roadmap.map((step, i) => (
                    <React.Fragment key={step}>
                      <span className="inline-flex items-center rounded-full border border-thistle-black/[0.08] bg-thistle-white px-4 py-2 text-fluid-sm text-thistle-black/75">
                        {step}
                      </span>
                      {i < caseStudy.feasibility!.roadmap.length - 1 && (
                        <span className="text-thistle-black/25" aria-hidden="true">&rarr;</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {!caseStudy.feasibility && narrative.length > 0 ? (
        /* Numbered narrative at reading size */
        <section className="bg-thistle-white py-fl-section px-fl-margin">
          <div className="max-w-[820px] mx-auto space-y-fl-8">
            {narrative.map((section, i) => (
              <Reveal key={section.num} delay={i * 0.05}>
                <div>
                  <div className="flex items-baseline gap-fl-3 mb-fl-4">
                    <span className="text-sm font-semibold text-thistle-green tabular-nums">{section.num}</span>
                    <h2 className="text-fluid-h4 font-medium tracking-tight text-thistle-black">{section.title}</h2>
                  </div>
                  <p className="text-fluid-base text-thistle-black/75 leading-relaxed">{section.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : (
        /* Placeholder projects get a designed in-preparation panel, not an
           orphan sentence in an empty grid. */
        <section className="bg-thistle-white py-fl-section px-fl-margin">
          <div className="max-w-[820px] mx-auto">
            <Reveal>
              <div className="rounded-2xl bg-white border border-thistle-black/[0.06] p-fl-7 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-4">Write-Up In Preparation</p>
                <h2 className="text-fluid-h4 font-medium tracking-tight text-thistle-black mb-fl-4">
                  The full story of this project is on its way.
                </h2>
                <p className="text-fluid-base text-thistle-black/70 leading-relaxed max-w-md mx-auto mb-fl-6">
                  Photography and a detailed write-up are being prepared. In the meantime, our feasibility studies show exactly how we approach buildings like this one.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-fl-4">
                  <Link
                    href="/case-studies"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-green hover:text-thistle-black transition-colors"
                  >
                    Browse feasibility studies
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Drawings, full width and never cropped */}
      {!caseStudy.feasibility && caseStudy.galleryImages.length > 0 && (
        <section className="bg-white py-fl-section px-fl-margin">
          {/* Drawings need full width to stay readable, so they stay stacked in
              a narrow column. Photography does not, and a long set of photos
              stacked one per row is an unreasonable scroll, so it goes two up. */}
          <div className={`mx-auto ${photoGrid ? 'max-w-[1360px]' : 'max-w-[1000px]'}`}>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-6">
                {isProject ? 'Gallery' : 'The Drawings'}
              </p>
            </Reveal>
            <div className={photoGrid ? 'grid grid-cols-1 sm:grid-cols-2 gap-fl-5' : 'space-y-fl-6'}>
              {caseStudy.galleryImages.map((img, i) => (
                <Reveal key={i} delay={Math.min(i * 0.08, 0.2)}>
                  <Frame
                    src={img}
                    alt={`${caseStudy.title}, ${isProject ? 'photograph' : 'drawing'} ${i + 1}`}
                    aspect="aspect-[16/10]"
                    sizes={photoGrid ? '(max-width: 640px) 92vw, (max-width: 1360px) 46vw, 660px' : '(max-width: 1024px) 92vw, 1000px'}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next, within the same category */}
      <section className="bg-thistle-white py-fl-8 px-fl-margin border-t border-thistle-black/[0.06]">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-fl-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-3">
              {isProject ? 'Next Project' : 'Next Study'}
            </p>
            <Link href={`/case-studies/${nextCase.slug}`} className="group inline-flex items-center gap-fl-3">
              <h3 className="text-fluid-h3 font-medium tracking-tight text-thistle-black group-hover:text-thistle-green transition-colors">{nextCase.title}</h3>
              <ArrowUpRight size={22} className="text-thistle-black/30 group-hover:text-thistle-green transition-colors" />
            </Link>
          </div>
          <Link href={backHref} className="text-sm font-medium text-thistle-black/50 hover:text-thistle-black transition-colors">
            {backLabel} &rarr;
          </Link>
        </div>
      </section>
    </>
  );
};
