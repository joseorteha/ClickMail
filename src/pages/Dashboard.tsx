import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import { MailIcon, EditIcon, TrashIcon, PlusIcon } from '../components/ui/Icons';

// Simulación de datos para el dashboard
const mockCampaigns = [
  { id: '1', name: 'Campaña Bienvenida', date: '2025-05-20', status: 'Enviada', description: 'Email de bienvenida a nuevos usuarios del servicio.' },
  { id: '2', name: 'Promo Mayo', date: '2025-05-15', status: 'Borrador', description: 'Promoción especial para el mes de mayo con descuentos.' },
  { id: '3', name: 'Recordatorio Suscripción', date: '2025-05-10', status: 'Programada', description: 'Recordatorio de renovación de suscripción mensual.' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Manejar mensajes de notificación (ej. después de eliminar una campaña)
  useEffect(() => {
    if (location.state && location.state.message) {
      setNotification(location.state.message);
      
      // Limpiar el mensaje después de 5 segundos
      const timer = setTimeout(() => {
        setNotification(null);
        navigate(location.pathname, { replace: true, state: {} });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate, location.pathname]);
  
  // Función simulada para eliminar una campaña
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      // Simular una llamada a API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Actualizar el estado eliminando la campaña
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
      setNotification('Campaña eliminada correctamente');
    } catch (error) {
      setNotification('Error al eliminar la campaña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Cabecera */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 dark:text-indigo-300">¡Bienvenido, {user?.name || 'Usuario'}!</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Gestiona tus campañas y aprovecha la IA para mejorar tu marketing.</p>
        </div>
        
        {/* Notificación */}
        {notification && (
          <div className="mb-6 bg-green-100 dark:bg-green-900/40 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-md transition-all duration-500 ease-in-out">
            {notification}
          </div>
        )}
        
        {/* Botones de acción */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            to="/campaign/create" 
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-lg shadow hover:from-indigo-600 hover:to-blue-600 transition"
          >
            <PlusIcon size={20} /> Crear nueva campaña
          </Link>
        </div>
        
        {/* Listado de campañas */}
        <Card className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tus campañas</h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <select 
                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-md text-sm py-1 px-2 w-full sm:w-auto"
              >
                <option>Todas</option>
                <option>Enviadas</option>
                <option>Borradores</option>
                <option>Programadas</option>
              </select>
            </div>
          </div>
          
          {/* Sin campañas */}
          {campaigns.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No tienes campañas aún. ¡Crea tu primera campaña!</p>
            </div>
          ) : (
            <>
              {/* Vista de tabla para pantallas medianas y grandes */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="py-3 px-4 text-left">Nombre</th>
                      <th className="py-3 px-4 text-left">Descripción</th>
                      <th className="py-3 px-4 text-left">Fecha</th>
                      <th className="py-3 px-4 text-left">Estado</th>
                      <th className="py-3 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{campaign.name}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300 max-w-xs truncate">{campaign.description}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{campaign.date}</td>
                        <td className="py-3 px-4">
                          <span 
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${campaign.status === 'Enviada' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : campaign.status === 'Borrador' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'}`}
                          >
                            {campaign.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end items-center space-x-2">
                            <Link 
                              to={`/campaign/${campaign.id}`} 
                              className="p-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-200 rounded-full"
                              title="Ver detalles"
                            >
                              <EditIcon size={18} />
                            </Link>
                            <button 
                              onClick={() => handleDelete(campaign.id)}
                              disabled={loading}
                              className="p-1 text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200 rounded-full"
                              title="Eliminar campaña"
                            >
                              <TrashIcon size={18} />
                            </button>
                            <button 
                              className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200 rounded-full"
                              title="Enviar prueba"
                            >
                              <MailIcon size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Vista de tarjetas para móviles */}
              <div className="md:hidden space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{campaign.name}</h3>
                      <span 
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${campaign.status === 'Enviada' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : campaign.status === 'Borrador' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'}`}
                      >
                        {campaign.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{campaign.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{campaign.date}</span>
                      
                      <div className="flex items-center space-x-3">
                        <Link 
                          to={`/campaign/${campaign.id}`} 
                          className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-200 rounded-full"
                          title="Ver detalles"
                        >
                          <EditIcon size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(campaign.id)}
                          disabled={loading}
                          className="p-1.5 text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200 rounded-full"
                          title="Eliminar campaña"
                        >
                          <TrashIcon size={18} />
                        </button>
                        <button 
                          className="p-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200 rounded-full"
                          title="Enviar prueba"
                        >
                          <MailIcon size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
        
        {/* Tarjetas informativas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hoverable>
            <div className="text-center">
              <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-indigo-600 dark:text-indigo-300 mb-1">Inteligencia Artificial</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Genera contenido personalizado optimizado para tu audiencia.</p>
            </div>
          </Card>
          
          <Card hoverable>
            <div className="text-center">
              <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-blue-600 dark:text-blue-300 mb-1">Fácil de usar</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Interfaz intuitiva diseñada para maximizar tu productividad.</p>
            </div>
          </Card>
          
          <Card hoverable>
            <div className="text-center">
              <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-purple-600 dark:text-purple-300 mb-1">Asistencia 24/7</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Obtén ayuda cuando la necesites a través de nuestro centro de soporte.</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 