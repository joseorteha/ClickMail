import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Añadido para animaciones suaves
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Card from '../components/ui/Card';
import axios from 'axios';

const EmailSettings: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [hasExistingConfig, setHasExistingConfig] = useState(false);
  
  // Estado para el formulario (simplificado para Ethereal Email)
  const [formData, setFormData] = useState({
    provider: 'smtp',
    domain: 'smtp.ethereal.email', // Valor fijo para Ethereal
    apiKey: '', // Ahora funciona como contraseña
    fromEmail: user?.email || '',
    fromName: user?.name || '',
  });
  
  // Cargar configuración existente si la hay
  useEffect(() => {
    const fetchEmailConfig = async () => {
      try {
        // Obtener el token del localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.warn('No hay token de autenticación disponible');
          return;
        }
        
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/email-provider`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        if (response.data.success) {
          const { data } = response.data;
          setFormData({
            provider: data.provider,
            domain: data.domain,
            apiKey: '', // No mostramos la API key por seguridad
            fromEmail: data.fromEmail,
            fromName: data.fromName
          });
          setHasExistingConfig(true);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status !== 404) {
          console.error('Error al cargar configuración de email:', error);
          showToast('Error al cargar la configuración de email', 'error');
        }
      }
    };
    
    fetchEmailConfig();
  }, [showToast, user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const verifyEmailConfig = async () => {
    if (!formData.fromEmail) {
      showToast('El email del remitente es requerido para verificar', 'error');
      return;
    }
    
    setVerifying(true);
    try {
      // Obtener el token del localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        showToast('No hay sesión activa. Por favor inicia sesión nuevamente.', 'error');
        setVerifying(false);
        return;
      }
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/verify-email`, 
        {
          apiKey: formData.apiKey || 'test-password',
          domain: formData.domain,
          fromEmail: formData.fromEmail
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        // Mostrar información sobre la cuenta de prueba Ethereal
        const testAccount = response.data.data?.testAccount;
        if (testAccount) {
          showToast(`¡Configuración verificada! Se usará una cuenta de prueba: ${testAccount.user}`, 'success');
        } else {
          showToast('¡Configuración verificada correctamente!', 'success');
        }
      } else {
        showToast('No se pudo verificar la configuración', 'error');
      }
    } catch (error) {
      console.error('Error al verificar configuración de email:', error);
      showToast('Error en la configuración. Se usará una cuenta de prueba de Ethereal Email.', 'warning');
    } finally {
      setVerifying(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.domain || !formData.apiKey || !formData.fromEmail || !formData.fromName) {
      showToast('Todos los campos son obligatorios', 'error');
      return;
    }
    
    setLoading(true);
    try {
      // Obtener el token del localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        showToast('No hay sesión activa. Por favor inicia sesión nuevamente.', 'error');
        setLoading(false);
        return;
      }
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/email-provider`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        showToast('Configuración guardada correctamente', 'success');
        setHasExistingConfig(true);
      } else {
        showToast(response.data.message || 'Error al guardar configuración', 'error');
      }
    } catch (error) {
      console.error('Error al guardar configuración:', error);
      showToast('Error al guardar la configuración', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar tu configuración de email? Esto afectará a todas tus campañas activas.')) {
      return;
    }
    
    setLoading(true);
    try {
      // Obtener el token del localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        showToast('No hay sesión activa. Por favor inicia sesión nuevamente.', 'error');
        setLoading(false);
        return;
      }
      
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/email-provider`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        showToast('Configuración eliminada correctamente', 'success');
        setFormData({
          provider: 'mailgun',
          domain: '',
          apiKey: '',
          fromEmail: '',
          fromName: user?.name || '',
        });
        setHasExistingConfig(false);
      } else {
        showToast(response.data.message || 'Error al eliminar configuración', 'error');
      }
    } catch (error) {
      console.error('Error al eliminar configuración:', error);
      showToast('Error al eliminar la configuración', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Configuración de Email</h1>
        
        <Card>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Configura tu proveedor de email</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Conecta tu cuenta de Mailgun para enviar emails desde tu propio dominio. 
              Esto te permitirá tener control total sobre tus envíos y mejorar la entregabilidad.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Proveedor de Email
              </label>
              <select
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                disabled
              >
                <option value="mailgun">Mailgun</option>
                <option value="sendgrid" disabled>SendGrid (Próximamente)</option>
                <option value="smtp" disabled>SMTP Personalizado (Próximamente)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dominio de Mailgun
              </label>
              <input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                placeholder="Ej: mail.tudominio.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                required
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Dominio verificado en tu cuenta de Mailgun
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                API Key de Mailgun
              </label>
              <input
                type="password"
                name="apiKey"
                value={formData.apiKey}
                onChange={handleChange}
                placeholder={hasExistingConfig ? "••••••••••••••••" : "Ingresa tu API Key"}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                required={!hasExistingConfig}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {hasExistingConfig ? "Dejar en blanco para mantener la API key actual" : "La API key privada de tu cuenta de Mailgun"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email del Remitente
                </label>
                <input
                  type="email"
                  name="fromEmail"
                  value={formData.fromEmail}
                  onChange={handleChange}
                  placeholder="no-reply@tudominio.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre del Remitente
                </label>
                <input
                  type="text"
                  name="fromName"
                  value={formData.fromName}
                  onChange={handleChange}
                  placeholder="Tu Nombre o Empresa"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={verifyEmailConfig}
                disabled={verifying || !formData.fromEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors flex-1"
              >
                {verifying ? 'Verificando...' : 'Verificar configuración'}
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors flex-1"
              >
                {loading ? 'Guardando...' : hasExistingConfig ? 'Actualizar configuración' : 'Guardar configuración'}
              </button>
            </div>
            
            {hasExistingConfig && (
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors w-full"
                >
                  Eliminar configuración
                </button>
              </div>
            )}
          </form>
        </Card>
        
        <Card className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Guía de configuración de Mailgun</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">1. Crear una cuenta en Mailgun</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Regístrate en <a href="https://signup.mailgun.com/new/signup" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Mailgun</a> para obtener una cuenta.
                Mailgun ofrece un plan gratuito con 5,000 emails al mes durante los primeros 3 meses.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">2. Verificar tu dominio</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Añade y verifica tu dominio en Mailgun. Puedes usar un subdominio como <code>mail.tudominio.com</code> 
                para mantener separado tu email marketing de tu email principal.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">3. Obtener tu API Key</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                En Mailgun, ve a "API Keys" en el menú de navegación y copia tu "Private API Key".
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">4. Añadir correos autorizados</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                En el sandbox de Mailgun, necesitas añadir manualmente los correos a los que enviarás emails.
                Para un dominio verificado, puedes enviar a cualquier correo.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default EmailSettings;
