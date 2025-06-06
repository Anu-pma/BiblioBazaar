
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  address?: string;
}

// interface AuthContextType {
//   user: User | null;
//   signIn: (username: string, password: string) => Promise<void>;
//   signUp: (username: string, password: string, email: string, address?: string) => Promise<void>;
//   updateAddress: (address: string) => Promise<void>;
//   signOut: () => void;
//   isLoading: boolean;
// }

interface AuthContextType {
  user: User | null;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string, email: string, address?: string) => Promise<void>;
  updateAddress: (address: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
  signInWithGoogle: (token: string, userData: User) => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:3000/api/v1'; // Update to match your backend API URL

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      fetchUserInfo(token, userId);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserInfo = async (token: string, userId: string) => {
    try {
      const response = await fetch(`${API_URL}/get-user-information`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'id': userId
        }
      });

      if (!response.ok) throw new Error('Failed to fetch user info');

      const userData = await response.json();
      setUser({
        id: userData._id,
        username: userData.username,
        email: userData.email,
        role: userData.role || 'user',
        address: userData.address
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/signin');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (token: string, userData: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userData.id || (userData as any)._id);

    console.log('Token:', token);
    console.log('User:', userData);
  
    setUser(userData);
    toast.success('Successfully signed in with Google!');
    navigate('/books');
  };

  const signIn = async (username: string, password: string) => {
    try {
      if (username.length < 5) {
        toast.error('Username must be at least 5 characters long');
        return;
      }

      const response = await fetch(`${API_URL}/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign in');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.id || data._id);

      // Fetch user info to get complete profile
      await fetchUserInfo(data.token, data.id || data._id);

      toast.success('Successfully signed in!');
      
      // Navigate based on role
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/books');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign in');
      console.error('Sign in error:', error);
    }
  };

  const signUp = async (username: string, password: string, email: string, address?: string) => {
    try {
      if (username.length < 5) {
        toast.error('Username must be at least 5 characters long');
        return;
      }

      if (password.length < 5) {
        toast.error('Password must be at least 5 characters long');
        return;
      }

      const response = await fetch(`${API_URL}/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, address }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }

      toast.success('Registration successful! Please sign in.');
      navigate('/signin');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign up');
      console.error('Sign up error:', error);
    }
  };

  const updateAddress = async (address: string) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`${API_URL}/update-address`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'id': userId
        },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update address');
      }

      setUser(prev => prev ? { ...prev, address } : null);
      toast.success('Address updated successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update address');
      console.error('Update address error:', error);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, updateAddress, signOut, isLoading,signInWithGoogle  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};  