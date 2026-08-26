# Response to the disclaimer and acceptance brief

Date: 26 August 2026
Brief: `Brief_Milktree_Website_Disclaimer_Acceptance.docx`, Edward Kercher, 25 August 2026
Purpose: the estimate, timescale and section 4 concerns Ed asked for before work starts

## Short answer

Most of this fits the site as it stands. R1, R2 and R5 are straightforward and the design of the brief suits the stack well, particularly the decision to write it as outcomes rather than an implementation.

Two parts do not fit, and they are the two Ed says he cares most about.

**R3, the stored record, has nowhere to live.** The site has no database. Its only storage is Vercel Blob, which is a file store with no query, no index and no search, and there is no admin area or login of any kind anywhere on the site. R3.3 and R3.4 therefore are not a feature to add to an existing screen: they are a database, an authenticated admin area and an export, none of which exist today. This is the bulk of the work and the bulk of the cost.

**R4 as written conflicts with R5.** Client email currently goes through Formspree, whose autoresponse text is edited in their dashboard. That is exactly the silent edit R5.3 prohibits, and it cannot carry the full disclaimer text reliably. The confirmation email needs to be generated from the same versioned source as the page, which means a transactional email provider rather than the current pipe.

Neither is a reason to change the brief. They are the reason the number is what it is.

## What fits without difficulty

**R1, the disclaimer page.** A page at `/feasibility-disclaimer` with superseded versions at their own URLs is a natural fit. Holding each version as its own file in the repo gives the permanent URL, the version number and the date for free, and it makes the R3 hash trivial, because the exact text served can be hashed at build time rather than captured at runtime. Requiring plain HTML with real headings and no accordions is also the right call and costs nothing.

**R2, the acceptance step.** The one part of this the build is already shaped for is R2.5. The checkout route recalculates the price on the server and ignores whatever the browser sends, precisely because a posted number is under the customer's control. Rejecting a submission that does not carry a valid acceptance is the same pattern in the same place, so server-side enforcement is genuinely cheap here rather than an afterthought.

**R5, version control.** Falls out of R1 almost entirely if versions are files.

**R6.1 and R6.3**, the privacy notice and keeping the record out of marketing, are small.

## Section 4: what is awkward, as asked

**1. There are two payment entry points, not one.** The £49.99 automated flow and the £298-plus architectural flow both reach the same checkout route from different screens. R2 has to be satisfied twice, and the acceptance criteria at section 7 need testing twice. Not difficult, but it doubles the surface.

**2. R3.3, "without needing a developer", is the single largest line item.** There is no admin area and no authentication on the site at all. Built bespoke, this is an authenticated area, a searchable list and a CSV export, and it is roughly a third of the total estimate on its own. There is a cheaper route, below.

**3. R4 cannot use the current email path.** See above. It needs a transactional provider, which also means DNS records for domain verification before any client email will deliver reliably.

**4. R6.3 cuts against the current architecture.** Every form on the site currently flows through Formspree, which is a US service. The acceptance record must bypass that pipe completely rather than being added to it. That is a design constraint worth stating plainly now, because the obvious cheap implementation is exactly the one the brief rules out.

**5. R6.2, UK or EEA storage, is a decision rather than a task.** Whatever database is chosen has to be provisioned in a UK or EEA region deliberately, and the answer has to be recorded because the brief asks us to state it. Worth settling before provisioning rather than after.

**6. R3.2, fifteen-year retention, outlives the tooling.** Fifteen years is longer than most hosting relationships, and considerably longer than any SaaS contract in this stack. A database alone does not satisfy this. It needs an owner and a scheduled export to something Thistle controls, so the record survives a vendor change. Worth building the export in from the start rather than discovering the problem in year four.

**7. The appendix cannot ship with the blanks in it.** The liability cap at section 8 and the PI limit are both `£[     ]`. Version 1.0 cannot go live showing those, so either they arrive before launch or v1.0 publishes later than the rest of the work. Flagging it because it is the sort of thing that quietly becomes the critical path.

## Is anything over-engineered?

Ed asked directly, so: almost none of it. The hash at R3 is the cheapest thing in the brief and the most useful, because it makes the record prove itself. IP address and user agent are near-free. Fifteen-year retention is a judgement call that is his to make, not ours.

The one place there is real money to save is the bespoke admin at R3.3.

**Option A, as briefed.** Build an authenticated admin area with search and CSV export. Ed and the team get a purpose-built screen and never see anything technical.

**Option B, the cheaper one.** Provision the database on a host whose own console already provides a table view, search and CSV export, and give Thistle a login to that. The record, the retention and the export all still exist and still satisfy R3.1 to R3.4 in substance. What Thistle gives up is polish: the console is a developer's tool, and it will look like one.

Option B removes roughly two to three days. Our recommendation is to start with B, because the volume of acceptances will be low for some time and a bespoke admin for a list that grows a few rows a week is hard to justify. A is easy to add later if the console proves annoying, and nothing about B forecloses it.

There is also a belt-and-braces answer already in the brief. R4.4 asks for a blind copy of every confirmation to the studio. If that copy goes to a dedicated mailbox, Thistle has a second, independent, searchable record from day one at no extra cost, which is worth having whichever option is chosen.

## Estimate

Effort, in working days. This is build effort only and excludes the commercial rate, which Akash will set.

| Requirement | Option A | Option B |
| --- | --- | --- |
| R1 disclaimer page, versioned URLs, appendix as clean HTML | 1 | 1 |
| R2 acceptance step on both flows, server-side enforcement | 1 | 1 |
| R3 database, schema, write path, hash, retention | 1.5 | 1.5 |
| R3.3 and R3.4 admin list, authentication, CSV export | 2.5 | 0.5 |
| R4 transactional email, templating, domain verification | 1.5 | 1.5 |
| R5 version control mechanics | 0.5 | 0.5 |
| R6 privacy notice, region configuration, documenting the answer | 0.5 | 0.5 |
| Testing against the section 7 criteria, on both flows | 1 | 1 |
| **Total** | **9.5 days** | **7.5 days** |

Rough timescale, assuming the work runs alongside the outstanding website items rather than instead of them: **about two and a half weeks for Option A, about two weeks for Option B.** If it runs as the only piece of work, roughly half that.

Ongoing cost is small but not nil: a hosted database and a transactional email provider, both of which have usable free or low tiers at this volume. Expect somewhere under £25 a month, and we will confirm exact figures with the region decision at R6.2.

## What we need before starting

1. The two blank figures, the liability cap and the PI limit. Everything else in the appendix is final and usable as supplied.
2. A decision between Option A and Option B on the admin.
3. Confirmation that a fifteen-year retention period is a settled decision rather than an opening position, since it shapes the export and backup design.

## One thing worth raising

The brief covers the disclaimer at the point of payment, which is right and is the part that binds. It does not cover the feasibility brief form, which a client fills in after paying, or the enquiry routes that do not involve payment at all.

That is very probably correct and deliberate, since the disclaimer governs the report rather than the enquiry. Raising it only so the boundary is a decision rather than an oversight. Kaan applying the same wording to the documents themselves closes the other half of it.
