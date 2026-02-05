import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@shared/types';
import { removeAccessToken } from '@shared/services/tokenStorage';
import { API_ENDPOINTS } from '@shared/constants';
import { POST } from '@shared/services/apiService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  updateToken: (token: string) => void;
  clearAuth: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: !!localStorage.getItem('accessToken'),

      setAuth: (user, token) => {
        localStorage.setItem('accessToken', token);
        set({ user, isAuthenticated: true });
      },

      updateToken: (token) => {
        localStorage.setItem('accessToken', token);
        set({ isAuthenticated: true });
      },
      clearAuth: () => {
        removeAccessToken();
        set({ user: null, isAuthenticated: false });
      },

      logout: async () => {
        try {
          POST(API_ENDPOINTS.AUTH.LOGOUT);
        } catch (error) {
          console.error('Logout error', error);
        } finally {
          localStorage.removeItem('accessToken');
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
