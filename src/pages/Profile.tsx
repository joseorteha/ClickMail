import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { updateProfile, changePassword } from '../services/authService';
import { UserIcon, KeyIcon, BellIcon, ChartIcon, InfoIcon, SettingsIcon, SunIcon, MoonIcon, LogoutIcon } from '../components/ui/Icons';
import { getCampaignStats } from '../services/campaignService';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    campaignUpdates: true,
    marketingEmails: false
  });
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    drafts: 0,
    sent: 0,
    scheduled: 0,
    sentEmails: 0,
    openRate: 0,
    clickRate: 0,
    monthlyCampaigns: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    campaignsByType: { marketing: 0, newsletter: 0, announcement: 0, other: 0 },
    engagement: [0, 0, 0, 0, 0, 0, 0],
    topCampaigns: [] as Array<{name: string, performance: number}>
  });

  // Colores para los gráficos
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Cargar estadísticas
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Obtener estadísticas reales (o simuladas basadas en datos reales) del servicio
        const campaignStats = await getCampaignStats();
        
        // Preparar datos para los gráficos
        const topCampaigns: Array<{name: string, performance: number}> = [];
        
        // Si hay datos, generar las mejores campañas (simuladas pero basadas en datos reales)
        if (campaignStats.totalCampaigns > 0) {
          // Nombres de ejemplo para campañas destacadas
          const campaignNames = [
            'Campaña de Verano', 'Ofertas Especiales', 'Newsletter Mensual', 
            'Lanzamiento de Producto', 'Promoción Especial', 'Anuncio Importante'
          ];
          
          // Generar 3-5 campañas destacadas (o menos si hay menos campañas)
          const numTopCampaigns = Math.min(5, campaignStats.totalCampaigns);
          for (let i = 0; i < numTopCampaigns; i++) {
            topCampaigns.push({
              name: campaignNames[i % campaignNames.length],
              performance: Math.round(50 + Math.random() * 40) // Entre 50% y 90%
            });
          }
        }
        
        // Actualizar el estado con las estadísticas reales
        setStats({
          totalCampaigns: campaignStats.totalCampaigns || 0,
          drafts: campaignStats.drafts || 0,
          sent: campaignStats.sent || 0,
          scheduled: campaignStats.scheduled || 0,
          sentEmails: (campaignStats.sent || 0) * 50, // Simulación: 50 emails por campaña
          openRate: campaignStats.openRate || 0,
          clickRate: campaignStats.clickRate || 0,
          monthlyCampaigns: campaignStats.monthlyCampaigns || Array(12).fill(0),
          campaignsByType: campaignStats.campaignsByType || { marketing: 0, newsletter: 0, announcement: 0, other: 0 },
          engagement: campaignStats.engagement || Array(7).fill(0),
          topCampaigns
        });
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      }
    };
    
    fetchStats();
  }, []);

  // Manejar cambio de tema
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    
    // Aplicar clase a nivel del documento
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    setNotification(`Tema ${newMode ? 'oscuro' : 'claro'} activado`);
    setTimeout(() => setNotification(null), 3000);
  };

  // Aplicar tema al cargar
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No autenticado');
      const res = await updateProfile(formData, token);
      // Actualizar usuario en localStorage
      localStorage.setItem('clickmail_user', JSON.stringify(res.user));
      setNotification('Perfil actualizado correctamente');
      setIsEditing(false);
    } catch (err) {
      setNotification('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setNotification('Las contraseñas no coinciden');
      return;
    }
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No autenticado');
      
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, token);
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setNotification('Contraseña actualizada correctamente');
    } catch (err: any) {
      setNotification(err.message || 'Error al cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };
  
  const handleNotificationPrefChange = (key: keyof typeof notificationPreferences) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [key]: !notificationPreferences[key]
    });
    
    // En un caso real, aquí enviaríamos la actualización al backend
    setNotification('Preferencias de notificación actualizadas');
    setTimeout(() => setNotification(null), 3000);
  };

  // Función para iniciar el tutorial
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
        setNotification('Tutorial completado. ¡Ya conoces todas las funciones de ClickMail!');
        
        // Eliminar la notificación después de 5 segundos
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    });
    
    // Redirigir al usuario al dashboard y luego iniciar el tutorial
    navigate('/dashboard');
    setTimeout(() => {
      driverObj.drive();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        {/* Notificación */}
        {notification && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md shadow-sm">
            {notification}
          </div>
        )}
        
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          {/* Encabezado con foto de perfil */}
          <div className="bg-indigo-600 dark:bg-indigo-700 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white dark:bg-gray-200 rounded-full flex items-center justify-center text-indigo-600 text-3xl sm:text-4xl md:text-5xl font-bold shadow-md">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{user?.name || 'Usuario'}</h1>
              <p className="text-sm sm:text-base text-indigo-100 break-all">{user?.email || 'correo@ejemplo.com'}</p>
            </div>
          </div>
          
          {/* Pestañas de navegación */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto scrollbar-hidden">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 min-w-0 py-3 sm:py-4 px-2 sm:px-4 text-center border-b-2 ${activeTab === 'profile' ? 
                  'border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-500' : 
                  'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <UserIcon size={16} className="flex-shrink-0" />
                  <span className="text-xs sm:text-sm whitespace-nowrap">Perfil</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`flex-1 min-w-0 py-3 sm:py-4 px-2 sm:px-4 text-center border-b-2 ${activeTab === 'security' ? 
                  'border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-500' : 
                  'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <KeyIcon size={16} className="flex-shrink-0" />
                  <span className="text-xs sm:text-sm whitespace-nowrap">Seguridad</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('preferences')}
                className={`flex-1 min-w-0 py-3 sm:py-4 px-2 sm:px-4 text-center border-b-2 ${activeTab === 'preferences' ? 
                  'border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-500' : 
                  'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <SettingsIcon size={16} className="flex-shrink-0" />
                  <span className="text-xs sm:text-sm whitespace-nowrap">Preferencias</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('stats')}
                className={`flex-1 min-w-0 py-3 sm:py-4 px-2 sm:px-4 text-center border-b-2 ${activeTab === 'stats' ? 
                  'border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-500' : 
                  'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <ChartIcon size={16} className="flex-shrink-0" />
                  <span className="text-xs sm:text-sm whitespace-nowrap">Estadísticas</span>
                </div>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {/* Pestaña de Perfil */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Información Personal</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    {isEditing ? 'Cancelar' : 'Editar Perfil'}
                  </button>
                </div>
                
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                  </form>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre</h3>
                      <p className="mt-1 text-lg text-gray-900 dark:text-white">{user?.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                      <p className="mt-1 text-lg text-gray-900 dark:text-white">{user?.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Cuenta creada</h3>
                      <p className="mt-1 text-lg text-gray-900 dark:text-white">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Pestaña de Seguridad */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Seguridad</h2>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Cambiar contraseña</h3>
                  
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña actual</label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nueva contraseña</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                        minLength={8}
                      />
                      <p className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar contraseña</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Actualizando...' : 'Actualizar contraseña'}
                    </button>
                  </form>
                </div>
                
                {/* Sección de dispositivos conectados - versión simulada */}
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-medium mb-4">Dispositivos conectados</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">Este dispositivo</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Windows · Chrome · {new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">Activo ahora</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Pestaña de Preferencias */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Preferencias</h2>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Apariencia</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Tema oscuro</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Cambia entre tema claro y oscuro</p>
                    </div>
                    <button 
                      onClick={toggleDarkMode}
                      className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
                    >
                      {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Notificaciones</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Notificaciones por email</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Recibe notificaciones importantes por email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notificationPreferences.emailNotifications} 
                          onChange={() => handleNotificationPrefChange('emailNotifications')}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Actualizaciones de campañas</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Notificaciones sobre el estado de tus campañas</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notificationPreferences.campaignUpdates} 
                          onChange={() => handleNotificationPrefChange('campaignUpdates')}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Emails de marketing</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Recibe ofertas y novedades sobre ClickMail</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notificationPreferences.marketingEmails} 
                          onChange={() => handleNotificationPrefChange('marketingEmails')}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Pestaña de Estadísticas */}
            {activeTab === 'stats' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Estadísticas de tus Campañas</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-base font-medium text-gray-500 dark:text-gray-400 mb-1">Campañas Totales</h3>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.totalCampaigns}</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-base font-medium text-gray-500 dark:text-gray-400 mb-1">Campañas Borrador</h3>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.drafts}</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-base font-medium text-gray-500 dark:text-gray-400 mb-1">Emails Enviados</h3>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.sentEmails}</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-base font-medium text-gray-500 dark:text-gray-400 mb-1">Tasa de Apertura</h3>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.openRate}%</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-3">
                      <div className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full" style={{ width: `${stats.openRate}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-base font-medium text-gray-500 dark:text-gray-400 mb-1">Tasa de Clics</h3>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.clickRate}%</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-3">
                      <div className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full" style={{ width: `${stats.clickRate}%` }}></div>
                    </div>
                  </div>
                </div>
                
                {/* Gráfico de campañas por mes */}
                <div className="mt-6 sm:mt-8 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">Campañas por Mes</h3>
                  <div className="h-60 sm:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Ene', value: stats.monthlyCampaigns[0] },
                          { name: 'Feb', value: stats.monthlyCampaigns[1] },
                          { name: 'Mar', value: stats.monthlyCampaigns[2] },
                          { name: 'Abr', value: stats.monthlyCampaigns[3] },
                          { name: 'May', value: stats.monthlyCampaigns[4] },
                          { name: 'Jun', value: stats.monthlyCampaigns[5] },
                          { name: 'Jul', value: stats.monthlyCampaigns[6] },
                          { name: 'Ago', value: stats.monthlyCampaigns[7] },
                          { name: 'Sep', value: stats.monthlyCampaigns[8] },
                          { name: 'Oct', value: stats.monthlyCampaigns[9] },
                          { name: 'Nov', value: stats.monthlyCampaigns[10] },
                          { name: 'Dic', value: stats.monthlyCampaigns[11] }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
                          formatter={(value) => [`${value} campañas`, 'Cantidad']}
                        />
                        <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                          {stats.monthlyCampaigns.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Gráficos de tipo de campaña y engagement */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {/* Gráfico de tipo de campañas */}
                  <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">Campañas por Tipo</h3>
                    <div className="h-60 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Marketing', value: stats.campaignsByType.marketing },
                              { name: 'Newsletter', value: stats.campaignsByType.newsletter },
                              { name: 'Anuncios', value: stats.campaignsByType.announcement },
                              { name: 'Otros', value: stats.campaignsByType.other }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {Object.values(stats.campaignsByType).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} campañas`, '']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  {/* Gráfico de engagement últimos 7 días */}
                  <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">Engagement (últimos 7 días)</h3>
                    <div className="h-60 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={stats.engagement.map((value, index) => {
                            const date = new Date();
                            date.setDate(date.getDate() - (6 - index));
                            const day = date.getDate().toString().padStart(2, '0');
                            const month = (date.getMonth() + 1).toString().padStart(2, '0');
                            return { name: `${day}/${month}`, value };
                          })}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
                            formatter={(value) => [`${value} interacciones`, 'Engagement']}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                {/* Campañas con mejor rendimiento */}
                <div className="mt-6 sm:mt-8 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">Campañas con mejor rendimiento</h3>
                  {stats.topCampaigns && stats.topCampaigns.length > 0 ? (
                    <div className="space-y-3">
                      {stats.topCampaigns.map((campaign: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="font-medium text-gray-800 dark:text-gray-200">{campaign.name}</span>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">{campaign.performance}%</span>
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                              <div className="bg-green-500 dark:bg-green-600 h-2 rounded-full" style={{ width: `${campaign.performance}%` }}></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 py-4 text-center">No hay datos disponibles</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Botones comunes */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-4">
              {/* Botón para iniciar el tutorial */}
              <button
                onClick={startTutorial}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/60 rounded-md transition-colors"
              >
                <InfoIcon size={18} />
                Ver tutorial de la aplicación
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 