import { useState } from 'react';

interface Props {
  value: any;
  onChange: (data: any) => void;
  onBack: () => void;
  onError: () => void;
}

const defaultEmailHTML = `
  <div style="background:#f4f4f4;padding:32px 0;font-family:sans-serif;">
    <div style="max-width:480px;margin:auto;background:#fff;border-radius:8px;box-shadow:0 2px 8px #0001;padding:32px;">
      <h2 style="color:#4f46e5;margin-bottom:8px;">¡Recupera tu cuenta!</h2>
      <p style="color:#333;line-height:1.6;">Hola, te extrañamos.<br>Vuelve a usar nuestro servicio y recibe un <b>descuento especial</b>.</p>
      <a href="#" style="display:inline-block;margin-top:24px;padding:12px 32px;background:linear-gradient(90deg,#6366f1,#3b82f6);color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;">Volver ahora</a>
      <p style="margin-top:32px;font-size:12px;color:#888;">Si no solicitaste este correo, ignóralo.</p>
    </div>
  </div>
`;

const Step3Preview = ({ value, onChange, onBack, onError }: Props) => {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [html, setHtml] = useState(value.emailContent || defaultEmailHTML);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-campania.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEdit = () => setEditing(true);
  const handleSave = () => {
    onChange({ ...value, emailContent: html });
    setEditing(false);
  };

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <button onClick={onBack} className="text-indigo-500 dark:text-indigo-300 text-left">&larr; Atrás</button>
      <h2 className="text-xl font-semibold text-center text-indigo-700 dark:text-indigo-300">Paso 3: Generar y editar</h2>
      <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 min-h-[120px]">
        <div className="text-gray-500 dark:text-gray-300 text-center mb-2">Vista previa</div>
        <div className="prose max-w-full overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      {editing && (
        <textarea
          className="w-full border rounded-lg p-3 min-h-[120px] font-mono text-xs bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          value={html}
          onChange={e => setHtml(e.target.value)}
        />
      )}
      <div className="flex flex-wrap gap-2 justify-center">
        {!editing ? (
          <button onClick={handleEdit} className="px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-800 transition">Editar</button>
        ) : (
          <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 font-semibold hover:bg-green-200 dark:hover:bg-green-800 transition">Guardar</button>
        )}
        <button onClick={handleCopy} className="px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition">Copiar</button>
        <button onClick={handleDownload} className="px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 font-semibold hover:bg-green-200 dark:hover:bg-green-800 transition">Descargar HTML</button>
        <button onClick={handleSend} className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold hover:from-indigo-600 hover:to-blue-600 transition">Enviar Email</button>
      </div>
      {copied && <div className="text-green-600 dark:text-green-300 text-center font-medium">¡Copiado al portapapeles!</div>}
      {sent && <div className="text-blue-600 dark:text-blue-300 text-center font-medium">¡Correo enviado (simulado)!</div>}
    </div>
  );
};

export default Step3Preview; 