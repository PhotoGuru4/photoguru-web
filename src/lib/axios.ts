import axios from 'axios';
import { getAccessToken, setAccessToken, removeAccessToken } from '@shared/services/tokenStorage';
import { useAuthStore } from '@store/authStore';
import { ROUTES } from '@shared/constants/routes';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://express-api-xxuh.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute =
      originalRequest?.url?.includes('/auth/login') ||
      originalRequest?.url?.includes('/auth/refresh-token');

    const hasToken = !!getAccessToken();

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute &&
      hasToken
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${axiosClient.defaults.baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        const { accessToken } = res.data.data;

        setAccessToken(accessToken);
        useAuthStore.getState().updateToken(accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        removeAccessToken();
        useAuthStore.getState().clearAuth();
        window.location.href = ROUTES.LOGIN;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
