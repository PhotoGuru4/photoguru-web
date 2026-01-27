import clsx from 'clsx';
import { Text } from '@shared/components/common';

export type BadgeColor = 'green' | 'yellow' | 'gray' | 'pink';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  label: string;
  color?: BadgeColor;
  size?: BadgeSize;
  className?: string;
}

const colorStyles: Record<BadgeColor, string> = {
  green: `
    bg-green-100
    text-green-700
    border border-green-200
  `,
  yellow: `
    bg-yellow-100
    text-yellow-700
    border border-yellow-200
  `,
  gray: `
    bg-gray-100
    text-gray-600
    border border-gray-200
  `,
  pink: `
    bg-pink-100
    text-pink-500
  `,
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-1.5 text-sm',
  lg: 'px-5 py-2 text-base',
};

export const Badge = ({
  label,
  color = 'gray',
  size = 'md',
  className,
}: BadgeProps) => {
  return (
    <Text
      as="span"
      variant="small"
      className={clsx(
        'inline-flex items-center justify-center',
        'rounded-full font-semibold whitespace-nowrap',
        colorStyles[color],
        sizeStyles[size],
        className,
      )}
    >
      {label}
    </Text>
  );
};

export default Badge;
