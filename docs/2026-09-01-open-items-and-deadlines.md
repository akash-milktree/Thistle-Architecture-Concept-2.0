# Open items from Ed and Jodi, with dates

Read on Tuesday 1 September 2026, covering everything unanswered since 26 August.
Five threads are open. Two of them Ed has already chased once.

**The dates Ed has set himself.** He told Scarlett he wanted the access sorted
"by at least Tuesday", which is today. He told us the Search Console access was
wanted "before the end of next week", said on Wednesday 26 August, so Friday
4 September. Nothing else carries a date he has given.

---

## 1. Search Console. Ed has chased this once

**What he says.** No property for thistlearchitecture.co.uk shows on his side at
all, and the hmodesigners user list has not changed, so whatever was shared has
not landed.

**What is actually true.** The property exists. There is a live
`google-site-verification` TXT record on thistlearchitecture.co.uk, so a domain
property was verified by DNS at some point. hmodesigners.co.uk carries two such
records, so two properties are verified there.

So this was never a missing property. It is a missing **user**. The property sits
in whichever Google account did the verifying, and Ed is not on it. Telling him
it is done again, without adding him, will not fix anything he can see.

**What he wants adding, to both properties:**

- `thistleanalytics@gmail.com` as owner. This is a new account he has made to
  hold the group's search and analytics so it is not tied to one person.
- `edward.kercher96@gmail.com` as owner alongside it, so he can still work
  day to day.

**Also still not done:** submitting the sitemap. The sitemap is live, valid and
clean. All 73 URLs return 200, none is noindex, none redirects, all are
self-canonical. It has never been submitted.

**Owner:** whoever holds the Google account that verified the domain. This is
console work, not code.
**Effort:** under an hour, once we know which account it is.
**Date to give Ed:** Wednesday 2 September. It is already a week late against
what he asked for, and finding the right login is the only real unknown.

---

## 2. GA4 access and the property move

**What he asks.** Add `thistleanalytics@gmail.com` as admin, and move the
property over to that account when we get a chance. Scarlett has confirmed to him
that the GA4 side is ours: "Milktree will have to do GA4 as they own the GA4
accounts."

He wants the same on the Clarity projects for both sites.

**The answer to his other question,** whether the funnel is real or just the base
tag: it is real. Checked on the live site this morning, in a browser, not from
the code:

| Event | Fired live |
|---|---|
| `calculator_started`, HMO calculator | yes |
| `calculator_started`, GDV calculator | yes |
| `payment_paid`, from the Stripe return URL | yes, with the tier and the Stripe id |
| `payment_abandoned`, architectural | yes |
| `payment_abandoned`, automated | yes |

The three not listed behave the same way and were verified before launch:
`calculator_completed`, `payment_started` and `call_requested`.
`booking_completed` is built and deliberately silent, because there is nothing to
book against until Jodi's Calendly link exists.

**What is genuinely left on GA4, and it is ours:** register `source`, `tier`,
`outcome` and `verdict` as event-scoped custom dimensions, and mark
`payment_paid`, `payment_started`, `call_requested` and `calculator_completed`
as key events. Until those are set the data is arriving and recording, it just
cannot be broken out or counted as a conversion in reports.

**Owner:** us.
**Effort:** the access is minutes. The dimensions and key events are about an
hour. The property move is a few minutes but has a real caveat, below.
**Date to give Ed:** access and configuration by Wednesday 2 September. The move
by Friday 4 September.

**Say this about the move rather than doing it quietly.** Moving a GA4 property
between accounts keeps the historical data and the Measurement ID, so the tag on
the site does not change. Worth him knowing it is a one-way action that has to be
scheduled and takes 48 hours to complete, and that anyone whose access came from
the old account loses it. It is the right end state, it is just not an undo.

---

## 3. Casino spam on HMO Designers. Chased once, and partly wrong on our side

This is the one where his complaint holds up under checking.

| URL | Now | He asked for |
|---|---|---|
| `/understanding-mad-casino-withdrawal-processing-and-times/` | 410 | 410, correct |
| `/magic-win-casino-no-deposit-bonus-opportunities-explained/` | 410 | 410, correct |
| `/the-hottest-new-games-and-providers-featured-at-prive-casino-today/` | **404** | 410 |
| `/home-2-0/` | **308 to /** | gone |
| `/signup-2-0/` | **308 to /signup/** | gone |

The 410 list in `site/middleware.ts` already carries thirteen spam URLs. The
prive-casino one is simply not on it, so it falls through to a 404. A 404 does
get de-indexed eventually; a 410 is faster, which is exactly why he asked.

The two `-2-0` URLs are worse, because a redirect is the one thing he said he did
not want. They are old WordPress duplicates and they currently pass whatever
authority they hold into the live pages.

**Worth saying plainly:** none of this is live spam. The site is static, there is
no WordPress and no injected content. These pages do not exist and serve nothing.
What is still true is that Google has them indexed, and that is what he is seeing
in his Search Console. Fixing the status codes is necessary but will not clear
the index on its own, so it should be paired with removal requests in Search
Console, which needs the access in item 1.

**The sweep he asked for.** The current sitemap is clean: 71 URLs, none matching
any spam pattern. A proper sweep needs the Search Console indexed-pages export,
which is the only place the leftovers are visible, and that again needs item 1.

**Owner:** us for the code, us for the removals once we have access.
**Effort:** the status codes are under an hour including a deploy. The sweep and
removals are half a day, and depend on item 1.
**Date to give Ed:** status codes fixed Wednesday 2 September. Sweep and removal
requests within two working days of Search Console access.

---

## 4. The hack, and how they got in. Answer this properly, it is the real question

He is asking because he plans to fold HMO Designers into Thistle over the next
couple of months and will not migrate a site with an unexplained way in. That is
a reasonable position and the question deserves a straight answer.

**We already have the answer.** It is written up in the HMO Designers repo and
was never sent to him. In short:

- The way in was a PHP remote-code-execution backdoor installed as a global
  `auto_prepend`, so it ran on every page and on `/wp-json`. It was
  hex-obfuscated and triggered by a POST parameter. Alongside it sat a webshell
  disguised as a CSS file inside a fake plugin directory, and a fake-CAPTCHA
  script shown only to logged-out visitors. The likely entry route was a
  known file-manager plugin vulnerability.
- The June backup is infected and must never be restored. The database content
  itself was checked and was clean.
- What has been done about it is the strongest part of the answer, and he has
  not been told it: the site was not cleaned, it was **replaced**. What runs
  today is a static Next.js site with no PHP, no database, no admin login and no
  plugins. The class of attack that was used cannot happen against it, because
  none of the machinery it needs exists any more.

So the honest reply is that the ticket was closed without telling him, not that
the work was not done. That is worth owning rather than glossing.

**Owner:** us. It is a writing job, not an investigation.
**Effort:** two hours to write it properly, including what to watch for.
**Date to give Ed:** Wednesday 2 September, with the status-code fix, so the two
halves of his email are answered together.

---

## 5. HMO Checker Claude connection

**What he wants.** The `ai-mcp - Anthropic` app installed on the HMO Checker
sub-account, location ID `CxWWGs3lBWhHwcsWVZbL`. It is a private app, so he has
no install button at his end. It is already on HMO Designers and working. He
wants a line back when it is done so he can reconnect.

Straightforward, no dependencies, and he has been waiting since Monday.

**Owner:** us, whoever holds the agency-level CRM account.
**Effort:** minutes.
**Date to give Ed:** today.

---

## 6. Jodi: paid feasibilities are not marked as won

**What she says.** Paid feasibilities land as their own new opportunity and need
marking as "won" automatically so they filter into the month's figures.

This is a CRM pipeline change rather than a website change. The site's job ends
at taking payment and posting the lead. Worth confirming with her whether "won"
should be set when Stripe confirms payment, which is the only reliable signal,
and what the opportunity should be worth, since the two products are £49.99 and
£298 or more.

**Owner:** us, on the CRM side.
**Effort:** half a day once the trigger is agreed.
**Date to give Ed and Jodi:** confirm the rule by Wednesday 2 September, built by
Friday 4 September.

---

## 7. Still open from before, not yet chased

- **Author bios and photographs.** Ed said on 26 August he would send them this
  week. Nothing has arrived. Two of the four things we asked for have since
  turned up by accident: Jodi's signature gives her full name, **Jodi Edgley**,
  and her title, **Business Developer**. So what is still needed is a photograph
  of Jodi, Kaan's full name as he wants it published, and a short bio for each of
  the three. Worth re-asking in the same reply rather than as a separate chase.
- **The feasibility disclaimer brief.** Estimated at 3.5 days on 26 August and not
  scheduled since. Ed has not pushed on it, but it is his brief and it is sitting
  unstarted.
- **Jodi's Calendly link.** Still the oldest blocker. It holds the booking event
  and both booking routes.
- **Ed's reply to the final comments document.** He said on 30 August he would
  respond that day. Nothing yet. Worth one line asking, because more work may
  land from it.

---

## What to say to Ed about dates

The honest position is that four of these are small and one of them is our
mistake. A reply that lands well says so and puts dates against everything:

- **Today, Tuesday 1 September:** the HMO Checker Claude app installed, and a
  straight answer on the funnel events being real rather than just a base tag.
- **Wednesday 2 September:** Search Console owners added on both properties and
  the sitemap submitted. GA4 admin added and the funnel configuration finished.
  The spam status codes corrected. The written answer on the hack.
- **Friday 4 September:** the GA4 property moved to the new account. Jodi's
  "won" automation built, assuming the rule is agreed on Wednesday.
- **Within two working days of Search Console access:** the full spam sweep and
  the removal requests, since neither is possible before that.

The one thing not to promise is a date on the disclaimer build until someone has
actually scheduled the 3.5 days.
