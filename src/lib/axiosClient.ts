import axios from 'axios';
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from '@shared/services/tokenStorage';
import { useAuthStore } from '@store/authStore';
import { ROUTES } from '@shared/constants/routes';
import { API_ENDPOINTS } from '@shared/constants';

const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://photoguru-api.onrender.com/api/v1';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] =[];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers =[];
};

axiosClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute =
      originalRequest?.url?.includes(API_ENDPOINTS.AUTH.LOGIN) ||
      originalRequest?.url?.includes(API_ENDPOINTS.AUTH.REFRESH) ||
      originalRequest?.url?.includes(API_ENDPOINTS.AUTH.LOGOUT);

    const hasToken = !!getAccessToken();

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute &&
      hasToken
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(axiosClient(originalRequest));
          });
        });
      }

      try {
        isRefreshing = true;

        const res = await axios.post(
          `${API_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
          {},
          { withCredentials: true },
        );

        const { access_token } = res.data.data;

        setAccessToken(access_token);

        useAuthStore.getState().updateToken(access_token);

        onRefreshed(access_token);

        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        return await axiosClient(originalRequest);
      } catch (refreshError) {
        removeAccessToken();
        useAuthStore.getState().clearAuth();

        window.location.href = ROUTES.LOGIN;

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
