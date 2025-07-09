import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { useAuth } from './auth/hooks/useAuth';
import { vi } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';

// Mock the useAuth hook
vi.mock('./auth/hooks/useAuth');
const mockedUseAuth = useAuth as jest.Mock;

describe('App routing', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the Home page for the root path', () => {
    mockedUseAuth.mockReturnValue({ isLoggedIn: false });
    render(
      <ChakraProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </ChakraProvider>
    );
    expect(screen.getByText('Welcome to Oikos Frontend!')).toBeInTheDocument();
  });

  it('renders the Login page for the /login path', () => {
    mockedUseAuth.mockReturnValue({ isLoggedIn: false });
    render(
      <ChakraProvider>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </ChakraProvider>
    );
    expect(screen.getByText('Login to Oikos')).toBeInTheDocument();
  });

  it('renders the Register page for the /register path', () => {
    mockedUseAuth.mockReturnValue({ isLoggedIn: false });
    render(
      <ChakraProvider>
        <MemoryRouter initialEntries={['/register']}>
          <App />
        </MemoryRouter>
      </ChakraProvider>
    );
    expect(screen.getByText('Register for Oikos')).toBeInTheDocument();
  });

  it('redirects to the Home page when a logged-out user tries to access a protected route', () => {
    mockedUseAuth.mockReturnValue({ isLoggedIn: false });
    render(
      <ChakraProvider>
        <MemoryRouter initialEntries={['/main']}>
          <App />
        </MemoryRouter>
      </ChakraProvider>
    );
    expect(screen.getByText('Welcome to Oikos Frontend!')).toBeInTheDocument();
  });

  it('renders the Chat page when a logged-in user accesses the /main path', () => {
    mockedUseAuth.mockReturnValue({ isLoggedIn: true, user: { email: 'test@example.com' } });
    render(
      <ChakraProvider>
        <MemoryRouter initialEntries={['/main']}>
          <App />
        </MemoryRouter>
      </ChakraProvider>
    );
    expect(screen.getByText('OikOS')).toBeInTheDocument();
  });
});
