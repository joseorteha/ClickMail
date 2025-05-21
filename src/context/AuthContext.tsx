import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id?: string;
  name: string;
  email: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated API functions for auth
const simulateApiLogin = async (email: string, password: string): Promise<User> => {
  // Simulated API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simple validation
  if (email.trim() === '' || password.trim() === '') {
    throw new Error('Credenciales inválidas');
  }
  
  // For demo purposes, generate a mock token
  const mockToken = btoa(`${email}:${Date.now()}`);
  
  return {
    id: '1',
    name: email.split('@')[0],
    email,
    token: mockToken
  };
};

const simulateApiRegister = async (name: string, email: string, password: string): Promise<User> => {
  // Simulated API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple validation
  if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
    throw new Error('Todos los campos son requeridos');
  }
  
  if (password.length < 8) {
    throw new Error('La contraseña debe tener al menos 8 caracteres');
  }
  
  // For demo purposes, generate a mock token
  const mockToken = btoa(`${email}:${Date.now()}`);
  
  return {
    id: '1',
    name,
    email,
    token: mockToken
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('clickmail_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (e) {
        localStorage.removeItem('clickmail_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await simulateApiLogin(email, password);
      
      // Save user data to localStorage
      localStorage.setItem('clickmail_user', JSON.stringify(userData));
      setUser(userData);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error de inicio de sesión');
      throw e;
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await simulateApiRegister(name, email, password);
      
      // Save user data to localStorage
      localStorage.setItem('clickmail_user', JSON.stringify(userData));
      setUser(userData);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error de registro');
      throw e;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('clickmail_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        loading, 
        login, 
        register, 
        logout, 
        error 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};
