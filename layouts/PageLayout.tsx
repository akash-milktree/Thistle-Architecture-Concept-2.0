import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../sections/Footer';
import { FeasibilityModal } from '../components/feasibility/FeasibilityModal';
import { ExitIntentPopup } from '../components/ExitIntentPopup';

export const PageLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main className="bg-thistle-white min-h-screen w-full selection:bg-thistle-pink selection:text-thistle-black">
      <Navbar />
      <Outlet />
      <Footer />
      <FeasibilityModal />
      <ExitIntentPopup />
    </main>
  );
};
