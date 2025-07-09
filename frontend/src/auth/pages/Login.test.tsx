import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import { useAuth } from '../../auth/hooks/useAuth';
import { vi } from 'vitest';

// Mock the useAuth hook
vi.mock('../../auth/hooks/useAuth');
const mockedUseAuth = useAuth as jest.Mock;

// Mock the useNavigate hook
const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('Login', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the login form', () => {
    mockedUseAuth.mockReturnValue({ login: vi.fn(), isLoggedIn: false });
    render(
      <ChakraProvider>
        <Router>
          <Login />
        </Router>
      </ChakraProvider>
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('calls the login function on form submission and redirects', async () => {
    const login = vi.fn().mockResolvedValue({ access_token: 'fake-token' });
    mockedUseAuth.mockReturnValue({ login, isLoggedIn: false });

    render(
      <ChakraProvider>
        <Router>
          <Login />
        </Router>
      </ChakraProvider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('test@example.com', 'password');
    });
    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith('/main');
    });
  });

  it('displays an error message on failed login', async () => {
    const login = vi.fn().mockResolvedValue({ error: 'Login failed.' });
    mockedUseAuth.mockReturnValue({ login, isLoggedIn: false });

    render(
      <ChakraProvider>
        <Router>
          <Login />
        </Router>
      </ChakraProvider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrong-password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByTestId('login-message')).toBeInTheDocument();
      expect(screen.getByText('Login failed.')).toBeInTheDocument();
      expect(mockedUseNavigate).not.toHaveBeenCalled();
    });
  });

  it('redirects to /main if already logged in', () => {
    mockedUseAuth.mockReturnValue({ login: vi.fn(), isLoggedIn: true });
    render(
      <ChakraProvider>
        <Router>
          <Login />
        </Router>
      </ChakraProvider>
    );

    expect(mockedUseNavigate).toHaveBeenCalledWith('/main');
  });
});
