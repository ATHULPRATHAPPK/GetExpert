// src/interface/components/OtpInput.tsx
import React, { useRef, useEffect, forwardRef } from 'react';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  index: number;
  focusNextInput: (index: number) => void;
}
const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(
  ({ value, onChange, index, focusNextInput }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (value.length === 1 && index < 3) {
        focusNextInput(index + 1);
      }
    }, [value, index, focusNextInput]);
    useEffect(() => {
      if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current =
          inputRef.current;
      }
    }, [ref]);
    return (
      <input
        ref={inputRef}
        type="text"
        maxLength={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 text-center border rounded mx-1"
      />
    );
  }
);

export default OtpInput;
