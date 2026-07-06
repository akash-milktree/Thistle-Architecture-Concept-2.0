# Items needing Ed's confirmation

Compiled during the July 2026 site revision. Everything on the live site is
written from documents in the "03 New Website" folder; nothing financial has
been invented. The items below either need confirming, supplying, or approving
before or shortly after launch. Format is a checklist so it can be pasted into
an email.

## Case studies (now real projects)

The four fabricated case studies (Croydon, Reading, Manchester warehouse,
Bristol) have been deleted. The six live case studies and their sources:

1. **4 St John's Street, Aylesbury (9-bed HMO)**, from TH00177 Feasibility
   Overview and the SK001/PL01/PL02 drawings.
   - [ ] OK to name the street address publicly? (The feasibility document and
     drawings name it; the case study currently says "Aylesbury" plus the
     street in body copy.)
   - [ ] Confirm the Go recommendation stands and the scheme can be described
     as delivered feasibility work.
   - [ ] Floor area, purchase price, GDV: supply if you want financial figures
     shown. None are currently displayed.
2. **Harpenden Police Station (police station to flats)**, from the Nov 2025
   Planning Appraisal and the flats sketches.
   - [ ] OK to publish? The appraisal was produced for an agent/buyer context.
   - [ ] Confirm how to describe the client relationship.
3. **Greyfriars, King's Lynn (office to resi vs HMO options)**, from Option 2
   and Option 4 sketches.
   - [ ] Confirm project date and that both options can be shown.
4. **Axis House, Compton, Newbury (office to high-end houses)**, from sketch
   proposals 1 to 3 (Oct 2025 title block).
   - [ ] Confirm the preferred scheme description (4 x 3-bed at ~83 sqm plus
     1 x 2-bed) and that elevations can be shown.
5. **23 Southgate, Winchester (listed building to 10-bed co-living)**, from
   HD0070 proposed sketches.
   - [ ] Confirm project can be published given listed-building sensitivity.
6. **Beech Mount, Manchester (existing HMO reconfiguration)**, from Draft
   SK001 Rev A.
   - [ ] Confirm project date and description.

- [ ] **Project photos**: every `Photos/` folder in the shared "03 New
  Website" folder arrived empty (St Johns, Harpenden, 162 Millbrook,
  81 Crecent, Bishopstoke, and all High End Resi projects). Please re-share or
  re-upload; real photography will replace drawings as case-study heroes where
  available.

## Sample report download

- [ ] The feasibility package page now shows real pages from the St Johns
  feasibility document and offers the full PDF as an email-gated download
  (`public/downloads/thistle-sample-feasibility.pdf`). Approve publishing it,
  or supply an anonymised version (the client address appears throughout).

## Site-wide claims

- [ ] 98.5% planning success rate (was already flagged "confirm accuracy" in
  the March brief).
- [ ] 86% faster than traditional routes (same).
- [ ] 5-day guarantee wording ("Guaranteed turn around").
- [ ] "No obligation. Response within one working day." now appears under
  primary CTAs. Confirm the one-working-day promise is operationally safe.
- [ ] Fixed fee "from £1,800 + VAT" on the feasibility package page (was
  flagged for confirmation when the page was first built).

## Testimonials

- [ ] All ten testimonials on the site (Marcus Cole / Sterling Property Group,
  Rachel Simmons / Oakbridge Capital, etc.) appear to be placeholder content
  from the original build. Please supply real client quotes (name, role,
  company, permission), or confirm which of these are real. They remain live
  in the meantime.

## Class MA Checker logic update

- [ ] FYI rather than a question: the checker previously tested the 3-month
  vacancy requirement and the 1,500 sqm floorspace cap. Both were abolished in
  March 2024, so those questions have been removed and listed buildings now
  hard-fail (they are excluded from Class MA). The tool now matches current
  law. Flag if you disagree with any verdict wording.

## Team page

- [ ] Nick: photo supplied but no role/title anywhere. He is currently NOT on
  the About page. Supply role and credentials to add him.
- [ ] Seyma: folder exists but no photo. Supply photo plus role to add.
- [ ] Onaiza: shown as "Client Support" (inferred from her handling client
  chat). Confirm title.
- [ ] Jodi and Justina appear on the HMO Designers site but have no photos in
  the Thistle folder. Should either appear on the Thistle About page?
- [ ] Blog authorship: articles are attributed to Edward Kercher (Founder) and
  Kaan (Design Lead). Confirm you are both happy to be named authors.

## For Akash (not Ed)

- [ ] Set `LEAD_WEBHOOK_URL` in Vercel env vars to the Milktree CRM inbound
  webhook. Until it is set, form submissions are logged server-side only and
  will NOT reach the CRM. The form posts JSON with a `source` field:
  `feasibility-form`, `sample-report`, `class-ma-checker`, or
  `gdv-calculator`.
- [ ] Developer logos (Property & Poppadoms, HMO Academy, Brentor Group,
  Frame 4, DNB Homes) were already live; confirm permissions exist.
