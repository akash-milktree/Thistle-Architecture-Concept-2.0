"use client";

import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';

// Full-screen document viewer, per Ed's template: "a clean page-turning viewer
// or full-screen PDF modal. Do not display every report page vertically on the
// main page."
//
// The PDF is handed to the browser's own viewer in an iframe rather than being
// re-implemented with a rendering library. That gives page turning, zoom, search
// and print for free, stays accurate to the document, and adds nothing to the
// bundle. The one trade is that mobile browsers often refuse to render a PDF
// inline, so a plain download link sits alongside for those.
export const DocumentViewer: React.FC<{
  title: string;
  file: string;
  pages: number;
  onClose: () => void;
}> = ({ title, file, pages, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-thistle-black/95 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="flex items-center justify-between gap-fl-4 px-fl-5 py-fl-4 border-b border-white/10 shrink-0">
        <div className="min-w-0">
          <p className="text-fluid-sm font-medium text-white truncate">{title}</p>
          <p className="text-xs text-white/45">{pages} {pages === 1 ? 'page' : 'pages'}</p>
        </div>
        <div className="flex items-center gap-fl-4 shrink-0">
          <a
            href={file}
            download
            className="inline-flex items-center gap-1.5 text-fluid-sm text-white/70 hover:text-white transition-colors"
          >
            <Download size={16} /> <span className="hidden sm:inline">Download</span>
          </a>
          <button type="button" onClick={onClose} aria-label="Close document" className="text-white/70 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-thistle-black/40">
        <iframe src={`${file}#view=FitH`} title={title} className="w-full h-full border-0" />
      </div>
    </div>
  );
};
