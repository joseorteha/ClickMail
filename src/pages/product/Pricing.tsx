import React, { useState } from 'react';
import StaticPageLayout from '../../components/common/StaticPageLayout';
import { Link, useNavigate } from 'react-router-dom';
import { CheckIcon, XMarkIcon, RocketLaunchIcon, LightBulbIcon, BuildingOffice2Icon, CurrencyDollarIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Ideal para emprendedores y pequeños negocios que inician en email marketing.',
    priceMonthly: 199,
    priceAnnual: 1990,
    features: [
      'Hasta 2,500 envíos/mes',
      'Campañas ilimitadas',
      'Plantillas básicas',
      'Soporte por email',
      'Acceso a recursos gratuitos',
    ],
    cta: 'Continuar',
    highlighted: false,
    icon: <RocketLaunchIcon className="h-10 w-10 text-blue-500 mx-auto" />,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Para equipos en crecimiento que buscan automatización e IA avanzada.',
    priceMonthly: 499,
    priceAnnual: 4990,
    features: [
      'Hasta 20,000 envíos/mes',
      'Automatizaciones avanzadas',
      'Plantillas premium',
      'IA para generación de contenido',
      'Soporte prioritario',
      'Integraciones con CRM',
    ],
    cta: 'Continuar',
    highlighted: true,
    icon: <LightBulbIcon className="h-10 w-10 text-yellow-400 mx-auto" />,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Solución completa para empresas grandes y necesidades personalizadas.',
    priceMonthly: 1299,
    priceAnnual: 12990,
    features: [
      'Envíos ilimitados',
      'Gestor de cuenta dedicado',
      'Integraciones personalizadas',
      'Soporte 24/7',
      'Onboarding personalizado',
      'SLA empresarial',
    ],
    cta: 'Contactar ventas',
    highlighted: false,
    icon: <BuildingOffice2Icon className="h-10 w-10 text-indigo-500 mx-auto" />,
  },
];

const comparison = [
  { label: 'Límite de envíos', starter: '2,500/mes', pro: '20,000/mes', enterprise: 'Ilimitado' },
  { label: 'Campañas ilimitadas', starter: true, pro: true, enterprise: true },
  { label: 'Automatizaciones', starter: false, pro: true, enterprise: true },
  { label: 'Plantillas premium', starter: false, pro: true, enterprise: true },
  { label: 'IA para contenido', starter: false, pro: true, enterprise: true },
  { label: 'Soporte prioritario', starter: false, pro: true, enterprise: true },
  { label: 'Gestor dedicado', starter: false, pro: false, enterprise: true },
  { label: 'Integraciones CRM', starter: false, pro: true, enterprise: true },
  { label: 'SLA empresarial', starter: false, pro: false, enterprise: true },
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const navigate = useNavigate();

  const handleContinue = (planId: string) => {
    if (planId === 'enterprise') {
      navigate('/support/contact?plan=enterprise');
    } else {
      navigate(`/checkout?plan=${planId}&period=${isAnnual ? 'annual' : 'monthly'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StaticPageLayout 
        title="Planes y Precios" 
        subtitle="Elige el plan perfecto para tu negocio y escala tu email marketing con IA y automatización"
        imageSrc="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
      >
        <section className="mb-12">
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <span className={`text-sm font-medium flex items-center gap-1 ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}> <CalendarDaysIcon className="h-5 w-5" /> Mensual</span>
              <button 
                className={`relative inline-flex h-10 w-24 items-center rounded-full transition-colors duration-300 focus:outline-none border-2 ${isAnnual ? 'bg-blue-600 border-blue-600' : 'bg-gray-300 dark:bg-gray-700 border-gray-400 dark:border-gray-600'}`}
                onClick={() => setIsAnnual(!isAnnual)}
              >
                <span className={`inline-block h-9 w-9 transform rounded-full bg-white shadow-md ring-0 transition-all duration-300 ${isAnnual ? 'translate-x-12' : 'translate-x-1'}`} />
                <span className="absolute left-3 text-xs font-bold text-blue-700 dark:text-blue-200 select-none">Anual</span>
                <span className="absolute right-3 text-xs font-bold text-gray-700 dark:text-gray-200 select-none">Mes</span>
              </button>
              <span className={`text-sm font-medium flex items-center gap-1 ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}> <CurrencyDollarIcon className="h-5 w-5 text-green-500" /> Anual <span className="text-green-500 dark:text-green-400 ml-1">2 meses gratis</span></span>
            </div>
            <p className="text-center text-base text-gray-600 dark:text-gray-300">Ahorra hasta un 20% pagando anualmente. Cambia de plan cuando quieras.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div key={plan.id} className={
                `relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border flex flex-col h-full ` +
                (plan.highlighted 
                  ? 'border-blue-400 dark:border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-900/20 scale-105 z-10' 
                  : 'border-gray-200 dark:border-gray-700 shadow-md')
              }>
                {plan.highlighted && (
                  <div className="absolute top-0 right-0 -mt-1 -mr-1 w-20 h-20 overflow-hidden z-20">
                    <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-20 h-20 bg-blue-600 border-2 border-white dark:border-transparent"></div>
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 text-white text-xs font-bold py-0.5 px-4 mt-5 mr-4">Recomendado</span>
                  </div>
                )}
                <div className="p-8 flex flex-col items-center text-center flex-1">
                  <div className="mb-2">
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                  <p className="text-base text-gray-500 dark:text-gray-400 mb-6">{plan.description}</p>
                  <div className="mb-8">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                      ${isAnnual ? (plan.priceAnnual/12).toLocaleString('es-MX') : plan.priceMonthly.toLocaleString('es-MX')}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-base ml-1">MXN/mes</span>
                    {isAnnual && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        ${plan.priceAnnual.toLocaleString('es-MX')} MXN facturados anualmente
                      </p>
                    )}
                  </div>
                  <button 
                    onClick={() => handleContinue(plan.id)}
                    className={
                      `block w-full py-3 px-4 text-center rounded-lg font-semibold transition shadow-sm text-base mb-6 ` +
                      (plan.highlighted 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600')
                    }
                  >
                    {plan.cta}
                  </button>
                  <ul className="space-y-3 flex-1 w-full text-left">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300 text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Comparar planes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Comparar planes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700">Características</th>
                  <th className="px-4 py-3 text-center text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20">Starter</th>
                  <th className="px-4 py-3 text-center text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20">Pro</th>
                  <th className="px-4 py-3 text-center text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
                  <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200 font-medium">{row.label}</td>
                    <td className="px-4 py-3 text-center">
                      {typeof row.starter === 'boolean' ? (row.starter ? <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : <XMarkIcon className="h-5 w-5 text-gray-400 mx-auto" />) : row.starter}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {typeof row.pro === 'boolean' ? (row.pro ? <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : <XMarkIcon className="h-5 w-5 text-gray-400 mx-auto" />) : row.pro}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {typeof row.enterprise === 'boolean' ? (row.enterprise ? <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : <XMarkIcon className="h-5 w-5 text-gray-400 mx-auto" />) : row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Preguntas frecuentes</h2>
          <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">¿Puedo cambiar de plan en cualquier momento?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-base">Sí, puedes actualizar, degradar o cancelar tu plan en cualquier momento desde la configuración de tu cuenta.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">¿Qué métodos de pago aceptan?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-base">Aceptamos todas las tarjetas de crédito principales mediante Stripe.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">¿Necesito una tarjeta de crédito para la prueba gratuita?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-base">No, puedes disfrutar de nuestra prueba gratuita de 14 días sin proporcionar información de pago.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">¿Ofrecen descuentos para organizaciones sin fines de lucro?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-base">Sí, ofrecemos un 30% de descuento para organizaciones sin fines de lucro verificadas. Contacta con nuestro equipo de ventas.</p>
            </div>
          </div>
        </section>
        <section className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">¿Listo para impulsar tu negocio?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Elige tu plan y comienza a enviar campañas hoy mismo.</p>
          <Link to="/checkout" className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg">Ir a pago</Link>
        </section>
      </StaticPageLayout>
    </div>
  );
};

export default Pricing;
