"use client";

import React from 'react';
import { Hero } from '../sections/Hero';
import { DeveloperLogos } from '../sections/DeveloperLogos';
import { ExampleProjects } from '../sections/ExampleProjects';
import { Process } from '../sections/Process';

// Ed's video feedback 2026-07-08: "really simplify this home page, I just think
// it's a bit too long at the moment... example projects underneath trusted by
// developers, then the five step feasibility process, and that's it. Then it
// basically just asks you to go to the other pages."
//
// This cut the page from thirteen sections to four. The sections it dropped
// (IntroBlock, FinishedProjects, TeamStrip, DataSources, ArchitectReview,
// Benefits, Difference, CaseStudies, Testimonials, FAQ) still exist; the ones
// that also appear on other pages are untouched there. Process closes with an
// InlineCTA, and the footer carries the final CTA band.
export const HomePage: React.FC = () => (
  <>
    <Hero />
    <DeveloperLogos />
    <ExampleProjects />
    <Process />
  </>
);
