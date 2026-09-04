"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  EMPTY_ANSWERS,
  EMPTY_FILES,
  CALCULATOR_CARRY_KEY,
  type CalculatorCarry,
  type FeasibilityAnswers,
  type FeasibilityFiles,
} from './feasibility';

// Step keys mirror the HMO Designers flow. A "payment" step slots in after
// "details" when the Stripe flow is added (client decision: email only for now).
export type FeasibilityStep = 'property' | 'size' | 'details';

export const FEASIBILITY_STEPS: { key: FeasibilityStep; label: string; title: string; lede: string }[] = [
  {
    key: 'property',
    label: 'Property',
    title: 'Tell us about the property',
    lede: 'A few basics so we can assess its potential.',
  },
  {
    key: 'size',
    label: 'Size and plans',
    title: 'Size and floor plans',
    lede: 'The floor plan is what our design team works from.',
  },
  {
    key: 'details',
    label: 'Contact',
    title: 'Where do we send your feasibility?',
    lede: 'We will use these to prepare your feasibility study and come back to you.',
  },
];

/** Which paid product this brief belongs to. Set once, from the Stripe success
 *  redirect's tier param, before the brief is opened; carried through to the
 *  submit payload so the team (and Kaan's automation) know which service was
 *  bought without asking the client again. */
export type FeasibilityTier = 'architectural' | 'automated';

interface FeasibilityContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  step: FeasibilityStep;
  setStep: (step: FeasibilityStep) => void;
  answers: FeasibilityAnswers;
  setAnswer: (key: keyof FeasibilityAnswers, value: string) => void;
  files: FeasibilityFiles;
  setFiles: React.Dispatch<React.SetStateAction<FeasibilityFiles>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  tier: FeasibilityTier;
  setTier: (tier: FeasibilityTier) => void;
}

const FeasibilityContext = createContext<FeasibilityContextType | null>(null);

export const useFeasibility = () => {
  const context = useContext(FeasibilityContext);
  if (!context) throw new Error('useFeasibility must be used within FeasibilityProvider');
  return context;
};

export const FeasibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<FeasibilityStep>('property');
  const [answers, setAnswers] = useState<FeasibilityAnswers>(EMPTY_ANSWERS);
  const [files, setFiles] = useState<FeasibilityFiles>(EMPTY_FILES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tier, setTier] = useState<FeasibilityTier>('architectural');

  const openModal = useCallback(() => {
    // Carry the pricing calculator's answers forward, per Ed's August 2026
    // final brief: nothing is asked twice. Only empty fields are filled, so a
    // person editing a half-completed brief never has typing overwritten.
    try {
      const raw = localStorage.getItem(CALCULATOR_CARRY_KEY);
      if (raw) {
        const carry = JSON.parse(raw) as CalculatorCarry;
        const [firstName, ...rest] = (carry.name ?? '').trim().split(/\s+/);
        setAnswers((prev) => ({
          ...prev,
          firstName: prev.firstName || firstName || '',
          lastName: prev.lastName || rest.join(' '),
          email: prev.email || (carry.email ?? ''),
          phone: prev.phone || (carry.phone ?? ''),
          gia: prev.gia || (carry.gia ?? ''),
        }));
      }
    } catch {
      // A malformed or blocked store just means an unprefilled form.
    }
    setIsOpen(true);
    setStep('property');
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Reset after the exit animation so the form does not visibly blank out.
    setTimeout(() => {
      setStep('property');
      setAnswers(EMPTY_ANSWERS);
      setFiles(EMPTY_FILES);
      setErrors({});
      setTier('architectural');
    }, 300);
  }, []);

  // Setting a field clears its error, so mistakes recover as the user types.
  const setAnswer = useCallback((key: keyof FeasibilityAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev));
  }, []);

  return (
    <FeasibilityContext.Provider
      value={{
        isOpen, openModal, closeModal, step, setStep, answers, setAnswer, files, setFiles, errors, setErrors,
        tier, setTier,
      }}
    >
      {children}
    </FeasibilityContext.Provider>
  );
};
