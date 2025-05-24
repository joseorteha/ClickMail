import React, { useState, useEffect } from 'react';
import { generateTestEmail } from '../../services/campaignService';
import { useToast } from '../../context/ToastContext';

interface Props {
  value: any;
  onChange: (data: any) => void;
  onBack: () => void;
  onError: () => void;
  onSubmit: () => void;
  loading: boolean;
  onGenerateEmail?: () => void; // Nueva prop para generar email con OpenAI
}

const defaultEmailHTML = `
  <div style="background:#f4f4f4;padding:32px 0;font-family:sans-serif;">
    <div style="max-width:480px;margin:auto;background:#fff;border-radius:8px;box-shadow:0 2px 8px #0001;padding:32px;">
      <h2 style="color:#3b82f6;margin-bottom:8px;">¡Recupera tu cuenta!</h2>
      <p style="color:#333;line-height:1.6;">Hola, te extrañamos.<br>Vuelve a usar nuestro servicio y recibe un <b>descuento especial</b>.</p>
      <a href="#" style="display:inline-block;margin-top:24px;padding:12px 32px;background:#3b82f6;color:#fff;text-decoration:none;border-radius:6px;font-weight:medium;">Volver ahora</a>
      <p style="margin-top:32px;font-size:12px;color:#888;">Si no solicitaste este correo, ignóralo.</p>
    </div>
  </div>
`;

const Step3Preview = ({ value, onChange, onBack, onError, onSubmit, loading, onGenerateEmail }: Props) => {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [html, setHtml] = useState(value.emailContent || defaultEmailHTML);
  const { showToast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-campania.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEdit = () => setEditing(true);
  const handleSave = () => {
    onChange({ ...value, emailContent: html });
    setEditing(false);
  };

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto w-full py-6 sm:py-8">
      {/* Título y subtítulo */}
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Tu email está listo</h1>
        <p className="text-gray-600 dark:text-gray-300">Vista previa de tu campaña generada por IA</p>
      </div>
      
      {/* Botón de generación de email - método directo */}
      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
        <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-2">¿Necesitas generar contenido de email?</h3>
        <p className="text-blue-600 dark:text-blue-400 mb-3 text-sm">Usa nuestra IA para crear automáticamente un email de marketing basado en tu campaña.</p>
        
        {/* Botón que hace petición directa con DATOS REALES */}
        <button 
          onClick={async () => {
            try {
              // Mostrar que estamos procesando
              showToast('Por favor espera mientras generamos tu email personalizado.', 'info', 'Generando email con TUS DATOS...');
              
              // Crear una URL con query params para enviar los datos de la campaña
              const params = new URLSearchParams({
                name: value.name || 'Campaña sin nombre',
                description: value.description || 'Sin descripción',
                targetAudience: value.targetAudience || 'general',
                tone: value.tone || 'professional'
              });
              
              // Petición directa a la API con los datos reales
              const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/campaigns/generate-test-email?${params.toString()}`);
              const data = await response.json();
              
              if (data.success && data.email) {
                // Actualizar tanto el estado local como el valor del padre
                setHtml(data.email);
                onChange({ ...value, emailContent: data.email });
                
                // Notificación con el resultado
                showToast('Se ha actualizado la vista previa con tu nuevo contenido.', 'success', '¡Email generado exitosamente con TUS DATOS!');
              } else {
                throw new Error('La respuesta no contiene un email válido');
              }
            } catch (error) {
              console.error('Error generando email:', error);
              showToast('Revisa la consola para más detalles o intenta de nuevo.', 'error', 'Error generando email');
            }
          }}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Generar Email (Método Directo)
        </button>
        
        {/* Botón original (si existe la función) */}
        {onGenerateEmail && (
          <button 
            onClick={onGenerateEmail}
            className="w-full mt-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generar Email (Método Original)
          </button>
        )}
      </div>
      
      {/* Nombre de la campaña */}
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-800 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <label htmlFor="campaign-name-preview" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre de la campaña
            </label>
            <input
              id="campaign-name-preview"
              type="text"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
              placeholder="Ingresa un nombre para tu campaña"
              value={value.name || ''}
              onChange={e => onChange({ ...value, name: e.target.value })}
              required
            />
          </div>
          <div className="hidden sm:block border-r border-blue-200 dark:border-blue-700 h-12"></div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-2 text-blue-500 dark:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Este nombre aparecerá en el Dashboard y te ayudará a identificar tus campañas
          </div>
        </div>
      </div>

      {/* Vista previa del email */}
      <div className="mb-6 sm:mb-8 border rounded-xl p-3 sm:p-6 bg-white dark:bg-gray-800 shadow-sm">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4 mb-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="h-2 w-2 bg-red-500 rounded-full mr-1"></div>
            <div className="h-2 w-2 bg-yellow-500 rounded-full mr-1"></div>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mx-auto">Vista previa de email</div>
          </div>
          <div className="prose max-w-full overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-md p-2 sm:p-4 bg-white dark:bg-gray-800 prose-sm sm:prose-base" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        
        {/* Editor HTML */}
        {editing && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Editor HTML</label>
              <button 
                onClick={handleSave} 
                className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
              >
                Guardar cambios
              </button>
            </div>
            <textarea
              className="w-full border rounded-lg p-2 sm:p-3 min-h-[150px] sm:min-h-[200px] font-mono text-xs bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
              value={html}
              onChange={e => setHtml(e.target.value)}
              spellCheck="false"
            />
          </div>
        )}
      </div>
      
      {/* Acciones */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Acciones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
          {!editing ? (
            <button 
              onClick={handleEdit} 
              className="flex flex-col items-center justify-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all text-gray-700 dark:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="text-sm">Editar HTML</span>
            </button>
          ) : null}
          
          <button 
            onClick={handleCopy} 
            className="flex flex-col items-center justify-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all text-gray-700 dark:text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">Copiar HTML</span>
          </button>
          
          <button 
            onClick={handleDownload} 
            className="flex flex-col items-center justify-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all text-gray-700 dark:text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-sm">Descargar</span>
          </button>
          
          <button 
            onClick={handleSend} 
            className="flex flex-col items-center justify-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all text-gray-700 dark:text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">Enviar email</span>
          </button>
        </div>
        
        {copied && (
          <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-sm rounded-lg border border-green-200 dark:border-green-800 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            HTML copiado al portapapeles
          </div>
        )}
        
        {sent && (
          <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm rounded-lg border border-blue-200 dark:border-blue-800 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Email enviado correctamente (simulado)
          </div>
        )}
      </div>
      
      {/* Botones de navegación */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        <button
          className="w-full sm:w-auto order-2 sm:order-1 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 shadow-sm text-sm sm:text-base"
          onClick={onBack}
        >
          Volver
        </button>
        <button
          className="w-full sm:w-auto order-1 sm:order-2 mb-3 sm:mb-0 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition shadow-sm flex items-center justify-center text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            onChange({ ...value, emailContent: html });
            onSubmit();
          }}
          disabled={loading || !value.name || value.name.trim() === ''}
        >
          {loading ? 'Guardando...' : 'Finalizar campaña'}
        </button>
      </div>
    </div>
  );
};

export default Step3Preview;