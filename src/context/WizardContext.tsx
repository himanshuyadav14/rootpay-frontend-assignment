import React, { createContext, useContext, useState } from 'react';

export type AccountType = 'personal' | 'business';

export interface WizardData {
  accountType: AccountType;
  phone: string;
  otp: string[];
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

interface WizardContextValue {
  step: number;
  data: WizardData;
  setStep: (step: number) => void;
  updateData: (partial: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const WizardContext = createContext<WizardContextValue | null>(null);

const TOTAL_STEPS = 5;

export const WizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>({
    accountType: 'personal',
    phone: '',
    otp: ['', '', '', ''],
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const INITIAL_DATA: WizardData = {
    accountType: 'personal',
    phone: '',
    otp: ['', '', '', ''],
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  };

  const updateData = (partial: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const nextStep = () => setStep((s) => s + 1); // step 6+ triggers success modal
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const reset = () => {
    setStep(1);
    setData(INITIAL_DATA);
  };

  return (
    <WizardContext.Provider value={{ step, data, setStep, updateData, nextStep, prevStep, reset }}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = (): WizardContextValue => {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used inside WizardProvider');
  return ctx;
};
