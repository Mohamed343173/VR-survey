import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // You could verify the token here
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });
      
      const { user: userData, token: authToken } = response.data;
      setUser(userData);
      setToken(authToken);
      localStorage.setItem('token', authToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    } catch (error) {
      throw error;
    }
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8000/api/admin/login', {
        email,
        password,
      });
      
      const { user: userData, token: authToken } = response.data;
      setUser(userData);
      setToken(authToken);
      localStorage.setItem('token', authToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      
      const { user: userData, token: authToken } = response.data;
      setUser(userData);
      setToken(authToken);
      localStorage.setItem('token', authToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    isAdmin,
    login,
    adminLogin,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
