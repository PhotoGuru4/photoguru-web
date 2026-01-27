import React from 'react';
import clsx from 'clsx';

export type TextVariant = 'subtitle' | 'body' | 'caption' | 'small';
export type TextColor = 'default' | 'muted' | 'pink' | 'pinkSoft' | 'white';

interface TextProps {
  children: React.ReactNode;
  as?: React.ElementType;
  variant?: TextVariant;
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
  lineClamp?: 1 | 2 | 3 | 4;
  className?: string;
  maxWidth?: string;
}

const variantStyles: Record<TextVariant, string> = {
  subtitle: 'text-subtitle',
  body: 'text-body',
  caption: 'text-caption',
  small: 'text-small',
};

const colorStyles: Record<TextColor, string> = {
  default: 'text-gray-800',
  muted: 'text-gray-400',
  pink: 'text-pink-500',
  pinkSoft: 'text-pink-400',
  white: 'text-white',
};

const lineClampStyles: Record<NonNullable<TextProps['lineClamp']>, string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
};

export const Text = ({
  as: Component = 'p',
  children,
  variant = 'body',
  color = 'default',
  align = 'left',
  lineClamp,
  className,
  maxWidth,
}: TextProps) => {
  return (
    <Component
      className={clsx(
        variantStyles[variant],
        colorStyles[color],
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        lineClamp && lineClampStyles[lineClamp],
        className,
      )}
      style={maxWidth ? { maxWidth } : undefined}
    >
      {children}
    </Component>
  );
};

export default Text;
