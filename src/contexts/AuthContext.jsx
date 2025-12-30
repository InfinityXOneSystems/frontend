import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, signInWithPopup, githubProvider, googleProvider, signOut } from '@/lib/firebase';
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
          const userProfile = await apiClient.auth.verify();
          setUser(userProfile);
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

      // Firebase authentication
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // For now, use mock credentials since backend expects email/password
      // In production, backend should accept Firebase ID tokens
      if (apiClient) {
        // Mock login - in real implementation, send Firebase token to backend
        const response = await apiClient.auth.login();
        const { token, user: userProfile } = response;

        // Store token
        localStorage.setItem('infinityxone_token', token);
        apiClient.auth.setToken(token);
        setUser(userProfile);

        toast({
          title: "Welcome back!",
          description: "Successfully logged in to InfinityXOne",
          className: "bg-[#0066FF] text-white border-none"
        });

        return userProfile;
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Unable to sign in. Please try again.",
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

      // Firebase authentication
      const result = await signInWithPopup(auth, githubProvider);
      const firebaseUser = result.user;

      // For now, use mock credentials since backend expects email/password
      // In production, backend should accept Firebase ID tokens
      if (apiClient) {
        // Mock login - in real implementation, send Firebase token to backend
        const response = await apiClient.auth.login();
        const { token, user: userProfile } = response;

        // Store token
        localStorage.setItem('infinityxone_token', token);
        apiClient.auth.setToken(token);
        setUser(userProfile);

        toast({
          title: "Welcome back!",
          description: "Successfully logged in to InfinityXOne",
          className: "bg-[#0066FF] text-white border-none"
        });

        return userProfile;
      }
    } catch (error) {
      console.error('GitHub login failed:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Unable to sign in with GitHub. Please try again.",
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

      // Sign out from Firebase
      await signOut(auth);

      // Sign out from backend
      if (apiClient) {
        try {
          await apiClient.auth.logout();
        } catch (error) {
          console.warn('Backend logout failed:', error);
        }
      }

      // Clear local state
      localStorage.removeItem('infinityxone_token');
      if (apiClient) {
        apiClient.auth.setToken('');
      }
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