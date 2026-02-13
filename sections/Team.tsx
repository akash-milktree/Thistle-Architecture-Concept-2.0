import React from 'react';
import { Reveal } from '../components/animations/Reveal';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

const members = [
  {
    name: "Sarah Jenkins",
    role: "Head of Architecture",
    credential: "Ex-Foster + Partners",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=500",
    accentClass: "bg-thistle-pink"
  },
  {
    name: "David Ross",
    role: "Planning Director",
    credential: "15 Years Commercial",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500",
    accentClass: "bg-thistle-green"
  },
  {
    name: "Elena Kova",
    role: "Feasibility Lead",
    credential: "Specialist in Class MA",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500",
    accentClass: "bg-thistle-pink"
  },
  {
    name: "James Thorne",
    role: "Technical Lead",
    credential: "Building Regs Expert",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=500",
    accentClass: "bg-thistle-green"
  }
];

export const Team: React.FC = () => {
  return (
    <section className="py-fl-section px-fl-margin bg-thistle-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-fl-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-thistle-gray font-semibold mb-fl-5">The Team</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-fluid-h2 font-medium tracking-tight max-w-xl">
              Real architects. Real experience.
            </h2>
          </Reveal>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-fl-4">
          {members.map((member, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group cursor-pointer rounded-xl overflow-hidden bg-white border border-thistle-black/[0.06] hover:border-thistle-black/[0.12] hover:shadow-lg hover:shadow-thistle-black/[0.03] transition-all duration-500"
              >
                {/* Photo */}
                <div className="aspect-[3/4] overflow-hidden relative">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                  />

                  {/* Hover overlay with credential */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Credential pill - reveals on hover */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <span className={`inline-flex px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 text-[10px] uppercase tracking-widest text-white/80 font-medium`}>
                      {member.credential}
                    </span>
                  </div>

                  {/* LinkedIn icon - reveals on hover */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                      <Linkedin size={14} className="text-white/70" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-fl-4">
                  <h3 className="text-base font-medium tracking-tight">{member.name}</h3>
                  <p className="text-xs text-thistle-black/40 mt-1">{member.role}</p>
                  <div className={`w-6 h-[2px] ${member.accentClass} mt-3 group-hover:w-10 transition-all duration-500`} />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
