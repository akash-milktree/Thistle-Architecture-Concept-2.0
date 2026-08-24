"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useFeasibility } from './FeasibilityContext';

// The one client-side element on the payment confirmation page: opens the
// detailed brief (the FeasibilityModal mounted in PageShell). The page itself
// stays a server component; the payment is confirmed by the Stripe webhook,
// never by anything here.
export const CompleteBriefButton: React.FC = () => {
  const { openModal } = useFeasibility();
  return (
    <Button variant="primary" size="lg" icon={<ArrowUpRight size={18} />} onClick={openModal}>
      Complete Your Project Brief
    </Button>
  );
};
