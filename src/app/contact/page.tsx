import type { Metadata } from 'next';
import { ContactPage } from '@/views/ContactPage';
import client from '@/tina/__generated__/client';

export async function generateMetadata(): Promise<Metadata> {
  // The search listing is editable too, so it is read from the same document as
  // the page copy. The values in code stay as the fallback for a field an
  // editor has cleared, which keeps a blank box out of Google.
  //
  // metaTitle stays a plain string, not `{ absolute: ... }`: layout.tsx's
  // template appends "| Thistle Architecture", and this page has always relied
  // on that. The field description tells the editor to type the page name only,
  // for the same reason.
  const contact = await client.queries.contact({ relativePath: 'index.json' });
  const c = contact.data.contact;

  return {
    title: c?.metaTitle || 'Contact',
    description:
      c?.metaDescription ||
      'Get in touch with Thistle Architecture about a commercial conversion, HMO, or high-end residential scheme. We reply within one working day.',
    alternates: { canonical: '/contact' },
  };
}

export default async function Page() {
  // The raw query, variables and data are all handed down, not just the data:
  // useTina needs the query to re-run it against the editor's live values.
  //
  // Settings is fetched here as well as in the root layout. The email address
  // and phone number in this page's left-hand column are the same two fields
  // the footer renders, and they read from Site Settings rather than from a
  // second copy in the contact document, so that one number can never dial
  // somewhere the other does not. PageShell does not share its query, so this
  // page asks for its own.
  const [contact, settings] = await Promise.all([
    client.queries.contact({ relativePath: 'index.json' }),
    client.queries.settings({ relativePath: 'index.json' }),
  ]);

  return (
    <ContactPage
      page={{ query: contact.query, variables: contact.variables, data: contact.data }}
      settings={{ query: settings.query, variables: settings.variables, data: settings.data }}
    />
  );
}
