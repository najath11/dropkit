import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

const ADMIN_EMAIL = 'njnajath88@gmail.com';
const STORAGE_USERS_KEY = 'dropkit_users';
const STORAGE_SESSION_KEY = 'dropkit_current_user';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredUsers(): User[] {
  try {
    const data = localStorage.getItem(STORAGE_USERS_KEY);
    const users = data ? JSON.parse(data) : [];
    // Ensure admin user exists
    if (!users.some((u: User) => u.email.toLowerCase() === ADMIN_EMAIL.toLowerCase())) {
      users.push({ email: ADMIN_EMAIL, name: 'Admin', password: 'admin' });
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    }
    return users;
  } catch {
    return [{ email: ADMIN_EMAIL, name: 'Admin', password: 'admin' }];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

function getStoredSession(): User | null {
  try {
    const data = localStorage.getItem(STORAGE_SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveSession(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_SESSION_KEY);
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => getStoredSession());

  const isLoggedIn = !!user;
  const isAdmin = !!user && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  // Sync session to localStorage
  useEffect(() => {
    saveSession(user);
  }, [user]);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!found) {
      return { success: false, error: 'Invalid email or password' };
    }

    setUser(found);
    return { success: true };
  };

  const signup = (name: string, email: string, password: string): { success: boolean; error?: string } => {
    const users = getStoredUsers();
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());

    if (exists) {
      return { success: false, error: 'An account with this email already exists' };
    }

    const newUser: User = { email, name, password };
    const updated = [...users, newUser];
    saveUsers(updated);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isLoggedIn, login, signup, logout }}>
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
