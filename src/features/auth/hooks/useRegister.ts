import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { validateRegisterForm } from '@shared/utils/validation/registerValidation';
import type { RegisterFormErrors } from '@shared/utils/validation/registerValidation';
import { showError, showSuccess } from '@shared/utils/toast';
import { useRegisterMutation } from '@features/auth/hooks/mutations/useRegisterMutation';
import { AUTH_MESSAGES, ROUTES } from '@shared/constants';
import { handleApiError } from '@shared/utils/error-handler';

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  province: string;
  ward: string;
}

export const useRegisterForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState<RegisterFormValues>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    province: '',
    ward: '',
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const registerMutation = useRegisterMutation();

  const handleChange =
    (field: keyof RegisterFormValues) => (value: string) => {
      setValues((prev) => {
        if (field === 'province') {
          return {
            ...prev,
            province: value,
            ward: '',
          };
        }

        return { ...prev, [field]: value };
      });

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    const validationErrors = validateRegisterForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showError('Invalid form', 'Please check your input');
      return;
    }

    registerMutation.mutate(values, {
      onSuccess: () => {
        showSuccess(
          AUTH_MESSAGES.REGISTER_SUCCESS,
          AUTH_MESSAGES.WELCOME,
        );

        navigate(ROUTES.LOGIN, { replace: true });
      },
      onError: (error: unknown) => {
        const message = handleApiError(error);

        if (message.toLowerCase().includes('email')) {
          setErrors((prev) => ({
            ...prev,
            email: message,
          }));
        }

        showError(AUTH_MESSAGES.REGISTER_ERROR, message);
      },
    });
  };

  return {
    values,
    errors,
    showPassword,
    showConfirm,
    isLoading: registerMutation.isPending,
    setShowPassword,
    setShowConfirm,
    handleChange,
    handleSubmit,
  };
};
