import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  title?: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'info', 
  duration = 5000,
  title,
  onClose 
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Esperar a que termine la animación
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className={`w-12 h-12 rounded-full ${currentStyle.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg transform -translate-y-1/4`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className={`w-12 h-12 rounded-full ${currentStyle.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg transform -translate-y-1/4`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className={`w-12 h-12 rounded-full ${currentStyle.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg transform -translate-y-1/4`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className={`w-12 h-12 rounded-full ${currentStyle.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg transform -translate-y-1/4`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  // Estilos avanzados por tipo de notificación
  const styleClasses = {
    success: {
      gradient: 'from-green-400 to-emerald-500',
      glassBg: 'bg-white/90 dark:bg-gray-800/90',
      iconBg: 'bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700',
      text: 'text-green-800 dark:text-green-200',
      title: 'text-green-600 dark:text-green-300',
      glow: 'shadow-[0_0_15px_rgba(52,211,153,0.5)] dark:shadow-[0_0_15px_rgba(16,185,129,0.35)]',
      border: 'border border-green-200/50 dark:border-green-800/30',
      barBg: 'bg-gradient-to-r from-green-400 to-emerald-500',
      hoverClose: 'hover:bg-green-100/50 dark:hover:bg-green-900/50',
      pulse: 'pulse-success',
      emoji: '✨'
    },
    error: {
      gradient: 'from-red-400 to-pink-500',
      glassBg: 'bg-white/90 dark:bg-gray-800/90',
      iconBg: 'bg-gradient-to-br from-red-400 to-red-600 dark:from-red-500 dark:to-red-700',
      text: 'text-red-800 dark:text-red-200',
      title: 'text-red-600 dark:text-red-300',
      glow: 'shadow-[0_0_15px_rgba(248,113,113,0.5)] dark:shadow-[0_0_15px_rgba(239,68,68,0.35)]',
      border: 'border border-red-200/50 dark:border-red-800/30',
      barBg: 'bg-gradient-to-r from-red-400 to-pink-500',
      hoverClose: 'hover:bg-red-100/50 dark:hover:bg-red-900/50',
      pulse: 'pulse-error',
      emoji: '⚠️'
    },
    warning: {
      gradient: 'from-yellow-400 to-amber-500',
      glassBg: 'bg-white/90 dark:bg-gray-800/90',
      iconBg: 'bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700',
      text: 'text-yellow-800 dark:text-yellow-200',
      title: 'text-yellow-600 dark:text-yellow-300',
      glow: 'shadow-[0_0_15px_rgba(251,191,36,0.5)] dark:shadow-[0_0_15px_rgba(245,158,11,0.35)]',
      border: 'border border-yellow-200/50 dark:border-yellow-800/30',
      barBg: 'bg-gradient-to-r from-yellow-400 to-amber-500',
      hoverClose: 'hover:bg-yellow-100/50 dark:hover:bg-yellow-900/50',
      pulse: 'pulse-warning',
      emoji: '🔔'
    },
    info: {
      gradient: 'from-blue-400 to-indigo-500',
      glassBg: 'bg-white/90 dark:bg-gray-800/90',
      iconBg: 'bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700',
      text: 'text-blue-800 dark:text-blue-200',
      title: 'text-blue-600 dark:text-blue-300',
      glow: 'shadow-[0_0_15px_rgba(96,165,250,0.5)] dark:shadow-[0_0_15px_rgba(59,130,246,0.35)]',
      border: 'border border-blue-200/50 dark:border-blue-800/30',
      barBg: 'bg-gradient-to-r from-blue-400 to-indigo-500',
      hoverClose: 'hover:bg-blue-100/50 dark:hover:bg-blue-900/50',
      pulse: 'pulse-info',
      emoji: '💬'
    }
  };
  
  const currentStyle = styleClasses[type];
  
  // Títulos predeterminados más atractivos según el tipo
  const defaultTitles = {
    success: `${styleClasses.success.emoji} ¡Éxito total!`,
    error: `${styleClasses.error.emoji} ¡Ups! Algo salió mal`,
    warning: `${styleClasses.warning.emoji} ¡Atención!`,
    info: `${styleClasses.info.emoji} ¡Hey! Tenemos noticias`
  };
  
  const toastTitle = title || defaultTitles[type];

  return (
    <div 
      className={`
        fixed bottom-6 right-6 z-50 max-w-sm
        transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${visible ? 'translate-y-0 opacity-100 scale-100 rotate-0' : 'translate-y-12 opacity-0 scale-95 rotate-1'}
      `}
    >
      <div className={`
        relative rounded-xl backdrop-blur-md ${currentStyle.glassBg} ${currentStyle.border}
        ${currentStyle.glow} overflow-hidden flex flex-col
        animate-fadeIn shadow-2xl
      `}>
        {/* Gradiente de fondo en la parte superior */}
        <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${currentStyle.gradient}`}></div>
        
        {/* Contenido principal */}
        <div className="flex px-4 pt-6 pb-4 relative">
          {/* Icono que sobresale */}
          <div className="relative ml-1">
            {getIcon()}
          </div>
          
          <div className="flex-1 pl-4 pr-2">
            <h3 className={`text-base font-extrabold mb-1 ${currentStyle.title} filter drop-shadow-sm`}>
              {toastTitle}
            </h3>
            <p className={`text-sm ${currentStyle.text} leading-relaxed`}>{message}</p>
          </div>
          
          <button 
            type="button" 
            className={`p-2 rounded-full self-start -mt-1 -mr-1 text-gray-500 ${currentStyle.hoverClose} focus:outline-none transition-all`}
            onClick={() => {
              setVisible(false);
              setTimeout(onClose, 500);
            }}
            aria-label="Cerrar"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Barra de progreso para el tiempo restante */}
        <div className="relative w-full h-1.5 bg-gray-200/50 dark:bg-gray-700/50 overflow-hidden">
          <div 
            className={`absolute left-0 top-0 h-full ${currentStyle.barBg}`}
            style={{
              width: '100%',
              animation: `shrink ${duration}ms linear forwards, pulse 2s infinite`
            }}
          />
        </div>
      </div>
      
      {/* Estilos para animaciones */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.85; }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `
      }} />
    </div>
  );
};

export default Toast;
