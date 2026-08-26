# Final update brief: round 5 (live SharePoint check + resource follow-ups)

Date: 24 August 2026
Follows: rounds 1-4 (docs/2026-08-24-final-updates-round1.md through round4.md)

The user gave answers/resources for several of round 4's open blockers and asked me to check them. This round is that follow-up: no code changes, pure verification against live sources.

## Feasibility/completed-project media: checked the live SharePoint, not just the local repo copy

The user pointed to the SharePoint folder Ed actually updates (`03 New Website`, under Data > 01 Business Admin > 06 Marketing > 2 Thistle > 1 Website), separate from and more current than the `03 New Website` copy already in this repo.

Findings:

- **162 Millbrook Road really has no completion photography.** Its "Site photos" subfolder is empty on Ed's own live source, not just stale in the repo. The photo gap flagged in round 4 is real and still open.
- **Most "Finished Projects" subfolders were updated 2 August 2026** — after whatever date the repo's local copy was taken. This means some of the round 3/4 case-study audit findings may be working from a stale snapshot. Not re-audited project by project this round; flagged as a follow-up worth doing before the next content push.
- **Monument House has new content from 2 August**: `New Renders - Kaan 1.png`, a proper polished exterior render (not a drawing), and `Screenshot 2025-04-30 213726.png`. The Kaan render is a strong candidate to replace Monument House's current drawing thumbnail on Completed Projects — this can close that gap once downloaded and cropped. The screenshot file didn't render in SharePoint's preview and wasn't downloaded to check; low-confidence it's useful given the generic auto-generated filename, but not ruled out.
- Monument House also has an "Existing videos - use for homepage" folder (8 July) — very likely the source of the existing "the drone footage on our homepage is this building's own street" copy, not new content.
- The "Videography" folder (dated Aug 2) is an unrelated workstream: a 22-page email marketing campaign brief (three audience segments) tied to a video launch series, not building photography. Not relevant to the website media gaps.

**Not yet done**: actually downloading and cropping the Monument House render into the site. Given the "most folders updated Aug 2" signal, worth doing a fuller resync of the other nine priority-list projects' folders against this SharePoint location before the next round, rather than assuming the repo's copy is current.

## Jodi's Calendly

Checked HMO Designers' own site (`/contact` and the feasibility-study page) for a Calendly link to reuse, per the user's "should be the same as HMO Designers I guess if not provided." **No Calendly link exists anywhere on HMO Designers' live site.** Nothing to copy. Still blocked on Ed/Jodi supplying an actual link; the lead-capture form stand-in from round 3 stays in place until then.

## GoHighLevel CRM

No GoHighLevel MCP connector is available in this session, so I can't check account status programmatically. Needs the user or Ed to confirm manually.

## Blocker-list items 4 and 5

User said "not too sure about them" — no action taken, left open.

## Consolidated status update

Everything from round 4's blocker list stands except:
- Monument House's photo gap now has a likely fix waiting (the Kaan render) — was previously "no photo exists anywhere," is now "photo exists, not yet integrated."
- Jodi's Calendly: confirmed there's nothing to borrow from HMO Designers; still needs Ed to supply a real link.
- GoHighLevel: still unconfirmed, now explicitly can't be checked via MCP (no connector).

## Round 5 continued: Monument House fix + resync of the rest of the priority list

Followed through on everything above.

### Monument House — fixed

Downloaded both new SharePoint files. `New Renders - Kaan 1.png` (angled corner view) and `Screenshot 2025-04-30 213726.png` (a cleaner straight-on elevation, despite the generic auto-generated filename) are both genuine, high-quality exterior renders, not drawings. Cropped neither — used as-is, converted to webp via `npm run optimise-media`. The straight-on elevation is now the Completed Projects thumbnail and case-study hero image (`monument-house-render-2.webp`); the angled view is second in the gallery (`monument-house-render-1.webp`); the two original technical drawings stay in the gallery after them. Verified on `/case-studies/monument-house` and the Completed Projects grid in a real browser — the drawing thumbnail is gone.

### Resync of the remaining priority-list projects

Checked the "most folders updated 2 August" signal from earlier in this round against the other eight priority projects (Bereweeke Avenue, Highbury Buildings, Bishopstoke Road, Derby Road, Corner House Hackney, Forest House Lymington, Peterhayes Farm, Rotherfield Homes, School House). Two projects — Bishopstoke Road and Derby Road — aren't in this SharePoint folder at all; their photography came from Google Drive in earlier rounds and is out of scope here.

Checked Corner House Hackney's SharePoint folder in full (5 files) as the deepest test case: every image already existed locally, already processed, and was already correctly wired into the case study's `projectStory` sections. The "empty `galleryImages: []`" pattern that looked like a gap on first read is actually how every `projectStory`-based case study on this site works — the images live in the sections, not the flat gallery array. No real content gap there.

Spot-checked Rotherfield Homes (the thinnest of the remaining projects, 2 images) — its SharePoint folder has exactly 2 pictures plus 3 planning-drawing PDFs, matching what's already published. Checked git history for the other five: their local images were all committed 14-18 August, which is after the 2 August SharePoint update, so they already reflect it.

**Conclusion: the "widespread staleness" concern from earlier in this round was overblown.** Monument House was a genuine exception (its local files predated the site's own content population, from mid-July) and is now fixed. Nothing else on the priority list needs a resync.

### One real defect found and fixed along the way

Corner House Hackney's "before" image (`existing-plot.jpg`, in "The Existing Plot" section) was a Google Street View screenshot with the "© Google" copyright watermark still visible at the bottom — a genuine defect that predates this round, not something introduced by it. Cropped the watermark strip off and re-optimised. Verified live in a browser: the section now shows cleanly.
