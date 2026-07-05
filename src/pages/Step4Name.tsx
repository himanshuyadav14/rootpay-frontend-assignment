import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { useWizard } from '../context/WizardContext';

const Step4Name: React.FC = () => {
  const { step, data, updateData, nextStep, prevStep } = useWizard();
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!data.firstName.trim()) e.firstName = 'First name is required.';
    if (!data.lastName.trim()) e.lastName = 'Last name is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (validate()) nextStep();
  };

  return (
    <>
      <ProgressBar currentStep={step} totalSteps={5} />

      <h2 className="text-base font-semibold text-gray-900 mb-6">What is your name?</h2>

      <div className="flex flex-col gap-4 mb-8">
        <FormInput
          id="first-name"
          label="First Name"
          placeholder="First"
          value={data.firstName}
          error={errors.firstName}
          onChange={(e) => {
            updateData({ firstName: e.target.value });
            if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
          }}
        />
        <FormInput
          id="last-name"
          label="Last Name"
          placeholder="Last name"
          value={data.lastName}
          error={errors.lastName}
          onChange={(e) => {
            updateData({ lastName: e.target.value });
            if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: undefined }));
          }}
        />
      </div>

      <div className="flex items-center justify-between gap-3 mt-auto pt-2">
        <Button
          id="step4-back"
          variant="secondary"
          onClick={prevStep}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          id="step4-continue"
          variant="primary"
          onClick={handleContinue}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </>
  );
};

export default Step4Name;
