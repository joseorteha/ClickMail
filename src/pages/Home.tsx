import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg p-8 max-w-2xl w-full flex flex-col items-center gap-8"
        >
          <motion.img
            src="/logo1.svg"
            alt="ClickMail logo"
            className="w-40 h-40 mb-2 drop-shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          />
          <motion.h1
            className="text-3xl md:text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            ClickMail: Email Marketing Inteligente
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-300 text-center text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            ClickMail es una plataforma SaaS que utiliza IA para crear campañas de email marketing personalizadas y efectivas en minutos, sin necesidad de experiencia técnica.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 }
              }
            }}
          >
            <motion.div
              className="bg-indigo-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col gap-2 shadow hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.03 }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-300" />
                <h2 className="font-bold text-indigo-700 dark:text-indigo-300">¿Por qué ClickMail?</h2>
              </div>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-sm">
                <li>Genera correos atractivos y personalizados con IA de OpenAI.</li>
                <li>Fácil de usar: solo 3 pasos para tu campaña.</li>
                <li>Segmentación inteligente de audiencia.</li>
                <li>Historial y gestión de campañas.</li>
                <li>Seguridad y privacidad de tus datos.</li>
              </ul>
            </motion.div>
            <motion.div
              className="bg-blue-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col gap-2 shadow hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.03 }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-blue-500 dark:text-blue-300" />
                <h2 className="font-bold text-blue-700 dark:text-blue-300">¿Cómo funciona?</h2>
              </div>
              <ol className="list-decimal pl-5 text-gray-700 dark:text-gray-200 text-sm">
                <li>Regístrate o inicia sesión.</li>
                <li>Describe tu producto y público objetivo.</li>
                <li>Genera, edita y envía tu campaña con un clic.</li>
              </ol>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex flex-col md:flex-row gap-4 w-full justify-center mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <Link to="/login" className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-lg shadow hover:from-indigo-600 hover:to-blue-600 transition text-center focus:outline-none focus:ring-2 focus:ring-indigo-400">Iniciar sesión</Link>
            <Link to="/register" className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg shadow hover:from-purple-600 hover:to-pink-600 transition text-center focus:outline-none focus:ring-2 focus:ring-pink-400">Crear cuenta</Link>
          </motion.div>
          <motion.div
            className="w-full flex flex-col md:flex-row gap-4 mt-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            <motion.div
              className="flex-1 bg-white/70 dark:bg-gray-800 rounded-lg p-4 text-center shadow hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.04 }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-300 mb-1" />
                <span className="font-semibold text-indigo-600 dark:text-indigo-300">Seguridad</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Tus datos están protegidos con cifrado y autenticación segura.</p>
            </motion.div>
            <motion.div
              className="flex-1 bg-white/70 dark:bg-gray-800 rounded-lg p-4 text-center shadow hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.04 }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="flex flex-col items-center gap-1">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-300 mb-1" />
                <span className="font-semibold text-blue-600 dark:text-blue-300">Soporte IA</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Aprovecha la inteligencia artificial para optimizar tus campañas.</p>
            </motion.div>
            <motion.div
              className="flex-1 bg-white/70 dark:bg-gray-800 rounded-lg p-4 text-center shadow hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.04 }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="flex flex-col items-center gap-1">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-300 mb-1" />
                <span className="font-semibold text-purple-600 dark:text-purple-300">Escalable</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Ideal para emprendedores y equipos de marketing.</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
