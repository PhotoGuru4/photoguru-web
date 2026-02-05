
import { BrandingPanel } from "@/features/auth/components/BrandingPanel";
import { LoginForm } from "@/features/auth/components/LoginForm";

const Login = () => {
  return (
     <div className="min-h-screen flex">
      {/* Branding Panel - ẩn trên mobile */}
      <BrandingPanel />
      
      {/* Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-white via-white to-[#fdf2f4]">
        <LoginForm />
      </div>
    </div>
  );
};
export default Login;
