import type { Collection } from 'tinacms';

// Every case study on the site: 35 documents, 12 feasibility studies and 23
// completed projects, one JSON file each, seeded byte-for-byte from
// data/caseStudiesData.ts.
//
// ONE collection, not two, even though `kind` selects between two mutually
// exclusive sub-trees. A single /case-studies/[slug] route resolves both, and
// feasibilityStudies, completedProjects and caseStudies are all derived from
// the one array. Splitting them would turn the GraphQL type into a union and
// force fragment handling into generateStaticParams, sitemap.ts and the detail
// view for no editorial gain. So `kind` is a required option field and both
// sub-trees are optional objects on the same document.
//
// Both sub-trees are optional ON PURPOSE, which is the same reason
// data/caseStudiesData.ts gives for keeping them optional there: Ed's
// templates arrived after the pages did, and a study or project only moves on
// to its template when there is real material to fill it. Seven of the twelve
// studies carry `feasibility`; eleven of the twenty-three projects carry
// `projectStory`. The rest still render the older challenge / approach /
// outcome narrative, and must keep being able to. Do not make either required.
//
// The filename IS the slug: st-johns-aylesbury.json renders at
// /case-studies/st-johns-aylesbury. There is no slug field to drift out of
// step with it. It is read-only, and delete is off, because roughly twenty
// redirects in next.config.ts point AT these URLs — renaming or removing one
// turns a live 301 into a 404.
//
// Create is off too, for a different reason: the listing pages
// (/case-studies/feasibility-studies, /case-studies/completed-projects), the
// home page band and the conversion pages still build their cards from
// data/caseStudiesData.ts, so a case study created here would be a detail page
// nothing on the site links to. Adding a new one is still a code change:
// add the record to the data module, add the JSON here, then the card appears
// everywhere it should.
//
// Deliberately NOT here, and staying in code:
//
//  - `slug`. It is the filename, and it is the address of the page.
//
//  - `conversionTypes` values themselves, and the ordering lists. FEATURED_SLUGS
//    in sections/ExampleProjects.tsx and COMPLETED_PROJECTS_PRIORITY in the data
//    module pick which studies lead which page. That is placement, not copy.
//
//  - floorArea, purchasePrice, projectedGDV, gdvUpliftPct and riskAvoided.
//    They exist on a handful of records in the data module and no page renders
//    any of them. A form field that changes nothing on the page reads as an
//    edit that did not save.
//
//  - The three feasibility document cards (FEASIBILITY_DOCUMENTS in the data
//    module) and the wording of the "ask for an example" form beside them.
//    Every feasibility produces the same set, so it is one shared constant
//    rather than a field repeated across 35 documents. It needs a home of its
//    own before it can be edited; noted rather than duplicated here.
//
//  - Alt text for the main image and the gallery. Both are built from the
//    title as the page renders ("Beauchamp House, photograph 3"), so they stay
//    correct on their own when the title is edited. The project story images
//    have real, written alt text and do get a field.
export const caseStudyCollection: Collection = {
  name: 'caseStudy',
  label: 'Case Studies',
  path: 'content/case-studies',
  format: 'json',

  ui: {
    // Filename to URL, one to one.
    router: ({ document }) => `/case-studies/${document._sys.filename}`,
    allowedActions: { create: false, delete: false },
    filename: { readonly: true },
  },

  fields: [
    {
      type: 'string',
      name: 'kind',
      label: 'Type of case study',
      required: true,
      options: [
        { value: 'feasibility', label: 'Feasibility study' },
        { value: 'project', label: 'Completed project' },
      ],
      description:
        'Which of the two lists this belongs to, and which "back" link and layout the page uses. Changing it moves the case study between /case-studies/feasibility-studies and /case-studies/completed-projects, so only change it if it was filed in the wrong place to begin with.',
    },

    {
      type: 'string',
      name: 'title',
      label: 'Title',
      required: true,
      description:
        'The big heading at the top of the page, and the name on every card that links here. House style is what the job was rather than the address — "Six-Bed HMO To Thirteen", not "Beech House Road". Capitalise Each Word.',
    },
    {
      type: 'string',
      name: 'location',
      label: 'Location',
      required: true,
      description:
        'The small grey line under the title, e.g. "Croydon, South London". Town and county, never the full address: several of these are live client sites and the reports they came from are confidential. Where nobody has confirmed the town, say only what is known — one entry publishes as "England" for exactly that reason.',
    },
    {
      type: 'string',
      name: 'provenance',
      label: 'Who did the work',
      description:
        'Only for jobs delivered by another practice in the Thistle Group, e.g. "By HMO Designers, part of Thistle Group". It prints under the location on the page and after the location on the card. Leave it blank for Thistle Architecture\'s own work — publishing group work is fine, implying we did it ourselves is not.',
    },
    {
      type: 'string',
      name: 'tag',
      label: 'Category badge',
      required: true,
      description:
        'The small pill over the image, e.g. "HMO", "Office to Flats", "New Build". Two or three words at most; longer ones wrap awkwardly on a card.',
    },
    {
      type: 'string',
      name: 'recommendation',
      label: 'Recommendation badge',
      options: [
        { value: 'Go', label: 'Go' },
        { value: 'No-Go', label: 'No-Go' },
        { value: 'Options Tested', label: 'Options Tested' },
      ],
      description:
        'The second pill beside the category, on feasibility studies. "No-Go" prints in red — deliberately, because a study that told the client not to buy is the most persuasive thing on the site. Leave blank where the study did not end in a single verdict.',
    },
    {
      type: 'string',
      name: 'status',
      label: 'Build status',
      options: [
        { value: 'Complete', label: 'Complete' },
        { value: 'On site', label: 'On site' },
      ],
      description:
        'Completed projects only: the pill with the tick or the hard hat. Blank means Complete. Please keep this honest — "Complete" against a building still in scaffolding is the sort of thing a client notices.',
    },
    {
      type: 'string',
      name: 'desc',
      label: 'Summary',
      required: true,
      ui: { component: 'textarea' },
      description:
        'The large paragraph under the title, and the paragraph at the foot of every card that links here. One or two sentences: what the building was and what the study or the job did with it.',
    },

    {
      type: 'object',
      name: 'image',
      label: 'Main image',
      description:
        'The picture beside the title, and the thumbnail on every card. Ed\'s August 2026 final brief: for a completed project this must be a real photograph of the building, never a preview of a drawing.',
      fields: [
        { type: 'image', name: 'src', label: 'Image' },
        {
          type: 'string',
          name: 'kind',
          label: 'How to fit it',
          options: [
            { value: 'drawing', label: 'Drawing — show it whole, never cropped' },
            { value: 'photo', label: 'Photograph — fill the frame, crop if needed' },
          ],
          description:
            'A drawing is shown complete on a white ground, because cropping one cuts off the part that matters. A photograph fills its frame instead. Set this to match what the picture actually is.',
        },
      ],
    },

    {
      type: 'object',
      name: 'stats',
      label: 'Headline facts',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.label }) },
      description:
        'The three figures on the card, and the first three cells of the band under the page header. Three is what the card shows; a fourth is only ever seen on the page itself. Every one of these is a claim about a real building, so it needs to come from the report rather than from memory.',
      fields: [
        { type: 'string', name: 'label', label: 'What it is', description: 'The small grey line, e.g. "Bedrooms, all en suite".' },
        { type: 'string', name: 'value', label: 'The figure', description: 'The larger line underneath, e.g. "13".' },
      ],
    },

    {
      type: 'string',
      name: 'buildingType',
      label: 'Building type',
      required: true,
      description:
        'A cell in the fact band under the page header, e.g. "Existing dwelling (C3)". The use class in brackets where it is known and matters.',
    },
    {
      type: 'string',
      name: 'planningRoute',
      label: 'Planning route',
      description:
        'Another cell in the fact band, e.g. "Full planning (Sui Generis)". Leave blank where no route was settled — several of the older projects have no document behind them and should not claim one.',
    },
    {
      type: 'string',
      name: 'completionDate',
      label: 'Date',
      description:
        'The last cell in the fact band, labelled "Completed" on a project and "Feasibility date" on a study. A month and year ("June 2026"), a year on its own where that is all the photographs prove, or "Complete" / "On site" where the record has no date at all.',
    },

    {
      type: 'string',
      name: 'unitsBefore',
      label: 'Units before',
      description:
        'The left half of the before-and-after figure on the feasibility studies listing card, e.g. "3-bed house". Both halves have to be filled for it to appear at all.',
    },
    {
      type: 'string',
      name: 'unitsAfter',
      label: 'Units after',
      description: 'The right half of the same figure, e.g. "7-bed HMO".',
    },

    {
      type: 'string',
      name: 'conversionTypes',
      label: 'Conversion types',
      list: true,
      options: [
        { value: 'commercial-to-residential', label: 'Commercial to Residential' },
        { value: 'hmo', label: 'HMO' },
        { value: 'co-living-large-hmo', label: 'Co-Living / Large HMO' },
        { value: 'mixed-use-commercial', label: 'Mixed Use Commercial' },
        { value: 'high-end-residential', label: 'High-End Residential' },
      ],
      description:
        'Which filters on the completed projects page this appears under, and which "We can help with this" links show at the foot of the page. Placement, not wording: it does not change a word anyone reads. Ed asked for projects to appear under more than one where they genuinely fit. Leave it empty rather than filing something wrong — an empty one still appears under "All".',
    },

    // The older layout, used by every study and project that has not moved on
    // to one of Ed's templates below. Three numbered sections down the page.
    {
      type: 'string',
      name: 'challenge',
      label: 'The Challenge',
      ui: { component: 'textarea' },
      description:
        'Section 01 of the older layout, used where this case study has no "Feasibility in brief" or "Project story" filled in below. What the client was up against.',
    },
    {
      type: 'string',
      name: 'approach',
      label: 'Our Approach',
      ui: { component: 'textarea' },
      description: 'Section 02 of the older layout. What we actually did.',
    },
    {
      type: 'string',
      name: 'outcome',
      label: 'The Outcome',
      ui: { component: 'textarea' },
      description: 'Section 03 of the older layout. What the client ended up with.',
    },

    {
      type: 'object',
      name: 'galleryImages',
      label: 'Drawings and photographs',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.src }) },
      description:
        'On a feasibility study these are the sketch options in the viewer, in the order they are offered as "Option 1 of 2". On a completed project they are the gallery near the foot of the page. More than three photographs on a project switches the gallery to two columns.',
      fields: [
        { type: 'image', name: 'src', label: 'Image' },
        {
          type: 'string',
          name: 'kind',
          label: 'How to fit it',
          options: [
            { value: 'drawing', label: 'Drawing — show it whole, never cropped' },
            { value: 'photo', label: 'Photograph — fill the frame, crop if needed' },
          ],
          description:
            'A drawing is shown complete on a white ground; a photograph fills its frame and may be cropped at the edges.',
        },
      ],
    },

    // ---- Ed's feasibility template (docs/2026-08-12-drive-tasks.md item 2).
    // Filling this in switches the page off the older three-section narrative
    // above and on to the template. Seven of the twelve studies have moved so
    // far; the others keep the old layout until they are written up.
    {
      type: 'object',
      name: 'feasibility',
      label: 'Feasibility study write-up',
      description:
        'Ed\'s feasibility template. Filling this in replaces the three numbered sections above with the full template layout: the key information band, "Feasibility in brief", the sketch, the deliverables and the decision. Seven studies use it so far. Leave it empty on a study that has not been written up this way yet — an empty template reads far worse than the older layout.',
      fields: [
        {
          type: 'object',
          name: 'keyInfo',
          label: 'Key project information',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.label }) },
          description:
            'The band of figures straight under the page header. Six is what the row is built for; a seventh wraps onto a second line. These replace the standard fact band rather than sitting beside it, so anything the reader needs — bedrooms, room sizes, communal space, planning route, key risk, date — belongs here.',
          fields: [
            { type: 'string', name: 'label', label: 'What it is', description: 'The small grey line, e.g. "Planning route".' },
            { type: 'string', name: 'value', label: 'The figure', description: 'The larger line underneath, e.g. "Full planning, sui generis".' },
          ],
        },
        {
          type: 'string',
          name: 'indicativeValue',
          label: 'Indicative end value',
          description:
            'Optional single line under the band, printed as "Indicative end value: …". A range is fine ("£600,000 to £680,000"). Only fill this in where the report actually put a number on it; the figure is read as a claim about a real building.',
        },
        {
          type: 'string',
          name: 'brief',
          label: '01 The Brief',
          ui: { component: 'textarea' },
          description: 'The question the client asked, in their terms. Usually one sentence, often phrased as a question.',
        },
        {
          type: 'string',
          name: 'found',
          label: '02 What We Found',
          ui: { component: 'textarea' },
          description: 'The findings: what the building will take, what the policy says, what the precedents are.',
        },
        {
          type: 'string',
          name: 'recommendation',
          label: '03 Our Recommendation',
          ui: { component: 'textarea' },
          description: 'What we told them to do. Separate from the Go / No-Go badge above, which is only the one-word version of this.',
        },
        {
          type: 'string',
          name: 'sketchCaption',
          label: 'Caption under the sketch',
          ui: { component: 'textarea' },
          description:
            'The line under "The Proposed Layout", describing what the drawing shows. Where two options were drawn, say what each one is — the reader is looking at a carousel.',
        },
        {
          type: 'object',
          name: 'guidance',
          label: 'Guidance reviewed',
          description:
            'The small grey line at the foot of "What The Client Received", naming the standards the study was checked against. Left off where no single document governed it.',
          fields: [
            {
              type: 'string',
              name: 'label',
              label: 'Wording',
              description: 'House style includes the prefix, e.g. "Official guidance reviewed: Croydon HMO space standards".',
            },
            {
              type: 'string',
              name: 'href',
              label: 'Link (optional)',
              description:
                'A web address for the document, if there is a stable public one. With a link the line becomes clickable and opens in a new tab; without one it is plain text. Nothing currently uses this — do not link to a council PDF that will move.',
            },
          ],
        },
        {
          type: 'string',
          name: 'decision',
          label: 'The Decision',
          ui: { component: 'textarea' },
          description:
            'The paragraph under "The Decision", near the foot of the page. This is the one that gets read: the honest summary of whether the scheme works and what it has to survive.',
        },
        {
          type: 'string',
          name: 'roadmap',
          label: 'Recommended roadmap',
          list: true,
          description:
            'The numbered steps under the decision, in order. Three or four words each — they are labels on a sequence, not instructions. The order is the whole point of the list, so drag rather than retype.',
        },
      ],
    },

    // ---- Ed's project template (Project Explanations.docx). Same principle as
    // the feasibility template above: filling it in replaces the older
    // narrative. Ed's note on it — "visitors may not scroll through the entire
    // project page" — is why the before-and-after sits so near the top.
    {
      type: 'object',
      name: 'projectStory',
      label: 'Project story',
      description:
        'Ed\'s completed-project template. Filling this in replaces the three numbered sections above with his write-up, the existing-and-proposed pair, and a run of stages down the page. Eleven projects use it so far.',
      fields: [
        {
          type: 'string',
          name: 'summary',
          label: 'The write-up',
          list: true,
          // One box per paragraph rather than one long editor, so that a click
          // on a paragraph in the preview opens that paragraph.
          ui: { component: 'textarea' },
          description:
            'The opening write-up, one paragraph per box, in order. The first paragraph prints larger than the rest, so it wants to be the one that says what the building was and what it became. These are Ed\'s own words from Project Explanations.docx.',
        },
        {
          type: 'object',
          name: 'beforeAfter',
          label: 'Existing and proposed',
          description:
            'Two photographs side by side near the top of the page, labelled "Existing" and "Completed". Ed\'s template puts it there on purpose: a reader who stops after the first screen should still see the scale of the change. Only fill it in where there is a genuine before photograph — one project has one so far.',
          fields: [
            { type: 'image', name: 'before', label: 'Before' },
            {
              type: 'string',
              name: 'beforeAlt',
              label: 'Before — description (alt text)',
              ui: { component: 'textarea' },
              description:
                'Read aloud to blind visitors and used by Google; never shown on the page. Describe what is in the photograph. Change it whenever you change the photograph.',
            },
            { type: 'image', name: 'after', label: 'After' },
            {
              type: 'string',
              name: 'afterAlt',
              label: 'After — description (alt text)',
              ui: { component: 'textarea' },
              description: 'The same, for the completed photograph.',
            },
          ],
        },
        {
          type: 'object',
          name: 'sections',
          label: 'Stages',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title }) },
          description:
            'The stages of the project, in order down the page, alternating light and white backgrounds. Ed\'s template is explicit that a stage goes in only where there is good material for it, rather than padding the page with placeholders — so a project carries the stages it can evidence and stops there. A stage with one picture shows it wide; two or more go in a grid.',
          fields: [
            { type: 'string', name: 'title', label: 'Stage heading', description: 'e.g. "The Existing Building", "Construction", "The Completed House".' },
            {
              type: 'string',
              name: 'caption',
              label: 'Introduction',
              ui: { component: 'textarea' },
              description: 'A sentence or two under the heading, before the pictures. Optional.',
            },
            {
              type: 'object',
              name: 'images',
              label: 'Pictures',
              list: true,
              ui: { itemProps: (item) => ({ label: item?.alt }) },
              description:
                'Photographs and visualisations for this stage. They are cropped to a common shape so the grid lines up, so avoid anything that loses its subject at the edges.',
              fields: [
                { type: 'image', name: 'src', label: 'Picture' },
                {
                  type: 'string',
                  name: 'alt',
                  label: 'Description (alt text)',
                  ui: { component: 'textarea' },
                  description:
                    'Read aloud to blind visitors and used by Google; never shown on the page. Describe what is in the picture, and say when it is a visualisation rather than a photograph.',
                },
              ],
            },
          ],
        },
      ],
    },

    // Search-result copy. It never appears on the page, so it is edited here
    // and carries no click-to-edit marker.
    {
      type: 'string',
      name: 'metaTitle',
      label: 'Search result title',
      description:
        'The tab title and the blue headline in Google. "| Thistle Architecture" is added automatically. Leave it blank and the case study\'s own title is used, which is usually right — fill it in only where the title is too short to make sense out of context.',
    },
    {
      type: 'string',
      name: 'metaDescription',
      label: 'Search result description',
      ui: { component: 'textarea' },
      description:
        'The grey summary under the headline in Google. Not shown on the page. Leave it blank and the summary above is used. Google cuts it off after roughly 155 characters.',
    },
  ],
};
