import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';

import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
} from '@lib/authSession';

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
});

let isRefreshing = false;

let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

type RetryRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

axiosClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthRoute =
      originalRequest.url?.includes(API_ENDPOINTS.AUTH.LOGIN) ||
      originalRequest.url?.includes(API_ENDPOINTS.AUTH.REFRESH) ||
      originalRequest.url?.includes(API_ENDPOINTS.AUTH.LOGOUT);

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
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(axiosClient(originalRequest));
          });
        });
      }

      try {
        isRefreshing = true;

        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          throw new Error();
        }

        const res = await axiosClient.post(
          API_ENDPOINTS.AUTH.REFRESH,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        const { access_token, refresh_token } = res.data.data;

        setAccessToken(access_token);

        if (refresh_token) {
          setRefreshToken(refresh_token);
        }

        useAuthStore.getState().updateToken(access_token);

        onRefreshed(access_token);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }

        return axiosClient(originalRequest);
      } catch (refreshError) {
        removeAccessToken();
        removeRefreshToken();

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
