import React, { useState } from 'react';
import StaticPageLayout from '../../components/common/StaticPageLayout';

const Templates = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Todas' },
    { id: 'newsletters', name: 'Newsletters' },
    { id: 'promotional', name: 'Promocionales' },
    { id: 'welcome', name: 'Bienvenida' },
    { id: 'transactional', name: 'Transaccionales' },
    { id: 'events', name: 'Eventos' }
  ];
  
  const templates = [
    {
      id: 1,
      title: 'Newsletter Moderno',
      description: 'Diseño limpio y moderno ideal para newsletters semanales o mensuales.',
      category: 'newsletters',
      tags: ['responsive', 'minimalista'],
      thumbnail: '/img/templates/newsletter-modern.jpg',
      popularity: 4.8
    },
    {
      id: 2,
      title: 'Oferta Flash',
      description: 'Plantilla vibrante para promociones por tiempo limitado o ventas flash.',
      category: 'promotional',
      tags: ['ventas', 'urgencia'],
      thumbnail: '/img/templates/flash-sale.jpg',
      popularity: 4.6
    },
    {
      id: 3,
      title: 'Bienvenida Corporativa',
      description: 'Email de bienvenida profesional para servicios B2B y empresas.',
      category: 'welcome',
      tags: ['profesional', 'corporativo'],
      thumbnail: '/img/templates/corporate-welcome.jpg',
      popularity: 4.5
    },
    {
      id: 4,
      title: 'Confirmación de Compra',
      description: 'Email transaccional para confirmar pedidos con estilo.',
      category: 'transactional',
      tags: ['e-commerce', 'funcional'],
      thumbnail: '/img/templates/purchase-confirmation.jpg',
      popularity: 4.9
    },
    {
      id: 5,
      title: 'Invitación a Evento',
      description: 'Plantilla elegante para invitaciones a eventos y webinars.',
      category: 'events',
      tags: ['moderno', 'elegante'],
      thumbnail: '/img/templates/event-invitation.jpg',
      popularity: 4.7
    },
    {
      id: 6,
      title: 'Newsletter Creativo',
      description: 'Diseño colorido y creativo para newsletters de arte, diseño o creatividad.',
      category: 'newsletters',
      tags: ['creativo', 'colorido'],
      thumbnail: '/img/templates/creative-newsletter.jpg',
      popularity: 4.4
    },
    {
      id: 7,
      title: 'Descuento Especial',
      description: 'Plantilla impactante para promocionar códigos de descuento.',
      category: 'promotional',
      tags: ['descuentos', 'impactante'],
      thumbnail: '/img/templates/special-discount.jpg',
      popularity: 4.5
    },
    {
      id: 8,
      title: 'Recuperación de Carrito',
      description: 'Email efectivo para recuperar carritos abandonados.',
      category: 'transactional',
      tags: ['e-commerce', 'conversión'],
      thumbnail: '/img/templates/cart-recovery.jpg',
      popularity: 4.8
    }
  ];
  
  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StaticPageLayout 
        title="Plantillas de Email" 
        subtitle="Elige entre nuestra colección de plantillas profesionales diseñadas para maximizar la conversión"
      >
        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Rejilla de plantillas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <div 
              key={template.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              {/* Thumbnail de la plantilla */}
              <div className="h-48 bg-blue-50 dark:bg-blue-900/20 relative">
                {/* Aquí iría la imagen real en producción */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-300 dark:text-blue-700 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                
                {/* Puntuación de popularidad */}
                <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 rounded-full py-1 px-2 flex items-center shadow-sm border border-gray-100 dark:border-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-medium ml-1 text-gray-700 dark:text-gray-300">{template.popularity}</span>
                </div>
              </div>
              
              {/* Información de la plantilla */}
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{template.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{template.description}</p>
                
                {/* Etiquetas */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Botones de acción */}
                <div className="flex space-x-2 mt-4">
                  <a 
                    href={`/resources/templates/${template.id}/preview`}
                    className="flex-1 text-center py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                  >
                    Vista previa
                  </a>
                  <a 
                    href={`/resources/templates/${template.id}/use`}
                    className="flex-1 text-center py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition"
                  >
                    Usar plantilla
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mensaje de falta de resultados */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No se encontraron plantillas</h3>
            <p className="text-gray-500 dark:text-gray-400">No hay plantillas disponibles en esta categoría.</p>
          </div>
        )}
        
        {/* CTA para plantillas personalizadas */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">¿Necesitas una plantilla personalizada?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
                Contáctanos para crear una plantilla que se adapte perfectamente a tus necesidades específicas.
              </p>
            </div>
            <div>
              <a 
                href="/support/contact?subject=Plantilla%20Personalizada"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm"
              >
                Solicitar plantilla personalizada
              </a>
            </div>
          </div>
        </div>
      </StaticPageLayout>
    </div>
  );
};

export default Templates;
