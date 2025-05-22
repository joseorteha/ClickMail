import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import { MailIcon, EditIcon, TrashIcon, PlusIcon, InfoIcon } from '../components/ui/Icons';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

// Simulación de datos para el dashboard
const mockCampaigns = [
  { id: '1', name: 'Campaña Bienvenida', date: '2025-05-20', status: 'Enviada', description: 'Email de bienvenida a nuevos usuarios del servicio.' },
  { id: '2', name: 'Promo Mayo', date: '2025-05-15', status: 'Borrador', description: 'Promoción especial para el mes de mayo con descuentos.' },
  { id: '3', name: 'Recordatorio Suscripción', date: '2025-05-10', status: 'Programada', description: 'Recordatorio de renovación de suscripción mensual.' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useState(() => {
    // Verificar si el usuario ya completó el tutorial
    return localStorage.getItem('tutorialCompleted') === 'true';
  });
  
  // Referencias para los elementos del tutorial
  const headerRef = useRef<HTMLDivElement>(null);
  const createCampaignRef = useRef<HTMLAnchorElement>(null);
  const campaignsListRef = useRef<HTMLDivElement>(null);
  const campaignActionsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  
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
  
  // Iniciar el tutorial paso a paso
  const startTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      stagePadding: 10,
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      doneBtnText: 'Finalizar',
      steps: [
        // Paso 1: Bienvenida
        {
          element: '#dashboard-header',
          popover: {
            title: 'Bienvenido a tu Dashboard',
            description: 'Aquí podrás gestionar todas tus campañas de email marketing y aprovechar la IA para mejorar tus resultados.',
            side: 'bottom',
            align: 'center'
          }
        },
        // Paso 2: Crear campaña
        {
          element: '#create-campaign-btn',
          popover: {
            title: 'Crear nueva campaña',
            description: 'Haz clic aquí para comenzar a crear una nueva campaña utilizando nuestra IA para generar contenido personalizado.',
            side: 'bottom',
            align: 'center'
          }
        },
        // Paso 3: Lista de campañas
        {
          element: '#campaigns-list',
          popover: {
            title: 'Tus campañas',
            description: 'Aquí puedes ver todas tus campañas, filtrarlas por estado y buscar campañas específicas.',
            side: 'top',
            align: 'center'
          }
        },
        // Paso 4: Acciones para campañas
        {
          element: '#campaign-actions',
          popover: {
            title: 'Acciones rápidas',
            description: 'Gestiona tus campañas con estas acciones: ver detalles, eliminar o enviar una prueba.',
            side: 'left',
            align: 'center'
          }
        },
        // Paso 5: Características
        {
          element: '#features-section',
          popover: {
            title: 'Características de ClickMail',
            description: 'Explora todas las herramientas y capacidades de IA que tenemos para ayudarte a crear campañas exitosas.',
            side: 'top',
            align: 'center'
          }
        }
      ],
      onDestroyed: () => {
        // Marcar el tutorial como completado
        localStorage.setItem('tutorialCompleted', 'true');
        setTutorialCompleted(true);
        setNotification('¡Tutorial completado! Puedes volver a verlo en la sección de configuración.');
        
        // Eliminar la notificación después de 5 segundos
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    });
    
    driverObj.drive();
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Botón del tutorial - solo visible para usuarios nuevos que no han completado el tutorial */}
        {!tutorialCompleted && (
          <div className="flex justify-end mb-4">
            <button
              onClick={startTutorial}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/60 transition-colors"
            >
              <InfoIcon size={18} />
              <span>Ver tutorial</span>
            </button>
          </div>
        )}
        
        {/* Notificación */}
        {notification && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-md shadow-sm">
            {notification}
          </div>
        )}
        
        {/* Cabecera */}
        <div id="dashboard-header" ref={headerRef} className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 dark:text-indigo-300">¡Bienvenido, {user?.name || 'Usuario'}!</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Gestiona tus campañas de email marketing con IA</p>
        </div>
        
        {/* Botón de crear campaña */}
        <div className="mb-8 flex justify-center">
          <Link
            id="create-campaign-btn"
            ref={createCampaignRef}
            to="/campaign/create"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-colors"
          >
            <PlusIcon size={20} />
            <span>Crear nueva campaña</span>
          </Link>
        </div>
        
        {/* Lista de campañas */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Tus campañas</h2>
          
          {campaigns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">Aún no tienes campañas creadas</p>
              <Link
                to="/campaign/create"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/60 rounded-lg transition-colors"
              >
                <PlusIcon size={18} />
                <span>Crear tu primera campaña</span>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar campaña..."
                    className="w-full sm:w-64 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  />
                </div>
                <div>
                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <option value="">Todas las campañas</option>
                    <option value="Enviada">Enviadas</option>
                    <option value="Borrador">Borradores</option>
                    <option value="Programada">Programadas</option>
                  </select>
                </div>
              </div>
              
              <div id="campaigns-list" ref={campaignsListRef} className="divide-y divide-gray-200 dark:divide-gray-700">
                {campaigns.map(campaign => (
                  <div key={campaign.id} className="py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{campaign.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{campaign.description}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <span className="text-xs text-gray-500 dark:text-gray-500">{campaign.date}</span>
                          <span className={`
                            text-xs px-2 py-1 rounded-full 
                            ${campaign.status === 'Enviada' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : ''}
                            ${campaign.status === 'Borrador' ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300' : ''}
                            ${campaign.status === 'Programada' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : ''}
                          `}>
                            {campaign.status}
                          </span>
                        </div>
                      </div>
                      <div id="campaign-actions" ref={campaignActionsRef} className="flex items-center gap-2">
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
        <div id="features-section" ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
