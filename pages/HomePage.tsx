import React from 'react';
import { Hero } from '../sections/Hero';
import { Intro } from '../sections/Intro';
import { Difference } from '../sections/Difference';
import { Process } from '../sections/Process';
import { Benefits } from '../sections/Benefits';
import { CaseStudies } from '../sections/CaseStudies';
import { Testimonials } from '../sections/Testimonials';
import { Team } from '../sections/Team';
import { FAQ } from '../sections/FAQ';

export const HomePage: React.FC = () => (
  <>
    <Hero />
    <Intro />
    <Difference />
    <Process />
    <Benefits />
    <CaseStudies />
    <Testimonials />
    <Team />
    <FAQ />
  </>
);
