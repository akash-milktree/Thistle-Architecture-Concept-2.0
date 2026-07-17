import type { Metadata } from 'next';
import Image from 'next/image';

// Internal review page, NOT linked from the site nav. Compares three options for
// each team headshot so Akash and Ed can pick before anything replaces the real
// /about photos. Deliberately excluded from search engines.
export const metadata: Metadata = {
  title: 'Team photo options (internal review)',
  robots: { index: false, follow: false },
};

const people = [
  { slug: 'ed', name: 'Edward Kercher' },
  { slug: 'kaan', name: 'Kaan' },
  { slug: 'jan', name: 'Jan' },
  { slug: 'adouj', name: 'Adouj Abu Saadeh' },
  { slug: 'beverley', name: 'Beverley Gibbs' },
];

const columns = [
  {
    key: 'current',
    label: 'A. Current',
    note: 'What is live now: the original supplied photos, inconsistent framing and backgrounds.',
  },
  {
    key: 'real',
    label: 'B. Cleaned real photo',
    note: 'Their actual face, cut out and placed on one matched studio grey, uniform framing. Genuinely them.',
  },
  {
    key: 'ai',
    label: 'C. AI-generated',
    note: 'A synthetic studio headshot generated from their photo. Polished, but a regenerated likeness, not a real photo. Needs each person’s consent before publishing.',
  },
];

export default function TeamReviewPage() {
  return (
    <main className="bg-thistle-white min-h-screen px-fl-margin py-fl-section">
      <div className="max-w-[1360px] mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-thistle-green font-semibold mb-fl-3">Internal review, not public</p>
        <h1 className="text-fluid-h2 font-medium tracking-tight text-thistle-black mb-fl-4">Team photo options</h1>
        <p className="text-fluid-base text-thistle-black/70 leading-relaxed max-w-3xl mb-fl-4">
          Three options for each person, side by side. Column B keeps their real face and just makes the set
          consistent. Column C is an AI-generated headshot, which looks the most polished but is a synthetic
          likeness rather than a real photograph, so it should only go live if each person is happy with it.
        </p>
        <p className="text-fluid-sm text-thistle-black/50 max-w-3xl mb-fl-8">
          Nothing here is live on the site. The real About page still shows the current photos (column A).
        </p>

        {/* Column key */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-fl-4 mb-fl-8">
          {columns.map((c) => (
            <div key={c.key} className="rounded-xl border border-thistle-black/[0.08] bg-white p-fl-5">
              <p className="text-fluid-h6 font-semibold text-thistle-black mb-fl-2">{c.label}</p>
              <p className="text-fluid-sm text-thistle-black/60 leading-relaxed">{c.note}</p>
            </div>
          ))}
        </div>

        <div className="space-y-fl-8">
          {people.map((p) => (
            <div key={p.slug}>
              <h2 className="text-fluid-h5 font-medium tracking-tight text-thistle-black mb-fl-4">{p.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-fl-5">
                {columns.map((c) => (
                  <figure key={c.key} className="m-0">
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-thistle-black/[0.08]">
                      <Image
                        src={`/images/team-review/${p.slug}-${c.key}.jpg`}
                        alt={`${p.name}, ${c.label} option`}
                        fill
                        sizes="(max-width: 640px) 90vw, 420px"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-fl-2 text-[11px] uppercase tracking-wider text-thistle-black/45 font-semibold">
                      {c.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
