import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { register as apiRegister, login as apiLogin } from '../services/authService';

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
  successMessage: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Cargar usuario y token del localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('clickmail_user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      try {
        const userData = JSON.parse(savedUser);
        setUser({ ...userData, token });
      } catch (e) {
        localStorage.removeItem('clickmail_user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);
      const res = await apiLogin({ email, password });
      // Guardar token y usuario
      localStorage.setItem('token', res.token);
      localStorage.setItem('clickmail_user', JSON.stringify(res.user));
      setUser({ ...res.user, token: res.token });
    } catch (e: any) {
      setError(e.message || 'Error de inicio de sesión');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);
      await apiRegister({ name, email, password });
      setSuccessMessage('¡Registro exitoso! Por favor inicia sesión con tus credenciales.');
    } catch (e: any) {
      setError(e.message || 'Error de registro');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('clickmail_user');
    localStorage.removeItem('token');
    setUser(null);
    setSuccessMessage(null);
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
        error,
        successMessage
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
