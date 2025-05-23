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
  successMessage: string | null;
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
  
  // Buscar usuario registrado en localStorage
  const registeredUsers = localStorage.getItem('registered_users');
  let userData: User | null = null;
  
  if (registeredUsers) {
    const users = JSON.parse(registeredUsers);
    userData = users.find((u: User) => u.email === email);
  }
  
  // Si no existe usuario registrado, usar mock
  if (!userData) {
    userData = {
      id: '1',
      name: email.split('@')[0],
      email,
      token: btoa(`${email}:${Date.now()}`)
    };
  }
  
  return userData;
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
  
  // Guardar usuario en lista de registrados
  const registeredUsers = localStorage.getItem('registered_users');
  const users = registeredUsers ? JSON.parse(registeredUsers) : [];
  
  const newUser = {
    id: '1',
    name,
    email,
    token: btoa(`${email}:${Date.now()}`)
  };
  
  users.push(newUser);
  localStorage.setItem('registered_users', JSON.stringify(users));
  
  return newUser;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
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
      setSuccessMessage(null);
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
      setSuccessMessage(null);
      const userData = await simulateApiRegister(name, email, password);
      
      // No guardamos el usuario en clickmail_user hasta que haga login
      setSuccessMessage('¡Registro exitoso! Por favor inicia sesión con tus credenciales.');
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
