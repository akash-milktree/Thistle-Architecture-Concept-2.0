import React from 'react';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/animations/Reveal';
import { ArrowUpRight } from 'lucide-react';

interface CaseProps {
  title: string;
  location: string;
  stats: string;
  desc: string;
}

const CaseCard: React.FC<CaseProps> = ({ title, location, stats, desc }) => (
  <div className="group cursor-pointer">
    <div className="bg-gray-100 aspect-[4/3] mb-6 overflow-hidden relative">
       {/* Abstract representation of a building plan or refined standard photo */}
       <div className="absolute inset-0 bg-thistle-black/5 group-hover:bg-thistle-black/0 transition-colors duration-500" />
       <div className="absolute inset-0 flex items-center justify-center text-thistle-black/10 text-6xl font-bold tracking-tighter">
         {stats}
       </div>
    </div>
    <div className="flex justify-between items-start border-b border-thistle-black/10 pb-6 group-hover:border-thistle-black/40 transition-colors">
      <div className="max-w-md">
        <h4 className="text-lg font-medium mb-1">{title}</h4>
        <p className="text-sm text-thistle-black/50 mb-3">{location}</p>
        <p className="text-sm text-thistle-black/70 leading-relaxed">{desc}</p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
         <div className="w-10 h-10 rounded-full border border-thistle-black/20 flex items-center justify-center">
            <ArrowUpRight size={18} />
         </div>
      </div>
    </div>
  </div>
);

export const CaseStudies: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1600px] mx-auto border-t border-thistle-black/5">
      <Reveal>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="text-4xl lg:text-5xl font-medium tracking-tight max-w-xl">
            Proof, <span className="text-thistle-black/30">not inspiration.</span>
          </h2>
          <Button variant="outline" className="mt-6 md:mt-0">View All Cases</Button>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        <Reveal delay={0.1}>
          <CaseCard 
            title="Office to Resi (Class MA)"
            location="Croydon, South London"
            stats="+14 Units"
            desc="The client assumed 9 units. Our structural analysis and layout optimization unlocked 5 additional apartments within the same envelope."
          />
        </Reveal>
        <Reveal delay={0.2}>
          <CaseCard 
            title="High Street Upper Parts"
            location="Reading, Berkshire"
            stats="28% Yield"
            desc="A complex access issue was blocking development. We redesigned the core circulation to meet fire regs without sacrificing retail space."
          />
        </Reveal>
      </div>
    </section>
  );
};