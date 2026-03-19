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
    <div className="fixed h-full inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="flex items-center justify-center min-h-full p-4">
        <div
          className={clsx(
            'relative w-full bg-white rounded-2xl shadow-xl flex flex-col',
            widthStyles[width],
            'max-h-[90vh]',
            'overflow-hidden',
            className,
          )}
        >
          {title && (
            <div className="px-4 pt-4 pb-4 border-b border-gray-100 shrink-0">
              <Text variant="subtitle" className="font-semibold text-gray-800">
                {title}
              </Text>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            {children}
          </div>

          {footer && (
            <div className="px-6 py-5 border-t border-gray-100 shrink-0 bg-white rounded-b-2xl">
              <div className="flex justify-end gap-3">
                {footer}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
