import { createContext } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<unknown>;
  register: (email: string, password: string) => Promise<unknown>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);