import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { useFeasibility } from '../components/feasibility/FeasibilityContext';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { caseStudies } from '../data/caseStudiesData';

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openModal } = useFeasibility();
  const caseStudy = caseStudies.find(c => c.slug === slug);

  if (!caseStudy) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-fluid-h2 font-medium tracking-tight mb-fl-4">Case study not found.</h1>
          <Link to="/case-studies" className="text-fluid-sm text-thistle-pink hover:underline">Back to all case studies</Link>
        </div>
      </section>
    );
  }

  const currentIndex = caseStudies.findIndex(c => c.slug === slug);
  const nextCase = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <>
      {/* Hero Image */}
      <section className="relative min-h-[60vh] flex items-end pt-fl-section-sm overflow-hidden">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          src={caseStudy.image}
          alt={caseStudy.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        <div className="relative z-10 w-full px-fl-margin pb-fl-7">
          <div className="max-w-[1360px] mx-auto">
            <Link to="/case-studies" className="inline-flex items-center gap-2 text-fluid-sm text-white/50 hover:text-white/80 transition-colors mb-fl-5">
              <ArrowLeft size={14} /> All Case Studies
            </Link>
            <span className="block px-3 py-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-[10px] uppercase tracking-widest text-white/80 font-medium w-fit mb-fl-4">
              {caseStudy.tag}
            </span>
            <h1 className="text-fluid-h1 font-medium tracking-tight text-white leading-tight mb-fl-2">
              {caseStudy.title}
            </h1>
            <p className="text-fluid-sm text-white/50">{caseStudy.location}</p>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-fl-7 px-fl-margin bg-thistle-white border-b border-thistle-black/[0.06]">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-wrap gap-fl-8">
            {caseStudy.stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col">
                  <span className="text-fluid-h2 font-medium tracking-tight text-thistle-black leading-none mb-fl-1">{stat.value}</span>
                  <span className="text-xs uppercase tracking-widest text-thistle-black/40 font-medium">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Content Body */}
      <section className="py-fl-section px-fl-margin bg-thistle-white">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-fl-8">
            {/* Sidebar */}
            <div className="lg:col-span-3 lg:sticky lg:top-32 lg:self-start">
              <div className="flex flex-col gap-5">
                {[
                  { label: "Building Type", value: caseStudy.buildingType },
                  { label: "Floor Area", value: caseStudy.floorArea },
                  { label: "Planning Route", value: caseStudy.planningRoute },
                  { label: "Completed", value: caseStudy.completionDate },
                ].map((meta, i) => (
                  <div key={i}>
                    <span className="text-[10px] uppercase tracking-widest text-thistle-black/30 font-semibold block mb-fl-1">{meta.label}</span>
                    <span className="text-fluid-sm text-thistle-black/70 font-medium">{meta.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              <Reveal>
                <div className="mb-fl-7">
                  <h2 className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-4">The Challenge</h2>
                  <p className="text-fluid-sm text-thistle-black/60 leading-relaxed">{caseStudy.challenge}</p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mb-fl-7">
                  <h2 className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-4">Our Approach</h2>
                  <p className="text-fluid-sm text-thistle-black/60 leading-relaxed">{caseStudy.approach}</p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mb-fl-7">
                  <h2 className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-4">The Outcome</h2>
                  <p className="text-fluid-sm text-thistle-black/60 leading-relaxed">{caseStudy.outcome}</p>
                </div>
              </Reveal>

              {/* Gallery */}
              {caseStudy.galleryImages.length > 0 && (
                <Reveal delay={0.3}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-fl-4 mt-fl-8">
                    {caseStudy.galleryImages.map((img, i) => (
                      <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden">
                        <img src={img} alt={`${caseStudy.title} gallery ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Next Case Study */}
      <section className="py-fl-8 px-fl-margin bg-thistle-white border-t border-thistle-black/[0.06]">
        <div className="max-w-[1360px] mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-black/40 font-semibold mb-fl-5">Next Project</p>
            <Link to={`/case-studies/${nextCase.slug}`} className="group flex items-center justify-between">
              <h3 className="text-fluid-h3 font-medium tracking-tight group-hover:text-thistle-pink transition-colors">{nextCase.title}</h3>
              <ArrowUpRight size={24} className="text-thistle-black/30 group-hover:text-thistle-pink transition-colors" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-fl-section-sm px-fl-margin bg-thistle-black text-white">
        <div className="max-w-[1360px] mx-auto text-center">
          <Reveal>
            <h2 className="text-fluid-h2 font-medium tracking-tight leading-tight mb-fl-5">
              Start your own feasibility.
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
