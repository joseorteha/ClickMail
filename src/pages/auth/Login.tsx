import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MailIcon, LockIcon } from '../../components/ui/Icons';
import Card from '../../components/ui/Card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, error: authError, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Mostrar error del contexto de autenticación si existe
  useEffect(() => {
    if (authError) {
      setLocalError(authError);
    }
  }, [authError]);
  
  // Redireccionar si ya está autenticado
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <Card className="max-w-md w-full p-0">
          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-center text-indigo-700 dark:text-indigo-300">Iniciar sesión en ClickMail</h2>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="text-gray-400" size={20} />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg block w-full pl-10 px-4 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="text-gray-400" size={20} />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg block w-full pl-10 px-4 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {localError && (
              <div className="text-red-500 dark:text-red-300 text-sm text-center">{localError}</div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-lg shadow hover:from-indigo-600 hover:to-blue-600 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
            
            <div className="flex flex-col gap-2 text-center text-sm mt-2">
              <Link to="/register" className="font-medium text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition">¿No tienes cuenta? Regístrate</Link>
              <Link to="/forgot-password" className="font-medium text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition">¿Olvidaste tu contraseña?</Link>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default Login; 