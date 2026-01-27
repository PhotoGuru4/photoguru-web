import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'solid' | 'outline' | 'gradient' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonIconPosition = 'prefix' | 'suffix';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: ButtonIconPosition;
  fullWidth?: boolean;
  disabled?: boolean;
  shadow?: boolean;
  onClick?: () => void;
  className?: string;
  unstyled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles: Record<ButtonVariant, string> = {
  solid: `
    bg-pink-500 text-white
    hover:bg-pink-600
  `,
  outline: `
    border border-pink-400
    text-pink-500 bg-white
    hover:bg-pink-50
  `,
  gradient: `
    text-white
    bg-gradient-to-r from-pink-400 to-rose-400
    hover:from-pink-500 hover:to-rose-500
  `,
  ghost: `
    bg-transparent
    text-pink-500
    hover:bg-pink-100
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-xs rounded-md',
  md: 'px-4.5 py-2 text-sm rounded-lg',
  lg: 'px-5 py-2 text-base rounded-xl',
};

const shadowStyles = `
  shadow-sm shadow-pink-500/40
  hover:shadow-md hover:shadow-pink-500/40
`;

export const Button = ({
  children,
  variant = 'solid',
  size = 'md',
  icon,
  iconPosition = 'prefix',
  fullWidth = false,
  disabled = false,
  shadow = false,
  onClick,
  className,
  unstyled = false,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-semibold cursor-pointer',
        'transition-all duration-200 ease-out',
        'active:scale-95',
        !unstyled && variantStyles[variant],
        !unstyled && sizeStyles[size],
        shadow && shadowStyles,
        fullWidth && 'w-full',
        disabled && 'opacity-50 pointer-events-none',
        className,
      )}
    >
      {icon && iconPosition === 'prefix' && icon}
      {unstyled ? children : children}
      {icon && iconPosition === 'suffix' && icon}
    </button>
  );
};
