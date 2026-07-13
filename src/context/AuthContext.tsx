'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkUserSession = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else if (res.status === 401) {
        const refreshRes = await fetch('/api/auth/refresh', { method: 'POST' });
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          setUser(refreshData.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth session:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  const login = async (credentials: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Invalid credentials');
        return false;
      }

      setUser(data.user);
      toast.success(`Welcome back, ${data.user.name}!`);
      return true;
    } catch (error) {
      console.error('Login request failed:', error);
      toast.error('Connection error. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.errors) {
          const errorValues = Object.values(data.errors) as any[];
          toast.error(errorValues[0][0] || 'Validation failed');
        } else {
          toast.error(data.error || 'Registration failed');
        }
        return false;
      }

      setUser(data.user);
      toast.success(`Account created! Welcome, ${data.user.name}!`);
      return true;
    } catch (error) {
      console.error('Registration request failed:', error);
      toast.error('Connection error. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        setUser(null);
        toast.success('Logged out successfully.');
        router.push('/');
        router.refresh();
      } else {
        toast.error('Failed to log out.');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkUserSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
