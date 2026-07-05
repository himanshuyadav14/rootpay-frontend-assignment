import React, { useRef } from 'react';

interface OtpInputProps {
  value: string[];
  onChange: (otp: string[]) => void;
  length?: number;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange, length = 4 }) => {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, digit: string) => {
    if (!/^\d?$/.test(digit)) return;
    const next = [...value];
    next[index] = digit;
    onChange(next);
    if (digit && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      refs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    const next = Array(length).fill('');
    pasted.split('').forEach((ch, i) => { next[i] = ch; });
    onChange(next);
    const focusIdx = Math.min(pasted.length, length - 1);
    refs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex gap-3" role="group" aria-label="OTP input">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          id={`otp-digit-${i}`}
          type="number"
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ''}
          onChange={(e) => handleChange(i, e.target.value.slice(-1))}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className="
            otp-input w-12 h-12 text-center text-lg font-semibold text-gray-900
            border border-gray-300 rounded-lg outline-none
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-all duration-200 bg-white
          "
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
};

export default OtpInput;
