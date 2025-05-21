interface Props {
  value: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onError?: () => void;
}

const Step1Describe = ({ value, onChange, onNext, onError }: Props) => {
  return (
    <div className="max-w-3xl mx-auto w-full py-6 sm:py-8">
      {/* Título y subtítulo */}
      <div className="mb-6 sm:mb-10 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">¿Qué estás vendiendo?</h1>
        <p className="text-gray-600 dark:text-gray-300">Ingresa una descripción de tu producto, servicio u oferta</p>
      </div>
      
      {/* Campo de descripción principal */}
      <div className="mb-8">
        <textarea
          className="w-full border rounded-lg p-3 sm:p-4 min-h-[120px] sm:min-h-[140px] focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all resize-none shadow-sm text-sm sm:text-base"
          placeholder="Describe en detalle tu producto o servicio. Por ejemplo: 'Ofrecemos un servicio de asesoría financiera para pequeñas empresas, con planes personalizados según el tamaño y necesidades de cada negocio.'"
          value={value.description}
          onChange={e => onChange({ ...value, description: e.target.value })}
          maxLength={500}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">{value.description?.length || 0}/500</p>
      </div>
      
      {/* Campos adicionales con etiquetas */}
      <div className="mb-8">
        <div className="mb-4">
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Palabras clave (opcional)</label>
          <input
            id="keywords"
            type="text"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
            placeholder="Palabras clave separadas por comas"
            value={value.keywords || ''}
            onChange={e => onChange({ ...value, keywords: e.target.value })}
          />
        </div>
        
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sitio web (opcional)</label>
          <input
            id="website"
            type="url"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
            placeholder="https://www.ejemplo.com"
            value={value.website || ''}
            onChange={e => onChange({ ...value, website: e.target.value })}
          />
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className="flex justify-end">
        <button
          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onNext}
          disabled={!value.description}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Step1Describe; 