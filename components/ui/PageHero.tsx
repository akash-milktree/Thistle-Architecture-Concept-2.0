import React from 'react';
import { Reveal } from '../animations/Reveal';

interface PageHeroProps {
  label: string;
  heading: string;
  description?: string;
  variant?: 'dark' | 'light';
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  label,
  heading,
  description,
  variant = 'light',
  children,
}) => {
  const isDark = variant === 'dark';

  return (
    <section className={`relative min-h-[50vh] flex items-end pb-fl-8 pt-fl-section px-fl-margin overflow-hidden ${
      isDark ? 'bg-thistle-black text-white' : 'bg-thistle-white text-thistle-black'
    }`}>
      {isDark && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-thistle-green/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-thistle-pink/5 rounded-full blur-[100px]" />
        </div>
      )}

      <div className="max-w-[1360px] mx-auto w-full relative z-10">
        <Reveal>
          <p className={`text-xs uppercase tracking-[0.2em] font-semibold mb-fl-5 ${
            isDark ? 'text-white/30' : 'text-thistle-black/40'
          }`}>
            {label}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-fluid-h1 font-medium tracking-tight leading-tight max-w-3xl mb-fl-5">
            {heading}
          </h1>
        </Reveal>

        {description && (
          <Reveal delay={0.2}>
            <p className={`text-fluid-sm leading-relaxed max-w-lg ${
              isDark ? 'text-white/50' : 'text-thistle-black/50'
            }`}>
              {description}
            </p>
          </Reveal>
        )}

        {children && (
          <Reveal delay={0.3}>
            <div className="mt-fl-6">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
};
