import React from 'react';
import StaticPageLayout from '../../components/common/StaticPageLayout';

const Features = () => {
  return (
    <StaticPageLayout 
      title="Características de ClickMail" 
      subtitle="Descubre todas las herramientas que tenemos para impulsar tus campañas de email marketing"
      imageSrc="/img/features-hero.jpg"
    >
      <h2>Potencia tus campañas con IA</h2>
      <p>
        ClickMail utiliza inteligencia artificial avanzada para ayudarte a crear campañas de email marketing efectivas en minutos. 
        Nuestras herramientas de IA analizan tu contenido, audiencia y objetivos para generar emails que conectan con tus clientes.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Generación Automática</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Crea emails profesionales con solo unos clics utilizando nuestra tecnología de IA avanzada.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Analíticas Detalladas</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Conoce el rendimiento de tus campañas con estadísticas detalladas y visualizaciones claras.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Segmentación Avanzada</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Dirige tus emails a la audiencia correcta con nuestras herramientas de segmentación inteligente.
          </p>
        </div>
      </div>
      
      <h2>Personalización sin límites</h2>
      <p>
        Nuestro editor te permite personalizar cada aspecto de tus emails. Desde el contenido hasta el diseño, 
        tienes control total sobre cómo se presentan tus mensajes a tu audiencia.
      </p>
      
      <h2>Optimización de envíos</h2>
      <p>
        ClickMail determina automáticamente los mejores momentos para enviar tus emails, maximizando las tasas de apertura 
        y mejorando el engagement con tu audiencia.
      </p>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl mt-8 border border-blue-100 dark:border-blue-800">
        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">¿Listo para empezar?</h3>
        <p className="text-blue-600 dark:text-blue-400 mb-4">
          Prueba ClickMail hoy mismo y descubre cómo nuestras características pueden transformar tu estrategia de email marketing.
        </p>
        <a 
          href="/dashboard" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
        >
          Crear mi primera campaña
        </a>
      </div>
    </StaticPageLayout>
  );
};

export default Features;
