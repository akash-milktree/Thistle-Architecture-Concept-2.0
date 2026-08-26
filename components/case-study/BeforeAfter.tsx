"use client";

import React from 'react';
import Image from 'next/image';

// Existing against proposed, per Ed's project template: "visitors may not scroll
// through the entire project page. The scale of the transformation and Thistle's
// involvement should therefore be immediately understandable near the top."
//
// Side by side rather than a drag-to-wipe. The template allows either, and a
// wipe only reads as a transformation when both photographs share a viewpoint.
// Ours do not: the existing shots were taken on site visits and the completed
// ones by a photographer, from wherever the finished building looked best.
// Wiping between two different angles reads as two unrelated pictures. Side by
// side states plainly what it is.
export const BeforeAfter: React.FC<{
  before: string; after: string; beforeAlt: string; afterAlt: string;
  /**
   * CMS field ids for the two pictures, one each. The "Existing" and
   * "Completed" labels are this component's own wording, identical on every
   * project, so they carry no marker.
   */
  tina?: { before?: string; after?: string };
}> = ({ before, after, beforeAlt, afterAlt, tina }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-fl-4">
    {[
      { src: before, alt: beforeAlt, label: 'Existing', dark: true, tina: tina?.before },
      { src: after, alt: afterAlt, label: 'Completed', dark: false, tina: tina?.after },
    ].map((x) => (
      <figure key={x.label} className="relative">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-thistle-black/[0.06] bg-thistle-white/60">
          <Image src={x.src} alt={x.alt} fill sizes="(max-width: 640px) 92vw, 480px" className="object-cover" data-tina-field={x.tina} />
          <span
            className={`absolute top-fl-3 left-fl-3 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold ${
              x.dark ? 'bg-thistle-black/70 text-white' : 'bg-thistle-green text-thistle-black'
            }`}
          >
            {x.label}
          </span>
        </div>
      </figure>
    ))}
  </div>
);
