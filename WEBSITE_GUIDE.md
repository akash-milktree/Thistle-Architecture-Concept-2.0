# Thistle Architecture Website — Review Guide

This is a tour of the website built for Thistle Architecture. It explains what every page does, the reasoning behind the structural decisions, and what we still need from you before the site goes fully live.

Read this in any order. Most of it is "what you are looking at and why."

---

## 1. What the website is, in one line

A conversion-feasibility product website: every page is built around the idea that Thistle is a **product you start, not a practice you enquire about**. The primary action everywhere is **"Start Feasibility"**.

---

## 2. The pages, what each one does, and where to find them

Everything reachable from the navbar:

| Top nav item | What it is |
|---|---|
| **Feasibility Package** | The "spec sheet" page. Deliverables, what is included, what is not, the price anchor. Designed to close someone who already knows they want a feasibility. |
| **How It Works** | The five-step narrative. Walks through Upload, Automated Analysis (with the six Feasibility Engine data layers nested inside), Project Data Gathering Session with Jodi, Sketch Scheme Stage, Final Meeting. The brief marked this page "critical". |
| **Case Studies** | A worked step-by-step example of how a Thistle case study unfolds (using the Croydon office conversion as the lead example), then a smaller grid of the other published cases. |
| **Conversions** (dropdown) | Three audience-targeted SEO pages: Commercial to Residential, Office to Resi (Class MA), and HMO. Each frames the opportunity, the specific risks of that conversion type, how Thistle solves them, and links to a related case study. |

Surfaced in the footer (intentionally not in the top nav, to keep the nav to four items):

| Footer column | What is in it |
|---|---|
| **Brand + contact** | The lockup, the strapline, email, phone, address, opening hours. |
| **Product** | How It Works · Feasibility Package · Case Studies · Free Tools |
| **Conversions** | The three conversion-type pages |
| **Company** | About · Blog |
| **Bottom row** | Privacy Policy, Terms of Service, Cookie Policy, LinkedIn, Instagram, copyright |

Pages you can reach only via the footer (or by typing the URL):

- `/about` — The "Meet the architects" page. Rebuilt simpler and people-led, with the team grid as the hero of the page.
- `/blog` and `/blog/[slug]` — The blog and an article template. Currently using placeholder posts.
- `/tools` — The Free Tools index, with two tools beneath it.
- `/tools/class-ma-checker` — The Class MA Eligibility Checker (six quick questions, ends in a verdict + Start Feasibility).
- `/tools/gdv-calculator` — The GDV & Viability Calculator (five inputs, live outputs, verdict pill).
- `/privacy`, `/terms`, `/cookies` — Legal pages, generic placeholder copy.

---

## 3. Why we built it this way

These are the structural decisions worth understanding before you give feedback.

### Why four items in the nav, not seven

Five or more items in the nav makes the bar feel cluttered and forces line-wrapping at smaller screens. Four is the disciplined limit. About, Tools, and Blog are deliberately reached from the footer or contextually within pages, not the nav.

### Why a "Conversions" dropdown at all

The single biggest SEO opportunity for a feasibility business is being found by people searching for the specific kind of conversion they are doing ("office to resi feasibility", "HMO feasibility", and so on). Each conversion page is one focused landing page targeting one buyer type. Adding a fourth type later means adding one data record to `data/conversionsData.ts` — the route and page generate automatically.

### Why a "Free Tools" section

Every comparable site in this space (Resi, Searchland, Urbanist, your own sister product hmochecker) leads with free tools as the main lead-generation mechanism. A developer who finishes a Class MA check or types numbers into a GDV calculator is a much warmer lead than someone landing cold on the homepage. Both tools end on **"Start Feasibility"**.

### Why the tools "give a hint, not an answer"

Both tools deliberately stop short of giving a final answer. The Class MA checker has three verdicts (Likely eligible, Borderline, Likely not eligible) and each one drives to "get a proper feasibility". The GDV calculator shows a marginal/viable/strong band and points at "a real feasibility models comparables and risk". This is the design intent — the tools qualify intent, the feasibility closes.

### Why one shared template runs the three Conversions pages

Same structure, different content. Adding a fourth conversion type is a one-record change. The pages are statically generated at build time so each one has its own SEO metadata.

### Why the homepage has so many sections

Each section answers one buyer objection in sequence: hero (what is it?), developer logos (does anyone use this?), Process (how does it work?), Data Sources (is the data credible?), Feasibility Engine (what is inside the analysis?), Architect-Led Review (who actually does the work?), Three Pillars (why pick this over the alternatives?), Difference (vs traditional architect), Case Studies (proof), Testimonials (more proof), FAQ.

That is the conversion path. The page is intentionally long for someone who lands cold.

### Why the homepage's case-study cards link to a step-by-step page, not a list

The Case Studies page is itself a worked example of how a Thistle case study unfolds, with the other cases as a smaller grid below. The brief asked for "an example of a case study step by step" rather than a portfolio grid.

---

## 4. What is still needed from you before the site goes fully live

Marked in the code as `TODO` where they appear. Listed here so you can see the full picture at once.

### Content

- **Phone number** in the footer (currently placeholder `+44 (0)20 1234 5678`).
- **Real email** in the footer (currently `hello@thistlearchitecture.co.uk` — replace if different).
- **Case study financials** — the four case studies have placeholder purchase prices, GDV, and uplift figures. They are reasoned guesses based on the building type and location. Real numbers replace them whenever you can share them.
- **Real team headshots and bios** for the About page (currently Unsplash stock placeholders for Sarah Jenkins, David Ross, Elena Kova, James Thorne; real images and bios replace these).
- **Real Kaan photo** in the homepage hero card (`public/kaan.png` is the current image — confirm if it is the right one).
- **Real developer-client logos** for the "Trusted by" strip on the homepage. We are using the same logos shown on hmochecker.co.uk as a starting set. Some have dark backgrounds baked in (Property & Poppadoms, Brentor Group, Frame 4). If you can get **transparent versions** from the original brands, the strip will look cleaner.
- **Confirmation of the duration labels on How It Works** — the per-step durations ("Under 2 minutes", "Automated, within 48 hours", "Days 3 to 4", "Day 5") are a proposal, flagged in the data file for confirmation.

### Conversion

- **Feasibility-modal form ID** — the existing "Start Feasibility" modal does not yet POST to a backend. It is currently a local form. Wire it to Formspree or an equivalent service when ready.
- **Contact page** — not built in this phase. The site-architecture plan calls for a dedicated `/contact` page with an inline form (the one place that is not the modal). Add this when the Formspree form ID is ready.

### Imagery

- **AI image slots on How It Works** — Step 3 (the call with Jodi) and Step 5 (the final feasibility meeting) and the hero/CTA backgrounds are designed to take generated imagery. They currently use a brand-tinted placeholder treatment. We will need an OpenAI image API key and a locked image style preamble before generating real images.

### Pricing

- **The "from £X" anchor on the Feasibility Package page** — the pricing component is designed to graduate to a full tier table when you confirm numbers.

---

## 5. How to review

Best order:

1. Open the **homepage** and scroll the whole thing.
2. Open the **Conversions dropdown** and visit all three conversion pages (top nav → Conversions).
3. Open the **footer** and follow it column by column. Every page is reachable from there.
4. Click **Free Tools** in the footer and try both tools (run the Class MA checker through to a verdict; type a number into the GDV calculator and watch the outputs change).
5. Open the **mobile menu** on phone, walk the nav, and confirm the Conversions group is reachable as a sub-list.

Each page is verified responsive at five viewports (mobile 375, tablet 768, laptop 1280, desktop 1440, desktop 1920) using the Playwright tooling in `scripts/responsive-sweep.mjs`. The repo's screenshots folder holds the renders.

---

## 6. Where the project documentation lives

For deeper context (not required reading):

- `brief.md` at the root — the structured brief.
- `design.md` at the root — the design system (colour tokens, type scale, spacing, copy rules).
- `docs/superpowers/specs/` — every design spec, one per page or template.
- `docs/superpowers/plans/` — the implementation plans, task by task.
- `PROJECT_SOP.md` — the playbook the build followed.

If anything in the site puzzles you, the spec for that page in `docs/superpowers/specs/` explains why it is built that way.

---

## 7. The headline copy decisions (what is fixed vs flexible)

Some lines were chosen deliberately to set a tone. Worth knowing which ones are locked vs which you can edit freely.

**Locked (these are positioning, not copy):**

- "From Building To Viable Conversion. In 5 Days." — the homepage headline.
- "Thistle specialises in unlocking value from existing buildings" — the positioning sentence.
- "Start Feasibility" — the canonical CTA. Used everywhere.

**Flexible (rewrite whenever you want):**

- Every per-page headline (e.g. "Class MA: Does Your Building Qualify?", "Test A Building Before You Bid.", "From Building To Go/No-Go, Step By Step.")
- All body copy on every page
- The verdict-card copy on the Class MA checker (Likely eligible / Borderline / Likely not eligible)
- The case-study challenge / approach / outcome paragraphs

If you want a single line changed, point to it; if you want a tone shift, say so and we can do a pass across the whole site.

---

## 8. One known follow-up

The `/case-studies/[slug]` dynamic route still uses the older synchronous Next.js params signature. The build works and the page renders fine. The dev console produces an async-params warning. It is a one-line follow-up fix whenever convenient. It does not affect the live site.
