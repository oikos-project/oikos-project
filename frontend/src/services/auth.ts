import { getApiBaseUrl } from '../utils/api';
import axios from 'axios';

interface AuthResponse {
  message?: string;
  error?: string;
  access_token?: string;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const backendUrl = getApiBaseUrl();
  try {
    const response = await axios.post(`${backendUrl}/auth/login`, {
      email,
      password,
    });

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
  // In a real application, this would typically involve invalidating a token on the backend
  // and clearing local storage/cookies on the frontend.
  console.log('Logout function called.');
  return { message: 'Logged out successfully.' };
};
