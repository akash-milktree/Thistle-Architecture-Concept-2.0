import React from 'react';
import { StickyLabel } from '../components/ui/StickyLabel';
import { Reveal } from '../components/animations/Reveal';

const benefits = [
  {
    title: "Speed",
    value: "5 Days",
    desc: "Standard architecture practices take weeks. We take days. Don't lose a deal because you were waiting on drawings."
  },
  {
    title: "Clarity",
    value: "Yes/No",
    desc: "Our reports are designed to give you a quick Go/No-Go decision. We highlight red flags immediately."
  },
  {
    title: "Cost",
    value: "Fixed",
    desc: "No hourly rates. No creeping fees. A single fixed price per building analysis. Budget your feasibility costs accurately."
  },
  {
    title: "Risk",
    value: "Low",
    desc: "We identify planning and structural risks upfront, preventing expensive mistakes during the technical design phase."
  }
];

export const Benefits: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        <StickyLabel label="Why Thistle" description="Developer Logic." />
        
        <div className="lg:w-3/4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {benefits.map((item, index) => (
               <Reveal key={index} delay={index * 0.1}>
                 <div className="p-8 border border-thistle-black/10 bg-thistle-white hover:border-thistle-pink transition-colors duration-300 h-full flex flex-col justify-between min-h-[280px] group">
                   <div>
                     <span className="text-xs uppercase tracking-widest text-thistle-gray mb-4 block group-hover:text-thistle-black transition-colors">{item.title}</span>
                     <h3 className="text-5xl font-light tracking-tighter mb-6 group-hover:text-thistle-black transition-colors">{item.value}</h3>
                   </div>
                   <p className="text-thistle-black/70 text-sm leading-relaxed">{item.desc}</p>
                 </div>
               </Reveal>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};