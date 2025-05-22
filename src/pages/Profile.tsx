import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { InfoIcon } from '../components/ui/Icons';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el perfil
    setIsEditing(false);
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
    <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Notificación */}
        {notification && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-md shadow-sm">
            {notification}
          </div>
        )}
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Perfil de Usuario</h1>
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
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Guardar Cambios
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre</h3>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">{user?.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">{user?.email}</p>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
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
  );
};

export default Profile; 