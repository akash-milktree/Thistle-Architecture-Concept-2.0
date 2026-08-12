"use client";

import React from 'react';
import { FileText, ArrowUpRight, Lock } from 'lucide-react';

type Doc = { title: string; pages: number; summary: string; file?: string };

// "What the client received", per Ed's template. Three document cards, each with
// its page count and what it covers.
//
// `file` is deliberately optional and currently unset on every document. These
// are the real reports: each names the client and gives the property address, so
// publishing them puts a developer's name and their investment address on a
// public page. They stay described but not readable until Ed confirms which are
// cleared, ideally anonymised. Dropping a path into `file` switches a card over.
export const DocumentCards: React.FC<{
  documents: Doc[];
  guidance?: { label: string; href?: string };
}> = ({ documents, guidance }) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-fl-4">
      {documents.map((d) => (
        <div
          key={d.title}
          className="flex flex-col h-full rounded-2xl border border-thistle-black/[0.08] bg-white p-fl-5"
        >
          <div className="flex items-start justify-between gap-fl-3 mb-fl-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-thistle-green/10 text-thistle-green shrink-0">
              <FileText size={18} />
            </span>
            <span className="text-[10px] uppercase tracking-widest text-thistle-black/35 font-semibold pt-1">
              {d.pages} {d.pages === 1 ? 'page' : 'pages'}
            </span>
          </div>

          <h3 className="text-fluid-h6 font-medium tracking-tight text-thistle-black mb-fl-2">{d.title}</h3>
          <p className="text-fluid-sm text-thistle-black/60 leading-relaxed mb-fl-5 flex-1">{d.summary}</p>

          {d.file ? (
            <a
              href={d.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-fluid-sm font-medium text-thistle-black hover:text-thistle-green transition-colors w-fit"
            >
              View document <ArrowUpRight size={15} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-fluid-sm text-thistle-black/35 w-fit">
              <Lock size={14} /> Available on request
            </span>
          )}
        </div>
      ))}
    </div>

    {guidance && (
      <p className="text-xs text-thistle-black/40 mt-fl-4">
        {guidance.href ? (
          <a href={guidance.href} target="_blank" rel="noopener noreferrer" className="hover:text-thistle-black transition-colors underline underline-offset-2">
            {guidance.label}
          </a>
        ) : (
          guidance.label
        )}
      </p>
    )}
  </div>
);
