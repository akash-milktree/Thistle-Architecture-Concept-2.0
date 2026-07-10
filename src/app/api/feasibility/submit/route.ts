import { NextResponse, type NextRequest } from 'next/server';
import type { FeasibilityAnswers, FeasibilityFiles } from '@/components/feasibility/feasibility';

export const runtime = 'nodejs';

// Feasibility enquiries are emailed to the team via Formspree (managed as code
// in formspree.json at the repo root; recipient set there). The endpoint is
// public by design, same as the Formspree forms on our other sites.
const FORMSPREE_ENDPOINT = 'https://formspree.io/p/3042010600814149049/f/feasibility';

type Body = { answers?: Partial<FeasibilityAnswers>; files?: Partial<FeasibilityFiles> };

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const a = body.answers ?? {};
  const files = body.files ?? {};
  if (!a.email || !a.firstName || !a.address1) {
    return NextResponse.json({ ok: false, error: 'Missing required details.' }, { status: 400 });
  }

  const s = (v: unknown) => String(v ?? '').slice(0, 1000);

  // Flat, readable keys: Formspree renders these as the field rows in the email.
  const payload = {
    _subject: `New feasibility enquiry: ${s(a.address1)}${a.postcode ? `, ${s(a.postcode)}` : ''}`,
    // Lets the team reply straight to the enquirer from the notification email.
    _replyto: s(a.email),
    'Property type': s(a.propertyType),
    'Address': [a.address1, a.city, a.county, a.postcode].filter(Boolean).map(s).join(', '),
    'Estimated value': a.estimatedValue ? `£${s(a.estimatedValue)}` : '',
    'Rightmove link': s(a.rightmoveLink),
    'GIA (approx)': a.gia ? `${s(a.gia)} m²` : '',
    'Floor plan': s(files.floorPlan?.url),
    'Other documents': (files.otherDocs ?? []).map((d) => d.url).join(', '),
    'Name': `${s(a.firstName)} ${s(a.lastName)}`.trim(),
    'Email': s(a.email),
    'Phone': s(a.phone),
    'Source': 'feasibility-form',
  };

  // 1) Email via Formspree. This is the primary delivery, so a failure here
  //    surfaces to the user as a retryable error.
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error('[feasibility/submit] formspree failed', res.status, await res.text().catch(() => ''));
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } catch (err) {
    console.error('[feasibility/submit] formspree unreachable', err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  // 2) Forward to the CRM webhook when configured. Non-blocking: the email has
  //    already gone, so a CRM outage must not fail the submission.
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'feasibility-form',
          ...a,
          floorPlanUrl: files.floorPlan?.url ?? '',
          otherDocUrls: (files.otherDocs ?? []).map((d) => d.url).join(', '),
        }),
      });
    } catch (err) {
      console.error('[feasibility/submit] CRM forward failed (non-blocking)', err);
    }
  }

  return NextResponse.json({ ok: true });
}
