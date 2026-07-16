"use client";

import React from 'react';
import { ToolShell } from '../../components/ui/ToolShell';
import { HMOCalculator } from '../../sections/tools/HMOCalculator';
import { getToolBySlug } from '../../data/toolsData';

const tool = getToolBySlug('hmo-calculator');

export const HMOCalculatorPage: React.FC = () => {
  if (!tool) throw new Error('hmo-calculator tool missing from toolsData');
  return (
    <ToolShell
      tool={tool}
      heroHeading="What Is The HMO Worth?"
      heroDescription="An HMO is valued on the income it produces, not on what the house next door sold for. Set the room count and rate, and see the indicative value."
      disclaimer="Indicative numbers only. The room count depends on planning and space standards, which is what a feasibility establishes."
    >
      <HMOCalculator />
    </ToolShell>
  );
};
