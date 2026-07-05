import React from 'react';
import { useWizard } from '../context/WizardContext';
import Button from './Button';

// Mask email: jo***@example.com
const maskEmail = (name: string): string => {
  const first = name.slice(0, 2);
  return `${first}***@example.com`;
};

// Mask phone: show last 7 digits
const maskPhone = (phone: string): string => {
  if (!phone) return '—';
  return phone;
};

const CheckCircleIcon: React.FC = () => (
  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mx-auto mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);

interface SummaryRowProps {
  label: string;
  value: string;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-xs font-semibold text-gray-900">{value}</span>
  </div>
);

interface SuccessModalProps {
  onDashboard: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onDashboard }) => {
  const { data } = useWizard();

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.35)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[360px] p-7 animate-fade-in"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      >
        <CheckCircleIcon />

        <h2 id="success-title" className="text-lg font-bold text-gray-900 text-center mb-1">
          You're all set!
        </h2>
        <p className="text-xs text-gray-500 text-center mb-5">
          Here's a quick summary of your account details
        </p>

        {/* Summary table */}
        <div className="mb-5">
          <SummaryRow
            label="Account Type"
            value={data.accountType === 'personal' ? 'Personal' : 'Business'}
          />
          <SummaryRow
            label="Email"
            value={maskEmail(data.firstName || 'jo')}
          />
          <SummaryRow
            label="Name"
            value={`${data.firstName} ${data.lastName}`.trim() || 'John Doe'}
          />
          <SummaryRow
            label="Mobile Number"
            value={maskPhone(data.phone) || '9711677390'}
          />
        </div>

        {/* Security note */}
        <div className="flex items-center gap-2 mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <p className="text-xs text-gray-500">
            Your account is secured with bank-level security
          </p>
        </div>

        <Button
          id="go-to-dashboard"
          variant="primary"
          onClick={onDashboard}
          className="w-full"
        >
          Go To Dashboard
        </Button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SuccessModal;
