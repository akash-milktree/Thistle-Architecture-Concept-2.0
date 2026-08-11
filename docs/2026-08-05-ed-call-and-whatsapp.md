# Ed's call and WhatsApp feedback, 5 August 2026

Sources: the call transcript with Ed and Kaan, three WhatsApp screenshots, and
the asset drop in `last feedback/` (gitignored, 360MB of source video).

Status key: `[ ]` to do, `[x]` done, `[~]` part done, `[?]` needs a decision.

## Done already

- [x] **Our Work tabs were broken.** From `?view=projects`, the nav link to
  Feasibility Studies did nothing. Two stacked causes: the link pointed at a
  bare `/case-studies`, and the view was mount-only state. The URL is now the
  source of truth. This is the same fault Ed reported on 8 July as "case studies
  doesn't appear to be working", which could not be reproduced at the time.

## Assets received in `last feedback/`

| File | Size | Notes |
|---|---|---|
| `4. Website Video/edk-website-bg-master.mp4` | 333MB | 1920x1080, 51.5s. Master, do not ship. |
| `4. Website Video/bg-1080p.mp4` | 16MB | Web cut |
| `4. Website Video/bg-720p.mp4` | 9.5MB | Web cut |
| `4. Website Video/bg-poster.jpg` | | Poster frame |

This is the showreel Ed asked for on the call: an edit cycling through several
projects, replacing the Winchester drone panorama, which he said "isn't really
that relevant".

## Homepage

- [x] **Swap the hero video for the new showreel.** Done, then superseded. Ed
  supplied a v5 background cut on 10 August (`V2/`) which loops seamlessly, and
  that is now the hero. It is served from Vimeo (video 1217009975) in background
  mode rather than self-hosted, so there is no file in the repo and no re-encode
  when the cut changes: swap the id.
- [ ] Ed will send more homepage images, and wants them to **cycle through**
  rather than sit static. A carousel, "flick through them to show loads".

## Our Work

- [?] **Split into two pages, or keep tabs?** Akash proposed separate pages for
  Feasibility Studies and Completed Projects, each with sub-tabs by conversion
  type. Ed agreed. Decide before building, since it changes URLs and the nav.
- [ ] **Filter completed projects by type.** Ed first said commercial to
  residential, HMO and residential, then changed his mind: use **all four**
  conversion types including mixed use, and let a project appear in more than
  one tab where it fits.
- [ ] **Case study pages need more than sketches.** Ed wants the appraisal
  document shown as an example, plus external photographs of the building.
- [ ] Ed asked why one project has no video when the Drive folder has plenty.
  Akash's position: one video per page, and he needs a single chosen clip per
  project rather than multi-GB raw footage. **Ed to nominate one clip per
  project.**

## Conversions pages

- [ ] **Replace the stock hero images with real project images.** Ed: "that
  would look much better. A video would be preferable." Akash confirmed he now
  has the real images and designed the pages before they arrived.

## Feasibility package page

- [ ] **The deliverable images are wrong and muddled.** Sketch schemes, planning
  policy analysis, risk register and schedule of accommodation all show
  unrelated stock or sketch images. Ed wants the actual documents shown:
  - Feasibility Overview document
  - Feasibility sketch
  - Planning Research document
  - Space Standards document (council space standards)
  - Risk register (exists inside the shared feasibility examples)
- [ ] Use **155 Windmill Lane** as the example project for those images.
- [ ] **Bring back the diagrams.** Ed prefers the earlier generated HTML/SVG
  diagrams to the current photographic layer images, which he called "ugly
  because they're not very coordinated". This reverses the round 4 decision that
  replaced diagrams with photography.

## About and team

- [x] Ed has chosen the **AI-generated** team photos over the current and
  cleaned-real options.
- [ ] **But regenerate them.** "Don't like the fact we are all in suits, maybe
  just use the clothes we already have on." Casual, and everyone should look
  like they were photographed in the same office. Kaan's and Jan's are good;
  Ed's own and two others need redoing.
- [ ] **Add Jodi** (photo was missing) and **Seyma** (can now be added).
- [ ] Adouj is supplying a better photo on Monday.
- [ ] Keep the feasibility page team band at two people. Ed: "two's fine, just
  leave it like that."

### Captions supplied by Ed

**Adouj:** Architectural Designer currently based in the UK, with previous
professional experience in Turkey, Azerbaijan, and the UAE. Graduated with a
Bachelor's degree in Architecture from Bilkent University in 2019 with High
Honors. LEED Green Associate certified (2019).

**Beverley:** BA (Hons). Over 20 yrs of Practice and Studio Management
experience. Looks after the finance and admin for the team.

## Blog

- [ ] **Blog images are wrong.** Ed has never seen them; they were generated
  rather than taken from the original site. He wants the original images for SEO
  consistency. **Problem: the Wix site is gone**, so these need recovering from
  the Wix archive Ed asked to keep, or from the Wayback Machine.
- [ ] Make blog posts **interactive like the current site**, and **show view
  counts**.

## New functionality

- [?] **CMS so Ed can add projects himself.** He raised this first and called
  going through Akash "a bottleneck". Wants it for completed projects and
  feasibility examples. This is the largest item here and needs its own
  decision on approach.
- [~] **Chatbot for quick enquiries**, plus a simple contact form. The contact
  form is done: /contact went live 11 August with a short form posting to
  /api/leads, and the old /contact -> /feasibility-package redirect is gone.
  The chatbot is still open.

## Email and SEO

- [x] **Formspree.** Fixed 11 August. The recipient was an address that was
  never verified, and unverified recipients are dropped silently, which is why
  nothing arrived. Now delivering to hello@incollective.works.
  A second failure was found and fixed at the same time: the three calculators
  and the sample report posted to /api/leads, which forwarded to a
  LEAD_WEBHOOK_URL that has never been set on the Vercel project, so every one
  of those leads was written to the log and lost. They now go to a new
  `leads` form, created by deploying formspree.json.
  All six capture points are wired and confirmed: feasibility, the three tool
  gates, the sample report, and the new contact form.
- [ ] Connect Thistle's SEO account. **Scarlett** does the SEO for Thistle;
  Akash to coordinate with her.

## Not doing

- Home link in the nav. Ed asked, Akash explained the convention of omitting it
  when the nav is long, Ed accepted.

## Added since this brief

- [x] **Site is behind a password gate** (11 August, Ed's request). The public
  must not see it until the outstanding work is done. See `site-password-gate.md`.
- [x] **Six developer logos added** from `V2/more icons to add.docx`, and the
  trust strip rebuilt as a marquee with the logos cut out onto uniform tiles.
- [?] **Ed's list says "Goldengate Properties"; that logo reads "Goldgate".**
  Using the logo's spelling until he confirms which is right.
