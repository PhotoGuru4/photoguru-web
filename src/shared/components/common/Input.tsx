import React from 'react';
import clsx from 'clsx';
import { Text } from '@shared/components/common';

type InputSize = 'sm' | 'md' | 'lg';

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-4 py-1.5 text-sm rounded-md',
  md: 'px-4.5 py-2 text-sm sm:text-base rounded-lg',
  lg: 'px-5 py-2 text-base rounded-xl',
};

interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
  inputSize?: InputSize;
}

export const Input = React.forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const {
    label,
    error,
    icon,
    onIconClick,
    className,
    id,
    inputSize = 'sm',
    ...inputProps
  } = props;

  const inputId = id || inputProps.name;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          className={clsx(
            'w-full border mt-2 focus:outline-none focus:ring-2 transition',
            error
              ? 'border-red-400 focus:ring-red-400'
              : 'border-gray-300 focus:ring-pink-400',
            sizeStyles[inputSize],
            icon && 'pr-11',
            className,
          )}
          ref={ref}
          id={inputId}
          {...inputProps}
        />

        {icon && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/4 text-gray-500 hover:text-gray-600"
            type="button"
            onClick={onIconClick}
            tabIndex={-1}
          >
            {icon}
          </button>
        )}
      </div>

      {error && (
        <Text as="p" className="text-xs mt-2 text-red-500">
          {error}
        </Text>
      )}
    </div>
  );
});

Input.displayName = 'Input';
