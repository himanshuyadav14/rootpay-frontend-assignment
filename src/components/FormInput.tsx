import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, error, hint, id, className = '', ...rest }) => {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-xs font-medium text-gray-500">
        {label}
      </label>
      <input
        id={inputId}
        className={`
          w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400
          outline-none transition-all duration-200
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-300'}
          ${className}
        `}
        {...rest}
      />
      {hint && !error && (
        <p className="text-xs text-gray-400">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
