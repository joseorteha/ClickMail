import React from 'react';
import StaticPageLayout from '../../components/common/StaticPageLayout';

const Updates = () => {
  const updates = [
    {
      version: '2.4.0',
      date: '15 de Mayo, 2025',
      title: 'Mejora en el editor de plantillas',
      description: 'Hemos renovado completamente nuestro editor de plantillas con una interfaz más intuitiva y nuevas opciones de personalización.',
      type: 'feature',
      details: [
        'Editor visual con función de arrastrar y soltar',
        'Nuevos bloques predefinidos para redes sociales, galería de imágenes y testimonios',
        'Personalización avanzada de fuentes y colores',
        'Guardar secciones como fragmentos reutilizables'
      ]
    },
    {
      version: '2.3.2',
      date: '2 de Mayo, 2025',
      title: 'Corrección de errores y mejoras de rendimiento',
      description: 'Esta actualización incluye varias correcciones de errores reportados por la comunidad y mejoras en la velocidad de carga.',
      type: 'fix',
      details: [
        'Corregido un problema con la visualización de estadísticas en dispositivos móviles',
        'Mejorada la velocidad de carga del dashboard en un 30%',
        'Solucionado el error al intentar duplicar campañas con segmentaciones complejas',
        'Corregido un problema de visualización con el modo oscuro en Safari'
      ]
    },
    {
      version: '2.3.0',
      date: '18 de Abril, 2025',
      title: 'Integración con plataformas de comercio electrónico',
      description: 'Ahora puedes conectar ClickMail directamente con las principales plataformas de e-commerce para sincronizar productos, clientes y automatizar emails transaccionales.',
      type: 'feature',
      details: [
        'Integración nativa con Shopify, WooCommerce y Magento',
        'Sincronización automática de productos para incluirlos en tus emails',
        'Plantillas específicas para abandonos de carrito, confirmación de compra y recomendaciones',
        'Segmentación avanzada basada en historial de compras'
      ]
    },
    {
      version: '2.2.1',
      date: '5 de Abril, 2025',
      title: 'Mejoras en la generación de emails con IA',
      description: 'Hemos mejorado significativamente nuestro motor de generación de contenido con IA para producir textos más persuasivos y relevantes.',
      type: 'enhancement',
      details: [
        'Nuevo modelo de lenguaje con mejor comprensión del contexto',
        'Capacidad mejorada para mantener el tono de marca consistente',
        'Sugerencias inteligentes de asuntos basadas en el contenido del email',
        'Análisis predictivo de rendimiento para cada variante generada'
      ]
    },
    {
      version: '2.2.0',
      date: '20 de Marzo, 2025',
      title: 'Nueva funcionalidad de A/B Testing',
      description: 'Lanzamos nuestra herramienta avanzada de A/B testing que te permite probar múltiples variables simultáneamente.',
      type: 'feature',
      details: [
        'Pruebas multivariable para asunto, contenido, hora de envío y remitente',
        'Distribución automática basada en engagement inicial',
        'Informes detallados con recomendaciones accionables',
        'Integración con nuestro sistema de IA para generar variantes optimizadas'
      ]
    },
    {
      version: '2.1.2',
      date: '8 de Marzo, 2025',
      title: 'Nuevas plantillas de email',
      description: 'Hemos añadido 15 nuevas plantillas profesionales diseñadas para diferentes industrias y casos de uso.',
      type: 'enhancement',
      details: [
        'Plantillas específicas para SaaS, e-commerce, educación y servicios profesionales',
        'Nuevos diseños para newsletters, anuncios de eventos y campañas promocionales',
        'Todas las plantillas son totalmente responsivas y compatibles con los principales clientes de email',
        'Opciones de personalización mejoradas para cada plantilla'
      ]
    }
  ];

  type UpdateType = 'feature' | 'enhancement' | 'fix' | string;

  const getBadgeColor = (type: UpdateType): string => {
    switch (type) {
      case 'feature':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'enhancement':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'fix':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getTypeLabel = (type: UpdateType): string => {
    switch (type) {
      case 'feature':
        return 'Nueva función';
      case 'enhancement':
        return 'Mejora';
      case 'fix':
        return 'Corrección';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StaticPageLayout 
        title="Actualizaciones de ClickMail" 
        subtitle="Mantente al día con las últimas mejoras y nuevas características"
      >
        <div className="relative border-l-2 border-blue-200 dark:border-blue-900 pl-8 ml-4">
          {updates.map((update, index) => (
            <div key={index} className="mb-12 relative">
              {/* Marcador en la línea de tiempo */}
              <div className="absolute -left-10 top-0 w-5 h-5 rounded-full bg-blue-500 border-4 border-white dark:border-gray-900"></div>
              {/* Contenido de la actualización */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {update.title}
                    </h2>
                    <div className="flex items-center mt-2 sm:mt-0">
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getBadgeColor(update.type)}`}>
                        {getTypeLabel(update.type)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        v{update.version}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {update.description}
                  </p>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cambios destacados:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {update.details.map((detail, i) => (
                        <li key={i} className="text-gray-600 dark:text-gray-400 text-sm">{detail}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {update.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Inicio de la línea de tiempo */}
          <div className="absolute -left-10 bottom-0 w-5 h-5 rounded-full bg-blue-300 dark:bg-blue-800 border-4 border-white dark:border-gray-900"></div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            ¿Tienes alguna sugerencia para mejorar ClickMail?
          </p>
          <a 
            href="https://feedback.clickmail.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Enviar sugerencia
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </StaticPageLayout>
    </div>
  );
};

export default Updates;
