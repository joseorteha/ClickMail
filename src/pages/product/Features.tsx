import React from 'react';
import StaticPageLayout from '../../components/common/StaticPageLayout';

const Features = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StaticPageLayout 
        title="Características de ClickMail" 
        subtitle="Descubre cómo la IA y la automatización pueden transformar tu email marketing"
        imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
      >
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">¿Por qué elegir ClickMail?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-10">
            ClickMail combina inteligencia artificial, automatización y analítica avanzada para que tus campañas sean más efectivas, personalizadas y rentables. Descubre las funciones que te ayudarán a crecer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Generación Automática</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Crea emails profesionales y persuasivos en segundos gracias a nuestra IA entrenada en miles de campañas exitosas.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Analíticas Detalladas</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visualiza aperturas, clics, conversiones y mucho más con paneles interactivos y reportes en tiempo real.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Segmentación Avanzada</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Llega a la audiencia correcta con filtros inteligentes y personalización dinámica para cada usuario.
              </p>
            </div>
          </div>
        </section>
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Más funciones para potenciar tu marketing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-800 flex flex-col gap-3">
              <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">Automatización de envíos</h4>
              <p className="text-gray-600 dark:text-gray-300">Programa tus campañas para que se envíen en el mejor momento, según el comportamiento de tus usuarios.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-800 flex flex-col gap-3">
              <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">Editor visual intuitivo</h4>
              <p className="text-gray-600 dark:text-gray-300">Personaliza cada detalle de tus emails con nuestro editor drag & drop y plantillas profesionales.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-800 flex flex-col gap-3">
              <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">Pruebas A/B inteligentes</h4>
              <p className="text-gray-600 dark:text-gray-300">Optimiza tus campañas probando asuntos, contenidos y horarios para maximizar resultados.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-800 flex flex-col gap-3">
              <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">Integraciones y API</h4>
              <p className="text-gray-600 dark:text-gray-300">Conecta ClickMail con tus herramientas favoritas y automatiza flujos completos.</p>
            </div>
          </div>
        </section>
        <section className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">¿Listo para transformar tu email marketing?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Empieza gratis y lleva tus campañas al siguiente nivel.</p>
          <a href="/auth/register" className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg">Comenzar ahora</a>
        </section>
      </StaticPageLayout>
    </div>
  );
};

export default Features;
