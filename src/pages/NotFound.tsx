import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-16 md:py-24">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-lg w-full text-center border border-gray-200 dark:border-gray-700">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
          <span className="text-5xl font-extrabold text-red-500 dark:text-red-400">404</span>
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">¡Ups! La página que buscas no existe.</h1>
      
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        La página que has intentado visitar no se encuentra disponible o ha sido trasladada a otra ubicación.      
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to="/" 
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition shadow-sm flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Volver al inicio
        </Link>
        
        <button 
          onClick={() => window.history.back()} 
          className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition shadow-sm flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Regresar
        </button>
      </div>
    </div>
  </div>
);

export default NotFound;