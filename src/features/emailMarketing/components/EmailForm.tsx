const EmailForm = () => {
  return (
    <form className="space-y-4">
      <input type="email" placeholder="Correo destino" className="border p-2 w-full" />
      <textarea placeholder="Mensaje" className="border p-2 w-full" rows={4} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Enviar
      </button>
    </form>
  );
};

export default EmailForm;
