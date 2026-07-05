import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading = false,
  children,
  disabled,
  className = '',
  ...rest
}) => {
  const base =
    'inline-flex items-center justify-center rounded-full text-sm font-semibold px-6 py-2.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none';

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
      'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          Loading…
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
