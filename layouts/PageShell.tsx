"use client";

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FeasibilityProvider } from '@/components/feasibility/FeasibilityContext';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/sections/Footer';
import { FeasibilityModal } from '@/components/feasibility/FeasibilityModal';
import { ExitIntentPopup } from '@/components/ExitIntentPopup';

export const PageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <FeasibilityProvider>
      <main className="bg-thistle-white min-h-screen w-full selection:bg-thistle-pink selection:text-thistle-black">
        <Navbar />
        {children}
        <Footer />
        <FeasibilityModal />
        <ExitIntentPopup />
      </main>
    </FeasibilityProvider>
  );
};
