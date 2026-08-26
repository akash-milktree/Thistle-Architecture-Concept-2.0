import type { Collection } from 'tinacms';
import { joinKeyField } from '../fields';

// Site-wide copy that is not owned by any single page: the navigation labels,
// the closing CTA band, and the footer.
//
// Deliberately NOT here, and staying in code: analytics IDs, the Trustpilot
// profile URL, company registration details, and the Vimeo id behind the hero
// film. Navigation `path` values are also code, not content — they are routing,
// several of them are the destination of a 301 in next.config.ts, and a typo in
// one is a broken menu rather than a visible mistake.
//
// Contact details ARE editable, as one field each. The displayed text and the
// mailto:/tel: href are both derived from the same value so the two cannot
// drift apart — the risk with a phone number is not the wording but publishing
// a number that dials somewhere else. If the number is ever swapped for a
// call-tracking one, move it back into code.
export const settingsCollection: Collection = {
  name: 'settings',
  label: 'Site Settings',
  path: 'content/settings',
  format: 'json',

  ui: {
    global: true,
    allowedActions: { create: false, delete: false },
    router: () => '/',
  },

  fields: [
    {
      type: 'object',
      name: 'nav',
      label: 'Navigation',
      description:
        'Menu labels. The destination of each link is set in code — reordering or renaming here changes what a visitor reads, not where it goes.',
      fields: [
        {
          type: 'object',
          name: 'items',
          label: 'Menu items',
          list: true,
          ui: { itemProps: (item) => ({ label: item?.label }) },
          fields: [
            joinKeyField({ label: 'Link (fixed)', description: 'Identifies which menu entry this is. Read-only: changing it would stop the label applying to that menu item.' }),
            { type: 'string', name: 'label', label: 'Label' },
          ],
        },
        { type: 'string', name: 'ctaLabel', label: 'Header button label' },
      ],
    },

    {
      type: 'object',
      name: 'closingCta',
      label: 'Closing CTA band',
      description: 'The dark band above the footer. It ends every page on the site.',
      fields: [
        { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
        {
          type: 'string',
          name: 'heading',
          label: 'Heading',
          ui: { component: 'textarea' },
          description: 'A line break in this field becomes a line break on the page.',
        },
        { type: 'string', name: 'body', label: 'Supporting paragraph', ui: { component: 'textarea' } },
        { type: 'string', name: 'buttonLabel', label: 'Button label' },
        { type: 'string', name: 'reassurance', label: 'Reassurance line', description: 'The small print under the button.' },
      ],
    },

    {
      type: 'object',
      name: 'footer',
      label: 'Footer',
      fields: [
        { type: 'string', name: 'blurb', label: 'Description under the logo', ui: { component: 'textarea' } },
        {
          type: 'string',
          name: 'email',
          label: 'Email address',
          description: 'Shown as text and used as the mailto: link. Both come from this one field.',
        },
        {
          type: 'string',
          name: 'phone',
          label: 'Phone number',
          description:
            'Shown as text and used as the tel: link. Type it as it should read, e.g. "0808 175 5405"; the dialling form is derived from it.',
        },
        { type: 'string', name: 'address', label: 'Address' },
        { type: 'string', name: 'hours', label: 'Opening hours' },
        { type: 'string', name: 'productHeading', label: 'Column heading: Product' },
        { type: 'string', name: 'expertiseHeading', label: 'Column heading: Expertise' },
        { type: 'string', name: 'companyHeading', label: 'Column heading: Company' },
        { type: 'string', name: 'copyright', label: 'Copyright line' },
      ],
    },

    {
      type: 'object',
      name: 'testimonials',
      label: 'Reviews section',
      description: 'The band of Trustpilot reviews, shown on several pages.',
      fields: [
        {
          type: 'string',
          name: 'eyebrow',
          label: 'Eyebrow',
          description: 'Small label above the heading. Default when a page does not set its own.',
        },
        { type: 'string', name: 'heading', label: 'Heading' },
        {
          type: 'string',
          name: 'lede',
          label: 'Supporting line',
          ui: { component: 'textarea' },
          description:
            'The current line ("Every review on our Trustpilot profile is five star") is a checkable factual claim rather than a score — keep it true if you change it.',
        },
        { type: 'string', name: 'linkLabel', label: 'Link label', description: 'Text of the link out to the full Trustpilot profile. The URL itself is set in code.' },
      ],
    },
  ],
};
