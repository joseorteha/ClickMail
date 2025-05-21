import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';

const SunIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.414-1.414M6.464 6.464L5.05 5.05m12.02 0l-1.414 1.414M6.464 17.536l-1.414 1.414"/></svg>
);
const MoonIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
);
const MenuIcon = (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
);
const CloseIcon = (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur shadow-md transition-colors duration-300 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo1.svg" alt="Logo ClickMail" className="w-8 h-8 transition-transform group-hover:scale-110" />
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-300 tracking-tight transition-colors">ClickMail</span>
        </Link>
        <div className="hidden md:flex gap-4 items-center">
          <button
            onClick={toggleDarkMode}
            className="px-2 py-1 rounded text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Alternar modo oscuro"
          >
            {darkMode ? MoonIcon : SunIcon}
          </button>
          {!user ? (
            <>
              <Link to="/login" className="text-indigo-700 dark:text-indigo-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Iniciar sesión</Link>
              <Link to="/register" className="text-indigo-700 dark:text-indigo-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Crear cuenta</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-indigo-700 dark:text-indigo-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</Link>
              <Link to="/campaign/create" className="text-indigo-700 dark:text-indigo-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Crear campaña</Link>
              <Link to="/profile" className="ml-2 font-semibold text-indigo-600 dark:text-indigo-200 hover:underline transition-colors" style={{ minWidth: 0 }}>
                {user.name}
              </Link>
            </>
          )}
        </div>
        {/* Menú móvil */}
        <button className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-200 dark:bg-gray-700" onClick={() => setOpen(!open)} aria-label="Abrir menú">
          {open ? CloseIcon : MenuIcon}
        </button>
      </div>
      {/* Menú móvil desplegable */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-950 shadow-lg border-t border-gray-200 dark:border-gray-800 px-4 py-4 flex flex-col gap-4 animate-fade-in-down">
          <button
            onClick={toggleDarkMode}
            className="px-2 py-1 rounded text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-max"
            aria-label="Alternar modo oscuro"
          >
            {darkMode ? MoonIcon : SunIcon}
          </button>
          {!user ? (
            <>
              <Link to="/login" className="text-indigo-700 dark:text-indigo-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setOpen(false)}>Iniciar sesión</Link>
              <Link to="/register" className="text-indigo-700 dark:text-indigo-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setOpen(false)}>Crear cuenta</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-indigo-700 dark:text-indigo-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setOpen(false)}>Dashboard</Link>
              <Link to="/campaign/create" className="text-indigo-700 dark:text-indigo-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setOpen(false)}>Crear campaña</Link>
              <Link to="/profile" className="ml-2 font-semibold text-indigo-600 dark:text-indigo-200 hover:underline transition-colors" style={{ minWidth: 0 }} onClick={() => setOpen(false)}>
                {user.name}
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 