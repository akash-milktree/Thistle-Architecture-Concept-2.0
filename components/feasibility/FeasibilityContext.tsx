"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { EMPTY_ANSWERS, EMPTY_FILES, type FeasibilityAnswers, type FeasibilityFiles } from './feasibility';

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
    lede: 'The floor plan is what our architects work from.',
  },
  {
    key: 'details',
    label: 'Contact',
    title: 'Where do we send your feasibility?',
    lede: 'We will use these to prepare your feasibility study and come back to you.',
  },
];

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

  const openModal = useCallback(() => {
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
    }, 300);
  }, []);

  // Setting a field clears its error, so mistakes recover as the user types.
  const setAnswer = useCallback((key: keyof FeasibilityAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev));
  }, []);

  return (
    <FeasibilityContext.Provider
      value={{ isOpen, openModal, closeModal, step, setStep, answers, setAnswer, files, setFiles, errors, setErrors }}
    >
      {children}
    </FeasibilityContext.Provider>
  );
};
