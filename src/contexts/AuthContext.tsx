import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, JobSeeker, Employer } from '@/types';
import { mockJobSeeker, mockEmployer } from '@/data/mockData';

interface AuthContextType {
  user: User | JobSeeker | Employer | null;
  role: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | JobSeeker | Employer | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  const login = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'job_seeker') {
      setUser(mockJobSeeker);
    } else if (selectedRole === 'employer') {
      setUser(mockEmployer);
    } else {
      setUser({
        id: 'admin1',
        name: 'Admin User',
        email: 'admin@jobportal.com',
        role: 'admin',
      });
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
