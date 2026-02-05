import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { validateRegisterForm } from '@shared/utils/validation/registerValidation';
import { showError, showSuccess } from '@shared/utils/toast';
import { useRegisterMutation } from '@features/auth/hooks/mutations/useRegisterMutation';
import { AUTH_MESSAGES, ROUTES } from '@shared/constants';
import { handleApiError } from '@shared/utils/error-handler';

export const useRegisterForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const registerMutation = useRegisterMutation();

  const handleChange =
    (field: keyof typeof values) => (value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    const validationErrors = validateRegisterForm(values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      showError('Invalid form', 'Please check your input');
      return;
    }

    registerMutation.mutate(values, {
      onSuccess: () => {
        showSuccess(AUTH_MESSAGES.REGISTER_SUCCESS, AUTH_MESSAGES.WELCOME);
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
