import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Lead captures from the email gates: the three calculators and the sample
// report download. Every one of these is someone handing over their address in
// exchange for a tool, so they are the top of the funnel.
//
// These used to go nowhere. The route forwarded to LEAD_WEBHOOK_URL when that
// was set, and console.logged when it was not, and it has never been set on the
// project, so every lead since launch was written to the Vercel log and lost.
// They now go to Formspree, the same way feasibility enquiries do, so they land
// in a mailbox someone reads.
//
// RECIPIENTS ARE SET IN THE FORMSPREE DASHBOARD, not in this repo. The form must
// exist there under the key below or posts 404. LEAD_FORMSPREE_ENDPOINT
// overrides the URL if the form is ever moved.
const LEAD_ENDPOINT =
  process.env.LEAD_FORMSPREE_ENDPOINT ??
  'https://formspree.io/p/3042010600814149049/f/leads';

// Where each gate's `source` came from, for a subject line the team can triage
// from the notification list without opening anything.
// Keys must match the `source` each gate passes. Checked against the call sites
// in sections/tools/*.tsx and SampleReportGate; an unknown source still sends,
// it just arrives labelled with the raw slug.
const SOURCE_LABELS: Record<string, string> = {
  'hmo-calculator': 'HMO profit calculator',
  'gdv-calculator': 'GDV calculator',
  'class-ma-checker': 'Class MA eligibility checker',
  'sample-report': 'Sample feasibility report',
};

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }

  const s = (v: unknown) => String(v ?? '').slice(0, 1000);
  const email = s(data.email);
  const source = s(data.source);
  if (!email) {
    return NextResponse.json({ ok: false, error: 'missing email' }, { status: 400 });
  }

  const label = SOURCE_LABELS[source] ?? source ?? 'Website tool';

  // Whatever the individual tool passed as `extra` (inputs, results) rides along
  // as its own rows, so the team can see what the person was actually modelling.
  const { email: _e, source: _s, ...extra } = data;
  const extraRows = Object.fromEntries(
    Object.entries(extra).map(([k, v]) => [k, s(typeof v === 'object' ? JSON.stringify(v) : v)]),
  );

  const payload = {
    _subject: `New tool lead: ${label}`,
    _replyto: email,
    Email: email,
    Tool: label,
    Source: source,
    ...extraRows,
  };

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error('[leads] formspree failed', res.status, await res.text().catch(() => ''));
    }
  } catch (err) {
    console.error('[leads] formspree unreachable', err);
  }

  // Optional CRM forward, kept from the original route. Non-blocking on purpose:
  // the person is waiting on a calculator result, so a CRM outage must not stop
  // them, and Formspree above has already retained the lead either way.
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error('[leads] crm webhook unreachable (non-blocking)', err);
    }
  }

  // Always ok: the gate should open even if delivery had a wobble, because the
  // submission is retained in the Formspree inbox regardless.
  return NextResponse.json({ ok: true });
}
