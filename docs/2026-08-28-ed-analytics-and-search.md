# Ed's two emails, 27 August 2026: analytics, Search Console, the rebrand article, author bios

Ed pulled four items forward because they hold up the search and reporting work.
This is what has been built, what is waiting on him, and the exact list of things
he asked us to specify.

Short version: two of the four are done and live. The other two are finished on
our side and cannot go further without an account only he can open.

> **Update, later on 28 August.** Ed sent the Measurement ID and verified the
> Search Console property. Analytics is now **live and reporting**, and the
> property exists. What is left of both items is written up in "Where these two
> now stand", near the end.

| His item | State |
|---|---|
| 33, analytics | LIVE. Reporting on the real property since 28 August. |
| Search Console | Property verified by Ed. Sitemap still to submit, one click. |
| 50, rebrand article | Published on HMO Designers with the canonical. Done. |
| 29, author bios | Fields built and live, Ed's photograph in place. Bios are his to write. |

---

## 1. Item 33, analytics

### What is built

The whole measurement layer is written, tested and deployed, and since Ed sent
the Measurement ID it is live and reporting on `G-PVDKSFH5GQ`.

It was built to ship switched off, and that is still how it behaves anywhere the
ID is not set. With no ID the site loads no Google script, sets no cookie and
makes no request to Google. That is not a claim about the code, it was checked in
a browser on the live site before the ID went in: zero requests to Google, no
`gtag`, no banner. It is why preview deploys stay silent today.

Every event in the brief is wired:

| Ed's brief | What fires it |
|---|---|
| Calculator started | The first field a visitor changes, on all four tools |
| Calculator completed | The full result appearing: the unlock on the two calculators, the verdict on the Class MA checker, the price reveal on the pricing calculator |
| Payment started | The moment checkout is requested, on both paid products |
| Payment paid | Stripe returning the customer to the confirmation page |
| Payment abandoned | Stripe returning them after they backed out |
| Jodi calls | A request submitted on the Expert Session card |
| Bookings | Built but not firing, see below |

Each event carries which tool or product it came from, and the payment events
carry the fee, so the funnel can be read per product rather than as one average.

**Bookings is the one gap, and it is not a code gap.** There is nothing to book
against until Jodi's Calendly link exists, which is still item 1 on the
outstanding list. A request for a call is not a confirmed booking, and reporting
one as the other would flatter the numbers. The event is defined and ready. When
the link lands it is a two-line change.

### What we needed from Ed, and what is left

He created the property himself and sent the Measurement ID, which settled the
ownership question in the right way: it sits inside his Google account, so it
belongs to Thistle rather than to us or any later contractor.

The ID is set and the site is reporting. Two jobs are left inside GA4 and both
need Administrator access, which we do not have. They are listed with the exact
steps under "Where these two now stand" below. Neither of them stops data being
collected: everything is being recorded from today and can be reported on
whenever the settings are made.

### One thing he did not ask for, which we built anyway

There is now a cookie banner.

Analytics cookies need opt-in consent in the UK. The site's cookie policy already
told visitors that analytics cookies were in use, which was true of the policy
and not of the site, and there was nothing to consent with. Switching GA4 on
without asking would have made that page inaccurate and put Thistle on the wrong
side of the rules.

So analytics runs in Google's consent mode with everything denied until a visitor
accepts. Accept and reject carry the same visual weight, because a buried reject
is the pattern the ICO objects to. Advertising cookies stay off permanently,
since the site runs no advertising and the policy says so.

The banner only appears once analytics is switched on. Nobody is asked to consent
to something that is not running.

---

## 2. Search Console

Ed was right that no property existed, which meant no search data on the new site
at all since the launch. He has since created and verified a **Domain property**
for `thistlearchitecture.co.uk`, which is the better of the two kinds: it covers
every subdomain and both http and https at once.

He did the verification himself, so the DNS record we expected to add at GoDaddy
was not needed.

What is left is submitting the sitemap, which is one click inside the property
and is set out under "Where these two now stand" below.

### hmodesigners.co.uk

Ed's access there is under an old personal Gmail and he wants
`edward@thistlearchitecture.co.uk` added as an owner, plus the same on GA4 if we
hold it.

Both are account actions in Google's console rather than anything in the code, so
they sit with whoever holds the Milktree Google login. Neither is difficult and
both are inside his end-of-next-week deadline. Worth doing at the same time as
the Thistle property so it is one sitting rather than three.

---

## 3. Item 50, the rebrand article

**Done and published**, at
`https://hmodesigners.co.uk/hmo-designers-thistle-architecture-rebrand/`.

Scarlett's copy, unchanged, taken from the version already published on Thistle so
the two cannot drift apart.

The canonical tag points at the Thistle article, which was the point of the
exercise. Two near-identical pages compete and Google may rank neither. With the
tag, the ranking value flows to the Thistle page instead, which is what the
announcement is for.

Checked against the handover document, on the built site, before it went out:
canonical correct, title tag and web address exactly as specified, one main
heading, all seven section headings in the right order, both tables rendering as
real tables that scroll sideways on a phone without dragging the article with
them, both links to thistlearchitecture.co.uk followed rather than blocked,
"Jodi" spelled correctly, and the article showing on the blog index.

Two small pieces of groundwork were needed and are worth knowing about, because
they now exist for any future article: that site could not point a canonical at
another domain at all, and its headings were worked out from the title, so it
could not have a title written for Google and a different headline written for
the reader. Both are now options, and every existing article is untouched.

---

## 4. Item 29, the author boxes

Ed is right that a name with no photograph and no bio is worse than nothing.

### What is done

The author box now takes a photograph, a short bio and a profile link, all
editable in the CMS. All three are optional, so an article nobody has filled in
looks exactly as it did before rather than breaking.

Ed's photograph is already in place on all fourteen Thistle articles. It is the
same picture already published on the About page, so it needed no new file and no
approval from him.

Each article's hidden data for Google now carries the author's photograph, bio and
profile link when they exist. That is the part that actually affects being
"credited to Google as the author". A name and a job title are thin evidence that
an author is a real person with relevant experience. A face, a line of background
and a link Google can check elsewhere are what it looks for.

**No bio has been written.** Ed offered to send the wording, and a bio is a claim
about a person's expertise published in their name, so it is his to write rather
than ours to invent across fourteen live pages.

### Exactly what we need, and for whom

He asked us to be specific. This is the whole list.

**Jodi.** Everything, because we hold nothing for her at all.
1. A photograph. Head and shoulders, looking at the camera, plain background, to
   match the six team photographs we already have. At least 800 by 800 pixels.
2. Her full name as she wants it published. The site only ever says "Jodi".
3. Her job title. The site currently describes her as "Business Development and
   Expert Sessions", which was our wording, not hers.
4. Two or three sentences of bio.

**Kaan.** We have his photograph already.
1. His full name as he wants it published. The About page says only "Kaan". His
   messages sign off as Halil Kaan Taskin, and we did not want to publish that
   without asking.
2. Two or three sentences of bio.

**Ed.** We have his photograph and it is already live.
1. Two or three sentences of bio.

**All three, optional but worth having.** A LinkedIn profile address each. It
gives Google a second, independent source confirming the author is a real person,
which is the single cheapest thing that can be done for author credibility.

**On the bios.** Two or three sentences, about that person's own experience rather
than about the practice, and ideally saying why they are worth reading on the
subjects they write about. Roughly forty to sixty words. If it is easier, we can
draft all three from the wording already approved on the About page and send them
back for him to correct, which is usually faster than writing from a blank page.

### The HMO Checker articles

These are the boxes Ed says have been live since June showing a name and nothing
else. That site is not one we hold the code for, so we cannot fix it from here.
The assets above are the same ones it needs, so one set of files covers both
sites. Once we know who is credited on those articles we can say whether anything
beyond the list above is required, and who needs to make the change.

---

## Where these two now stand, after Ed's reply

### Analytics is live

`G-PVDKSFH5GQ` is set on the production environment only. Preview and
development deploys stay switched off on purpose, so our own test traffic never
lands in the numbers Ed reads.

Checked on the live site, in a real browser, after the deploy:

- The Google tag loads and names the right property.
- Consent starts denied, before anything is sent.
- No `_ga` cookie exists until a visitor presses Allow.
- After accepting, `_ga` and `_ga_PVDKSFH5GQ` appear and data reaches Google.
- `calculator_started` fired correctly from the live HMO calculator.

**Two jobs left, both inside GA4 and needing Admin.** Neither blocks data being
collected. Everything is being recorded now and can be reported on later.

1. **Register four custom dimensions**, under Admin, Custom definitions. Without
   these the events arrive but their detail cannot be broken out in reports.
   Scope is Event for all four.

   | Dimension name | Event parameter | What it splits |
   |---|---|---|
   | Source | `source` | Which tool or form the event came from |
   | Tier | `tier` | Automated at £49.99 against Architectural from £298 |
   | Outcome | `outcome` | Whether the pricing calculator priced it or routed it to Jodi |
   | Verdict | `verdict` | What the Class MA checker told them |

2. **Mark the key events**, under Admin, Events. `payment_paid` first, then
   `payment_started`, `call_requested` and `calculator_completed`. That is what
   makes them count as conversions rather than ordinary events.

We can do both if Ed adds `info@milktreeagency.com` as an Administrator.

### Search Console

The Domain property for `thistlearchitecture.co.uk` is verified, which was the
part only Ed could do. Thank you.

**One thing left, and it takes a click.** Open the property, choose Sitemaps in
the left menu, enter `sitemap.xml` and press Submit.

We checked the sitemap before saying that, so the submission should come back
clean. All 73 pages return 200, none is set to noindex, none redirects, and each
one names itself as the original. The only mismatch is the homepage, listed with
a trailing slash and naming itself without one, which Google treats as the same
address. robots.txt already points at the sitemap.

The meta tag route we shipped as a fallback is no longer needed. The code stays,
switched off, in case a second property is ever added.

---

## What happens next

**Waiting on Ed, and nothing moves without them:**
1. ~~The Measurement ID~~ **done**. Administrator access on GA4 would still let us
   finish the custom dimensions and key events.
2. ~~The Search Console property~~ **done**. The sitemap still needs submitting,
   which is one click inside the property.
3. Photograph, full name and job title for Jodi. Full name for Kaan. A bio for
   each of the three, or a yes to us drafting them from the About page.
4. Still outstanding from before, and still the thing holding two features:
   Jodi's Calendly link.

**Ours, as soon as those land:**
1. ~~Set the Measurement ID and redeploy~~ **done, and verified live.** The custom
   dimensions and key events need GA4 Admin access.
2. ~~Add the DNS record at GoDaddy~~ **not needed**, Ed verified it himself.
3. Add `edward@thistlearchitecture.co.uk` as an owner on the hmodesigners.co.uk
   property, and on its GA4 if we hold it.
4. Fill in the author boxes and wire the booking event.
