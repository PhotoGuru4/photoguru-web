import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from '@features/auth/components/LoginForm';
import { Text, Heading } from '@shared/components/common';
import { ROUTES } from '@shared/constants/routes';
import { BrandingPanel } from '@features/auth/components/BrandingPanel';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <BrandingPanel
        title={
          <>
            Start your journey
            <br />
            <Text color='white'>now</Text>
          </>
        }
        description="If you don't have an account yet, join us and start your journey."
        ctaText="Register"
        onCtaClick={() => navigate(ROUTES.REGISTER)}
      />
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <Heading level={3} align="center" className="mb-2">
            Login
          </Heading>

          <Text align="center" color="muted" className="mb-6">
            Continue your creative journey
          </Text>

          <LoginForm />

          <Text align="center" color="muted" className="mt-6 text-sm">
           Don't have an account?{' '}
            <Link
              to={ROUTES.REGISTER}
              className="text-pink-500 font-semibold hover:underline"
            >
              Register
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
