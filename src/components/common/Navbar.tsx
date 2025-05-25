import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Iconos mejorados con más estilo
const SunIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

const MoonIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

const MenuIcon = (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  const isDashboard = user && window.location.pathname.includes('/dashboard');
  const isLogin = window.location.pathname.includes('/login');
  const isRegister = window.location.pathname.includes('/register');
  const isLanding = window.location.pathname === '/';

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-gray-900/95 shadow-md' : 'bg-white/80 dark:bg-gray-900/80'} backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo mejorado */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 shadow-sm">
            {/* Versión condicional del logo según tema */}
            <img 
              src="./logo1.svg" 
              alt="ClickMail Logo - Modo claro" 
              className="w-10 h-10 md:w-12 md:h-12 transition-all duration-300 group-hover:scale-110 dark:hidden" 
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTMgOGw3Ljg5OSA1LjI2N2EyLjI0NyAyLjI0NyAwIDAwMi4yMDIgMEwyMSA4IiBzdHJva2U9IiMzODViZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTMgMTZsNy44OTktLTUuMjY3YTIuMjQ3IDIuMjQ3IDAgMDEyLjIwMiAwTDIxIDE2IiBzdHJva2U9IiMzODViZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+';
                console.log('Error al cargar el logo modo claro');
              }}
            />
            {/* Logo para modo oscuro */}
            <img 
              src="./logooo.png" 
              alt="ClickMail Logo - Modo oscuro" 
              className="w-10 h-10 md:w-12 md:h-12 transition-all duration-300 group-hover:scale-110 hidden dark:block" 
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTMgOGw3Ljg5OSA1LjI2N2EyLjI0NyAyLjI0NyAwIDAwMi4yMDIgMEwyMSA4IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTMgMTZsNy44OTktLTUuMjY3YTIuMjQ3IDIuMjQ3IDAgMDEyLjIwMiAwTDIxIDE2IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+';                
                console.log('Error al cargar el logo modo oscuro');
              }}
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900"></span>
          </div>
          {isLanding ? (
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent leading-tight">ClickMail</span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider">WIZARD SOLUTIONS</span>
            </div>
          ) : (
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent leading-tight">ClickMail</span>
          )}
        </Link>
        
        {/* Selector de idioma */}
        <div className="flex items-center gap-4">
         
                   {/* Menú de navegación desktop - Versión premium */}
          <div className="hidden md:flex items-center gap-8">
            {!user ? (
              <>
                <Link 
                  to="/product/features" 
                  className="relative group text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Características
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link 
                  to="/product/pricing" 
                  className="relative group text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Precios
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link 
                  to="/testimonials" 
                  className="relative group text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Testimonios
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <div className="flex items-center gap-4 ml-4">
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Iniciar sesión
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
                  >
                    Comenzar gratis
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/dashboard" 
                  className="relative group text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Inicio
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link 
                  to="/campaign/create" 
                  className="relative group text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Nueva Campaña
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link 
                  to="/templates" 
                  className="relative group text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Plantillas
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <div className="flex items-center gap-4 ml-4">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    aria-label="Alternar modo oscuro"
                  >
                    {darkMode ? MoonIcon : SunIcon}
                  </button>
                  <div className="relative group">
                    <button className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium border border-blue-200 dark:border-blue-800 shadow-sm">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    </button>
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden z-50 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 origin-top-right transition-all duration-200 border border-gray-100 dark:border-gray-700">
                      <div className="p-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-gray-200">{user.name || 'Usuario'}</p>
                        <p className="px-3 py-0.5 text-xs text-gray-500 dark:text-gray-400 truncate">{user.email || ''}</p>
                      </div>
                      <div className="py-1">
                        <Link 
                          to="/profile" 
                          className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          Configuración
                        </Link>
                        <Link 
                          to="/email-settings" 
                          className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                          Configuración de Email
                        </Link>
                        <Link 
                          to="/billing" 
                          className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          Facturación
                        </Link>
                        <button 
                          onClick={handleLogout} 
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
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
          
          {/* Menú móvil mejorado */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Alternar modo oscuro"
            >
              {darkMode ? MoonIcon : SunIcon}
            </button>
            <button 
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" 
              onClick={() => setOpen(!open)} 
              aria-label="Abrir menú"
            >
              {open ? CloseIcon : MenuIcon}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú móvil desplegable premium */}
      {open && (
        <div className={`md:hidden bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 ${open ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="px-6 py-3 space-y-1">
            {!user ? (
              <>
                <Link 
                  to="/product/features" 
                  className="block py-3 px-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Características
                </Link>
                <Link 
                  to="/product/pricing" 
                  className="block py-3 px-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Precios
                </Link>
                <Link 
                  to="/testimonials" 
                  className="block py-3 px-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Testimonios
                </Link>
                <div className="pt-2">
                  <Link 
                    to="/login" 
                    className="block py-3 px-3 text-center text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Iniciar sesión
                  </Link>
                  <Link 
                    to="/register" 
                    className="block py-3 px-3 mt-2 text-center text-white font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all shadow-sm"
                    onClick={() => setOpen(false)}
                  >
                    Comenzar gratis
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="py-3 px-3 mb-2 flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium border border-blue-200 dark:border-blue-800">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{user.name || 'Usuario'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email || ''}</p>
                  </div>
                </div>
                <Link 
                  to="/dashboard" 
                  className="block py-3 px-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Inicio
                </Link>
                <Link 
                  to="/campaign/create" 
                  className="block py-3 px-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Nueva Campaña
                </Link>
                <Link 
                  to="/templates" 
                  className="block py-3 px-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Plantillas
                </Link>
                <Link 
                  to="/profile" 
                  className="block py-3 px-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Configuración
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left py-3 px-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
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