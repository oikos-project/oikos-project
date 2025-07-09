import { login, logout, register, getToken, removeToken } from './auth';
import axios from 'axios';
import { vi } from 'vitest';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('auth service', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.resetAllMocks();
  });

  describe('login', () => {
    it('stores the token on successful login', async () => {
      const token = 'fake-access-token';
      mockedAxios.post.mockResolvedValue({ data: { access_token: token } });

      await login('test@example.com', 'password');

      expect(localStorage.getItem('access_token')).toBe(token);
    });

    it('returns an error on failed login', async () => {
      const error = { response: { data: { error: 'Invalid credentials' } } };
      mockedAxios.post.mockRejectedValue(error);

      const result = await login('test@example.com', 'wrong-password');

      expect(result.error).toBe('Invalid credentials');
      expect(localStorage.getItem('access_token')).toBeNull();
    });
  });

  describe('register', () => {
    it('returns a success message on successful registration', async () => {
      const message = 'User registered successfully';
      mockedAxios.post.mockResolvedValue({ data: { message } });

      const result = await register('new@example.com', 'password');

      expect(result.message).toBe(message);
    });

    it('returns an error on failed registration', async () => {
      const error = { response: { data: { error: 'Email already exists' } } };
      mockedAxios.post.mockRejectedValue(error);

      const result = await register('test@example.com', 'password');

      expect(result.error).toBe('Email already exists');
    });
  });

  describe('logout', () => {
    it('removes the token from localStorage', async () => {
      localStorage.setItem('access_token', 'fake-token');
      await logout();
      expect(localStorage.getItem('access_token')).toBeNull();
    });
  });

  describe('getToken and removeToken', () => {
    it('getToken returns the token', () => {
      localStorage.setItem('access_token', 'fake-token');
      expect(getToken()).toBe('fake-token');
    });

    it('removeToken removes the token', () => {
      localStorage.setItem('access_token', 'fake-token');
      removeToken();
      expect(getToken()).toBeNull();
    });
  });
});
