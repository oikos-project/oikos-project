import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
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

describe('Home', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the welcome message and login/register buttons when logged out', () => {
    mockedUseAuth.mockReturnValue({ isLoggedIn: false });
    render(
      <ChakraProvider>
        <Router>
          <Home />
        </Router>
      </ChakraProvider>
    );

    expect(screen.getByText('Welcome to Oikos Frontend!')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('redirects to /main when logged in', () => {
    mockedUseAuth.mockReturnValue({ isLoggedIn: true });
    render(
      <ChakraProvider>
        <Router>
          <Home />
        </Router>
      </ChakraProvider>
    );

    expect(mockedUseNavigate).toHaveBeenCalledWith('/main');
  });
});
