
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company?: string;
  role?: string;
  createdAt: Date;
  campaignsCreated: number;
  lastActive: Date;
};

interface UserContextType {
  user: UserProfile | null;
  isLoading: boolean;
  updateUser: (userData: Partial<UserProfile>) => void;
  logout: () => void;
  login: (email: string, name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Save user to localStorage whenever it changes
  React.useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const updateUser = (userData: Partial<UserProfile>) => {
    if (!user) return;
    
    setUser({
      ...user,
      ...userData,
      lastActive: new Date(),
    });
  };

  const logout = () => {
    setUser(null);
  };

  const login = (email: string, name: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUser: UserProfile = {
        id: Math.random().toString(36).substring(2, 15),
        name,
        email,
        createdAt: new Date(),
        campaignsCreated: 0,
        lastActive: new Date()
      };
      
      setUser(newUser);
      setIsLoading(false);
    }, 800);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, updateUser, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};
