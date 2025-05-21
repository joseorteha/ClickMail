import React from 'react';

interface Props {
  value: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  onError?: () => void;
  loading?: boolean;
}

const Step2Audience = ({ value, onChange, onNext, onBack, onError, loading }: Props) => {
  return (
    <div className="max-w-3xl mx-auto w-full py-6 sm:py-8">
      {/* Título y subtítulo */}
      <div className="mb-6 sm:mb-10 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Define tu audiencia</h1>
        <p className="text-gray-600 dark:text-gray-300">Ayúdanos a entender mejor a quién quieres dirigir tu mensaje</p>
      </div>
      
      {/* Campo de audiencia */}
      <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">¿A quién va dirigido?</label>
          <select
            className="w-full border rounded-lg p-3 h-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
            value={value.targetAudience}
            onChange={e => onChange({ ...value, targetAudience: e.target.value })}
          >
            <option value="">Seleccionar audiencia</option>
            <option value="general">Público general</option>
            <option value="business">Empresas</option>
            <option value="technical">Público técnico</option>
            <option value="creative">Creativos</option>
            <option value="education">Sector educativo</option>
            <option value="healthcare">Sector salud</option>
            <option value="finance">Sector financiero</option>
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Selecciona el tipo de público al que quieres llegar</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Objetivo de la campaña</label>
          <select
            className="w-full border rounded-lg p-3 h-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
            value={value.campaignGoal}
            onChange={e => onChange({ ...value, campaignGoal: e.target.value })}
          >
            <option value="">Seleccionar objetivo</option>
            <option value="awareness">Dar a conocer</option>
            <option value="conversion">Conversión</option>
            <option value="retention">Fidelización</option>
            <option value="information">Informativo</option>
            <option value="sale">Venta directa</option>
            <option value="lead">Generación de leads</option>
            <option value="event">Promocionar evento</option>
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">¿Qué quieres lograr con esta campaña?</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tono de comunicación</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { value: 'formal', label: 'Formal' },
              { value: 'casual', label: 'Casual' },
              { value: 'friendly', label: 'Amigable' },
              { value: 'professional', label: 'Profesional' }
            ].map((tone) => (
              <div 
                key={tone.value}
                onClick={() => onChange({ ...value, tone: tone.value })}
                className={`border rounded-lg p-3 text-center cursor-pointer transition-all ${value.tone === tone.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'}`}
              >
                {tone.label}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Selecciona el tono que mejor represente tu marca</p>
        </div>
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
          className="w-full sm:w-auto order-1 sm:order-2 mb-3 sm:mb-0 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
          onClick={onNext}
          disabled={!value.targetAudience || !value.campaignGoal || !value.tone || loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </>
          ) : (
            'Continuar'
          )}
        </button>
      </div>
    </div>
  );
};

export default Step2Audience;