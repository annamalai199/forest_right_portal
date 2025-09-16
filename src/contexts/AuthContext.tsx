import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, AuthState } from '@/types/auth';

const AuthContext = createContext<AuthState | undefined>(undefined);

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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing auth in localStorage
    const savedUser = localStorage.getItem('fra-user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock authentication - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      name: role === 'user' ? 'Ramesh Kumar' : role === 'officer' ? 'Priya Sharma' : 'Dr. Anil Gupta',
      email,
      role,
      district: role === 'user' ? 'Bastar' : role === 'officer' ? 'Kanker' : undefined,
      state: 'Chhattisgarh'
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('fra-user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('fra-user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};