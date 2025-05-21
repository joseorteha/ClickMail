import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  // Simulación de datos
  const campaigns = [
    { name: 'Campaña Bienvenida', date: '2025-05-20', status: 'Enviada' },
    { name: 'Promo Mayo', date: '2025-05-15', status: 'Borrador' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg p-8 max-w-3xl w-full flex flex-col gap-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 text-center">¡Bienvenido, {user?.name || 'Usuario'}!</h1>
          <p className="text-gray-600 dark:text-gray-300 text-center">Gestiona tus campañas, revisa tu historial y aprovecha la IA para mejorar tu marketing.</p>
          <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
            <Link to="/campaign/create" className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-lg shadow hover:from-indigo-600 hover:to-blue-600 transition text-center">+ Crear nueva campaña</Link>
            <Link to="#" className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg shadow hover:from-purple-600 hover:to-pink-600 transition text-center">Ver historial</Link>
          </div>
          <div className="bg-indigo-50 dark:bg-gray-800 rounded-lg p-4">
            <h2 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">Tus campañas recientes</h2>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-700 dark:text-gray-200">
                  <th className="py-1">Nombre</th>
                  <th className="py-1">Fecha</th>
                  <th className="py-1">Estado</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-1 font-medium">{c.name}</td>
                    <td className="py-1">{c.date}</td>
                    <td className="py-1">{c.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {campaigns.length === 0 && <div className="text-gray-500 text-center py-4">No tienes campañas aún.</div>}
          </div>
          <div className="w-full flex flex-col md:flex-row gap-4 mt-2">
            <div className="flex-1 bg-white/70 dark:bg-gray-800 rounded-lg p-4 text-center">
              <span className="font-semibold text-indigo-600 dark:text-indigo-300">Tip IA</span>
              <p className="text-xs text-gray-600 dark:text-gray-400">Describe bien tu producto y público para mejores resultados de IA.</p>
            </div>
            <div className="flex-1 bg-white/70 dark:bg-gray-800 rounded-lg p-4 text-center">
              <span className="font-semibold text-blue-600 dark:text-blue-300">Gestión fácil</span>
              <p className="text-xs text-gray-600 dark:text-gray-400">Edita, elimina y consulta el historial de tus campañas en un clic.</p>
            </div>
            <div className="flex-1 bg-white/70 dark:bg-gray-800 rounded-lg p-4 text-center">
              <span className="font-semibold text-purple-600 dark:text-purple-300">Soporte</span>
              <p className="text-xs text-gray-600 dark:text-gray-400">¿Dudas? Pronto tendrás soporte y ayuda personalizada.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard; 