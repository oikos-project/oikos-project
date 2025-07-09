import { getApiBaseUrl } from '../../shared/utils/api';
import axios from 'axios';

export interface AuthResponse {
  message?: string;
  error?: string;
  access_token?: string;
}

export const getToken = (): string | null => {
  return localStorage.getItem('access_token');
};

export const removeToken = (): void => {
  localStorage.removeItem('access_token');
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const backendUrl = getApiBaseUrl();
  try {
    const response = await axios.post(`${backendUrl}/auth/login`, {
      email,
      password,
    });

    console.log('Login response data:', response.data); // Debugging line

    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      console.log('Access token stored:', response.data.access_token); // Debugging line
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { error: error.response.data.error || error.response.data.message || 'Login failed.' };
    } else {
      console.error('Login API error:', error);
      return { error: 'Network error or server is unreachable.' };
    }
  }
};

export const register = async (email: string, password: string): Promise<AuthResponse> => {
  const backendUrl = getApiBaseUrl();
  try {
    const response = await axios.post(`${backendUrl}/auth/register`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { error: error.response.data.error || error.response.data.message || 'Registration failed.' };
    } else {
      console.error('Register API error:', error);
      return { error: 'Network error or server is unreachable.' };
    }
  }
};

export const logout = async (): Promise<AuthResponse> => {
  removeToken();
  console.log('Logout function called.');
  return { message: 'Logged out successfully.' };
};
