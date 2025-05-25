import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Step1Describe from '../components/campaign/Step1Describe';
import Step2Audience from '../components/campaign/Step2Audience';
import Step3Preview from '../components/campaign/Step3Preview';
import { createCampaign, generateEmail, generateTestEmail, updateCampaign } from '../services/campaignService';
import { useToast } from '../context/ToastContext';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // Definición completa con todos los campos posibles
  const [campaign, setCampaign] = useState<{
    name: string;
    description: string;
    targetAudience: string;
    emailContent: string;
    tags: string[];
    _id: string;
    // Nuevos campos necesarios para Step2
    campaignGoal?: string;
    tone?: string;
  }>({
    name: '',
    description: '',
    targetAudience: '',
    emailContent: '',
    tags: [],
    _id: '',
    campaignGoal: '',
    tone: ''
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (data: any) => {
    setCampaign({ ...campaign, ...data });
  };

  const handleError = () => {
    setError(true);
  };

  // Solución mejorada: avanzar al paso 3 directamente sin crear la campaña aún
  const handleGenerateEmail = async () => {
    console.log('handleGenerateEmail - campaign data:', campaign);
    
    // Debug: Mostrar qué campos están presentes
    console.log('Campos del paso 2:', {
      targetAudience: campaign.targetAudience || 'vacío',
      campaignGoal: campaign.campaignGoal || 'vacío', 
      tone: campaign.tone || 'vacío'
    });
    
    // Verificar solo los campos del paso 2 - con validación mejorada
    if (!campaign.targetAudience || campaign.targetAudience === '') {
      showToast('Este campo es necesario para generar un email personalizado.', 'warning', 'Audiencia no definida');
      return;
    }
    
    if (!campaign.campaignGoal || campaign.campaignGoal === '') {
      showToast('Este campo es necesario para generar un email efectivo.', 'warning', 'Objetivo no definido');
      return;
    }
    
    if (!campaign.tone || campaign.tone === '') {
      showToast('Este campo es necesario para adaptar el estilo del mensaje.', 'warning', 'Tono no definido');
      return;
    }
    
    // Si falta el nombre, lo añadimos con un valor por defecto
    if (!campaign.name || campaign.name.trim() === '') {
      setCampaign(prev => ({ ...prev, name: 'Campaña sin nombre' }));
    }
    
    // Primero vamos a intentar la forma simple: avanzar al paso 3 sin crear la campaña todavía
    // La creación de la campaña se hará cuando el usuario finalice en el paso 3
    setLoading(true);
    try {
      // Mostrar mensaje de diagnóstico
      console.log('Avanzando al paso 3 con datos:', { 
        name: campaign.name,
        description: campaign.description,
        targetAudience: campaign.targetAudience 
      });
      
      // Simplemente avanzamos al paso 3 sin crear la campaña todavía
      // Esto evita el problema de obtener el ID
      setStep(3);
      
      // Texto temporal como contenido del email
      setCampaign(prev => ({
        ...prev,
        emailContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
          <h2 style="color:#3b82f6;margin-bottom:16px;">Tu email de marketing</h2>
          <p>Haz clic en el botón "Generar Email (Método Directo)" arriba para generar contenido con IA.</p>
          <p>Los datos de tu campaña:</p>
          <ul>
            <li><strong>Nombre:</strong> ${campaign.name}</li>
            <li><strong>Descripción:</strong> ${campaign.description}</li>
            <li><strong>Audiencia:</strong> ${campaign.targetAudience}</li>
          </ul>
        </div>`
      }));
    } catch (error) {
      console.error('Error avanzando al paso 3:', error);
      let errorMessage = 'Error desconocido';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      showToast(`No se pudo avanzar al siguiente paso. ${errorMessage}`, 'error', 'Error de procesamiento');
    } finally {
      setLoading(false);
    }
  };
  
  // Método para generar el email usando la ruta de prueba directa
  const handleGenerateEmailContent = async () => {
    setLoading(true);
    try {
      // Mostrar toast de información en lugar de alerta
      showToast('Por favor espera mientras generamos tu email personalizado.', 'info', 'Generando email con IA...');
      
      // Usar la nueva función de prueba que no requiere ID de campaña ni autenticación
      const result = await generateTestEmail();
      
      // Mostrar toast de éxito en lugar de alerta
      showToast('Se ha actualizado la vista previa con tu nuevo contenido.', 'success', '¡Email generado exitosamente!');
      
      // Actualizar el contenido del email
      setCampaign(prev => ({
        ...prev,
        emailContent: result.email || 'No se pudo obtener el contenido del email'
      }));
    } catch (error) {
      let errorMessage = 'Error desconocido';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      // Mostrar toast de error en lugar de alerta
      showToast(`Revisa la consola para más detalles o intenta de nuevo.`, 'error', 'Error generando email');
      console.error(`Error al generar el email: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Guardar la campaña completa con el email generado y redireccionar al dashboard
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Verificar si tenemos el contenido del email
      if (!campaign.emailContent) {
        showToast('Primero necesitas generar el contenido del email.', 'warning', 'Contenido requerido');
        setLoading(false);
        return;
      }

      // Primero, crear la campaña en el backend
      showToast(`Estamos guardando tu campaña "${campaign.name}". Espera un momento...`, 'info', 'Guardando campaña');
      
      const campaignData = {
        name: campaign.name || "Campaña sin nombre", 
        description: campaign.description,
        targetAudience: campaign.targetAudience,
        tone: campaign.tone
      };
      
      // Crear la campaña
      const result = await createCampaign(campaignData);
      console.log('Campaña creada:', result);
      
      // Obtener el ID
      const campaignId = result.campaign?._id || result._id || result.id || result.campaign?.id;
      
      if (!campaignId) {
        throw new Error('No se pudo obtener el ID de la campaña creada');
      }
      
      // Actualizar la campaña con el email generado
      await updateCampaign(campaignId, {
        generatedEmail: campaign.emailContent
      });
      
      showToast('Tu campaña ha sido guardada correctamente.', 'success', '¡Campaña finalizada!');
      
      // Redireccionar al dashboard con un mensaje de éxito
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500); // Dar tiempo para que el usuario vea la notificación de éxito
    } catch (err) {
      console.error('Error al guardar la campaña:', err);
      let errorMessage = 'Error desconocido al guardar';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      showToast(`No se pudo guardar la campaña. ${errorMessage}`, 'error', 'Error al guardar');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header con pasos */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="py-3 sm:py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Nueva campaña</h1>
              <div className="hidden sm:flex items-center space-x-6">
                {['Describir', 'Audiencia', 'Revisar'].map((label, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className={`flex items-center justify-center w-8 h-8 rounded-full border ${index + 1 === step ? 'text-white bg-blue-500 border-blue-500' : index + 1 < step ? 'text-white bg-green-500 border-green-500' : 'text-gray-400 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'}`}
                    >
                      {index + 1 < step ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <span className={`ml-2 ${index + 1 === step ? 'font-medium text-blue-500' : index + 1 < step ? 'font-medium text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>{label}</span>
                    {index < 2 && (
                      <div className={`w-10 h-[2px] ml-2 ${index + 1 < step ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                    )}
                  </div>
                ))}
              </div>
              {/* Indicador de pasos móvil */}
              <div className="sm:hidden flex items-center space-x-1">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`flex flex-col items-center`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${s < step ? 'bg-green-500 text-white' : s === step ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>{s}</div>
                    <div className={`w-10 h-[2px] mt-1 ${s < step ? 'bg-green-500' : s === step ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'} ${s === 3 ? 'hidden' : ''}`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contenido principal */}
      <div className="flex-1 px-4 sm:px-0">
        {error ? (
          <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-800/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Ha ocurrido un error</h3>
              <p className="text-red-600 dark:text-red-400 mb-4">No hemos podido completar tu solicitud. Por favor, inténtalo de nuevo.</p>
              <button 
                onClick={() => setError(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Reintentar
              </button>
            </div>
          </div>
        ) : (
          <div>
            {step === 1 && (
              <Step1Describe 
                value={campaign} 
                onChange={handleChange} 
                onNext={handleNext} 
                onError={handleError}
              />
            )}
            {step === 2 && (
              <Step2Audience 
                value={campaign} 
                onChange={handleChange} 
                onNext={handleGenerateEmail} 
                onBack={handleBack}
                onError={handleError}
                loading={loading}
              />
            )}
            {step === 3 && (
              <Step3Preview 
                value={campaign} 
                onChange={handleChange} 
                onBack={handleBack} 
                onError={handleError}
                onSubmit={handleSubmit}
                loading={loading}
                onGenerateEmail={handleGenerateEmailContent}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCampaign;