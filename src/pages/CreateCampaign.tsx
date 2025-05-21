import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Step1Describe from '../components/campaign/Step1Describe';
import Step2Audience from '../components/campaign/Step2Audience';
import Step3Preview from '../components/campaign/Step3Preview';

// Estructura para simular la API de OpenAI
const simulateOpenAIGeneration = async (prompt: string): Promise<string> => {
  // Esperar un tiempo para simular la petición a la API
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Plantilla de email para simular la respuesta de la API
  return `
    <div style="background:#f4f4f4;padding:32px 0;font-family:sans-serif;">
      <div style="max-width:480px;margin:auto;background:#fff;border-radius:8px;box-shadow:0 2px 8px #0001;padding:32px;">
        <h2 style="color:#4f46e5;margin-bottom:8px;">${prompt.includes('descuento') ? '¡Oferta Especial!' : '¡Novedad!'}</h2>
        <p style="color:#333;line-height:1.6;">Hola, estimado cliente.<br>Queremos presentarte ${prompt}. <b>¡No te lo pierdas!</b>.</p>
        <a href="#" style="display:inline-block;margin-top:24px;padding:12px 32px;background:linear-gradient(90deg,#6366f1,#3b82f6);color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;">Ver más información</a>
        <p style="margin-top:32px;font-size:12px;color:#888;">Si no deseas recibir más correos como este, haz clic aquí para darte de baja.</p>
      </div>
    </div>
  `;
};

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState({
    name: '',
    description: '',
    targetAudience: '',
    emailContent: '',
    tags: [] as string[],
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Aquí iría la integración con una API real
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateEmail = async () => {
    if (!campaign.description || !campaign.targetAudience) {
      setError(true);
      return;
    }
    
    setLoading(true);
    try {
      // Crear un prompt para la API utilizando los datos de la campaña
      const prompt = `${campaign.description} dirigido a ${campaign.targetAudience}`;
      
      // Llamada simulada a la API de OpenAI
      const generatedEmail = await simulateOpenAIGeneration(prompt);
      
      // Actualizar el estado con el contenido generado
      setCampaign(prev => ({ ...prev, emailContent: generatedEmail }));
      
      // Avanzar al siguiente paso
      setStep(3);
    } catch (error) {
      console.error('Error al generar el email:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCampaign;