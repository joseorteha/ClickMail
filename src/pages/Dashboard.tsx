import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import { MailIcon, EditIcon, TrashIcon, PlusIcon, InfoIcon } from '../components/ui/Icons';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { getCampaigns, deleteCampaign } from '../services/campaignService';
import { emailTemplates, applyTemplate } from '../utils/emailTemplates';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<any[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useState(() => {
    return localStorage.getItem('tutorialCompleted') === 'true';
  });
  
  // Estado para filtrado y ordenación
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest', 'oldest', 'a-z', 'z-a'

  // Estado para dashboard
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    pendingCampaigns: 0,
    sentEmails: 0,
    viewedEmails: 0
  });
  
  // Estado para el modal de edición de email
  const [showEmailEditor, setShowEmailEditor] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentCampaignId, setCurrentCampaignId] = useState('');
  const [currentCampaign, setCurrentCampaign] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  
  // Función para abrir el editor de email
  const openEmailEditor = (campaignId: string, emailContent: string, campaign: any) => {
    setCurrentCampaignId(campaignId);
    setCurrentEmail(emailContent);
    setOriginalEmail(emailContent); // Guardar el contenido original para poder restaurarlo
    setCurrentCampaign(campaign);
    setSelectedTemplate(''); // Resetear la plantilla seleccionada
    setShowEmailEditor(true);
  };
  
  // Función para aplicar una plantilla al email actual
  const handleApplyTemplate = (templateId: string) => {
    // Si no hay plantilla seleccionada, no hacer nada
    if (!templateId) return;
    
    // Extraer solo el contenido de texto del email actual (sin HTML)
    let emailText = originalEmail;
    try {
      // Intentar extraer solo el texto, eliminando etiquetas HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = originalEmail;
      emailText = tempDiv.textContent || tempDiv.innerText || originalEmail;
    } catch (e) {
      console.error('Error extrayendo texto del email:', e);
    }
    
    // Aplicar la plantilla
    const campaignName = currentCampaign?.name || 'Mi Campaña';
    const newEmailContent = applyTemplate(templateId, emailText, campaignName);
    
    // Actualizar el email con la plantilla aplicada
    setCurrentEmail(newEmailContent);
    setSelectedTemplate(templateId);
  };
  
  // Referencias para los elementos del tutorial
  const headerRef = useRef<HTMLDivElement>(null);
  const createCampaignRef = useRef<HTMLAnchorElement>(null);
  const campaignsListRef = useRef<HTMLDivElement>(null);
  const campaignActionsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  
  // Actualizar las campañas filtradas cuando cambian los filtros
  useEffect(() => {
    if (!campaigns.length) return;

    // Aplicar búsqueda de texto
    let filtered = campaigns.filter(campaign => {
      const nameMatch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
      const descMatch = campaign.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      return nameMatch || descMatch;
    });

    // Aplicar filtro por estado
    if (statusFilter) {
      filtered = filtered.filter(campaign => {
        return (campaign.status || 'Borrador').toLowerCase() === statusFilter.toLowerCase();
      });
    }

    // Aplicar ordenación
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || Date.now());
      const dateB = new Date(b.createdAt || Date.now());
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      
      switch (sortOrder) {
        case 'newest':
          return dateB.getTime() - dateA.getTime();
        case 'oldest':
          return dateA.getTime() - dateB.getTime();
        case 'a-z':
          return nameA.localeCompare(nameB);
        case 'z-a':
          return nameB.localeCompare(nameA);
        default:
          return dateB.getTime() - dateA.getTime();
      }
    });

    setFilteredCampaigns(filtered);
  }, [campaigns, searchTerm, statusFilter, sortOrder]);

  // Calcular estadísticas
  useEffect(() => {
    if (!campaigns.length) return;
    
    // Contar campañas por estado
    const pendingCount = campaigns.filter(c => 
      (c.status || 'Borrador').toLowerCase() !== 'enviada'
    ).length;
    
    // Calcular emails enviados y vistos (simulados)
    const sentCount = campaigns.filter(c => c.status?.toLowerCase() === 'enviada').length * 50; // Simulación
    const viewedCount = Math.round(sentCount * 0.35); // Simulación: 35% de tasa de apertura
    
    setStats({
      totalCampaigns: campaigns.length,
      pendingCampaigns: pendingCount,
      sentEmails: sentCount,
      viewedEmails: viewedCount
    });
  }, [campaigns]);

  // Cargar campañas reales al montar
  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        // No necesitamos pasar el token, el servicio lo obtiene automáticamente
        const data = await getCampaigns();
        setCampaigns(data);
        setFilteredCampaigns(data);
      } catch (error) {
        console.error('Error cargando campañas:', error);
        setNotification('Error al cargar campañas');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);
  
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
  
  // Eliminar campaña real
  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta campaña?')) {
      return;
    }
    
    setLoading(true);
    try {
      // No necesitamos pasar el token, el servicio lo obtiene automáticamente
      await deleteCampaign(id);
      setCampaigns(campaigns.filter(campaign => (campaign._id !== id && campaign.id !== id)));
      setNotification('Campaña eliminada correctamente');
    } catch (error) {
      console.error('Error eliminando campaña:', error);
      setNotification('Error al eliminar la campaña');
    } finally {
      setLoading(false);
    }
  };
  
  // Guardar email editado
  const saveEditedEmail = async () => {
    setLoading(true);
    try {
      // Importar la función updateCampaign de manera dinámica para evitar conflictos
      const { updateCampaign } = await import('../services/campaignService');
      
      await updateCampaign(currentCampaignId, { generatedEmail: currentEmail });
      
      // Actualizar la lista de campañas localmente
      setCampaigns(campaigns.map(campaign => {
        if (campaign._id === currentCampaignId || campaign.id === currentCampaignId) {
          return { ...campaign, generatedEmail: currentEmail, emailContent: currentEmail };
        }
        return campaign;
      }));
      
      setShowEmailEditor(false);
      setNotification('Email actualizado correctamente');
    } catch (error) {
      console.error('Error actualizando email:', error);
      setNotification('Error al actualizar el email');
    } finally {
      setLoading(false);
    }
  };
  
  // Simular envío de email de prueba
  const sendTestEmail = async (campaign: any) => {
    setLoading(true);
    try {
      // Aquí podrías implementar el envío real usando un servicio de email
      // Por ahora, solo simulamos
      setTimeout(() => {
        setNotification(`Email de prueba enviado para la campaña "${campaign.name}". Revisa tu bandeja de entrada.`);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error enviando email de prueba:', error);
      setNotification('Error al enviar el email de prueba');
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
        <div className="flex justify-end mb-4">
          {!tutorialCompleted && (
            <button
              onClick={startTutorial}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/60 transition-colors"
            >
              <InfoIcon size={18} />
              <span>Ver tutorial</span>
            </button>
          )}
        </div>
        
        {/* Notificación */}
        {notification && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-md shadow-sm">
            {notification}
          </div>
        )}
        
        {/* Cabecera */}
        <div id="dashboard-header" ref={headerRef} className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 dark:text-indigo-300">¡Bienvenido, {user?.name || 'Usuario'}!</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Gestiona tus campañas de email marketing con IA</p>
          </div>
          
          {/* Tarjetas de estadísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Campañas Totales</h3>
              <div className="mt-2 flex justify-between items-end">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalCampaigns}</p>
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a6.5 6.5 0 100 11.814v.094a1 1 0 102 0v-.094a6.5 6.5 0 100-11.814V5z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-1 text-sm">+{Math.round(stats.totalCampaigns * 0.2)}%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Campañas Pendientes</h3>
              <div className="mt-2 flex justify-between items-end">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.pendingCampaigns}</p>
                <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full">
                  {stats.totalCampaigns ? Math.round((stats.pendingCampaigns / stats.totalCampaigns) * 100) : 0}%
                </span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Emails Enviados</h3>
              <div className="mt-2 flex justify-between items-end">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.sentEmails}</p>
                <div className="flex items-center text-blue-600 dark:text-blue-400">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-1 text-sm">{stats.sentEmails ? Math.round((stats.viewedEmails / stats.sentEmails) * 100) : 0}% abiertos</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tasa Engagement</h3>
              <div className="mt-2 flex justify-between items-end">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.sentEmails ? Math.round((stats.viewedEmails / stats.sentEmails) * 0.65 * 100) : 0}%</p>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a6.5 6.5 0 100 11.814v.094a1 1 0 102 0v-.094a6.5 6.5 0 100-11.814V5z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-1 text-sm">+5.2%</span>
                </div>
              </div>
            </div>
          </div>
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
              <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Filtrar y ordenar</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Buscar</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Buscar campaña..."
                        className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Filtrar por estado</label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">Todas las campañas</option>
                      <option value="enviada">Enviadas</option>
                      <option value="borrador">Borradores</option>
                      <option value="programada">Programadas</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Ordenar por</label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="newest">Más recientes</option>
                      <option value="oldest">Más antiguas</option>
                      <option value="a-z">Nombre (A-Z)</option>
                      <option value="z-a">Nombre (Z-A)</option>
                    </select>
                  </div>
                </div>
                
                {/* Indicadores de filtros activos */}
                {(searchTerm || statusFilter) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        Búsqueda: {searchTerm}
                        <button 
                          className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          onClick={() => setSearchTerm('')}
                        >
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </span>
                    )}
                    
                    {statusFilter && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200">
                        Estado: {statusFilter}
                        <button 
                          className="ml-1 text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-200"
                          onClick={() => setStatusFilter('')}
                        >
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </span>
                    )}
                    
                    <button 
                      className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('');
                        setSortOrder('newest');
                      }}
                    >
                      Limpiar todos los filtros
                    </button>
                  </div>
                )}
              </div>
              
              <div id="campaigns-list" ref={campaignsListRef} className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCampaigns.length === 0 ? (
                  <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">No se encontraron campañas con los filtros actuales</p>
                    <button 
                      className="mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('');
                      }}
                    >
                      Limpiar filtros
                    </button>
                  </div>
                ) : (
                  filteredCampaigns.map(campaign => (
                    <div key={campaign._id || campaign.id} className="py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
                              <MailIcon size={16} />
                            </span>
                            <h3 className="font-medium text-gray-800 dark:text-gray-200">{campaign.name}</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                              {campaign.status || 'Borrador'}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{campaign.description}</p>
                        </div>
                        
                        <div id="campaign-actions" ref={campaign._id === (filteredCampaigns[0]?._id || filteredCampaigns[0]?.id) ? campaignActionsRef : undefined} className="flex flex-wrap gap-2">
                            <button
                              onClick={() => handleDelete(campaign._id || campaign.id)}
                              disabled={loading}
                              className="px-3 py-1.5 text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/40 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-1"
                            >
                              <TrashIcon size={14} />
                              <span>Eliminar</span>
                            </button>
                            
                            <button
                              onClick={() => sendTestEmail(campaign)}
                              disabled={loading}
                              className="px-3 py-1.5 text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/40 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-1"
                            >
                              <MailIcon size={14} />
                              <span>Enviar prueba</span>
                            </button>
                            
                            <button
                              onClick={() => openEmailEditor(campaign._id || campaign.id, campaign.generatedEmail || campaign.emailContent || '', campaign)}
                              className="px-3 py-1.5 text-xs bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 rounded-lg flex items-center gap-1"
                            >
                              <EditIcon size={14} />
                              <span>Editar email</span>
                            </button>
                            
                            <Link
                              to={`/campaign/${campaign._id || campaign.id}`}
                              className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg flex items-center gap-1"
                            >
                              <InfoIcon size={14} />
                              <span>Ver detalles</span>
                            </Link>
                          </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </Card>
        
        {/* Características */}
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
      
      {/* Modal de edición de email */}
      {showEmailEditor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Editar Email</h2>
              <button
                onClick={() => setShowEmailEditor(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 flex-1 overflow-auto">
              {/* Selector de plantillas */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Aplicar plantilla de diseño</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div 
                    onClick={() => setSelectedTemplate('')}
                    className={`cursor-pointer border rounded-lg p-3 text-center ${!selectedTemplate ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'}`}
                  >
                    <div className="text-sm font-medium mb-1">Original</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Sin plantilla</div>
                  </div>
                  
                  {emailTemplates.map(template => (
                    <div 
                      key={template.id}
                      onClick={() => handleApplyTemplate(template.id)}
                      className={`cursor-pointer border rounded-lg p-3 text-center ${selectedTemplate === template.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'}`}
                    >
                      <div className="text-sm font-medium mb-1">{template.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{template.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Barra de herramientas para editar */}
              <div className="mb-3 flex flex-wrap gap-2">
                <button 
                  onClick={() => setCurrentEmail(originalEmail)} 
                  className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Restaurar original
                </button>
                <button 
                  onClick={() => handleApplyTemplate(selectedTemplate)} 
                  className="px-3 py-1.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800/40"
                  disabled={!selectedTemplate}
                >
                  Reaplicar plantilla
                </button>
              </div>
              
              <div className="mb-4">
                <div className="mb-2 flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contenido del Email (HTML)</label>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Puedes usar HTML para personalizar el email</div>
                </div>
                <textarea
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  className="w-full h-64 border border-gray-300 dark:border-gray-700 rounded-lg p-3 font-mono text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                />
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Vista previa</h3>
                <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900 overflow-auto max-h-64">
                  <div dangerouslySetInnerHTML={{ __html: currentEmail }} />
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setShowEmailEditor(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={saveEditedEmail}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </>
                ) : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
