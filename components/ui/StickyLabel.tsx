import React from 'react';
import { Reveal } from '../animations/Reveal';

interface StickyLabelProps {
  label: string;
  description?: string;
  className?: string;
}

export const StickyLabel: React.FC<StickyLabelProps> = ({ label, description, className = "" }) => {
  return (
    <div className={`hidden lg:block w-1/4 sticky top-32 self-start ${className}`}>
      <Reveal>
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-thistle-gray font-semibold">
            {label}
          </span>
          {description && (
            <p className="text-2xl font-medium tracking-tight mt-2 text-thistle-black max-w-[200px]">
              {description}
            </p>
          )}
        </div>
      </Reveal>
    </div>
  );
};