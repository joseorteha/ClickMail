import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-purple-100">
    <Navbar />
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-white/90 rounded-xl shadow-lg p-8 max-w-lg w-full flex flex-col items-center gap-6">
        <h1 className="text-4xl font-extrabold text-red-600 text-center">404</h1>
        <p className="text-gray-700 text-center">¡Ups! La página que buscas no existe.</p>
        <Link to="/" className="mt-4 px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-lg shadow hover:from-indigo-600 hover:to-blue-600 transition">Volver al inicio</Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFound; 