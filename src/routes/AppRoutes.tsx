import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@shared/constants/routes';
import { lazy, Suspense } from 'react';
import { AuthGuard } from '@shared/guards/AuthGuard';
import MainLayout from '@shared/layouts/MainLayout';
import { Loading } from '@shared/components/common';

const Register = lazy(() => import('@pages/Register'));
const Login = lazy(() => import('@pages/Login'));
const Home = lazy(() => import('@pages/Home'));
const Booking = lazy(() => import('@pages/Booking'));
const Messages = lazy(() => import('@/pages/Messages'));
const Concept = lazy(() => import('@pages/Concept'));

const PageLoader = () => (
  <Loading/>
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        <Route element={<AuthGuard />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.BOOKING} element={<Booking />} />
            <Route path={ROUTES.MESSAGES} element={<Messages />} />
            <Route path={ROUTES.CONCEPT} element={<Concept />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
