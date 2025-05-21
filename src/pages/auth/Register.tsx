import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (name.length > 50) {
      setError('El nombre no puede tener más de 50 caracteres');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    try {
      // Simulación de registro exitoso
      login({ name, email });
      navigate('/dashboard');
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <form onSubmit={handleSubmit} className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center text-indigo-700 dark:text-indigo-300">Crear cuenta en ClickMail</h2>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={50}
            className="appearance-none rounded-lg block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            id="email"
            name="email"
            type="email"
            required
            className="appearance-none rounded-lg block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="appearance-none rounded-lg block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800"
            placeholder="Contraseña (mínimo 8 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="text-red-500 dark:text-red-300 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-lg shadow hover:from-indigo-600 hover:to-blue-600 transition"
          >
            Registrarse
          </button>
          <div className="text-sm text-center mt-2">
            <Link to="/login" className="font-medium text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition">¿Ya tienes cuenta? Inicia sesión</Link>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Register; 