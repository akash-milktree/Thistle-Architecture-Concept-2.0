# DNS migration: Wix to GoDaddy, then the site to Vercel

Captured 2026-07-30 by querying the live zone directly, so every value here is
complete. The Wix control panel truncates values on screen, which is how
migrations break, do not copy from those screenshots.

Current state: the registrar appears to be GoDaddy, but **Wix is running DNS**
(nameservers are `ns12.wixdns.net` and `ns13.wixdns.net`). Mail is Microsoft 365
in the **incollectiveltd** tenant, which the DKIM targets confirm.

## The rule that matters

**Build the whole zone at the new host FIRST, then switch nameservers.** Never
switch first and add records after. Between the switch and the records existing,
email stops arriving and bounces. Those messages are not queued and not
recoverable.

## KEEP: Microsoft 365. Losing any of these breaks email.

| Type | Host | Value |
|---|---|---|
| MX | `@` | `thistlearchitecture-co-uk.mail.protection.outlook.com` (priority 10) |
| TXT | `@` | `v=spf1 include:spf.protection.outlook.com -all` |
| TXT | `@` | `MS=ms37714909` |
| TXT | `@` | `MS=ms70169916` |
| CNAME | `selector1._domainkey` | `selector1-thistlearchitecture-co-uk._domainkey.incollectiveltd.e-v1.dkim.mail.microsoft` |
| CNAME | `selector2._domainkey` | `selector2-thistlearchitecture-co-uk._domainkey.incollectiveltd.e-v1.dkim.mail.microsoft` |
| CNAME | `autodiscover` | `autodiscover.outlook.com` |
| CNAME | `enterpriseenrollment` | `enterpriseenrollment.manage.microsoft.com` |
| CNAME | `enterpriseregistration` | `enterpriseregistration.windows.net` |
| CNAME | `lyncdiscover` | `webdir.online.lync.com` |
| CNAME | `sip` | `sipdir.online.lync.com` |
| SRV | `_sipfederationtls._tcp` | priority 100, weight 1, port 5061, target `sipfed.online.lync.com` |
| SRV | `_sip._tls` | priority 100, weight 1, port 443, target `sipdir.online.lync.com` |

The two DKIM records are the easiest to get wrong: they are long, they are
CNAMEs not TXT, and the target has no trailing dot in most UIs. Copy them
character for character.

## REPLACE: these are Wix, they are what still serves the old site

| Type | Host | Current value |
|---|---|---|
| A | `@` | `185.230.63.107`, `185.230.63.186`, `185.230.63.171` |
| CNAME | `www` | `cdn1.wixdns.net` |

All four go. They are replaced by the Vercel records below.

## PROBABLY DROP: check before deleting, but almost certainly dead

| Type | Host | Value | What it is |
|---|---|---|---|
| CNAME | `email` | `email.secureserver.net` | GoDaddy's email marketing product. Only needed if someone actively uses it. |
| TXT | `godaddy` | `v=spf1 include:secureserver.net -all` | An SPF record on a subdomain that sends no mail. Inert. |
| TXT | `godaddy` | `MS=ms70169916` | Duplicate of the apex verification, left over from a GoDaddy-managed 365 setup. |

Harmless to carry across if in doubt. None of them do anything useful.

## NS: what actually changes

`ns12.wixdns.net` and `ns13.wixdns.net` are not editable inside Wix because they
ARE Wix. You change these at the registrar, and that is the switch itself.

## Where should DNS live?

**Recommendation: GoDaddy, not Vercel.**

Vercel DNS would work and supports MX, TXT and SRV. But it couples a
Microsoft-heavy mail zone to the hosting platform for no benefit. Keep DNS at
the registrar and the site can move hosts later without anyone touching email
again. It also means a mistake in the Vercel project cannot affect mail.

With DNS at GoDaddy, Vercel only needs two records.

## Vercel records

Do not trust generic values. Add the domain in the Vercel project first, then
run this and use exactly what it prints:

```bash
vercel domains inspect thistlearchitecture.co.uk
```

At the time of writing the general values are an A record on the apex pointing
to `76.76.21.21`, and a CNAME on `www` pointing to `cname.vercel-dns-0.com`.
Vercel's own docs say to confirm per domain rather than assume these, and the
CNAME target in particular has changed before.

## Order of work

1. Add `thistlearchitecture.co.uk` and `www` to the Vercel project. It will show
   as misconfigured, which is expected.
2. Run `vercel domains inspect` and note the exact records it asks for.
3. In GoDaddy DNS, recreate every row in the KEEP table above, plus the two
   Vercel records. Do not touch nameservers yet.
4. Check the GoDaddy zone against the KEEP table line by line. Two people.
5. Switch nameservers at the registrar from the Wix pair to GoDaddy's.
6. Wait for propagation, up to 24 hours, usually far less. Existing TTLs are one
   hour.
7. Verify, see below.

## Verification after the switch

```bash
dig +short thistlearchitecture.co.uk NS
dig +short thistlearchitecture.co.uk MX
dig +short thistlearchitecture.co.uk TXT
dig +short selector1._domainkey.thistlearchitecture.co.uk CNAME
dig +short www.thistlearchitecture.co.uk
```

MX must still return the `mail.protection.outlook.com` host. Then send a real
email in and out of a mailbox on the domain before considering it done.

## Before any of this: is the site actually ready to go live?

Pointing the domain at Vercel makes the concept build the public website. Open
items at the time of writing:

- Testimonials are still placeholder, pending the Google reviews
- The 98.5%, 86% and five day claims are unconfirmed
- 81 The Crescent publishes with no town
- Three HMO Designers projects are held back over unclear locations
- The footer shows a placeholder phone number and says London

None of these block DNS, but they are all publicly visible the moment the domain
moves. See `docs/case-study-confirmations.md`.
