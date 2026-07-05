import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-6">
      <div
        className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
      />
    </div>
  );
};

export default ProgressBar;
