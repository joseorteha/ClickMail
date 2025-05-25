import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckIcon, LockClosedIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const plans = {
  starter: { name: 'Starter', priceMonthly: 15, priceAnnual: 150 },
  pro: { name: 'Pro', priceMonthly: 39, priceAnnual: 390 },
  enterprise: { name: 'Enterprise', priceMonthly: 99, priceAnnual: 990 }
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const planId = searchParams.get('plan') || 'starter';
  const period = searchParams.get('period') || 'monthly';
  const plan = plans[planId as keyof typeof plans];
  const price = period === 'annual' ? plan.priceAnnual : plan.priceMonthly;

  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    setError('');
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!,
    });
    if (error) {
      setError(error.message || 'Error al procesar el pago');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId, period, email: formData.email, paymentMethodId: paymentMethod.id })
      });
      const { sessionId } = await response.json();
      if (stripe) {
        const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
        if (stripeError) {
          setError(stripeError.message || 'Error al redirigir a Stripe');
        }
      }
    } catch (error) {
      setError('Hubo un error al procesar el pago. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Branding y resumen del plan */}
        <div className="md:w-1/2 p-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <img src="../public/logo1.svg" alt="ClickMail Logo" className="h-10 w-10 rounded-full shadow-lg" />
              <span className="text-2xl font-bold tracking-tight">ClickMail</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Resumen del Plan</h2>
            <p className="text-lg mb-6">Estás a punto de suscribirte al plan <span className="font-semibold">{plan.name}</span> ({period === 'annual' ? 'Anual' : 'Mensual'})</p>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-5xl font-extrabold">${price}</span>
              <span className="text-lg font-medium mb-1">/mes</span>
            </div>
            {period === 'annual' && (
              <p className="text-sm text-blue-100 mb-2">${plan.priceAnnual} facturados anualmente</p>
            )}
            <ul className="mt-6 space-y-3">
              {planId === 'starter' && [
                'Hasta 2,500 envíos/mes',
                'Campañas ilimitadas',
                'Soporte por email',
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-300" />{f}</li>
              ))}
              {planId === 'pro' && [
                'Hasta 20,000 envíos/mes',
                'Automatizaciones avanzadas',
                'IA para contenido',
                'Soporte prioritario',
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-300" />{f}</li>
              ))}
              {planId === 'enterprise' && [
                'Envíos ilimitados',
                'Gestor de cuenta dedicado',
                'Soporte 24/7',
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-300" />{f}</li>
              ))}
            </ul>
          </div>
          <div className="mt-10 flex items-center gap-2 text-blue-100 text-xs">
            <LockClosedIcon className="h-4 w-4" /> Pago 100% seguro con Stripe
          </div>
        </div>
        {/* Formulario de pago */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><CreditCardIcon className="h-7 w-7 text-blue-600 dark:text-blue-400" /> Datos de pago</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tarjeta de Crédito</label>
              <div className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-3">
                <CardElement id="card-element" options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } } } }} />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg flex items-center justify-center gap-2 disabled:opacity-60"
              disabled={!stripe || loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
              ) : (
                <CreditCardIcon className="h-6 w-6" />
              )}
              {loading ? 'Procesando...' : `Pagar $${price}`}
            </button>
          </form>
          <div className="mt-8 text-xs text-gray-400 text-center">
            Al continuar aceptas nuestros <a href="/company/terms" className="underline hover:text-blue-600">Términos y Condiciones</a> y <a href="/company/privacy" className="underline hover:text-blue-600">Política de Privacidad</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 