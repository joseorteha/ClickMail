import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/ui/Card';
import { 
  MailIcon, 
  ArrowLeftIcon, 
  UserIcon, 
  UsersIcon, 
  PlusIcon, 
  TrashIcon, 
  InfoIcon 
} from '../../components/ui/Icons';
import { 
  getCampaignById, 
  sendTestEmail, 
  sendBulkEmail, 
  processContactsFile 
} from '../../services/campaignService';

const MAX_BATCH_SIZE = 50; // Máximo de correos por lote
const EMAILS_PER_HOUR = 100; // Límite recomendado por hora

const EmailSender: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  // Estados para la campaña
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para el envío de emails
  const [recipients, setRecipients] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [processingFile, setProcessingFile] = useState(false);
  
  // Estados para la programación
  const [scheduledTime, setScheduledTime] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  
  // Estados para el progreso
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [sentEmails, setSentEmails] = useState(0);
  const [failedEmails, setFailedEmails] = useState(0);
  
  // Validación temprana
  if (!campaignId) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-red-600 dark:text-red-400 mb-4">ID de campaña no válido</div>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Volver al Dashboard
        </button>
      </div>
    );
  }
  
  // Cargar los detalles de la campaña
  useEffect(() => {
    const fetchCampaignDetails = async () => {
      setLoading(true);
      try {
        const data = await getCampaignById(campaignId);
        if (!data) {
          throw new Error('No se encontró la campaña');
        }
        setCampaign(data);
        setSubject(data.name || 'Campaña sin nombre');
      } catch (err: any) {
        console.error('Error al cargar los detalles de la campaña:', err);
        setError(err?.message || 'No se pudieron cargar los detalles de la campaña');
        showToast('No se pudieron cargar los detalles de la campaña', 'error', 'Error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCampaignDetails();
  }, [campaignId, showToast]);
  
  // Validar y agregar un nuevo email
  const handleAddEmail = () => {
    if (!newEmail) return;
    
    // Validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      showToast('Email no válido', 'error', 'Error');
      return;
    }
    
    // Evitar duplicados
    if (recipients.includes(newEmail)) {
      showToast('Este email ya está en la lista', 'info', 'Información');
      return;
    }
    
    setRecipients([...recipients, newEmail]);
    setNewEmail('');
  };
  
  // Eliminar un email de la lista
  const handleRemoveEmail = (email: string) => {
    setRecipients(recipients.filter((e: string) => e !== email));
  };
  
  // Procesar archivo de contactos
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setFileContent(content || '');
    };
    reader.readAsText(file);
  };
  
  // Procesar el contenido del archivo
  const handleProcessFile = async () => {
    if (!fileContent) return;
    
    setProcessingFile(true);
    try {
      showToast('Procesando contactos...', 'info', 'Procesando');
      
      const result = await processContactsFile(fileContent);
      
      if (result.contacts && result.contacts.length > 0) {
        // Filtrar duplicados
        const newContacts = result.contacts.filter(
          (email: string) => !recipients.includes(email)
        );
        
        if (newContacts.length > 0) {
          setRecipients([...recipients, ...newContacts]);
          showToast(`Se agregaron ${newContacts.length} contactos nuevos`, 'success', 'Contactos procesados');
        } else {
          showToast('No se encontraron contactos nuevos', 'info', 'Información');
        }
      } else {
        throw new Error('No se encontraron contactos válidos');
      }
    } catch (err: any) {
      console.error('Error al procesar contactos:', err);
      showToast('No se pudieron procesar los contactos', 'error', 'Error');
    } finally {
      setProcessingFile(false);
      setFileContent('');
      // Limpiar el input de archivo
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };
  
  // Simular envío por lotes
  const simulateBatchSending = async () => {
    if (recipients.length === 0) return;
    
    setIsSending(true);
    setSendProgress(0);
    setSentEmails(0);
    setFailedEmails(0);
    
    try {
      showToast(`Preparando envío a ${recipients.length} destinatarios...`, 'info', 'Preparando');
      
      // Dividir en lotes de MAX_BATCH_SIZE
      const batches = [];
      for (let i = 0; i < recipients.length; i += MAX_BATCH_SIZE) {
        batches.push(recipients.slice(i, i + MAX_BATCH_SIZE));
      }
      
      // Enviar cada lote
      let completedEmails = 0;
      
      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        
        // Actualizar el progreso
        const batchProgress = ((i + 1) / batches.length) * 100;
        setSendProgress(batchProgress);
        
        // Mostrar mensaje para simular espera entre lotes
        if (i > 0) {
          showToast(`Enviando lote ${i+1} de ${batches.length}...`, 'info', 'Enviando');
        }
        
        // Enviar el lote actual
        const result = await sendBulkEmail(
          campaignId,
          batch,
          subject || campaign?.name || 'Campaña'
        );
        
        // Actualizar contadores
        if (result.success) {
          const successCount = result.results?.filter((r: any) => r.success).length || 0;
          const failCount = batch.length - successCount;
          
          setSentEmails(prev => prev + successCount);
          setFailedEmails(prev => prev + failCount);
          completedEmails += batch.length;
          
          // Simular espera entre lotes para evitar limitaciones de rate
          if (i < batches.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } else {
          throw new Error(result.message || 'Error al enviar emails');
        }
      }
      
      // Mensaje final
      showToast(
        `Envío completado: ${sentEmails} exitosos, ${failedEmails} fallidos`, 
        sentEmails > 0 ? 'success' : 'warning',
        'Envío completado'
      );
      
    } catch (err: any) {
      console.error('Error al enviar emails masivos:', err);
      showToast('Error al enviar emails: ' + err.message, 'error', 'Error');
    } finally {
      setIsSending(false);
    }
  };
  
  // Enviar la campaña
  const handleSendCampaign = () => {
    if (recipients.length === 0) {
      showToast('Debes agregar al menos un destinatario', 'warning', 'Atención');
      return;
    }
    
    if (recipients.length > EMAILS_PER_HOUR) {
      showToast(
        `Has superado el límite recomendado de ${EMAILS_PER_HOUR} emails por hora. Los emails se enviarán en lotes.`,
        'warning',
        'Límite superado'
      );
    }
    
    simulateBatchSending();
  };
  
  // Limpiar la lista de destinatarios
  const handleClearRecipients = () => {
    if (recipients.length === 0) return;
    
    if (window.confirm(`¿Estás seguro de que quieres eliminar todos los ${recipients.length} destinatarios?`)) {
      setRecipients([]);
      showToast('Lista de destinatarios limpiada', 'info', 'Información');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cabecera */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(`/campaign/${campaignId}`)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {loading ? 'Cargando...' : `Enviar: ${campaign?.name || 'Campaña'}`}
          </h1>
        </div>
      </div>
      
      {/* Contenido principal */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Cargando detalles de la campaña...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-800 dark:text-red-200 font-medium mb-2">Error</p>
          <p className="text-red-600 dark:text-red-300">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition"
          >
            Volver al Dashboard
          </button>
        </div>
      ) : campaign ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contenido del email */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Vista previa del Email</h2>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Asunto</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Asunto del email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900 max-h-96 overflow-y-auto">
                {campaign.emailContent || campaign.generatedEmail ? (
                  <div dangerouslySetInnerHTML={{ __html: campaign.emailContent || campaign.generatedEmail }} />
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>No hay contenido de email generado para esta campaña.</p>
                    <button
                      onClick={() => navigate(`/campaign/${campaignId}/edit`)}
                      className="mt-2 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 rounded-lg inline-flex items-center gap-1"
                    >
                      Generar Email
                    </button>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Sección de destinatarios */}
            <Card className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Destinatarios</h2>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Cargar contactos desde archivo</label>
                  <span className="text-xs text-gray-500 dark:text-gray-400">(CSV, TXT con emails separados por comas o líneas)</span>
                </div>
                <div className="flex space-x-2">
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileUpload}
                    accept=".csv,.txt"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-300 dark:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={handleProcessFile}
                    disabled={!fileContent || processingFile}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processingFile ? 'Procesando...' : 'Procesar'}
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Agregar destinatario manualmente</label>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{recipients.length} destinatarios</span>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddEmail()}
                  />
                  <button
                    type="button"
                    onClick={handleAddEmail}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PlusIcon size={16} />
                  </button>
                </div>
              </div>
              
              {recipients.length > 0 && (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300">Lista de destinatarios</h3>
                    <button
                      type="button"
                      onClick={handleClearRecipients}
                      className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
                    >
                      <TrashIcon size={14} />
                      <span>Limpiar lista</span>
                    </button>
                  </div>
                  
                  <div className="mb-4 max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-md p-2">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {recipients.slice(0, 100).map((email, index) => (
                        <li key={index} className="py-2 flex justify-between items-center">
                          <span className="text-sm text-gray-700 dark:text-gray-300">{email}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveEmail(email)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <TrashIcon size={14} />
                          </button>
                        </li>
                      ))}
                      {recipients.length > 100 && (
                        <li className="py-2 text-center text-sm text-gray-500 dark:text-gray-400">
                          ... y {recipients.length - 100} más
                        </li>
                      )}
                    </ul>
                  </div>
                </>
              )}
              
              {isSending && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Progreso del envío</h3>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {Math.round(sendProgress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${sendProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Enviados: {sentEmails}</span>
                    <span>Fallidos: {failedEmails}</span>
                    <span>Total: {recipients.length}</span>
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => navigate(`/campaign/${campaignId}`)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancelar
                </button>
                
                <div className="text-center py-5">
                  <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                        Modo Simulación: Los correos ahora se enviarán a través de Gmail.
                      </p>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleSendCampaign}
                    disabled={isSending || recipients.length === 0}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all flex items-center justify-center font-medium"
                  >
                    {isSending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Enviando campaña... ({sentEmails}/{recipients.length})
                      </>
                    ) : (
                      'Enviar campaña'
                    )}
                  </button>
                </div>
                
                <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <InfoIcon size={18} className="text-blue-400 dark:text-blue-300" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Los emails se enviarán en lotes de {MAX_BATCH_SIZE} para mejorar la tasa de entrega.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Detalles de la campaña */}
            <Card>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Detalles de la Campaña</h2>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Nombre</h3>
                  <p className="text-gray-900 dark:text-white">{campaign?.name || 'Sin nombre'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Audiencia</h3>
                  <p className="text-gray-900 dark:text-white">{campaign?.targetAudience || 'No especificada'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Creada</h3>
                  <p className="text-gray-900 dark:text-white">
                    {campaign?.createdAt ? new Date(campaign.createdAt).toLocaleDateString() : 'Fecha desconocida'}
                  </p>
                </div>
                
                <button
                  onClick={() => navigate(`/campaign/${campaignId}`)}
                  className="mt-4 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center gap-2"
                >
                  <ArrowLeftIcon size={16} />
                  <span>Volver a Detalles</span>
                </button>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No se encontró la campaña</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition"
          >
            Volver al Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailSender;
