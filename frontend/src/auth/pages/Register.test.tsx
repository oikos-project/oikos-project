import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from './Register';
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

describe('Register', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the registration form', () => {
    mockedUseAuth.mockReturnValue({ register: vi.fn(), isLoggedIn: false });
    render(
      <ChakraProvider>
        <Router>
          <Register />
        </Router>
      </ChakraProvider>
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('calls the register function on form submission and redirects', async () => {
    const register = vi.fn().mockResolvedValue({ message: 'Registration successful!' });
    mockedUseAuth.mockReturnValue({ register, isLoggedIn: false });

    render(
      <ChakraProvider>
        <Router>
          <Register />
        </Router>
      </ChakraProvider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith('test@example.com', 'password');
      expect(mockedUseNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('displays an error message on failed registration', async () => {
    const register = vi.fn().mockResolvedValue({ error: 'Registration failed.' });
    mockedUseAuth.mockReturnValue({ register, isLoggedIn: false });

    render(
      <ChakraProvider>
        <Router>
          <Register />
        </Router>
      </ChakraProvider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByTestId('register-message')).toHaveTextContent(/registration failed/i);
    });
  });

  it('redirects to /main if already logged in', () => {
    mockedUseAuth.mockReturnValue({ register: vi.fn(), isLoggedIn: true });
    render(
      <ChakraProvider>
        <Router>
          <Register />
        </Router>
      </ChakraProvider>
    );

    expect(mockedUseNavigate).toHaveBeenCalledWith('/main');
  });
});
