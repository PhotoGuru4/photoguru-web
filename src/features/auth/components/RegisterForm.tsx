import { useRegisterForm } from '@features/auth/hooks/useRegister';
import { Input, Button } from '@shared/components/common';
import { Eye, EyeOff } from 'lucide-react';

const RegisterForm = () => {
  const {
    values,
    errors,
    showPassword,
    showConfirm,
    isLoading,
    handleChange,
    handleSubmit,
    setShowPassword,
    setShowConfirm,
  } = useRegisterForm();

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        required
        label="User Name"
        placeholder="Enter your user name"
        value={values.username}
        error={errors.username}
        onChange={(e) => handleChange('username')(e.target.value)}
      />

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
        placeholder="Min 8 characters"
        value={values.password}
        error={errors.password}
        onChange={(e) => handleChange('password')(e.target.value)}
        icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        onIconClick={() => setShowPassword((v) => !v)}
      />

      <Input
        required
        label="Confirm Password"
        type={showConfirm ? 'text' : 'password'}
        placeholder="Confirm your password"
        value={values.confirmPassword}
        error={errors.confirmPassword}
        onChange={(e) => handleChange('confirmPassword')(e.target.value)}
        icon={showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        onIconClick={() => setShowConfirm((v) => !v)}
      />

      <Button
        type="submit"
        fullWidth
        shadow
        disabled={isLoading}
        className="mt-2"
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
