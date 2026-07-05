import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';
import { useWizard } from '../context/WizardContext';

const Step5Password: React.FC = () => {
  const { step, data, updateData, nextStep, prevStep } = useWizard();
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!data.password || data.password.length < 6) {
      e.password = 'Must be atleast 6 characters';
    }
    if (data.confirmPassword !== data.password) {
      e.confirmPassword = 'Both passwords must match';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = async () => {
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    nextStep();
  };

  return (
    <>
      <ProgressBar currentStep={step} totalSteps={5} />

      <h2 className="text-base font-semibold text-gray-900 mb-6">
        Create Password for your account
      </h2>

      <div className="flex flex-col gap-4 mb-8">
        <PasswordInput
          id="new-password"
          label="Enter new password"
          value={data.password}
          onChange={(e) => {
            updateData({ password: e.target.value });
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          placeholder="Password"
          hint="Must be atleast 6 characters"
          error={errors.password}
          disabled={loading}
        />
        <PasswordInput
          id="confirm-password"
          label="Confirm password"
          value={data.confirmPassword}
          onChange={(e) => {
            updateData({ confirmPassword: e.target.value });
            if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
          placeholder="Confirm password"
          hint="Both passwords must match"
          error={errors.confirmPassword}
          disabled={loading}
        />
      </div>

      <div className="flex items-center justify-between gap-3 mt-auto pt-2">
        <Button
          id="step5-back"
          variant="secondary"
          onClick={prevStep}
          disabled={loading}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          id="step5-continue"
          variant="primary"
          onClick={handleContinue}
          loading={loading}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </>
  );
};

export default Step5Password;
