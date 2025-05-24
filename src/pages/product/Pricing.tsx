import React, { useState } from 'react';
import StaticPageLayout from '../../components/common/StaticPageLayout';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const plans = [
    {
      name: 'Básico',
      description: 'Ideal para pequeños negocios que están comenzando con email marketing',
      priceMonthly: 19,
      priceAnnual: 190,
      features: [
        'Hasta 5,000 emails por mes',
        '3 campañas activas',
        'Plantillas básicas',
        'Generación de emails con IA',
        'Soporte por email',
      ],
      cta: 'Comenzar gratis',
      ctaLink: '/auth/register',
      highlighted: false,
    },
    {
      name: 'Profesional',
      description: 'Para negocios en crecimiento que necesitan funcionalidades avanzadas',
      priceMonthly: 49,
      priceAnnual: 490,
      features: [
        'Hasta 20,000 emails por mes',
        'Campañas ilimitadas',
        'Todas las plantillas premium',
        'IA avanzada con ajuste de tono',
        'Analíticas detalladas',
        'Segmentación avanzada',
        'Soporte prioritario',
      ],
      cta: 'Probar gratis 14 días',
      ctaLink: '/auth/register?plan=pro',
      highlighted: true,
    },
    {
      name: 'Empresarial',
      description: 'Solución completa para grandes empresas con necesidades escalables',
      priceMonthly: 99,
      priceAnnual: 990,
      features: [
        'Emails ilimitados',
        'Acceso API completo',
        'Integraciones avanzadas',
        'Seguridad empresarial',
        'Todas las características Pro',
        'Soporte 24/7',
        'Gestor de cuenta dedicado',
      ],
      cta: 'Contactar ventas',
      ctaLink: '/support/contact?plan=enterprise',
      highlighted: false,
    }
  ];

  return (
    <StaticPageLayout 
      title="Precios" 
      subtitle="Planes flexibles diseñados para adaptarse a tus necesidades"
    >
      {/* Selector anual/mensual */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
            Mensual
          </span>
          <button 
            className="relative inline-flex h-6 w-12 items-center rounded-full"
            onClick={() => setIsAnnual(!isAnnual)}
          >
            <span 
              className={`
                inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition 
                ${isAnnual ? 'translate-x-7 bg-blue-600' : 'translate-x-1 bg-gray-400'}
              `}
            />
            <span className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700" />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
            Anual <span className="text-green-500 dark:text-green-400 ml-1">-20%</span>
          </span>
        </div>
        
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Facturación {isAnnual ? 'anual' : 'mensual'}. Todos los planes incluyen una prueba gratuita de 14 días.
        </p>
      </div>
      
      {/* Planes de precios */}
      <div className="grid gap-6 md:grid-cols-3 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <div key={index} className={`
            relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden border 
            ${plan.highlighted 
              ? 'border-blue-400 dark:border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-900/20' 
              : 'border-gray-200 dark:border-gray-700 shadow-md'
            }
          `}>
            {plan.highlighted && (
              <div className="absolute top-0 right-0 -mt-1 -mr-1 w-20 h-20 overflow-hidden">
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-20 h-20 bg-blue-600 border-2 border-white dark:border-transparent"></div>
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 text-white text-xs font-bold py-0.5 px-4 mt-5 mr-4">Popular</span>
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 h-12">{plan.description}</p>
              <div className="mt-6 mb-8">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${isAnnual ? plan.priceAnnual/12 : plan.priceMonthly}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">/mes</span>
                
                {isAnnual && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ${plan.priceAnnual} facturados anualmente
                  </p>
                )}
              </div>
              
              <a 
                href={plan.ctaLink} 
                className={`
                  block w-full py-2.5 px-4 text-center rounded-lg font-medium transition shadow-sm text-sm mb-6
                  ${plan.highlighted 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
              >
                {plan.cta}
              </a>
              
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      {/* FAQs */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Preguntas frecuentes</h2>
        
        <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-2">¿Puedo cambiar de plan en cualquier momento?</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Sí, puedes actualizar, degradar o cancelar tu plan en cualquier momento desde la configuración de tu cuenta.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-2">¿Qué métodos de pago aceptan?</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Aceptamos todas las tarjetas de crédito principales, PayPal y transferencias bancarias para planes anuales.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-2">¿Necesito una tarjeta de crédito para la prueba gratuita?</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              No, puedes disfrutar de nuestra prueba gratuita de 14 días sin proporcionar información de pago.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg mb-2">¿Ofrecen descuentos para organizaciones sin fines de lucro?</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Sí, ofrecemos un 30% de descuento para organizaciones sin fines de lucro verificadas. Contacta con nuestro equipo de ventas.
            </p>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default Pricing;
