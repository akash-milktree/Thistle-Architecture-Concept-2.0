import React from 'react';
import { StickyLabel } from '../components/ui/StickyLabel';
import { Reveal } from '../components/animations/Reveal';
import { UploadCloud, FileSearch, PenTool, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: <UploadCloud size={24} />,
    title: "1. Submit Property Details",
    desc: "Upload floor plans, address, and your target unit mix. Our portal captures everything we need to start immediately."
  },
  {
    icon: <FileSearch size={24} />,
    title: "2. Automated Desk Study",
    desc: "We run constraints checks against planning policy, flood risk, daylight exposure, and local Article 4 directives."
  },
  {
    icon: <PenTool size={24} />,
    title: "3. Architect Review",
    desc: "A senior architect reviews the data, sketches the optimal layout, and solves complex spatial problems automation can't handle."
  },
  {
    icon: <CheckCircle2 size={24} />,
    title: "4. Feasibility Delivered",
    desc: "Within 5 working days, you receive a comprehensive PDF report including GA plans, schedule of accommodation, and risk register."
  }
];

export const Process: React.FC = () => {
  return (
    <section className="bg-thistle-black text-thistle-white py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        <div className="hidden lg:block w-1/4 sticky top-32 self-start">
          <Reveal>
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-thistle-white/50 font-semibold">
                The Workflow
              </span>
              <p className="text-2xl font-medium tracking-tight mt-2 text-white max-w-[200px]">
                5 Days to Clarity.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 gap-0 border-l border-white/10">
            {steps.map((step, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="group relative pl-8 pb-16 last:pb-0">
                   {/* Timeline dot */}
                  <span className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-thistle-black border border-white/30 group-hover:bg-thistle-pink group-hover:border-thistle-pink transition-colors duration-300"></span>
                  
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-thistle-pink group-hover:bg-white/10 transition-colors">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium mb-3">{step.title}</h3>
                      <p className="text-white/60 leading-relaxed max-w-lg">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};