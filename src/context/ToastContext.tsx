import React, { createContext, useState, useContext, useCallback, ReactNode, useEffect } from 'react';
import Toast, { ToastType } from '../components/ui/Toast';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  title?: string;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, title?: string) => void;
  showBrowserNotification: (message: string, title?: string) => void;
  requestNotificationPermission: () => Promise<boolean>;
  hasNotificationPermission: boolean;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast debe usarse dentro de un ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  
  // Comprobar si las notificaciones están soportadas y si ya tenemos permiso
  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        setHasPermission(true);
      }
    }
  }, []);

  // Solicitar permiso para mostrar notificaciones
  const requestNotificationPermission = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.log('Este navegador no soporta notificaciones');
      return false;
    }
    
    if (Notification.permission === 'granted') {
      setHasPermission(true);
      return true;
    }
    
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';
      setHasPermission(granted);
      return granted;
    }
    
    return false;
  }, []);

  // Mostrar notificación en el navegador
  const showBrowserNotification = useCallback((message: string, title: string = 'ClickMail') => {
    if (!('Notification' in window)) {
      console.log('Este navegador no soporta notificaciones');
      return;
    }
    
    if (Notification.permission === 'granted') {
      // Crear y mostrar la notificación
      const notification = new Notification(title, {
        body: message,
        icon: '/logo1.svg', // Usa el logo de ClickMail como icono
        badge: '/logo1.svg',
        requireInteraction: false // Hacer que la notificación se cierre automáticamente
      });
      
      // Evento al hacer clic en la notificación
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
      
      // Cerrar automáticamente después de 5 segundos
      setTimeout(() => notification.close(), 5000);
    } else {
      // Si no tenemos permiso, mostramos un toast normal
      showToast(message, 'info', title);
    }
  }, []);

  const showToast = useCallback((message: string, type: ToastType, title?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, message, type, title }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ 
      showToast, 
      showBrowserNotification, 
      requestNotificationPermission,
      hasNotificationPermission: hasPermission 
    }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          title={toast.title}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};

export default ToastContext;
