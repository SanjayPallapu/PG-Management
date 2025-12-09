import axiosClient from '@/shared/lib/axiosClient';
import { LoginRequest, SignupRequest, JwtResponse, RefreshTokenRequest } from '../types/auth.types';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<JwtResponse> => {
    const response = await axiosClient.post('/auth/login', credentials);
    return response.data;
  },

  signup: async (data: SignupRequest): Promise<JwtResponse> => {
    const response = await axiosClient.post('/auth/signup', data);
    return response.data;
  },

  refreshToken: async (data: RefreshTokenRequest): Promise<JwtResponse> => {
    const response = await axiosClient.post('/auth/refresh', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      await axiosClient.post('/auth/logout', { refreshToken });
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  getCurrentUser: async () => {
    const response = await axiosClient.get('/auth/me');
    return response.data;
  },
};
