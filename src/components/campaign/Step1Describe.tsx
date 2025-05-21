interface Props {
  value: any;
  onChange: (data: any) => void;
  onNext: () => void;
}

const Step1Describe = ({ value, onChange, onNext }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-center text-indigo-700 dark:text-indigo-300">Paso 1: Describe tu producto o servicio</h2>
      <textarea
        className="w-full border rounded-lg p-3 min-h-[100px] focus:ring-2 focus:ring-indigo-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Describe tu producto o servicio"
        value={value.description}
        onChange={e => onChange({ ...value, description: e.target.value })}
        maxLength={500}
      />
      <input
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Sitio Web (opcional)"
        value={value.website}
        onChange={e => onChange({ ...value, website: e.target.value })}
      />
      <button
        className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold hover:from-indigo-600 hover:to-blue-600 transition"
        onClick={onNext}
        disabled={!value.description}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Step1Describe; 