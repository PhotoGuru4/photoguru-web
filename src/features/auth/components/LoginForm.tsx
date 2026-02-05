import { Eye, EyeOff } from 'lucide-react';
import { Button, Input } from '@shared/components/common';
import { useLoginForm } from '@features/auth/hooks/useLogin';

export const LoginForm = () => {
  const {
    values,
    errors,
    showPassword,
    isLoading,
    handleChange,
    handleSubmit,
    setShowPassword,
  } = useLoginForm();

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        required
        label="Email"
        placeholder="Enter your email address"
        value={values.email}
        error={errors.email}
        onChange={(e) => handleChange('email')(e.target.value)}
      />

      <Input
        required
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        value={values.password}
        error={errors.password}
        onChange={(e) => handleChange('password')(e.target.value)}
        icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        onIconClick={() => setShowPassword((v) => !v)}
      />

      <Button
        type="submit"
        fullWidth
        shadow
        disabled={isLoading}
        className="mt-2"
        onClick={handleSubmit}
      >
        Login
      </Button>
    </form>
  );
};
