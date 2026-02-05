import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import { ROUTES } from '@shared/constants/routes';

export const AuthGuard = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};
