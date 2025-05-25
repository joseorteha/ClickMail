import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, ArrowRightIcon } from '../components/ui/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const GENERIC_TESTIMONIALS = [
  {
    name: 'María González',
    company: 'Acme Corp',
    position: 'Directora de Marketing',
    avatarUrl: '/img/avatars/avatar1.jpg',
    message: 'ClickMail nos permitió aumentar la tasa de apertura en un 40%. La IA realmente hace la diferencia.'
  },
  {
    name: 'Carlos Mendoza',
    company: 'StartUpX',
    position: 'Fundador',
    avatarUrl: '/img/avatars/avatar2.jpg',
    message: 'La segmentación avanzada y la automatización nos ahorraron horas de trabajo cada semana.'
  },
  {
    name: 'Laura Pérez',
    company: 'Creativa Studio',
    position: 'CMO',
    avatarUrl: '/img/avatars/avatar3.jpg',
    message: 'El soporte es excelente y siempre están atentos a nuestras necesidades. ¡Recomendado!'
  }
];

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [testimonials, setTestimonials] = useState(GENERIC_TESTIMONIALS);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', position: '', avatarUrl: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  
  useEffect(() => {
    setIsLoaded(true);
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(GENERIC_TESTIMONIALS);
        }
        setLoadingTestimonials(false);
      })
      .catch(() => {
        setTestimonials(GENERIC_TESTIMONIALS);
        setLoadingTestimonials(false);
      });
  }, [formStatus]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-gray-900 dark:to-gray-800 z-0"></div>
        
        <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
          {/* Elementos decorativos */}
          <motion.div 
            className="absolute top-20 left-10 w-40 h-40 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
          ></motion.div>
          
          <motion.div 
            className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-100/50 dark:bg-indigo-900/10 rounded-full blur-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
          ></motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
            {/* Contenido del texto */}
            <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
              <motion.div 
                className="mb-4 md:mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white leading-tight">
                  Wizard Solution
                </h1>
                <motion.p 
                  className="text-2xl md:text-3xl mt-3 md:mt-4 text-gray-600 dark:text-gray-300 font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  presenta
                </motion.p>
              </motion.div>

              <motion.div 
                className="my-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                  ClickMail
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mt-4 max-w-lg">
                  La plataforma de email marketing con IA que transforma tus campañas
                </p>
              </motion.div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Ir al Dashboard
                    <ArrowRightIcon className="ml-2" size={20} />
                  </Link>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/register"
                      className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Comenzar gratis
                    </Link>
                    <Link
                      to="/login"
                      className="inline-flex items-center px-8 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      Iniciar sesión
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Ilustración */}
            <div className="lg:w-1/2 relative mt-12 lg:mt-0">
              <motion.div 
                className="relative w-full max-w-xl mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                {/* Tarjeta de email */}
                <motion.div 
                  className="absolute top-0 right-0 w-48 h-44 md:w-56 md:h-52 bg-white dark:bg-gray-700 rounded-xl shadow-2xl transform -rotate-6 border border-gray-600"
                  whileHover={{ rotate: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-blue-100 dark:bg-blue-900/30 rounded w-3/4"></div>
                      <div className="h-4 bg-blue-100 dark:bg-blue-900/30 rounded w-1/2"></div>
                      <div className="h-4 bg-blue-100 dark:bg-blue-900/30 rounded w-5/6"></div>
                      <div className="h-2 bg-blue-50 dark:bg-blue-900/20 rounded w-full mt-4"></div>
                      <div className="h-2 bg-blue-50 dark:bg-blue-900/20 rounded w-full"></div>
                      <div className="h-2 bg-blue-50 dark:bg-blue-900/20 rounded w-3/4"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Tarjeta de estadísticas */}
                <motion.div 
                  className="absolute bottom-0 left-0 w-48 h-44 md:w-56 md:h-52 bg-white dark:bg-gray-700 rounded-xl shadow-2xl transform rotate-6 border border-gray-600"
                  whileHover={{ rotate: 0, y: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-24 h-24 md:w-28 md:h-28 border-4 border-blue-500 rounded-full flex items-center justify-center">
                        <div className="text-2xl font-bold text-blue-500">87%</div>
                      </div>
                    </div>
                    <div className="text-center text-sm text-gray-600 dark:text-gray-300 mt-3">
                      Tasa de apertura
                    </div>
                  </div>
                </motion.div>

                {/* Círculo central */}
                <motion.div 
                  className="mx-auto w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-100/50 to-blue-200/50 dark:from-blue-900/20 dark:to-blue-800/20 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="w-56 h-56 md:w-72 md:h-72 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-inner">
                    <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-500 dark:to-blue-400 rounded-full flex items-center justify-center shadow-md">
                      {/* Logo para modo claro */}
                      <img 
                        src="./logo1.svg" 
                        alt="ClickMail Logo" 
                        className="w-40 h-40 dark:hidden" 
                        onError={(e) => {
                          console.log('Error al cargar el logo en modo claro');
                        }}
                      />
                      {/* Logo para modo oscuro */}
                      <img 
                        src="./logooo.png" 
                        alt="ClickMail Logo" 
                        className="w-40 h-40 hidden dark:block" 
                        onError={(e) => {
                          console.log('Error al cargar el logo en modo oscuro');
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20 md:py-28 relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-gray-50/50 dark:from-gray-900/50 dark:to-gray-800/50 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              Email marketing nunca fue tan fácil
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              Nuestra plataforma con tecnología IA simplifica la creación de campañas efectivas
            </p>
            
            {/* Separador decorativo */}
            <div className="flex justify-center mb-12">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-400 dark:to-blue-600 rounded-full"></div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <svg className="w-10 h-10 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6.25278V19.2528M12 6.25278C10.8324 5.47686 9.24649 5 7.5 5C5.75351 5 4.16756 5.47686 3 6.25278V19.2528C4.16756 18.4769 5.75351 18 7.5 18C9.24649 18 10.8324 18.4769 12 19.2528M12 6.25278C13.1676 5.47686 14.7535 5 16.5 5C18.2465 5 19.8324 5.47686 21 6.25278V19.2528C19.8324 18.4769 18.2465 18 16.5 18C14.7535 18 13.1676 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Describí tu producto</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cuéntanos sobre lo que ofreces y nuestra IA generará contenido persuasivo y profesional.
              </p>
              <div className="mt-auto pt-4 text-blue-500 dark:text-blue-400 font-medium flex items-center">
                Más información
                <ArrowRightIcon className="ml-1" size={16} />
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <svg className="w-10 h-10 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Segmentación avanzada</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Define tu audiencia con precisión para maximizar el impacto de tus campañas.
              </p>
              <div className="mt-auto pt-4 text-blue-500 dark:text-blue-400 font-medium flex items-center">
                Más información
                <ArrowRightIcon className="ml-1" size={16} />
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <svg className="w-10 h-10 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13M17.5858 3.58579C18.3668 2.80474 19.6332 2.80474 20.4142 3.58579C21.1953 4.36683 21.1953 5.63316 20.4142 6.41421L11.8284 15H9L9 12.1716L17.5858 3.58579Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Edición inteligente</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Personaliza los emails generados con nuestro editor intuitivo y potente.
              </p>
              <div className="mt-auto pt-4 text-blue-500 dark:text-blue-400 font-medium flex items-center">
                Más información
                <ArrowRightIcon className="ml-1" size={16} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">87%</div>
              <div className="text-lg opacity-90">Tasa de apertura</div>
            </motion.div>
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">3x</div>
              <div className="text-lg opacity-90">Más engagement</div>
            </motion.div>
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Clientes satisfechos</div>
            </motion.div>
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Soporte disponible</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 shadow-lg text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              ¿Listo para transformar tu email marketing?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Comienza hoy mismo y descubre cómo ClickMail puede impulsar tus resultados.
            </p>
            {isAuthenticated ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/campaign/create"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <PlusIcon className="mr-2" size={20} />
                  Crear nueva campaña
                </Link>
              </motion.div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Comenzar gratis
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/demo"
                    className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    Ver demostración
                  </Link>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonials" className="py-20 md:py-28 bg-gradient-to-b from-blue-50/60 to-indigo-50/60 dark:from-gray-900/60 dark:to-gray-800/60">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">Lo que dicen nuestros clientes</h2>
          <div className="flex justify-center mb-8">
            <button onClick={() => setShowForm(!showForm)} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              {showForm ? 'Cerrar formulario' : 'Deja tu testimonio'}
            </button>
          </div>
          {showForm && (
            <form className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-10" onSubmit={async (e) => {
              e.preventDefault();
              setFormStatus('');
              try {
                const res = await fetch('/api/testimonials', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData)
                });
                if (res.ok) {
                  setFormStatus('¡Testimonio enviado! Será visible tras ser aprobado.');
                  setFormData({ name: '', company: '', position: '', avatarUrl: '', message: '' });
                } else {
                  setFormStatus('Error al enviar el testimonio.');
                }
              } catch {
                setFormStatus('Error al enviar el testimonio.');
              }
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input required value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Nombre" />
                <input value={formData.company} onChange={e => setFormData(f => ({ ...f, company: e.target.value }))} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Empresa (opcional)" />
                <input value={formData.position} onChange={e => setFormData(f => ({ ...f, position: e.target.value }))} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Cargo (opcional)" />
                <input value={formData.avatarUrl} onChange={e => setFormData(f => ({ ...f, avatarUrl: e.target.value }))} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="URL de foto (opcional)" />
              </div>
              <textarea required value={formData.message} onChange={e => setFormData(f => ({ ...f, message: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4" placeholder="¿Qué te ha parecido ClickMail?" rows={3} />
              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition mb-2">Enviar testimonio</button>
              {formStatus && <div className="text-center text-green-600 dark:text-green-400 mt-2">{formStatus}</div>}
            </form>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {loadingTestimonials ? (
              <div className="col-span-3 text-center text-gray-500 dark:text-gray-400">Cargando testimonios...</div>
            ) : testimonials.map((t, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform">
                <img src={t.avatarUrl || `/img/avatars/avatar${(i%3)+1}.jpg`} alt={t.name} className={`w-20 h-20 rounded-full mb-4 border-4 object-cover ${i%3===0?'border-blue-100 dark:border-blue-900/40':i%3===1?'border-green-100 dark:border-green-900/40':'border-purple-100 dark:border-purple-900/40'}`} />
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">“{t.message}”</p>
                <div className={`font-semibold ${i%3===0?'text-blue-700 dark:text-blue-400':i%3===1?'text-green-700 dark:text-green-400':'text-purple-700 dark:text-purple-400'}`}>{t.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{t.position}{t.company ? `, ${t.company}` : ''}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;