"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '../components/animations/Reveal';
import { DocumentCards } from '../components/case-study/DocumentCards';
import { SketchViewer } from '../components/case-study/SketchViewer';
import { BeforeAfter } from '../components/case-study/BeforeAfter';
import { ArrowUpRight, ArrowLeft, CheckCircle2, HardHat } from 'lucide-react';
import { caseStudies } from '../data/caseStudiesData';
import { conversions } from '../data/conversionsData';

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

  // The reverse of the link on each Expertise page, which already points to
  // its strongest case study. Ed's August 2026 final brief asks for two-way
  // contextual links, so a reader landing here can go straight to the
  // relevant service page rather than only browsing forward within case
  // studies. Silently absent when a study has no conversionTypes set.
  const relatedExpertise = (caseStudy.conversionTypes ?? [])
    .map((type) => conversions.find((c) => c.slug === type))
    .filter((c): c is (typeof conversions)[number] => !!c);

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
                {/* break-words + hyphens: --font-h1 bottoms out at 50.88px, and
                    a long single word in a title ("Reconfiguration") is wider
                    than a 320px screen, which pushed the whole page sideways.
                    Both only engage when a word genuinely cannot fit. */}
                <h1 className="text-fluid-h1 font-medium tracking-tight leading-[1.05] text-thistle-black mb-fl-3 break-words hyphens-auto">
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

      {/* Ed's project template, from Project Explanations.docx: the finished
          building first, the transformation next because many readers stop
          there, then the stages the project can actually evidence. Projects
          without a story keep the older layout. */}
      {caseStudy.projectStory && (
        <>
          <section className="bg-thistle-white py-fl-section px-fl-margin">
            <div className="max-w-[820px] mx-auto space-y-fl-4">
              {caseStudy.projectStory.summary.map((para, i) => (
                <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
                  <p className={i === 0
                    ? "text-fluid-lg text-thistle-black/85 leading-relaxed"
                    : "text-fluid-base text-thistle-black/70 leading-relaxed"}>
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </section>

          {caseStudy.projectStory.beforeAfter && (
            <section className="bg-white py-fl-section px-fl-margin">
              <div className="max-w-[1000px] mx-auto">
                <Reveal>
                  <h2 className="text-fluid-h4 font-medium tracking-tight text-thistle-black mb-fl-2">Existing And Proposed</h2>
                  <p className="text-fluid-sm text-thistle-black/55 mb-fl-6">The house before work, and as completed.</p>
                </Reveal>
                <Reveal>
                  <BeforeAfter {...caseStudy.projectStory.beforeAfter} />
                </Reveal>
              </div>
            </section>
          )}

          {caseStudy.projectStory.sections.map((sec, i) => (
            <section key={sec.title} className={`${i % 2 === 0 ? 'bg-thistle-white' : 'bg-white'} py-fl-section px-fl-margin`}>
              <div className="max-w-[1000px] mx-auto">
                <Reveal>
                  <h2 className="text-fluid-h4 font-medium tracking-tight text-thistle-black mb-fl-3">{sec.title}</h2>
                </Reveal>
                {sec.caption && (
                  <Reveal>
                    <p className="text-fluid-base text-thistle-black/70 leading-relaxed max-w-2xl mb-fl-6">{sec.caption}</p>
                  </Reveal>
                )}
                <div className={sec.images.length > 1 ? 'grid grid-cols-1 sm:grid-cols-2 gap-fl-4' : ''}>
                  {sec.images.map((img, j) => (
                    <Reveal key={img.src} delay={Math.min(j * 0.06, 0.2)}>
                      <div className={`relative rounded-2xl overflow-hidden border border-thistle-black/[0.06] bg-thistle-white/60 ${sec.images.length === 1 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                        <Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 500px" className="object-cover" />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </>
      )}

      {/* Ed's feasibility template. Only studies carrying `feasibility` data use
          it, so the rest keep the older layout until they are written up. */}
      {caseStudy.feasibility && (
        <>
          {/* 2. Key project information. Full-bleed band with dividers, the
              same treatment the fact band uses, rather than a contained card:
              it reads as the page's headline numbers that way. */}
          <section className="bg-white border-y border-thistle-black/[0.06] px-fl-margin">
            <div className="max-w-[1360px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {caseStudy.feasibility.keyInfo.map((f, i) => (
                <div key={f.label} className={`py-fl-5 px-fl-4 ${i > 0 ? 'sm:border-l sm:border-thistle-black/[0.05]' : ''}`}>
                  <span className="block text-[10px] uppercase tracking-widest text-thistle-black/40 font-semibold mb-1.5">{f.label}</span>
                  <span className="block text-fluid-h6 font-medium tracking-tight text-thistle-black leading-snug">{f.value}</span>
                </div>
              ))}
            </div>
          </section>
          {caseStudy.feasibility.indicativeValue && (
            <section className="bg-white px-fl-margin pb-fl-5 border-b border-thistle-black/[0.06]">
              <div className="max-w-[1360px] mx-auto px-fl-4">
                <span className="text-fluid-sm text-thistle-black/55">
                  Indicative end value: <span className="text-thistle-black font-medium">{caseStudy.feasibility.indicativeValue}</span>
                </span>
              </div>
            </section>
          )}

          {/* 3. Feasibility in brief. Numbered rows in the reading column,
              not three columns: these run to a paragraph each, and at a third
              of the width they set as narrow ragged blocks. */}
          <section className="bg-thistle-white py-fl-section px-fl-margin">
            <div className="max-w-[820px] mx-auto">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-7">Feasibility In Brief</p>
              </Reveal>
              <div className="space-y-fl-8">
                {[
                  { num: '01', h: 'The Brief', b: caseStudy.feasibility.brief },
                  { num: '02', h: 'What We Found', b: caseStudy.feasibility.found },
                  { num: '03', h: 'Our Recommendation', b: caseStudy.feasibility.recommendation },
                ].map((c, i) => (
                  <Reveal key={c.h} delay={i * 0.05}>
                    <div>
                      <div className="flex items-baseline gap-fl-3 mb-fl-4">
                        <span className="text-sm font-semibold text-thistle-green tabular-nums">{c.num}</span>
                        <h2 className="text-fluid-h4 font-medium tracking-tight text-thistle-black">{c.h}</h2>
                      </div>
                      <p className="text-fluid-base text-thistle-black/75 leading-relaxed">{c.b}</p>
                    </div>
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
                <DocumentCards guidance={caseStudy.feasibility.guidance} />
              </Reveal>
            </div>
          </section>

          {/* 6. The decision. Standfirst and roadmap label are Ed's words from
              the template; both were dropped on the first pass.
              The roadmap is a numbered timeline rather than the pills it was:
              pills wrapped mid-sequence and read as equal-weight tags, which
              loses the one thing a roadmap has to show, the order. */}
          <section className="bg-white py-fl-section px-fl-margin">
            <div className="max-w-[1000px] mx-auto">
              <Reveal>
                <h2 className="text-fluid-h4 font-medium tracking-tight text-thistle-black mb-fl-2">The Decision</h2>
                <p className="text-fluid-base text-thistle-green mb-fl-5">A clear route forward before purchase.</p>
              </Reveal>
              <Reveal>
                <p className="text-fluid-base text-thistle-black/75 leading-relaxed max-w-2xl mb-fl-8">{caseStudy.feasibility.decision}</p>
              </Reveal>
              <Reveal>
                <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-5">Recommended roadmap</p>
              </Reveal>
              <Reveal>
                <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-fl-5 gap-y-fl-5">
                  {caseStudy.feasibility.roadmap.map((step, i) => (
                    <li key={step} className="relative flex items-start gap-fl-3 pt-fl-4 border-t border-thistle-black/[0.08]">
                      <span className="text-sm font-semibold text-thistle-green tabular-nums shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-fluid-sm text-thistle-black/75 leading-snug">{step}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* Narrative, or the in-preparation panel when there is none. Template
          studies render neither: they carry Feasibility in Brief instead, and
          the ternary was falling through to the placeholder for them. */}
      {!caseStudy.feasibility && !caseStudy.projectStory && (narrative.length > 0 ? (
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
                    href={backHref}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-thistle-green hover:text-thistle-black transition-colors"
                  >
                    {isProject ? 'Browse completed projects' : 'Browse feasibility studies'}
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* Drawings, full width and never cropped */}
      {!caseStudy.feasibility && !caseStudy.projectStory && caseStudy.galleryImages.length > 0 && (
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

      {relatedExpertise.length > 0 && (
        <section className="bg-white py-fl-7 px-fl-margin border-t border-thistle-black/[0.06]">
          <div className="max-w-[1360px] mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-4">
              We Can Help With This
            </p>
            <div className="flex flex-wrap gap-fl-3">
              {relatedExpertise.map((c) => (
                <Link
                  key={c.slug}
                  href={`/conversions/${c.slug}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-thistle-black/[0.08] text-sm font-medium text-thistle-black hover:border-thistle-green/40 hover:text-thistle-green transition-colors"
                >
                  {c.label} Feasibility
                  <ArrowUpRight size={14} />
                </Link>
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
