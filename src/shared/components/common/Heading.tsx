import React, { type JSX } from 'react';
import clsx from 'clsx';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingColor = 'default' | 'muted' | 'pink' | 'pinkSoft' | 'white';

interface HeadingProps {
  children: React.ReactNode;
  level?: HeadingLevel;
  color?: HeadingColor;
  className?: string;
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
}

const colorClasses: Record<HeadingColor, string> = {
  default: 'text-gray-700',
  white: 'text-white',
  muted: 'text-gray-400',
  pink: 'text-pink-500',
  pinkSoft: 'text-pink-400',
};

const levelClasses: Record<HeadingLevel, string> = {
  1: 'text-4xl font-bold',
  2: 'text-3xl font-bold',
  3: 'text-2xl font-semibold',
  4: 'text-xl font-semibold',
  5: 'text-lg font-medium',
  6: 'text-base font-medium',
};

export const Heading = ({
  children,
  level = 1,
  color = 'default',
  className,
  align = 'left',
  truncate = false,
}: HeadingProps) => {
  return React.createElement(
    `h${level}` as keyof JSX.IntrinsicElements,
    {
      className: clsx(
        levelClasses[level],
        colorClasses[color],
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        truncate && 'truncate',
        className,
      ),
    },
    children,
  );
};
