import React from 'react';
import ProgressBar from '../components/ProgressBar';
import RoleCard from '../components/RoleCard';
import Button from '../components/Button';
import { useWizard } from '../context/WizardContext';
import type { AccountType } from '../context/WizardContext';

const Step1Role: React.FC = () => {
  const { step, data, updateData, nextStep, prevStep } = useWizard();

  const handleSelect = (type: AccountType) => {
    updateData({ accountType: type });
  };

  return (
    <>
      <ProgressBar currentStep={step} totalSteps={5} />

      <div className="mb-6">
        <p className="text-sm text-gray-600 leading-snug">
          To join us tell us{' '}
          <span className="font-semibold text-gray-900">what type of account you are opening</span>
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        <RoleCard
          type="personal"
          selected={data.accountType === 'personal'}
          onSelect={() => handleSelect('personal')}
        />
        <RoleCard
          type="business"
          selected={data.accountType === 'business'}
          onSelect={() => handleSelect('business')}
        />
      </div>

      <div className="flex items-center justify-between gap-3 mt-auto pt-2">
        <Button
          id="step1-back"
          variant="secondary"
          onClick={prevStep}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          id="step1-continue"
          variant="primary"
          onClick={nextStep}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </>
  );
};

export default Step1Role;
