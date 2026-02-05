import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import React from 'react';

import { showError, showSuccess } from '@shared/utils/toast';
import { useLoginMutation } from '@features/auth/hooks/mutations/useLoginMutation';
import { AUTH_MESSAGES, ROUTES } from '@shared/constants';
import { validateLoginForm } from '@shared/utils/validation/loginValidation';
import { useAuthStore } from '@store/authStore';

import type { LoginResponse } from '@features/auth/types/login';
import { ROLES } from '@shared/constants/role';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { setAuth, logout } = useAuthStore();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLoginMutation();

  const handleChange =
    (field: 'email' | 'password') => (value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    const validationErrors = validateLoginForm(values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      showError('Invalid form', 'Please check your input');
      return;
    }

    loginMutation.mutate(values, {
      onSuccess: (res: LoginResponse) => {
        const { access_token, user } = res;

        if (user.role !== ROLES.PHOTOGRAPHER) {
          logout();
          showError(
            'Access denied',
            'Customer please login using mobile app',
          );
          return;
        }

        setAuth(user, access_token);
        showSuccess(AUTH_MESSAGES.LOGIN_SUCCESS, AUTH_MESSAGES.WELCOME);
        navigate(ROUTES.HOME, { replace: true });
      },

      onError: (error: unknown) => {
        let message = 'Something went wrong';

        if (
          typeof error === 'object' &&
              error !== null &&
              'response' in error
        ) {
          const axiosError = error as AxiosError<{ message?: string }>;
          message = axiosError.response?.data?.message ?? message;
        }

        showError(AUTH_MESSAGES.LOGIN_ERROR, message);
      },
    });
  };

  return {
    values,
    errors,
    showPassword,
    isLoading: loginMutation.isPending,

    setShowPassword,
    handleChange,
    handleSubmit,
  };
};
