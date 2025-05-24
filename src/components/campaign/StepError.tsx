interface Props {
  onRetry: () => void;
}

const StepError = ({ onRetry }: Props) => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-[300px]">
      <h2 className="text-2xl font-bold text-red-600">Error</h2>
      <div className="border rounded-lg p-6 bg-red-50 text-center text-red-700">
        No se pudo generar el contenido
      </div>
      <button
        className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold hover:from-red-500 hover:to-pink-600 transition"
        onClick={onRetry}
      >
        Volver a intentar
      </button>
    </div>
  );
};

export default StepError; 