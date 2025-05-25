import React from 'react';
import StaticPageLayout from '../../components/common/StaticPageLayout';

const Integrations = () => {
  const integrations = [
    { 
      name: 'Google Analytics', 
      description: 'Conecta tus campañas con Google Analytics para un seguimiento completo del rendimiento.',
      icon: '/img/integrations/google-analytics.svg',
      category: 'Analíticas'
    },
    { 
      name: 'Shopify', 
      description: 'Sincroniza tus productos y clientes para crear campañas de email marketing efectivas.',
      icon: '/img/integrations/shopify.svg',
      category: 'E-commerce'
    },
    { 
      name: 'Slack', 
      description: 'Recibe notificaciones en tiempo real sobre el desempeño de tus campañas.',
      icon: '/img/integrations/slack.svg',
      category: 'Productividad'
    },
    { 
      name: 'Hubspot', 
      description: 'Integra tu CRM con ClickMail para campañas más personalizadas.',
      icon: '/img/integrations/hubspot.svg',
      category: 'CRM'
    },
    { 
      name: 'Zapier', 
      description: 'Conecta ClickMail con más de 3,000 aplicaciones sin necesidad de código.',
      icon: '/img/integrations/zapier.svg',
      category: 'Automatización'
    },
    { 
      name: 'WordPress', 
      description: 'Añade formularios de suscripción y gestiona tus listas desde tu sitio WordPress.',
      icon: '/img/integrations/wordpress.svg',
      category: 'CMS'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StaticPageLayout 
        title="Integraciones" 
        subtitle="Conecta ClickMail con tus herramientas favoritas para potenciar tus campañas de email marketing"
      >
        <p className="lead text-gray-600 dark:text-gray-300">
          ClickMail se integra con las principales plataformas y servicios para que puedas centralizar 
          toda tu estrategia de marketing en un solo lugar.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {integrations.map((integration, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6">
                <span className="inline-block text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full mb-4">
                  {integration.category}
                </span>
                
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{integration.name}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {integration.description}
                </p>
                
                <a 
                  href="#" 
                  className="inline-block mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition"
                >
                  Aprender más →
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <h2 className="text-gray-900 dark:text-white">¿No encuentras la integración que necesitas?</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Nuestra API pública te permite crear integraciones personalizadas con cualquier servicio. Consulta nuestra 
          documentación para desarrolladores y comienza a construir hoy mismo.
        </p>
        
        <div className="flex flex-wrap gap-4 mt-6">
          <a 
            href="/support/contact" 
            className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
          >
            Solicitar una integración
          </a>
          <a 
            href="/developer/docs" 
            className="inline-block bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm"
          >
            Documentación API
          </a>
        </div>
      </StaticPageLayout>
    </div>
  );
};

export default Integrations;
