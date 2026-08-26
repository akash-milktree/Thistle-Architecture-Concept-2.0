"use client";

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTina } from 'tinacms/dist/react';
import { FeasibilityProvider } from '@/components/feasibility/FeasibilityContext';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/sections/Footer';
import { FeasibilityModal } from '@/components/feasibility/FeasibilityModal';
import { ExitIntentPopup } from '@/components/ExitIntentPopup';
import { f, type TinaQuery, EMPTY_QUERY } from '@/lib/tina-fields';
import { str, arr } from '@/lib/tina';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const PageShell: React.FC<{ children: React.ReactNode; settings?: TinaQuery }> = ({
  children,
  settings,
}) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // The chrome is identical on every route, so it is fetched once in the root
  // layout and made live here. Without the markers this puts on the page, any
  // route the editor navigates to would have none at all, and Tina switches
  // click-to-edit off the moment it lands on an unmarked page.
  const { data: live } = useTina(settings ?? EMPTY_QUERY);
  const s = settings ? (live as any)?.settings : undefined;

  const navLabels: Record<string, { label: string; field?: string }> = {};
  for (const item of arr<any>(s?.nav?.items)) {
    const key = str(item?.key);
    if (key) navLabels[key] = { label: str(item?.label), field: f(item, 'label') };
  }

  return (
    <FeasibilityProvider>
      <main className="bg-thistle-white min-h-screen w-full selection:bg-thistle-pink selection:text-thistle-black">
        <Navbar
          labels={navLabels}
          ctaLabel={s ? str(s.nav?.ctaLabel) || undefined : undefined}
          tina={{ ctaLabel: f(s?.nav, 'ctaLabel') }}
        />
        {children}
        <Footer
          cta={
            s
              ? {
                  eyebrow: str(s.closingCta?.eyebrow),
                  heading: str(s.closingCta?.heading),
                  body: str(s.closingCta?.body),
                  buttonLabel: str(s.closingCta?.buttonLabel),
                  reassurance: str(s.closingCta?.reassurance),
                  backgroundImage: str(s.closingCta?.backgroundImage),
                  backgroundAlt: str(s.closingCta?.backgroundAlt),
                }
              : undefined
          }
          details={
            s
              ? {
                  blurb: str(s.footer?.blurb),
                  email: str(s.footer?.email),
                  phone: str(s.footer?.phone),
                  address: str(s.footer?.address),
                  hours: str(s.footer?.hours),
                  productHeading: str(s.footer?.productHeading),
                  expertiseHeading: str(s.footer?.expertiseHeading),
                  companyHeading: str(s.footer?.companyHeading),
                  copyright: str(s.footer?.copyright),
                }
              : undefined
          }
          tina={{
            cta: {
              eyebrow: f(s?.closingCta, 'eyebrow'),
              heading: f(s?.closingCta, 'heading'),
              body: f(s?.closingCta, 'body'),
              buttonLabel: f(s?.closingCta, 'buttonLabel'),
              reassurance: f(s?.closingCta, 'reassurance'),
              backgroundImage: f(s?.closingCta, 'backgroundImage'),
            },
            details: {
              blurb: f(s?.footer, 'blurb'),
              email: f(s?.footer, 'email'),
              phone: f(s?.footer, 'phone'),
              address: f(s?.footer, 'address'),
              hours: f(s?.footer, 'hours'),
              productHeading: f(s?.footer, 'productHeading'),
              expertiseHeading: f(s?.footer, 'expertiseHeading'),
              companyHeading: f(s?.footer, 'companyHeading'),
              copyright: f(s?.footer, 'copyright'),
            },
          }}
        />
        <FeasibilityModal />
        {pathname === '/feasibility-package' && <ExitIntentPopup />}
      </main>
    </FeasibilityProvider>
  );
};
