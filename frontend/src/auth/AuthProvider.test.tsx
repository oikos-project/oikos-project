import { render, screen, act } from '@testing-library/react';
import { AuthProvider } from './AuthProvider';
import { AuthContext, AuthContextType } from './AuthContext';
import * as authService from './services/auth';
import { vi } from 'vitest';

// Mock the auth service
vi.mock('./services/auth');

const TestConsumer = () => {
  return (
    <AuthContext.Consumer>
      {(value) => (
        <div>
          <span>Logged In: {String(value.isLoggedIn)}</span>
          {value.user && <span>User: {value.user.email}</span>}
        </div>
      )}
    </AuthContext.Consumer>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('initializes with a logged-out state', () => {
    (authService.getToken as jest.Mock).mockReturnValue(null);
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    expect(screen.getByText('Logged In: false')).toBeInTheDocument();
    expect(screen.queryByText(/User:/)).not.toBeInTheDocument();
  });

  it('initializes with a logged-in state if a token is present', () => {
    (authService.getToken as jest.Mock).mockReturnValue('fake-token');
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    expect(screen.getByText('Logged In: true')).toBeInTheDocument();
    expect(screen.getByText('User: user@example.com')).toBeInTheDocument();
  });

  it('logs in a user and updates the state', async () => {
    (authService.login as jest.Mock).mockResolvedValue({ access_token: 'fake-token' });
    let login: AuthContextType['login'];
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            login = value.login;
            return <TestConsumer />;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await act(async () => {
      await login('test@example.com', 'password');
    });

    expect(screen.getByText('Logged In: true')).toBeInTheDocument();
    expect(screen.getByText('User: test@example.com')).toBeInTheDocument();
  });

  it('logs out a user and updates the state', async () => {
    (authService.getToken as jest.Mock).mockReturnValue('fake-token');
    let logout: AuthContextType['logout'];
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            logout = value.logout;
            return <TestConsumer />;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await act(async () => {
      await logout();
    });

    expect(screen.getByText('Logged In: false')).toBeInTheDocument();
    expect(screen.queryByText(/User:/)).not.toBeInTheDocument();
  });
});
