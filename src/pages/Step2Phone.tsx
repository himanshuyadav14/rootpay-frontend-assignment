import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import PhoneInput from '../components/PhoneInput';
import Button from '../components/Button';
import { useWizard } from '../context/WizardContext';

const Step2Phone: React.FC = () => {
  const { step, data, updateData, nextStep, prevStep } = useWizard();
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!data.phone || data.phone.length < 7) {
      setError('Please enter a valid mobile number.');
      return;
    }
    setError('');
    nextStep();
  };

  return (
    <>
      <ProgressBar currentStep={step} totalSteps={5} />

      <h2 className="text-base font-semibold text-gray-900 mb-6">OTP Verification</h2>

      <div className="mb-8">
        <PhoneInput
          value={data.phone}
          onChange={(val) => {
            updateData({ phone: val });
            if (error) setError('');
          }}
          error={error}
        />
      </div>

      <div className="flex items-center justify-between gap-3 mt-auto pt-2">
        <Button
          id="step2-back"
          variant="secondary"
          onClick={prevStep}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          id="step2-continue"
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

export default Step2Phone;
