import React from 'react';
import type { AccountType } from '../context/WizardContext';

// Icons
const PersonIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BuildingIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <path d="M9 3v18" />
    <path d="M3 9h6" />
    <path d="M3 15h6" />
    <path d="M13 7h5" />
    <path d="M13 11h5" />
    <path d="M13 15h5" />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface RoleCardProps {
  type: AccountType;
  selected: boolean;
  onSelect: () => void;
}

const labels: Record<AccountType, string> = {
  personal: 'Personal',
  business: 'Business',
};

const RoleCard: React.FC<RoleCardProps> = ({ type, selected, onSelect }) => {
  const Icon = type === 'personal' ? PersonIcon : BuildingIcon;

  return (
    <button
      id={`role-${type}`}
      type="button"
      onClick={onSelect}
      className={`
        w-full flex items-center justify-between rounded-xl border px-4 py-3.5
        text-sm font-medium transition-all duration-200 cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        ${
          selected
            ? 'border-blue-600 bg-blue-50 text-blue-700'
            : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/30'
        }
      `}
      aria-pressed={selected}
    >
      <span className="flex items-center gap-3">
        <span className={selected ? 'text-blue-600' : 'text-gray-500'}>
          <Icon />
        </span>
        <span>{labels[type]}</span>
      </span>
      <span
        className={`
          flex items-center justify-center h-5 w-5 rounded-full border-2 transition-all duration-200
          ${selected ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white'}
        `}
      >
        {selected && <CheckIcon />}
      </span>
    </button>
  );
};

export default RoleCard;
