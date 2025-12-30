import React, { createContext, useContext, useState, useEffect } from 'react';
import { createInfinityXOneApiClient } from '@/api/api-client';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiClient, setApiClient] = useState(null);
  const { toast } = useToast();

  // Initialize API client
  useEffect(() => {
    const client = createInfinityXOneApiClient({
      baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
    });
    setApiClient(client);
  }, []);

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (!apiClient) return;

      const token = localStorage.getItem('infinityxone_token');
      if (token) {
        apiClient.auth.setToken(token);
        try {
          // For now, just set a mock user if token exists
          const mockUser = {
            id: 'test-user',
            email: 'test@example.com',
            name: 'Test User',
            avatar: null
          };
          setUser(mockUser);
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('infinityxone_token');
        }
      }
      setLoading(false);
    };

    if (apiClient) {
      checkAuth();
    }
  }, [apiClient]);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);

      // Mock authentication - no Firebase/GitHub OAuth bullshit
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: 'google-user',
        email: 'google@example.com',
        name: 'Google User',
        avatar: 'https://via.placeholder.com/40',
        provider: 'google'
      };

      // Store mock token
      localStorage.setItem('infinityxone_token', mockToken);
      if (apiClient) {
        apiClient.auth.setToken(mockToken);
      }
      setUser(mockUser);

      toast({
        title: "Welcome back!",
        description: "Successfully logged in with Google (mock)",
        className: "bg-[#0066FF] text-white border-none"
      });

      return mockUser;
    } catch (error) {
      console.error('Mock login failed:', error);
      toast({
        title: "Login Failed",
        description: "Mock login failed",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGithub = async () => {
    try {
      setLoading(true);

      // Mock authentication - no Firebase/GitHub OAuth bullshit
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: 'github-user',
        email: 'github@example.com',
        name: 'GitHub User',
        avatar: 'https://via.placeholder.com/40',
        provider: 'github'
      };

      // Store mock token
      localStorage.setItem('infinityxone_token', mockToken);
      if (apiClient) {
        apiClient.auth.setToken(mockToken);
      }
      setUser(mockUser);

      toast({
        title: "Welcome back!",
        description: "Successfully logged in with GitHub (mock)",
        className: "bg-[#0066FF] text-white border-none"
      });

      return mockUser;
    } catch (error) {
      console.error('Mock login failed:', error);
      toast({
        title: "Login Failed",
        description: "Mock login failed",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      // Sign out from backend (mock)
      if (apiClient) {
        try {
          // Mock logout - just clear the token
          apiClient.auth.setToken('');
        } catch (error) {
          console.warn('Backend logout failed:', error);
        }
      }

      // Clear local state
      localStorage.removeItem('infinityxone_token');
      setUser(null);

      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
        className: "bg-gray-800 text-white border-none"
      });
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, clear local state
      localStorage.removeItem('infinityxone_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    apiClient,
    loginWithGoogle,
    loginWithGithub,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};