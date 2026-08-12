import { redirect } from 'next/navigation';

// /case-studies used to be a single page with two tabs switched by ?view=.
// Those are now separate pages, so this is just an entry point: send people to
// the feasibility studies, which is what the tab defaulted to.
//
// The old ?view= links are honoured too, so anything already shared still lands
// in the right place.
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  redirect(
    view === 'projects'
      ? '/case-studies/completed-projects'
      : '/case-studies/feasibility-studies'
  );
}
