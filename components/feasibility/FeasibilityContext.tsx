import React, { createContext, useContext, useState, useCallback } from 'react';

interface FeasibilityFormData {
  // Step 1: Property Details
  address: string;
  buildingType: string;
  approximateFloorArea: string;
  numberOfFloors: string;
  hasFloorPlans: boolean;
  // Step 2: Project Info
  targetUnitMix: string;
  planningRoute: string;
  timeline: string;
  additionalNotes: string;
  // Step 3: Contact Details
  fullName: string;
  email: string;
  phone: string;
  company: string;
}

interface FeasibilityContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: FeasibilityFormData;
  updateFormData: (data: Partial<FeasibilityFormData>) => void;
  resetForm: () => void;
}

const defaultFormData: FeasibilityFormData = {
  address: '',
  buildingType: '',
  approximateFloorArea: '',
  numberOfFloors: '',
  hasFloorPlans: false,
  targetUnitMix: '',
  planningRoute: '',
  timeline: '',
  additionalNotes: '',
  fullName: '',
  email: '',
  phone: '',
  company: '',
};

const FeasibilityContext = createContext<FeasibilityContextType | null>(null);

export const useFeasibility = () => {
  const context = useContext(FeasibilityContext);
  if (!context) throw new Error('useFeasibility must be used within FeasibilityProvider');
  return context;
};

export const FeasibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FeasibilityFormData>(defaultFormData);

  const openModal = useCallback(() => {
    setIsOpen(true);
    setCurrentStep(0);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setCurrentStep(0);
      setFormData(defaultFormData);
    }, 300);
  }, []);

  const updateFormData = useCallback((data: Partial<FeasibilityFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(defaultFormData);
    setCurrentStep(0);
  }, []);

  return (
    <FeasibilityContext.Provider value={{ isOpen, openModal, closeModal, currentStep, setCurrentStep, formData, updateFormData, resetForm }}>
      {children}
    </FeasibilityContext.Provider>
  );
};
