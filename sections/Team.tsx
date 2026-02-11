import React from 'react';
import { Reveal } from '../components/animations/Reveal';

const members = [
  { name: "Sarah Jenkins", role: "Head of Architecture", exp: "Ex-Foster + Partners" },
  { name: "David Ross", role: "Planning Director", exp: "15 Years Commercial" },
  { name: "Elena Kova", role: "Feasibility Lead", exp: "Specialist in Class MA" },
  { name: "James Thorne", role: "Technical Lead", exp: "Building Regs Expert" }
];

export const Team: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-thistle-white">
      <div className="max-w-[1600px] mx-auto">
        <Reveal>
          <div className="mb-16 border-b border-thistle-black/10 pb-6">
            <h2 className="text-3xl font-medium tracking-tight">The Architects</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group">
                <div className="bg-gray-200 aspect-[3/4] mb-4 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  {/* Placeholder for team image */}
                  <img src={`https://picsum.photos/400/500?random=${i+10}`} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-lg font-medium">{member.name}</h4>
                <p className="text-sm text-thistle-black/60">{member.role}</p>
                <p className="text-xs text-thistle-green mt-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">{member.exp}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};