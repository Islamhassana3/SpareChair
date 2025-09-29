import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { authService } from '../services/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userType?: 'GUEST' | 'HOST';
    businessName?: string;
    businessType?: string;
  }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { user: savedUser, token } = authService.getAuthData();
        if (savedUser && token) {
          // Verify token is still valid
          const { user: currentUser } = await authService.getProfile();
          setUser(currentUser);
        }
      } catch (error) {
        // Token is invalid, clear storage
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    authService.setAuthData(response.user, response.token);
    setUser(response.user);
  };

  const register = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userType?: 'GUEST' | 'HOST';
    businessName?: string;
    businessType?: string;
  }) => {
    const response = await authService.register(data);
    authService.setAuthData(response.user, response.token);
    setUser(response.user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};