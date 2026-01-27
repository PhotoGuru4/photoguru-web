import React from 'react';
import clsx from 'clsx';
import { Text } from '@shared/components/common';

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  width?: 'sm' | 'md' | 'lg';
}

const widthStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export const Modal = ({
  open,
  onClose,
  title,
  children,
  footer,
  className,
  width = 'md',
}: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div
        className={clsx(
          'relative w-full rounded-2xl bg-white p-6 shadow-xl',
          widthStyles[width],
          className,
        )}
      >
        {title && (
          <div className="mb-4">
            <Text variant="subtitle" className="font-semibold text-gray-800">
              {title}
            </Text>
          </div>
        )}

        <div className="space-y-4">{children}</div>

        {footer && (
          <div className="mt-6 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
