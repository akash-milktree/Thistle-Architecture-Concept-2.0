"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

// The feasibility sketch, per Ed's template: full width, with zoom and a
// full-screen view, and a carousel where more than one option was drawn.
//
// Sketches are the one thing on these pages worth looking at closely, and the
// text on them is small, so a cropped thumbnail is no use. Full-screen opens the
// image at its natural size on a dark ground with the page scroll locked.
export const SketchViewer: React.FC<{ images: string[]; alt: string; caption?: string }> = ({
  images,
  alt,
  caption,
}) => {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const many = images.length > 1;

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  // Arrow keys move between options, Escape closes. Only while open, so the
  // page behaves normally otherwise.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowLeft' && many) prev();
      if (e.key === 'ArrowRight' && many) next();
    };
    window.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, many, prev, next]);

  if (!images.length) return null;

  return (
    <>
      <div className="relative rounded-2xl border border-thistle-black/[0.08] bg-white overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open the sketch full screen"
          className="block w-full cursor-zoom-in"
        >
          {/* contain, never cover: these are drawings, and cropping one loses
              the part that matters. */}
          <Image
            src={images[index]}
            alt={alt}
            width={1600}
            height={1100}
            sizes="(max-width: 1024px) 100vw, 960px"
            className="w-full h-auto object-contain bg-white"
          />
        </button>

        <span className="pointer-events-none absolute top-fl-3 right-fl-3 inline-flex items-center gap-1.5 rounded-full bg-thistle-black/70 text-white text-[11px] px-3 py-1.5">
          <Maximize2 size={12} /> Click to enlarge
        </span>

        {many && (
          <div className="flex items-center justify-center gap-fl-3 border-t border-thistle-black/[0.06] py-fl-3">
            <button type="button" onClick={prev} aria-label="Previous option" className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full hover:bg-thistle-black/[0.05] transition-colors">
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs text-thistle-black/50 tabular-nums">
              Option {index + 1} of {images.length}
            </span>
            <button type="button" onClick={next} aria-label="Next option" className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full hover:bg-thistle-black/[0.05] transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {caption && <p className="text-fluid-sm text-thistle-black/55 leading-relaxed mt-fl-4 max-w-2xl">{caption}</p>}

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-thistle-black/95 flex items-center justify-center p-fl-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute top-fl-4 right-fl-4 text-white/70 hover:text-white transition-colors">
            <X size={26} />
          </button>

          {many && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous option" className="absolute left-fl-4 text-white/60 hover:text-white transition-colors">
                <ChevronLeft size={34} />
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next option" className="absolute right-fl-4 text-white/60 hover:text-white transition-colors">
                <ChevronRight size={34} />
              </button>
            </>
          )}

          {/* Scrollable, so a large drawing can be read rather than shrunk to fit. */}
          <div className="max-h-full max-w-full overflow-auto" onClick={(e) => e.stopPropagation()}>
            <Image src={images[index]} alt={alt} width={2400} height={1700} className="w-auto max-w-none h-auto" />
          </div>

          {many && (
            <span className="absolute bottom-fl-4 text-white/60 text-xs tabular-nums">
              Option {index + 1} of {images.length}
            </span>
          )}
        </div>
      )}
    </>
  );
};
