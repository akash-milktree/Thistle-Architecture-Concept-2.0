"use client";

import React, { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useFeasibility, type FeasibilityTier } from './FeasibilityContext';

// The one client-side element on the payment confirmation page: opens the
// detailed brief (the FeasibilityModal mounted in PageShell). The page itself
// stays a server component; the payment is confirmed by the Stripe webhook,
// never by anything here. `tier` only tags which brief this is, so the submit
// payload and the team's inbox say which product was bought.
export const CompleteBriefButton: React.FC<{ tier: FeasibilityTier }> = ({ tier }) => {
  const { openModal, setTier } = useFeasibility();

  // Set as soon as the page mounts, not only on click, so the tier is correct
  // even if the modal is reopened later without pressing this button again.
  useEffect(() => {
    setTier(tier);
  }, [tier, setTier]);

  return (
    <Button variant="primary" size="lg" icon={<ArrowUpRight size={18} />} onClick={openModal}>
      Complete Your Project Brief
    </Button>
  );
};
