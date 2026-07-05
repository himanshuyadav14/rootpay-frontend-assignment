import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import OtpInput from '../components/OtpInput';
import Button from '../components/Button';
import { useWizard } from '../context/WizardContext';

const Step3Otp: React.FC = () => {
  const { step, data, updateData, nextStep, prevStep } = useWizard();
  const [error, setError] = useState('');
  const [resent, setResent] = useState(false);

  const handleContinue = () => {
    const filled = data.otp.filter(Boolean).length;
    if (filled < 4) {
      setError('Please enter the complete 4-digit OTP.');
      return;
    }
    setError('');
    nextStep();
  };

  const handleResend = () => {
    updateData({ otp: ['', '', '', ''] });
    setResent(true);
    setError('');
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <>
      <ProgressBar currentStep={step} totalSteps={5} />

      <h2 className="text-base font-semibold text-gray-900 mb-1">OTP Verification</h2>
      <p className="text-xs text-gray-500 mb-6">
        An OTP has been sent to your mobile number
      </p>

      <div className="mb-2">
        <OtpInput
          value={data.otp}
          onChange={(otp) => {
            updateData({ otp });
            if (error) setError('');
          }}
        />
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      <div className="mt-3 mb-8">
        {resent ? (
          <p className="text-xs text-green-600">OTP resent successfully!</p>
        ) : (
          <p className="text-xs text-gray-500">
            Did not receive OTP?{' '}
            <button
              type="button"
              onClick={handleResend}
              className="text-blue-600 hover:underline font-medium focus:outline-none"
            >
              Resend OTP
            </button>
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 mt-auto pt-2">
        <Button
          id="step3-back"
          variant="secondary"
          onClick={prevStep}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          id="step3-continue"
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

export default Step3Otp;
