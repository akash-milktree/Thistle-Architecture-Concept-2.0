import { NextResponse, type NextRequest } from 'next/server';
import type { FeasibilityAnswers, FeasibilityFiles } from '@/components/feasibility/feasibility';

export const runtime = 'nodejs';

// Feasibility enquiries are emailed to the team via Formspree (managed as code
// in formspree.json at the repo root; recipient set there). The endpoint is
// public by design, same as the Formspree forms on our other sites.
const FORMSPREE_ENDPOINT = 'https://formspree.io/p/3042010600814149049/f/feasibility';

type Body = { answers?: Partial<FeasibilityAnswers>; files?: Partial<FeasibilityFiles> };

/**
 * Hand the enquiry to Thistle's feasibility automation API (Kaan's server), which
 * starts generating the report on its own.
 *
 * Dormant until BOTH env vars are set, so this ships safely before the endpoint
 * exists. Never throws: the Formspree email has already gone by the time this
 * runs and is the fallback, so an outage here must not surface to the user.
 *
 * Their contract: 200 queued, 400 bad fields, 401 bad secret, 413 over 2 MB,
 * 429 duplicate-within-10-minutes or rate limited. 429 is deliberate, so it is
 * treated as final rather than retried.
 */
async function forwardToAutomation(
  a: Partial<FeasibilityAnswers>,
  files: Partial<FeasibilityFiles>,
): Promise<void> {
  const url = process.env.FEASIBILITY_API_URL;
  const secret = process.env.FEASIBILITY_API_SECRET;
  if (!url || !secret) return;

  // The secret travels in a header, so a plaintext hop would leak it outright.
  if (!url.startsWith('https://')) {
    console.error('[feasibility/submit] automation URL is not https, refusing to send');
    return;
  }

  const fileUrls = [files.floorPlan?.url, ...(files.otherDocs ?? []).map((d) => d.url)]
    .filter((u): u is string => Boolean(u));

  const payload = {
    name: `${a.firstName ?? ''} ${a.lastName ?? ''}`.trim(),
    email: a.email ?? '',
    contact: a.phone ?? '',
    address: [a.address1, a.city, a.county, a.postcode].filter(Boolean).join(', '),
    // Sent raw. Our vocabulary includes "Existing HMO" and "Other", which are not
    // in their documented set (Residential / Commercial / Mixed Use). Their API
    // maps common variants, and the dry run reports how it mapped this, so the
    // mapping is confirmed there rather than guessed here.
    ptype: a.propertyType ?? '',
    value: String(a.estimatedValue ?? '').replace(/[^0-9]/g, ''),
    gia: a.gia ?? '',
    rightmove: a.rightmoveLink ?? '',
    // Blob URLs are public and unguessable, so their server can fetch them
    // without auth, which is what their contract requires.
    files: fileUrls,
  };

  const send = () =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Webhook-Secret': secret },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

  try {
    let res = await send();

    // One retry, and only for the transient ones. A 4xx will fail identically
    // on a second attempt, and 429 rejects duplicates by design.
    if (res.status >= 500) {
      res = await send();
    }

    if (!res.ok) {
      // Body may explain which field was rejected. Never log the secret.
      const detail = await res.text().catch(() => '');
      console.error('[feasibility/submit] automation rejected', res.status, detail.slice(0, 500));
    }
  } catch (err) {
    // Network-level failure. Retry once, then give up and rely on the email.
    try {
      const res = await send();
      if (!res.ok) {
        console.error('[feasibility/submit] automation rejected on retry', res.status);
      }
    } catch {
      console.error('[feasibility/submit] automation unreachable (non-blocking)', err);
    }
  }
}

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

  // 2) Forward to Thistle's feasibility automation API when configured. Same
  //    rule as the CRM forward below: the email has already gone, so nothing
  //    here may fail the user's submission.
  await forwardToAutomation(a, files);

  // 3) Forward to the CRM webhook when configured. Non-blocking: the email has
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
