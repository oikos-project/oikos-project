import React, { createContext, useState, useEffect } from 'react';
import { login as authLogin, logout as authLogout, register as authRegister, getToken } from './services/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<unknown>;
  register: (email: string, password: string) => Promise<unknown>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      // In a real app, you'd validate the token with the backend
      // For now, we'll assume a token means logged in and extract user info if available
      // For simplicity, we're not storing email in token for now, so user will be generic
      setIsLoggedIn(true);
      setUser({ email: 'user@example.com' }); // Placeholder
    }
  }, []);

  const login = async (email: string, password: string) => {
    const result = await authLogin(email, password);
    if (result.access_token) {
      setIsLoggedIn(true);
      setUser({ email: email }); // Set user email on successful login
    }
    return result;
  };

  const register = async (email: string, password: string) => {
    const result = await authRegister(email, password);
    return result;
  };

  const logout = () => {
    authLogout();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


