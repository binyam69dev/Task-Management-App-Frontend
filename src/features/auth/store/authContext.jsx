import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../api/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      // Handle backend response format: response.data.data.user
      const userData = response.data?.data?.user || response.data?.user;
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Load user error:', error);
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      console.log('Login response in context:', response);
      
      // Handle backend response format
      if (response.status === 'success' && response.token) {
        const userData = response.data?.user;
        setUser(userData);
        setIsAuthenticated(true);
        toast.success('Login successful');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error in context:', error);
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response.status === 'success' && response.token) {
        const userData = response.data?.user;
        setUser(userData);
        setIsAuthenticated(true);
        toast.success('Registration successful');
        return response;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const updateUser = async (userData) => {
    try {
      const response = await authService.updateProfile(userData);
      const userData = response.data?.data?.user || response.data?.user;
      setUser(userData);
      toast.success('Profile updated successfully');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
