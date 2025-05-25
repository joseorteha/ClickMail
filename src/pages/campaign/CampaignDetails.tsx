import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/ui/Card';
import { MailIcon, EditIcon, TrashIcon, PlusIcon, InfoIcon, ArrowLeftIcon, UserIcon, UsersIcon } from '../../components/ui/Icons';
import { getCampaignById, sendTestEmail, sendBulkEmail, processContactsFile, deleteCampaign, updateCampaign } from '../../services/campaignService';

const CampaignDetails: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
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
  
  // Estado para los datos de la campaña
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para el envío de emails
  const [showSendEmailModal, setShowSendEmailModal] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  
  // Estado para envío masivo
  const [showBulkSendModal, setShowBulkSendModal] = useState(false);
  const [recipientsList, setRecipientsList] = useState<string[]>([]);
  const [fileContent, setFileContent] = useState('');
  const [processingFile, setProcessingFile] = useState(false);
  
  // Estado para eliminación
  const [deleting, setDeleting] = useState(false);
  
  // Estado para cambiar el estado de la campaña
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');
  
  // Cargar los detalles de la campaña
  useEffect(() => {
    const fetchCampaignDetails = async () => {
      if (!campaignId) return;
      
      setLoading(true);
      try {
        const data = await getCampaignById(campaignId);
        setCampaign(data);
        setCurrentStatus(data.status || 'borrador');
      } catch (err: any) {
        console.error('Error al cargar detalles de la campaña:', err);
        setError(err?.message || 'No se pudieron cargar los detalles de la campaña');
        showToast('No se pudieron cargar los detalles de la campaña', 'error', 'Error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCampaignDetails();
  }, [campaignId, showToast]);
  
  // Manejar el envío de email de prueba
  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!campaignId) return;
    
    setSendingEmail(true);
    try {
      showToast('Enviando email de prueba...', 'info', 'Enviando');
      
      const result = await sendTestEmail(campaignId, { 
        recipient, 
        subject: subject || `Prueba: ${campaign?.name || 'Campaña'}`
      });
      
      if (result.success) {
        showToast('Email de prueba enviado correctamente', 'success', '¡Email enviado!');
        setShowSendEmailModal(false);
        setRecipient('');
        setSubject('');
      } else {
        throw new Error(result.message || 'Error desconocido');
      }
    } catch (err) {
      console.error('Error al enviar email de prueba:', err);
      showToast('No se pudo enviar el email de prueba', 'error', 'Error');
    } finally {
      setSendingEmail(false);
    }
  };
  
  // Manejar el procesamiento de un archivo de contactos
  const handleProcessContactsFile = async () => {
    if (!fileContent) return;
    
    setProcessingFile(true);
    try {
      showToast('Procesando contactos...', 'info', 'Procesando');
      
      const result = await processContactsFile(fileContent);
      
      if (result.contacts && result.contacts.length > 0) {
        setRecipientsList(result.contacts);
        showToast(`Se procesaron ${result.contacts.length} contactos`, 'success', 'Contactos procesados');
      } else {
        throw new Error('No se encontraron contactos válidos');
      }
    } catch (err) {
      console.error('Error al procesar contactos:', err);
      showToast('No se pudieron procesar los contactos', 'error', 'Error');
    } finally {
      setProcessingFile(false);
    }
  };
  
  // Manejar el envío masivo de emails
  const handleSendBulkEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!campaignId || recipientsList.length === 0) return;
    
    setSendingEmail(true);
    try {
      showToast(`Enviando email a ${recipientsList.length} destinatarios...`, 'info', 'Enviando');
      
      const result = await sendBulkEmail(
        campaignId,
        recipientsList,
        subject || `${campaign?.name || 'Campaña'}`
      );
      
      if (result.success) {
        showToast(`Email enviado a ${result.results?.filter((r: any) => r.success).length || 0} destinatarios`, 'success', '¡Emails enviados!');
        setShowBulkSendModal(false);
        setRecipientsList([]);
        setSubject('');
        setFileContent('');
      } else {
        throw new Error(result.message || 'Error desconocido');
      }
    } catch (err) {
      console.error('Error al enviar emails masivos:', err);
      showToast('No se pudieron enviar los emails', 'error', 'Error');
    } finally {
      setSendingEmail(false);
    }
  };
  
  // Manejar la carga de un archivo de contactos
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
  
  // Agregar manualmente un destinatario a la lista
  const handleAddRecipient = () => {
    if (!recipient || !recipient.includes('@')) return;
    
    if (!recipientsList.includes(recipient)) {
      setRecipientsList([...recipientsList, recipient]);
      setRecipient('');
    }
  };
  
  // Eliminar un destinatario de la lista
  const handleRemoveRecipient = (email: string) => {
    setRecipientsList(recipientsList.filter(r => r !== email));
  };
  
  // Eliminar campaña
  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta campaña? Esta acción no se puede deshacer.')) {
      return;
    }
    
    setDeleting(true);
    try {
      showToast('Eliminando campaña...', 'info', 'Eliminando');
      await deleteCampaign(campaignId);
      showToast('Campaña eliminada correctamente', 'success', '¡Eliminada!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error al eliminar la campaña:', err);
      showToast('No se pudo eliminar la campaña', 'error', 'Error');
    } finally {
      setDeleting(false);
    }
  };
  
  // Actualizar el estado de la campaña
  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus || !campaignId) return;
    
    setUpdatingStatus(true);
    try {
      await updateCampaign(campaignId, { status: newStatus });
      setCampaign({ ...campaign, status: newStatus });
      setCurrentStatus(newStatus);
      showToast(`Estado actualizado a ${newStatus}`, 'success');
    } catch (err) {
      console.error('Error al actualizar el estado de la campaña:', err);
      showToast('No se pudo actualizar el estado', 'error', 'Error');
    } finally {
      setUpdatingStatus(false);
    }
  };
  
  // Función para generar las clases CSS según el estado de la campaña
  const renderStatusBadgeClass = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'borrador':
        return 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300';
      case 'enviada':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'programada':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'completada':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300';
    }
  };
  
  // Renderizar los modales
  const renderSendEmailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Enviar Email de Prueba</h2>
        
        <form onSubmit={handleSendTestEmail}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Destinatario</label>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Asunto (opcional)</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={`Prueba: ${campaign?.name || 'Campaña'}`}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowSendEmailModal(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              disabled={sendingEmail || !recipient}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingEmail ? 'Enviando...' : 'Enviar Email'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
  const renderBulkSendModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Enviar Email a Múltiples Destinatarios</h2>
        
        <form onSubmit={handleSendBulkEmail}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Asunto (opcional)</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={`${campaign?.name || 'Campaña'}`}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Cargar archivo de destinatarios</label>
              <span className="text-xs text-gray-500 dark:text-gray-400">(CSV, TXT con emails separados por comas o líneas)</span>
            </div>
            <div className="flex space-x-2">
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".csv,.txt"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-300 dark:text-gray-400"
              />
              <button
                type="button"
                onClick={handleProcessContactsFile}
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
              <span className="text-xs text-gray-500 dark:text-gray-400">{recipientsList.length} destinatarios</span>
            </div>
            <div className="flex space-x-2">
              <input
                type="email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddRecipient}
                disabled={!recipient || !recipient.includes('@')}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Agregar
              </button>
            </div>
          </div>
          
          {/* Lista de destinatarios */}
          {recipientsList.length > 0 && (
            <div className="mb-4 max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-md p-2">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {recipientsList.map((email, index) => (
                  <li key={index} className="py-2 flex justify-between items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRecipient(email)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowBulkSendModal(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              disabled={sendingEmail || recipientsList.length === 0}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingEmail ? 'Enviando...' : `Enviar a ${recipientsList.length} destinatarios`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
  // Renderizar la página principal
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 container mx-auto px-4 py-8">
      {/* Cabecera */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {loading ? 'Cargando detalles...' : campaign?.name || 'Detalles de campaña'}
          </h1>
        </div>
        
        <div className="flex flex-wrap space-x-3 gap-2">
          <button
            onClick={() => setShowSendEmailModal(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition flex items-center gap-2"
          >
            <UserIcon size={16} />
            <span>Enviar Prueba</span>
          </button>
          
          <button
            onClick={() => setShowBulkSendModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition flex items-center gap-2"
          >
            <UsersIcon size={16} />
            <span>Envío Rápido</span>
          </button>
          
          <button
            onClick={() => navigate(`/campaign/${campaignId}/send`)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition flex items-center gap-2"
          >
            <MailIcon size={16} />
            <span>Envío Avanzado</span>
          </button>
        </div>
      </div>
      
      {/* Contenido */}
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
          {/* Detalles de la campaña */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Detalles de la Campaña</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Nombre</h3>
                  <p className="text-gray-900 dark:text-white">{campaign?.name || 'Sin nombre'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Estado</h3>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${renderStatusBadgeClass(campaign?.status || 'borrador')}`}>
                      {campaign?.status || 'borrador'}
                    </span>
                    
                    <div className="relative">
                      <select
                        value={currentStatus}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        disabled={updatingStatus}
                        className="pl-3 pr-10 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="borrador">Borrador</option>
                        <option value="enviada">Enviada</option>
                        <option value="programada">Programada</option>
                        <option value="completada">Completada</option>
                      </select>
                      {updatingStatus && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin h-4 w-4 border-2 border-indigo-500 rounded-full border-t-transparent"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Audiencia Objetivo</h3>
                  <p className="text-gray-900 dark:text-white">{campaign?.targetAudience || 'No especificada'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Fecha de Creación</h3>
                  <p className="text-gray-900 dark:text-white">
                    {campaign?.createdAt ? new Date(campaign.createdAt).toLocaleDateString() : 'Fecha desconocida'}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Descripción</h3>
                <p className="text-gray-900 dark:text-white">{campaign?.description || 'Sin descripción'}</p>
              </div>
            </Card>
            
            {/* Vista previa del email */}
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Contenido del Email</h2>
                
                <button
                  onClick={() => navigate(`/campaign/${campaignId}/edit`)}
                  className="px-3 py-1.5 text-xs bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 rounded-lg flex items-center gap-1"
                >
                  <EditIcon size={14} />
                  <span>Editar Email</span>
                </button>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900 max-h-96 overflow-y-auto">
                {(campaign?.emailContent || campaign?.generatedEmail) ? (
                  <div dangerouslySetInnerHTML={{ __html: campaign?.emailContent || campaign?.generatedEmail || '' }} />
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
          </div>
          
          {/* Estadísticas */}
          <div>
            <Card className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Estadísticas</h2>
              
              <div className="space-y-4">
                {/* Ensure stats exists before trying to access its properties */}
                {!campaign?.stats && (
                  <div className="text-center py-2 text-gray-500 dark:text-gray-400">
                    <p>No hay estadísticas disponibles para esta campaña</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Tasa de Apertura</h3>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{campaign?.stats?.openRate || '0%'}</span>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{campaign?.stats?.opens || 0} aperturas</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Tasa de Clics</h3>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">{campaign?.stats?.clickRate || '0%'}</span>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{campaign?.stats?.clicks || 0} clics</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Rebotes</h3>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-red-600 dark:text-red-400">{campaign?.stats?.bounces || 0}</span>
                  </div>
                </div>
                
                {campaign?.stats?.lastSent && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Último Envío</h3>
                    <div className="flex items-center">
                      <span className="text-gray-900 dark:text-white">
                        {new Date(campaign?.stats?.lastSent).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Acciones */}
            <Card>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Acciones</h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate(`/campaign/${campaignId}/edit`)}
                  className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition flex items-center justify-center gap-2"
                >
                  <EditIcon size={16} />
                  <span>Editar Campaña</span>
                </button>
                
                <button
                  onClick={() => setShowSendEmailModal(true)}
                  className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition flex items-center justify-center gap-2"
                >
                  <UserIcon size={16} />
                  <span>Enviar Prueba</span>
                </button>
                
                <button
                  onClick={() => setShowBulkSendModal(true)}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition flex items-center justify-center gap-2"
                >
                  <UsersIcon size={16} />
                  <span>Envío Rápido</span>
                </button>
                
                <button
                  onClick={() => navigate(`/campaign/${campaignId}/send`)}
                  className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition flex items-center justify-center gap-2"
                >
                  <MailIcon size={16} />
                  <span>Envío Avanzado</span>
                </button>
                
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="w-full py-2 px-4 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/40 text-red-700 dark:text-red-300 font-medium rounded-lg shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <TrashIcon size={16} />
                  <span>{deleting ? 'Eliminando...' : 'Eliminar Campaña'}</span>
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
      
      {/* Modales */}
      {showSendEmailModal && campaign && renderSendEmailModal()}
      {showBulkSendModal && campaign && renderBulkSendModal()}
    </div>
  );
};

export default CampaignDetails;
