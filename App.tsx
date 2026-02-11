import React, { useEffect } from 'react';
import { Hero } from './sections/Hero';
import { Intro } from './sections/Intro';
import { Process } from './sections/Process';
import { Benefits } from './sections/Benefits';
import { CaseStudies } from './sections/CaseStudies';
import { Team } from './sections/Team';
import { Testimonials } from './sections/Testimonials';
import { Footer } from './sections/Footer';
import { Navbar } from './components/ui/Navbar';

function App() {
  // Smooth scroll behavior for anchor links would go here if we were using a router
  // Since it's a single page, we rely on standard scrolling.

  return (
    <main className="bg-thistle-white min-h-screen w-full selection:bg-thistle-pink selection:text-thistle-black">
      <Navbar />
      <Hero />
      <Intro />
      <Process />
      <Benefits />
      <CaseStudies />
      <Team />
      <Testimonials />
      <Footer />
    </main>
  );
}

export default App;