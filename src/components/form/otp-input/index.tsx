import React, { useState, useCallback, memo } from 'react';
import './index.css';
import SingleInput from './SingleOTPInput';

interface OTPInputProps {
  length: number; // Number of inputs
  onChangeOTP: (otp: string) => void; // Handle onOTPChange to use its value

  autoFocus?: boolean; // Auto focus to input programmatically
  isNumberInput?: boolean; // If otp is number
  disabled?: boolean;

  style?: React.CSSProperties; // Style for container OTP
  className?: string; // Class for container OTP

  inputStyle?: React.CSSProperties; // Style for input
  inputClassName?: string; // Class for input
}

export const OTPInputComponent = (props: OTPInputProps) => {
  const {
    length,
    isNumberInput,
    autoFocus,
    disabled,
    onChangeOTP,
    className = 'otpContainer',
    inputClassName = 'otpInput',
    inputStyle,
    ...rest
  } = props;

  // Define state activeInput = 0
  const [activeInput, setActiveInput] = useState(0);

  // Define state otpValues = array with <length> items with default value = ""
  const [otpValues, setOTPValues] = useState(Array<string>(length).fill(''));

  // helpers
  // Define some helper functions
  const focusInput = useCallback(
    (inputIndex: number) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length]
  );
  // Handle onFocus input
  const handleOnFocus = useCallback(
    (index: number) => () => {
      focusInput(index);
    },
    [focusInput]
  );

  const getRightValue = useCallback(
    (str: string) => {
      const changedValue = str;

      if (!isNumberInput || !changedValue) {
        return changedValue;
      }

      return Number(changedValue) >= 0 ? changedValue : '';
    },
    [isNumberInput]
  );

  // Hanlde onBlur input
  const handleOnBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  const handleOtpChange = useCallback(
    (otp: string[]) => {
      const otpValue = otp.join('');
      onChangeOTP(otpValue);
    },
    [onChangeOTP]
  );

  const changeCodeAtFocus = useCallback(
    (str: string) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = str[0] || '';
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [activeInput, handleOtpChange, otpValues]
  );

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = getRightValue(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, getRightValue]
  );

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const pressedKey = e.key;

      switch (pressedKey) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault();
          if (otpValues[activeInput]) {
            changeCodeAtFocus('');
          } else {
            focusPrevInput();
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          focusNextInput();
          break;
        }
        default: {
          // Ignore all special keys if it is not numeric or alphabet characters
          if (pressedKey.match(/^[^a-zA-Z0-9]$/)) {
            e.preventDefault();
          }

          break;
        }
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
  );

  // Handle onPaste input
  const handleOnPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData('text/plain')
        .trim()
        .slice(0, length - activeInput)
        .split('');
      const pastedCopy = [...pastedData];
      if (pastedData) {
        let nextFocusIndex = 0;
        const updatedOTPValues = [...otpValues];
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(pastedData.shift() || val);
            if (changedValue) {
              updatedOTPValues[index] = changedValue;
              nextFocusIndex = index;
            }
          }
        });
        setOTPValues(updatedOTPValues);
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
      }
      handleOtpChange(pastedCopy);
    },
    [activeInput, getRightValue, length, otpValues]
  );

  return (
    <div className={className} {...rest}>
      {Array(length)
        .fill('')
        .map((_, index) => (
          <SingleInput
            type="text"
            pattern="\d*"
            key={`SingleInput-${index}`}
            focus={activeInput === index}
            value={otpValues && otpValues[index]}
            autoFocus={autoFocus}
            onFocus={handleOnFocus(index)}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            onBlur={handleOnBlur}
            onPaste={handleOnPaste}
            style={inputStyle}
            className={inputClassName}
            disabled={disabled}
          />
        ))}
    </div>
  );
};

const OTPInput = memo(OTPInputComponent);
export default OTPInput;
