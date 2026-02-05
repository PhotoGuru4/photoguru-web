import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '@features/auth/components/RegisterForm';
import { Text, Heading } from '@shared/components/common';
import { ROUTES } from '@shared/constants/routes';
import { BrandingPanel } from '@features/auth/components/BrandingPanel';

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <Heading level={3} align="center" className="mb-2">
            Register
          </Heading>

          <Text align="center" color="muted" className="mb-6">
            Join thousands of photography enthusiasts
          </Text>

          <RegisterForm />

          <Text align="center" color="muted" className="mt-6 text-sm">
            Already a member?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="text-pink-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </Text>
        </div>
      </div>

      <BrandingPanel
        title={
          <>
            Hello
            <br />
            <Text color='white'>Friends</Text>
          </>
        }
        description="If you already have an account account login here and have fun."
        ctaText="Login"
        onCtaClick={() => navigate(ROUTES.LOGIN)}
      />
    </div>
  );
};

export default Register;
