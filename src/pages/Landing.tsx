import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PlusIcon } from '../components/ui/Icons';

const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-950">

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <div className="flex items-center mb-4">
              <img 
                src="/logo1.svg" 
                alt="Wizard Solution Logo" 
                className="w-16 h-16 md:w-20 md:h-20 mr-3" 
              />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                Wizard<br />
                Solution
              </h1>
            </div>
            <p className="text-2xl md:text-3xl mt-4 text-gray-600 dark:text-gray-300">
              presenta
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-500 dark:text-blue-400 mt-2">
              ClickMail
            </h2>
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="mt-8 inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition"
              >
                Mi Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="mt-8 inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition"
              >
                Empezar
              </Link>
            )}
          </div>
          <div className="md:w-1/2 relative">
            <div className="w-72 h-72 mx-auto relative">
              <div className="absolute top-0 right-0 w-48 h-40 bg-blue-200 dark:bg-blue-900/50 rounded-lg transform -rotate-6 animate-float">
                <div className="w-full h-full border-2 border-blue-400 dark:border-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-32 h-32 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 8.62V17.38C22 18.27 21.27 19 20.38 19H3.62C2.73 19 2 18.27 2 17.38V8.62C2 7.73 2.73 7 3.62 7H7V6C7 4.9 7.9 4 9 4H15C16.1 4 17 4.9 17 6V7H20.38C21.27 7 22 7.73 22 8.62Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 7H7V6C7 4.9 7.9 4 9 4H15C16.1 4 17 4.9 17 6V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4">
                <div className="w-16 h-16 bg-blue-400 dark:bg-blue-700 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8.4C18 12.4 12 16 12 16C12 16 6 12.4 6 8.4C6 6.94087 6.63214 5.54254 7.75736 4.53769C8.88258 3.53284 10.4087 3 12 3C13.5913 3 15.1174 3.53284 16.2426 4.53769C17.3679 5.54254 18 6.94087 18 8.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 9.5C12.5523 9.5 13 9.05228 13 8.5C13 7.94772 12.5523 7.5 12 7.5C11.4477 7.5 11 7.94772 11 8.5C11 9.05228 11.4477 9.5 12 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                  <svg className="w-64 h-48 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4H20C20.5304 4 21.0391 4.21071 21.4142 4.58579C21.7893 4.96086 22 5.46957 22 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                    <div className="w-20 h-20 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center animate-bounce">
                      <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 12L12 8L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24" id="describe">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-4">
            Generá campañas de Email<br/>Marketing al instante
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16">
            Nuestro asistente con IA te guía para crear campañas de email marketing perfectas en tan solo 3 sencillos pasos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Describí tu producto o servicio</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cuéntanos sobre lo que ofreces y nuestra IA generará el contenido perfecto para promocionarlo.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex flex-col items-center text-center" id="audience">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Definí audiencia y objetivos</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Selecciona a quién va dirigido tu email y qué quieres lograr con tu campaña.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex flex-col items-center text-center" id="generator">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.84 4.60999C20.3292 4.09928 19.7228 3.69393 19.0554 3.41708C18.3879 3.14022 17.6725 2.99805 16.95 2.99805C16.2275 2.99805 15.5121 3.14022 14.8446 3.41708C14.1772 3.69393 13.5708 4.09928 13.06 4.60999L12 5.66999L10.94 4.60999C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.60999C2.1283 5.64169 1.54871 7.04096 1.54871 8.49999C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.3507 11.8792 21.756 11.2728 22.0329 10.6054C22.3097 9.93789 22.4519 9.22249 22.4519 8.49999C22.4519 7.7775 22.3097 7.0621 22.0329 6.39464C21.756 5.72718 21.3507 5.12075 20.84 4.60999V4.60999Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Generá y Editá</h3>
              <p className="text-gray-600 dark:text-gray-300">
                La IA creará tu email y podrás personalizarlo según tus necesidades antes de enviarlo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8">
            ¿Listo para generar tu Email Marketing?
          </h2>
          {isAuthenticated ? (
            <Link
              to="/campaign/create"
              className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition"
            >
              <PlusIcon className="mr-2" size={20} />
              Empieza tu primera campaña
            </Link>
          ) : (
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition"
            >
              Empieza tu primera campaña
            </Link>
          )}
        </div>
      </section>

      {/* Espacio al final de la página */}
      <div className="py-8"></div>
    </div>
  );
};

export default Landing;
