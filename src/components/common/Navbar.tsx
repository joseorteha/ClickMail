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

  // Determinar si estamos en la sección de Dashboard (rutas autenticadas)
  const isDashboard = user && window.location.pathname.includes('/dashboard');
  const isLogin = window.location.pathname.includes('/login');
  const isRegister = window.location.pathname.includes('/register');
  const isLanding = window.location.pathname === '/';
  
  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm transition-colors duration-300 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          {isLanding && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400 leading-none">ClickMail</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">por Wizard Solutions</span>
            </div>
          )}
          {!isLanding && (
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400 leading-none">ClickMail</span>
          )}
        </Link>
        
        {/* Menú de navegación desktop */}
        <div className="hidden md:flex items-center gap-6">
          {!user ? (
            // Menú para usuarios no autenticados
            <>
              <Link 
                to="/#describe" 
                className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Producto
              </Link>
              <Link 
                to="/#about" 
                className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Sobre nosotros
              </Link>
              <Link 
                to="/login" 
                className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition shadow-sm"
              >
                Crear cuenta
              </Link>
            </>
          ) : (
            // Menú para usuarios autenticados
            <>
              <Link 
                to="/dashboard" 
                className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/campaign/create" 
                className="text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Crear campaña
              </Link>
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  aria-label="Alternar modo oscuro"
                >
                  {darkMode ? MoonIcon : SunIcon}
                </button>
                <div className="relative group">
                  <button className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="font-medium">{user.name || 'Usuario'}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 origin-top-right transition-all duration-200">
                    <div className="py-1">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        Mi perfil
                      </Link>
                      <button 
                        onClick={handleLogout} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Botón de alternar modo oscuro y menú móvil */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Alternar modo oscuro"
          >
            {darkMode ? MoonIcon : SunIcon}
          </button>
          <button 
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" 
            onClick={() => setOpen(!open)} 
            aria-label="Abrir menú"
          >
            {open ? CloseIcon : MenuIcon}
          </button>
        </div>
      </div>
      
      {/* Menú móvil desplegable */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md border-t border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300">
          <div className="px-4 py-2 space-y-1">
            {!user ? (
              // Menú para usuarios no autenticados
              <>
                <Link 
                  to="/#describe" 
                  className="block py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Producto
                </Link>
                <Link 
                  to="/#about" 
                  className="block py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Sobre nosotros
                </Link>
                <Link 
                  to="/login" 
                  className="block py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link 
                  to="/register" 
                  className="block py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Crear cuenta
                </Link>
              </>
            ) : (
              // Menú para usuarios autenticados
              <>
                <div className="py-2 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{user.name || 'Usuario'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email || ''}</p>
                  </div>
                </div>
                <Link 
                  to="/dashboard" 
                  className="block py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/campaign/create" 
                  className="block py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Crear campaña
                </Link>
                <Link 
                  to="/profile" 
                  className="block py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Mi perfil
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;