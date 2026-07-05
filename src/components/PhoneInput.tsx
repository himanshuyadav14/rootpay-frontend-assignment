import React, { useState } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

interface Country {
  code: string;
  flag: string;
  name: string;
}

const COUNTRIES: Country[] = [
  { code: '+1',   flag: '🇺🇸', name: 'United States' },
  { code: '+44',  flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+91',  flag: '🇮🇳', name: 'India' },
  { code: '+61',  flag: '🇦🇺', name: 'Australia' },
  { code: '+49',  flag: '🇩🇪', name: 'Germany' },
  { code: '+33',  flag: '🇫🇷', name: 'France' },
  { code: '+39',  flag: '🇮🇹', name: 'Italy' },
  { code: '+34',  flag: '🇪🇸', name: 'Spain' },
  { code: '+55',  flag: '🇧🇷', name: 'Brazil' },
  { code: '+52',  flag: '🇲🇽', name: 'Mexico' },
  { code: '+81',  flag: '🇯🇵', name: 'Japan' },
  { code: '+82',  flag: '🇰🇷', name: 'South Korea' },
  { code: '+86',  flag: '🇨🇳', name: 'China' },
  { code: '+65',  flag: '🇸🇬', name: 'Singapore' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+92',  flag: '🇵🇰', name: 'Pakistan' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+94',  flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+977', flag: '🇳🇵', name: 'Nepal' },
  { code: '+60',  flag: '🇲🇾', name: 'Malaysia' },
  { code: '+62',  flag: '🇮🇩', name: 'Indonesia' },
  { code: '+66',  flag: '🇹🇭', name: 'Thailand' },
  { code: '+63',  flag: '🇵🇭', name: 'Philippines' },
  { code: '+84',  flag: '🇻🇳', name: 'Vietnam' },
  { code: '+27',  flag: '🇿🇦', name: 'South Africa' },
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: '+20',  flag: '🇪🇬', name: 'Egypt' },
  { code: '+31',  flag: '🇳🇱', name: 'Netherlands' },
  { code: '+46',  flag: '🇸🇪', name: 'Sweden' },
  { code: '+47',  flag: '🇳🇴', name: 'Norway' },
  { code: '+45',  flag: '🇩🇰', name: 'Denmark' },
  { code: '+41',  flag: '🇨🇭', name: 'Switzerland' },
  { code: '+1-CA',flag: '🇨🇦', name: 'Canada' },
  { code: '+7',   flag: '🇷🇺', name: 'Russia' },
  { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
  { code: '+48',  flag: '🇵🇱', name: 'Poland' },
  { code: '+90',  flag: '🇹🇷', name: 'Turkey' },
  { code: '+98',  flag: '🇮🇷', name: 'Iran' },
  { code: '+64',  flag: '🇳🇿', name: 'New Zealand' },
];

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, error }) => {
  const [selected, setSelected] = useState<Country>(COUNTRIES[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-500">
        Mobile Number<span className="text-red-500">*</span>
      </label>
      <div
        className={`
          flex rounded-lg border transition-all duration-200
          focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500
          ${error ? 'border-red-400' : 'border-gray-300'}
        `}
      >
        {/* Country selector */}
        <div className="relative">
          <button
            type="button"
            id="phone-country-code"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-50 border-r border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors h-full focus:outline-none whitespace-nowrap rounded-l-lg"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <span>{selected.flag}</span>
            <span>{selected.code}</span>
            <svg className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} viewBox="0 0 12 8" fill="none">
              <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          {open && (
            <ul
              role="listbox"
              className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-xl min-w-[220px] max-h-64 overflow-y-auto"
            >
              {COUNTRIES.map((country) => (
                <li
                  key={country.code}
                  role="option"
                  aria-selected={selected.code === country.code}
                  onClick={() => { setSelected(country); setOpen(false); }}
                  className={`flex items-center gap-2.5 px-3 py-2.5 text-sm cursor-pointer hover:bg-blue-50 transition-colors
                    ${selected.code === country.code ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                >
                  <span className="text-base">{country.flag}</span>
                  <span className="flex-1">{country.name}</span>
                  <span className="text-gray-400 text-xs">{country.code}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Phone number input */}
        <input
          id="phone-number"
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
          placeholder="6543998239"
          maxLength={12}
          className="flex-1 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-white"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default PhoneInput;
