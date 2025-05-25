import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { MailIcon, EditIcon, TrashIcon, PlusIcon, InfoIcon } from '../components/ui/Icons';
import StatCard from '../components/dashboard/StatCard';
import CampaignCard from '../components/dashboard/CampaignCard';
import CampaignFilters from '../components/dashboard/CampaignFilters';
import TutorialGuide from '../components/ui/TutorialGuide';
import InfoPanel from '../components/dashboard/InfoPanel';
import { motion } from 'framer-motion';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { getCampaigns, deleteCampaign, getCampaignById, sendTestEmail as sendTestEmailService } from '../services/campaignService';
import { emailTemplates, applyTemplate } from '../utils/emailTemplates';

// Interfaces
interface Campaign {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  status: string;
  emailContent?: string;
  generatedEmail?: string;
  createdAt?: string;
  updatedAt?: string;
  stats?: {
    totalSent: number;
    opens: number;
  };
}

interface DashboardStats {
  totalCampaigns: number;
  pendingCampaigns: number;
  sentEmails: number;
  viewedEmails: number;
  openRate: number;
  growthRate: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tutorialCompleted, setTutorialCompleted] = useState(() => {
    return localStorage.getItem('tutorialCompleted') === 'true';
  });
  const [tutorialActive, setTutorialActive] = useState(false);

  // Referencias para el tutorial y secciones
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const campaignsListRef = useRef<HTMLDivElement>(null);
  const createCampaignRef = useRef<HTMLAnchorElement>(null);
  
  // Estado para filtrado y ordenación
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  // Estado para dashboard
  const [stats, setStats] = useState<DashboardStats>({
    totalCampaigns: 0,
    pendingCampaigns: 0,
    sentEmails: 0,
    viewedEmails: 0,
    openRate: 0,
    growthRate: 0
  });
  
  // Estado para el modal de edición de email
  const [showEmailEditor, setShowEmailEditor] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentCampaignId, setCurrentCampaignId] = useState('');
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  
  // Estado para el modal de envío de email de prueba
  const [showSendEmailModal, setShowSendEmailModal] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  
  // Calcular estadísticas
  useEffect(() => {
    if (!campaigns.length) return;
    const pendingCount = campaigns.filter(c => (c.status || 'Borrador').toLowerCase() !== 'enviada').length;
    const sentEmails = campaigns.reduce((acc, c) => acc + (c.stats?.totalSent || 0), 0);
    const viewedEmails = campaigns.reduce((acc, c) => acc + (c.stats?.opens || 0), 0);
    const openRate = sentEmails > 0 ? Math.round((viewedEmails / sentEmails) * 100) : 0;
    // Simulación de tasa de crecimiento (en un caso real, necesitaríamos datos históricos)
    const lastMonthCampaigns = 10; // Simulado
    const growthRate = lastMonthCampaigns > 0 
      ? Math.round(((campaigns.length - lastMonthCampaigns) / lastMonthCampaigns) * 100) 
      : 100;
    setStats({
      totalCampaigns: campaigns.length,
      pendingCampaigns: pendingCount,
      sentEmails,
      viewedEmails,
      openRate,
      growthRate
    });
  }, [campaigns]);

  // Cargar campañas reales al montar
  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCampaigns();
        setCampaigns(data);
        setFilteredCampaigns(data);
      } catch (error) {
        console.error('Error cargando campañas:', error);
        setError('Error al cargar las campañas. Por favor, intenta de nuevo.');
        setNotification('Error al cargar campañas');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  // Mostrar tutorial si es la primera visita
  useEffect(() => {
    if (!tutorialCompleted) {
      const timer = setTimeout(() => setTutorialActive(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [tutorialCompleted]);

  // Actualizar las campañas filtradas cuando cambian los filtros
  useEffect(() => {
    if (!campaigns.length) return;
    let filtered = campaigns.filter(campaign => {
      const nameMatch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
      const descMatch = campaign.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      return nameMatch || descMatch;
    });
    if (statusFilter) {
      filtered = filtered.filter(campaign => {
        return (campaign.status || 'Borrador').toLowerCase() === statusFilter.toLowerCase();
      });
    }
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
  
  // Función para abrir el editor de email
  const openEmailEditor = (campaignId: string, emailContent: string, campaign: any) => {
    setCurrentCampaignId(campaignId);
    setCurrentEmail(emailContent);
    setOriginalEmail(emailContent); // Guardar el contenido original para poder restaurarlo
    setCurrentCampaign(campaign);
    setSelectedTemplate(''); // Resetear la plantilla seleccionada
    setShowEmailEditor(true);
  };
  
  // Función para ver detalles de la campaña
  const handleViewDetails = async (campaignId: string) => {
    try {
      setLoading(true);
      setError(null);
      const campaignData = await getCampaignById(campaignId);
      
      if (campaignData) {
        navigate(`/campaign/${campaignId}`, { state: { campaign: campaignData } });
      } else {
        const campaign = campaigns.find(c => (c._id === campaignId || c.id === campaignId));
        if (!campaign) {
          throw new Error('No se encontró la campaña');
        }
        navigate(`/campaign/${campaignId}`, { state: { campaign } });
      }
    } catch (error) {
      console.error('Error al obtener detalles de la campaña:', error);
      setError('No se pudieron cargar los detalles de la campaña. Inténtalo de nuevo.');
      showToast('Error al cargar los detalles de la campaña', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  // Función para abrir el modal de envío de email de prueba
  const openSendTestEmailModal = (campaign: any) => {
    setCurrentCampaign(campaign);
    setCurrentCampaignId(campaign._id || campaign.id);
    setSubject(`Prueba: ${campaign.name || 'Campaña'}`);
    setRecipient('');
    setShowSendEmailModal(true);
  };
  
  // Función para enviar email de prueba
  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCampaign || !recipient) return;
    
    setSendingEmail(true);
    setError(null);
    try {
      await sendTestEmailService(currentCampaign._id || currentCampaign.id || '', {
        recipient, 
        subject: subject || `Prueba: ${currentCampaign.name}`,
        recipients: [recipient]
      });
      
        setShowSendEmailModal(false);
        setRecipient('');
        setSubject('');
      showToast('Email de prueba enviado correctamente', 'success');
    } catch (error) {
      console.error('Error enviando email de prueba:', error);
      setError('Error al enviar el email de prueba. Por favor, intenta de nuevo.');
      showToast('Error al enviar el email de prueba', 'error');
    } finally {
      setSendingEmail(false);
    }
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
  
  // Guardar email editado
  const saveEditedEmail = () => {
    // Aquí iría la implementación para guardar el email editado
    setShowEmailEditor(false);
  };
  
  // Función para renderizar el badge de estado con el color adecuado
  const renderStatusBadge = (status: string) => {
    // Convertir a minúsculas y asegurar valor por defecto
    const normalizedStatus = (status || 'borrador').toLowerCase();
    
    // Configuración de colores según el estado
    const statusConfig: Record<string, {bg: string, text: string}> = {
      borrador: {
        bg: 'bg-gray-100 dark:bg-gray-700',
        text: 'text-gray-700 dark:text-gray-300'
      },
      enviada: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-300'
      },
      programada: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-700 dark:text-purple-300'
      },
      completada: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-300'
      }
    };
    
    // Obtener configuración o usar la de borrador como fallback
    const config = statusConfig[normalizedStatus] || statusConfig.borrador;
    
    // Capitalizar primera letra del estado para mostrarlo
    const displayStatus = normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1);
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {displayStatus}
      </span>
    );
  };
  
  // Eliminar campaña real
  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta campaña?')) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await deleteCampaign(id);
      setCampaigns(campaigns.filter(campaign => (campaign._id !== id && campaign.id !== id)));
      setFilteredCampaigns(filteredCampaigns.filter(campaign => (campaign._id !== id && campaign.id !== id)));
      setNotification('Campaña eliminada correctamente');
      showToast('Campaña eliminada con éxito', 'success');
    } catch (error) {
      console.error('Error eliminando campaña:', error);
      setError('Error al eliminar la campaña. Por favor, intenta de nuevo.');
      showToast('Error al eliminar la campaña', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#f6f8fb] dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-2 py-6">
        {/* Cabecera */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4"
        >
          <div ref={headerRef}>
            <h1 className="text-2xl md:text-3xl font-bold text-[#3a3a4d] dark:text-white mb-1">¡Bienvenido, {user?.name || 'Usuario'}!</h1>
            <p className="text-gray-500 dark:text-gray-300 text-base">Gestiona tus campañas de email marketing con IA</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link 
              ref={createCampaignRef}
          to="/campaign/create" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium shadow-sm transition-colors"
        >
              <PlusIcon size={16} />
              Crear nueva campaña
        </Link>
          </motion.div>
        </motion.div>
        {/* Tarjetas de estadísticas */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <StatCard 
              title="Campañas Totales" 
              value={stats.totalCampaigns} 
              trend={{ value: `+${stats.growthRate}%`, isPositive: stats.growthRate > 0 }} 
              icon={<span className="text-indigo-600 dark:text-indigo-400 text-xl">📊</span>}
            />
          </motion.div>
          <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <StatCard 
              title="Campañas Pendientes" 
              value={stats.pendingCampaigns} 
              trend={{ value: "En progreso" }} 
              icon={<span className="text-amber-600 dark:text-amber-400 text-xl">⏳</span>}
            />
          </motion.div>
          <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <StatCard 
              title="Emails Enviados" 
              value={stats.sentEmails} 
              trend={{ value: "Total acumulado", isPositive: true }} 
              icon={<span className="text-green-600 dark:text-green-400 text-xl">📧</span>}
            />
          </motion.div>
          <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <StatCard 
              title="Tasa de Apertura" 
              value={`${stats.openRate}%`} 
              trend={{ value: "Sobre envíos totales", isPositive: stats.openRate > 20 }} 
              icon={<span className="text-blue-600 dark:text-blue-400 text-xl">👁️</span>}
            />
          </motion.div>
        </div>
        {/* Filtros */}
        <div ref={filtersRef}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CampaignFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              onClearFilters={() => {
                    setSearchTerm('');
                    setStatusFilter('');
                    setSortOrder('newest');
                  }}
            />
          </motion.div>
              </div>
        {/* Lista de campañas */}
        <div ref={campaignsListRef} className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
              {filteredCampaigns.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">No se encontraron campañas.</div>
                ) : (
                  filteredCampaigns.map(campaign => (
              <CampaignCard
                key={campaign._id || campaign.id}
                campaign={{ ...campaign, createdAt: campaign.createdAt || '' }}
                onView={handleViewDetails}
                onEdit={openEmailEditor}
                onSendTest={openSendTestEmailModal}
                onDelete={handleDelete}
                renderStatusBadge={renderStatusBadge}
              />
            ))
          )}
        </div>
        {/* Información Adicional */}
        <InfoPanel />
        {/* Tutorial interactivo */}
        {tutorialActive && (
          <TutorialGuide
            steps={[ 
              {
                element: headerRef.current as Element,
                popover: {
                  title: '¡Bienvenido a tu Dashboard!',
                  description: 'Aquí puedes gestionar todas tus campañas de email marketing.',
                }
              },
              {
                element: statsRef.current as Element,
                popover: {
                  title: 'Métricas y estadísticas',
                  description: 'Visualiza el rendimiento de tus campañas con estas métricas clave.',
                }
              },
              {
                element: filtersRef.current as Element,
                popover: {
                  title: 'Filtros y búsqueda',
                  description: 'Filtra tus campañas por nombre, estado o fecha para encontrar lo que buscas.',
                }
              },
              {
                element: campaignsListRef.current as Element,
                popover: {
                  title: 'Tus campañas',
                  description: 'Aquí verás todas tus campañas. Puedes editarlas, enviar pruebas o ver detalles.',
                }
              },
              {
                element: createCampaignRef.current as Element,
                popover: {
                  title: 'Crea una nueva campaña',
                  description: 'Haz clic aquí para comenzar a crear una nueva campaña con ayuda de IA.',
                }
              }
            ]}
            isActive={tutorialActive}
            onComplete={() => {
              setTutorialCompleted(true);
              setTutorialActive(false);
              localStorage.setItem('tutorialCompleted', 'true');
            }}
            onClose={() => setTutorialActive(false)}
          />
        )}
        {/* Modales y componentes adicionales */}
      {showEmailEditor && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all duration-300">
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
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-3"
                  >
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
                  </motion.div>
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
      {showSendEmailModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all duration-300">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Enviar Email de Prueba</h3>
            
            <form onSubmit={handleSendTestEmail}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Destinatario</label>
                <input
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Asunto (opcional)</label>
                <input
                  type="text"
                  placeholder="Prueba: Nombre de la campaña"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowSendEmailModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg"
                >
                  Cancelar
                </button>
                
                <button
                  type="submit"
                  disabled={sendingEmail || !recipient}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50"
                >
                  {sendingEmail ? 'Enviando...' : 'Enviar Email'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Dashboard;
