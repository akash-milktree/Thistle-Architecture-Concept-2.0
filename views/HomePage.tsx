"use client";

import React from 'react';
import { Hero } from '../sections/Hero';
import { Process } from '../sections/Process';
import { FeasibilityEngine } from '../sections/FeasibilityEngine';
import { Benefits } from '../sections/Benefits';
import { Difference } from '../sections/Difference';
import { CaseStudies } from '../sections/CaseStudies';
import { DataSources } from '../sections/DataSources';
import { Testimonials } from '../sections/Testimonials';
import { CTABlock } from '../sections/CTABlock';
import { FAQ } from '../sections/FAQ';

export const HomePage: React.FC = () => (
  <>
    <Hero />
    <Process />
    <FeasibilityEngine />
    <Benefits />
    <Difference />
    <CaseStudies />
    <DataSources />
    <Testimonials />
    <CTABlock />
    <FAQ />
  </>
);
