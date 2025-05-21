interface Props {
  value: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step2Audience = ({ value, onChange, onNext, onBack }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <button onClick={onBack} className="text-indigo-500 dark:text-indigo-300 text-left">&larr; Atrás</button>
      <h2 className="text-xl font-semibold text-center text-indigo-700 dark:text-indigo-300">Paso 2: Definir audiencia y objetivo</h2>
      <div>
        <label className="block mb-1 font-medium">¿A quién va dirigido tu Email?</label>
        <select
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          value={value.audience}
          onChange={e => onChange({ ...value, audience: e.target.value })}
        >
          <option value="">Selecciona una opción</option>
          <option value="usuarios_inactivos">Usuarios inactivos</option>
          <option value="nuevos_usuarios">Nuevos usuarios</option>
          <option value="clientes_frecuentes">Clientes frecuentes</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">¿Cuál es el objetivo?</label>
        <select
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          value={value.objective}
          onChange={e => onChange({ ...value, objective: e.target.value })}
        >
          <option value="">Selecciona un objetivo</option>
          <option value="recuperar_clientes">Recuperar clientes</option>
          <option value="promocionar_producto">Promocionar producto</option>
          <option value="informar_novedades">Informar novedades</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <button
        className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold hover:from-indigo-600 hover:to-blue-600 transition"
        onClick={onNext}
        disabled={!value.audience || !value.objective}
      >
        Generar Email
      </button>
    </div>
  );
};

export default Step2Audience; 