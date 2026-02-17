import { useRegisterForm } from '@features/auth/hooks/useRegister';
import { Input, Button, Text } from '@shared/components/common';
import { Eye, EyeOff } from 'lucide-react';
import { useProvincesQuery } from '@shared/hooks/queries/useProvincesQuery';
import { useWardsQuery } from '@shared/hooks/queries/useWardsQuery';

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

  const { data: provinces } = useProvincesQuery();

  const selectedProvince = provinces?.find(
    (p) => p.name === values.province,
  );

  const { data: wards } = useWardsQuery(selectedProvince?.code);

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

      <div className="flex gap-4">
        <div className="flex-1 flex flex-col">
          <label className="text-sm font-medium mb-1">
            Province
          </label>
          <select
            className="w-full px-4 py-1.5 border border-gray-300
                      focus:ring-pink-400 rounded-lg text-xs
                      focus:outline-none focus:ring-2
                      truncate"
            value={values.province || ''}
            onChange={(e) => handleChange('province')(e.target.value)}
          >
            <option value="">Select province</option>
            {provinces?.map((province) => (
              <option key={province.code} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>
          {errors.province && (
            <Text className="text-xs text-red-500 mt-1">
              {errors.province}
            </Text>
          )}
        </div>

        <div className="flex-1 flex flex-col">
          <label className="text-sm font-medium mb-1">
            Ward
          </label>
          <select
            disabled={!values.province}
            className={`w-full px-4 py-1.5 border rounded-lg text-xs
                        focus:outline-none focus:ring-2 focus:ring-pink-400
                        truncate
                        ${
    values.province
      ? 'border-gray-300 bg-white'
      : 'border-gray-200 bg-gray-100'
    }`}
            value={values.ward || ''}
            onChange={(e) => handleChange('ward')(e.target.value)}
          >
            <option value="">Select ward</option>
            {wards?.map((ward) => (
              <option key={ward.code} value={ward.name}>
                {ward.name}
              </option>
            ))}
          </select>
          {errors.ward && (
            <Text className="text-xs text-red-500 mt-1">
              {errors.ward}
            </Text>
          )}
        </div>
      </div>

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
