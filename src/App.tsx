import React, { useState } from 'react';
import Layout from './components/Layout';
import { WizardProvider, useWizard } from './context/WizardContext';
import Step1Role from './pages/Step1Role';
import Step2Phone from './pages/Step2Phone';
import Step3Otp from './pages/Step3Otp';
import Step4Name from './pages/Step4Name';
import Step5Password from './pages/Step5Password';
import SuccessModal from './components/SuccessModal';

const WizardContent: React.FC = () => {
  const { step, reset } = useWizard();
  const [showSuccess, setShowSuccess] = useState(false);

  // Show success modal when step advances beyond 5
  React.useEffect(() => {
    if (step > 5) setShowSuccess(true);
  }, [step]);

  const handleDashboard = () => {
    setShowSuccess(false);
    reset(); // Go back to step 1 with all fields cleared
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Role />;
      case 2: return <Step2Phone />;
      case 3: return <Step3Otp />;
      case 4: return <Step4Name />;
      case 5: return <Step5Password />;
      default: return <Step5Password />;
    }
  };

  return (
    <>
      <Layout>{renderStep()}</Layout>
      {showSuccess && <SuccessModal onDashboard={handleDashboard} />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
};

export default App;
