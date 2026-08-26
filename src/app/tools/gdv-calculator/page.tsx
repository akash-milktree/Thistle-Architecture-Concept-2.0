import type { Metadata } from 'next';
import { GDVCalculatorPage } from '@/views/tools/GDVCalculatorPage';
import { getToolBySlug } from '@/data/toolsData';
import client from '@/tina/__generated__/client';

const tool = getToolBySlug('gdv-calculator');

const CANONICAL = '/tools/gdv-calculator';
const RELATIVE_PATH = 'gdv-calculator.json';

export async function generateMetadata(): Promise<Metadata> {
  // The search listing is editable too, so it is read from the same document as
  // the page copy, with data/toolsData.ts still the fallback for a field an
  // editor has cleared. That keeps a blank box out of Google.
  //
  // metaTitle already ends in "| Thistle Architecture"; `absolute` stops
  // layout.tsx's title template appending the suffix a second time. The field
  // description tells the editor to keep the suffix, for the same reason.
  const doc = await client.queries.tool({ relativePath: RELATIVE_PATH });
  const t = doc.data.tool;

  return {
    title: { absolute: t?.metaTitle || tool?.metaTitle || 'GDV & Viability Calculator | Thistle Architecture' },
    description: t?.metaDescription || tool?.metaDescription,
    alternates: { canonical: CANONICAL },
  };
}

export default async function Page() {
  // The raw query, variables and data are all handed down, not just the data:
  // useTina needs the query to re-run it against the editor's live values.
  const doc = await client.queries.tool({ relativePath: RELATIVE_PATH });

  return <GDVCalculatorPage page={{ query: doc.query, variables: doc.variables, data: doc.data }} />;
}
