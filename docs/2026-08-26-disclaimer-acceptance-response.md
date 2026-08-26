# Response to the disclaimer and acceptance brief

Date: 26 August 2026
Brief: `Brief_Milktree_Website_Disclaimer_Acceptance.docx`, Edward Kercher, 25 August 2026
Purpose: the estimate, timescale and section 4 concerns Ed asked for before work starts

## Short answer

Most of this fits the site as it stands. R1, R2 and R5 are straightforward and the design of the brief suits the stack well, particularly the decision to write it as outcomes rather than an implementation.

Two parts need a decision before anything is built, and they happen to be the two Ed says he cares most about.

**R3, the stored record, mostly already works, but not for fifteen years.** Every form on the site already posts to Formspree, which stores each submission, gives a searchable dashboard and exports to CSV. So R3.3 and R3.4 are satisfied today with no build at all, and the fields at R3 are just more fields on the post.

The gap is durability, not capability. Formspree's privacy policy commits to retaining data "for as long as your account is active" and its storage limits vary by plan. That is not a retention policy, and R3.2 asks for fifteen years for a record whose entire purpose is to be producible in year fourteen to defend a claim. Submissions can also be deleted from the dashboard by anyone with access, which is a real risk for a legal record.

The fix is not a database, and on reflection it is not a build either. Formspree holds submissions for as long as the account is active, and it exports on demand, so the realistic failure cases are a lapsed account, a deleted row, or Formspree itself winding down, and that last one would come with notice. A documented export, taken periodically and before any infrastructure change, covers all three without writing anything. That is a process for Thistle to own rather than a feature to pay for.

**R4 as written conflicts with R5.** Client email currently goes through Formspree, whose autoresponse text is edited in their dashboard. That is exactly the silent edit R5.3 prohibits, and it cannot carry the full disclaimer text reliably. The confirmation email needs to be generated from the same versioned source as the page, which means a transactional email provider rather than the current pipe.

Neither is a reason to change the brief. Between them they decide the number, which is why the estimate is given three ways rather than one.

## What fits without difficulty

**R1, the disclaimer page.** A page at `/feasibility-disclaimer` with superseded versions at their own URLs is a natural fit. Holding each version as its own file in the repo gives the permanent URL, the version number and the date for free, and it makes the R3 hash trivial, because the exact text served can be hashed at build time rather than captured at runtime. Requiring plain HTML with real headings and no accordions is also the right call and costs nothing.

**R2, the acceptance step.** The one part of this the build is already shaped for is R2.5. The checkout route recalculates the price on the server and ignores whatever the browser sends, precisely because a posted number is under the customer's control. Rejecting a submission that does not carry a valid acceptance is the same pattern in the same place, so server-side enforcement is genuinely cheap here rather than an afterthought.

**R5, version control.** Falls out of R1 almost entirely if versions are files.

**R6.1 and R6.3**, the privacy notice and keeping the record out of marketing, are small.

## Section 4: what is awkward, as asked

**1. There are two payment entry points, not one.** The £49.99 automated flow and the £298-plus architectural flow both reach the same checkout route from different screens. R2 has to be satisfied twice, and the acceptance criteria at section 7 need testing twice. Not difficult, but it doubles the surface.

**2. R6.2 has a real answer, and it is "the United States".** Formspree hosts on AWS in the US. R6.2 permits that expressly, provided there is a valid transfer mechanism and we tell you which, so this is answerable rather than disqualifying. It does mean a data processing agreement with Formspree needs to be in place and on file, and that the answer recorded against R6.2 is US-with-SCCs rather than UK or EEA. If Thistle would rather the record never leaves the UK or EEA, that is the one thing that forces a database, and it is a decision for Ed rather than a technical constraint.

**3. R4 cannot use the current email path.** See above. It needs a transactional provider, which also means DNS records for domain verification before any client email will deliver reliably.

**4. R6.3 means a dedicated Formspree form, not the existing one.** The requirement is that the record must not flow into any marketing list or third-party tool. Using Formspree at all is fine, it is the processor rather than a marketing destination. What is not fine is putting acceptances through the same form that feeds the leads pipeline, because that is precisely how a legal record ends up in a mailing list. A separate form, wired to nothing else, keeps this clean.

**5. R6.2, UK or EEA storage, is a decision rather than a task.** Whatever database is chosen has to be provisioned in a UK or EEA region deliberately, and the answer has to be recorded because the brief asks us to state it. Worth settling before provisioning rather than after.

**6. R3.2, fifteen-year retention, is a process rather than a build.** No form backend or database in this stack commits to fifteen years, so this was never going to be solved by choosing the right vendor. Formspree keeps submissions while the account is active and exports on demand, which means the exposure is a lapsed account, a deleted row, or the vendor winding down with notice. A standing instruction to export the record periodically, and always before any change of infrastructure, covers all three at no build cost. Worth writing into whoever owns the Formspree account's routine rather than treating as a feature.

One open question we cannot answer from Formspree's documentation and should put to them directly: whether stored submissions are ever purged by age or by a cap on total records, as distinct from the monthly volume limits they publish. If they are, that sets how often the export needs to happen.

**7. The appendix cannot ship with the blanks in it.** The liability cap at section 8 and the PI limit are both `£[     ]`. Version 1.0 cannot go live showing those, so either they arrive before launch or v1.0 publishes later than the rest of the work. Flagging it because it is the sort of thing that quietly becomes the critical path.

## Is anything over-engineered?

Ed asked directly, so: almost none of it. The hash at R3 is the cheapest thing in the brief and the most useful, because it makes the record prove itself. IP address and user agent are near-free. Fifteen-year retention is a judgement call that is his to make, not ours.

Our first read of this brief assumed R3 meant building a database and an admin area. On checking, that was wrong, and it is worth correcting rather than quietly charging for. Formspree already stores every submission, already gives a searchable list, and already exports to CSV, none of which needs a developer. The requirement is very nearly met by what is running today.

So there are three ways to do this, not two.

**Option A, as briefed.** A database plus a bespoke authenticated admin area with search and export. Thistle gets a purpose-built screen, never sees anything technical, and the record never leaves the UK or EEA.

**Option B, a database with a hosted console.** Same database, no bespoke admin. Search and CSV export come from the host's own dashboard, which satisfies R3.3 and R3.4 in substance but looks like a developer's tool.

**Option C, Formspree with a documented export routine.** Acceptances post to their own dedicated Formspree form, separate from the leads pipeline. Search and export are the Formspree dashboard the team already uses. R3.2 is met by a standing instruction to export periodically and before any infrastructure change, rather than by anything built.

What Option C gives up is worth stating plainly. The record sits in the United States rather than the UK or EEA, so R6.2 is answered as US-with-SCCs and needs a data processing agreement on file. Submissions are deletable by anyone with dashboard access. And retention depends on the Formspree account staying paid and active, which is a real dependency even if a small one.

**Our recommendation is Option C.** Volume here will be low for a long time, and it is hard to justify building a database and an admin screen to replace a dashboard the team already has open and already knows how to use. If Ed's answer to R6.2 is that the record must stay in the UK or EEA, that rules out C on its own and the choice becomes A or B. That is the question worth answering first, because it decides the price.

There is also a belt-and-braces answer already in the brief. R4.4 asks for a blind copy of every confirmation to the studio. If that copy goes to a dedicated mailbox, Thistle has a second, independent record from day one at no extra cost, timestamped by the mail system and separate from whatever the primary store turns out to be. Worth having under any of the three.

## Estimate

Effort, in working days, revised down after a second pass. The first version of this document costed the archive as a build and was generous on several lines. This is the honest read. Build effort only; the commercial rate is Akash's.

| Requirement | Option A | Option B | Option C |
| --- | --- | --- | --- |
| R1 disclaimer page and versioned URLs, appendix marked up | 0.5 | 0.5 | 0.5 |
| R2 acceptance step on both flows, server-side enforcement | 0.5 | 0.5 | 0.5 |
| R3 record: extra fields, version, hash, IP and user agent | 1 | 1 | 0.5 |
| R3.3 and R3.4 admin list, authentication, CSV export | 2.5 | 0.25 | 0 |
| R4 confirmation email: provider, template, domain verification | 1 | 1 | 1 |
| R5 version control mechanics | 0.25 | 0.25 | 0.25 |
| R6 privacy notice wording, region decision recorded | 0.25 | 0.25 | 0.25 |
| Testing against the nine criteria at section 7, on both flows | 0.5 | 0.5 | 0.5 |
| **Total** | **6.5 days** | **4.25 days** | **3.5 days** |

Where the time actually goes under Option C: about a day of it is the confirmation email, because a provider has to be chosen, the sending domain verified with DNS records, and deliverability tested properly, since an email that lands in spam fails R4 as surely as one that never sends. The disclaimer page and the acceptance step together are under a day, because the text is supplied and the checkout already validates server-side. The record itself is close to free, because it is extra fields on a post that already happens.

**Rough timescale for Option C: about a week elapsed**, allowing for DNS propagation on the email domain and for the work sitting alongside the outstanding website items rather than replacing them. As a single focused piece it is three or four days.

Ongoing cost under Option C is a transactional email provider, which is free or close to it at this volume. Options A and B add a hosted database on top.

One thing outside our control: version 1.0 cannot publish while the liability cap and the PI limit are still blank, so the date those arrive is the real constraint on going live, not the build.

## What we need before starting

1. The two blank figures, the liability cap and the PI limit. Everything else in the appendix is final and usable as supplied.
2. An answer to R6.2, because it decides the rest: must the acceptance record be stored in the UK or EEA, or is the United States acceptable with standard contractual clauses and a data processing agreement on file? If it must stay in the UK or EEA, Option C is out and the choice is A or B.
3. Agreement on who owns the periodic export, since under Option C that routine is what actually delivers the fifteen years rather than anything on the site.

## One thing worth raising

The brief covers the disclaimer at the point of payment, which is right and is the part that binds. It does not cover the feasibility brief form, which a client fills in after paying, or the enquiry routes that do not involve payment at all.

That is very probably correct and deliberate, since the disclaimer governs the report rather than the enquiry. Raising it only so the boundary is a decision rather than an oversight. Kaan applying the same wording to the documents themselves closes the other half of it.
