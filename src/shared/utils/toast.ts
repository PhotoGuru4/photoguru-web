import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';

const baseOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showSuccess = (message: string, description?: string) => {
  toast.success(
    description ? `${message} — ${description}` : message,
    baseOptions,
  );
};

export const showError = (message: string, description?: string) => {
  toast.error(
    description ? `${message} — ${description}` : message,
    baseOptions,
  );
};

export const showInfo = (message: string, description?: string) => {
  toast.info(
    description ? `${message} — ${description}` : message,
    baseOptions,
  );
};
