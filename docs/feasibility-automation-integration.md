# Feasibility automation integration (Kaan's API)

When the feasibility form is submitted, the enquiry is also POSTed server-side to
Thistle's automation API, which generates the report by itself. Wired 2026-08-04.

## How it works

`src/app/api/feasibility/submit/route.ts`, function `forwardToAutomation`.

Order inside the handler: Formspree email first (primary, a failure there is the
only thing that surfaces to the user), then the automation API, then the CRM
webhook. The automation call cannot fail the submission, by design.

- Dormant unless BOTH `FEASIBILITY_API_URL` and `FEASIBILITY_API_SECRET` are set
- Refuses to send over plain http, because the secret rides in a header
- Retries once on 5xx or a network error, never on 4xx
- Treats 429 as final: their API rejects identical resubmissions within 10
  minutes on purpose, so retrying would be wrong
- 10s timeout
- Never logs the secret

Endpoint: `POST https://feasibility.thistlearchitecture.co.uk/api/webhook`
Auth: `X-Webhook-Secret` header.

## Field mapping, verified against their dry run 2026-08-04

| Ours | Theirs |
|---|---|
| `firstName` + `lastName` | `name` (required) |
| `email` | `email` |
| `phone` | `contact` |
| `address1`, `city`, `county`, `postcode` joined | `address` (required) |
| `estimatedValue`, digits only | `value` |
| `propertyType` | `ptype` |
| `gia` | `gia` |
| `rightmoveLink` | `rightmove` |
| `floorPlan.url` + `otherDocs[].url` | `files[]` |

Not collected by our form, optional their side: `beds`, `notes`. Still worth
asking Ed and Kaan whether they want them, since `notes` in particular would give
the report writer the client's own brief. Adding either means a form change.

## What the dry run proved

Run with `node scripts/feasibility-webhook-test.mjs`.

- **`ptype` needs no translation.** Both `Existing HMO` and `Other` are accepted
  verbatim and echoed back unchanged, despite their docs listing only
  `Residential / Commercial / Mixed Use`. This was the main open question and it
  is settled: send our raw value.
- `rightmove` maps as expected.
- A Vercel Blob URL is accepted into `file_urls_found`.
- Omitting `address` is correctly rejected with `"address missing or too short"`.

**Not yet proven:** the dry run records file URLs but does not download them.
Whether their server can actually fetch `*.public.blob.vercel-storage.com` is
only settled by the real end-to-end run.

## Still to do

- [ ] Real end-to-end test, coordinated with Kaan. Takes ~30 minutes and produces
      real documents his side. Use an obviously fake address, e.g. 12 Test
      Street. Run with `node scripts/feasibility-webhook-test.mjs --real`, or by
      submitting the live form once.
- [ ] Confirm the blob URLs actually download during that run.
- [ ] **Rotate the secret.** It was sent over WhatsApp in plain text, so treat it
      as public. Once Kaan issues a new one, update it in Vercel and tick
      "Sensitive" so it cannot be read back out.
- [ ] Decide on `beds` and `notes`.

## Gotcha for future debugging

`fetch failed` from the test script is meaningless on its own. The script now
separates the causes, but for reference, the two we actually hit were:

- **Local DNS cache.** `dig` on the Mac returned nothing while `1.1.1.1` was
  already correct. Fix with
  `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`.
- **No TLS certificate.** Port 443 accepted connections but presented no
  certificate at all and returned TLS alert 80. Their side, not ours. Diagnose
  with
  `echo | openssl s_client -connect feasibility.thistlearchitecture.co.uk:443 -servername feasibility.thistlearchitecture.co.uk`.
  Their server runs Caddy, which manages its own certificates; the issue was
  simply that DNS had not reached Let's Encrypt's resolvers yet.
