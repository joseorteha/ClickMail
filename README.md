import { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({
    product: '',
    audience: '',
    goal: '',
    tone: 'Persuasivo',
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const generateEmail = async () => {
    setLoading(true);
    const prompt = `
Eres un copywriter experto en email marketing.
Crea un email para:
Producto/servicio: ${form.product}
Audiencia: ${form.audience}
Objetivo: ${form.goal}
Tono: ${form.tone}
Incluye asunto y call‑to‑action.
    `;
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
      }),
    });
    const data = await res.json();
    setEmail(data.choices?.[0]?.message?.content || 'Error.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Email‑Marketing Generator 📧</h1>

      <div className="bg-white w-full max-w-xl p-6 rounded-2xl shadow">
        {/* Formulario */}
        <label className="block mb-3">
          <span className="font-semibold">Producto / servicio</span>
          <input
            name="product"
            value={form.product}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
        </label>

        <label className="block mb-3">
          <span className="font-semibold">Audiencia</span>
          <input
            name="audience"
            value={form.audience}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
        </label>

        <label className="block mb-3">
          <span className="font-semibold">Objetivo de la campaña</span>
          <input
            name="goal"
            value={form.goal}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
        </label>

        <label className="block mb-6">
          <span className="font-semibold">Tono</span>
          <select
            name="tone"
            value={form.tone}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          >
            <option>Persuasivo</option>
            <option>Amigable</option>
            <option>Profesional</option>
            <option>Urgente</option>
          </select>
        </label>

        <button
          onClick={generateEmail}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? 'Generando…' : 'Generar email'}
        </button>
      </div>

      {/* Resultado */}
      {email && (
        <div className="mt-8 w-full max-w-xl">
          <h2 className="text-xl font-semibold mb-2">Resultado</h2>
          <textarea
            className="w-full h-60 p-4 border rounded resize-none"
            value={email}
            readOnly
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(email);
            }}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Copiar al portapapeles
          </button>
        </div>
      )}
    </div>
  );
}
