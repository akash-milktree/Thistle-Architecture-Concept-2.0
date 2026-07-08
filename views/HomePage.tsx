"use client";

import React from 'react';
import { Hero } from '../sections/Hero';
import { DeveloperLogos } from '../sections/DeveloperLogos';
import { IntroBlock } from '../sections/IntroBlock';
import { FinishedProjects } from '../sections/FinishedProjects';
import { TeamStrip } from '../sections/TeamStrip';
import { Process } from '../sections/Process';
import { ArchitectReview } from '../sections/ArchitectReview';
import { Benefits } from '../sections/Benefits';
import { Difference } from '../sections/Difference';
import { CaseStudies } from '../sections/CaseStudies';
import { DataSources } from '../sections/DataSources';
import { Testimonials } from '../sections/Testimonials';
import { FAQ } from '../sections/FAQ';

export const HomePage: React.FC = () => (
  <>
    <Hero />
    <DeveloperLogos />
    <IntroBlock />
    <FinishedProjects />
    <TeamStrip />
    <Process />
    <DataSources />
    <ArchitectReview />
    <Benefits />
    <Difference />
    <CaseStudies />
    <Testimonials />
    <FAQ tinted />
  </>
);
