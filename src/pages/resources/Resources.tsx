import React from 'react';
import StaticPageLayout from '../../components/common/StaticPageLayout';
import { Link } from 'react-router-dom';

const Resources = () => {
  const resourceCategories = [
    {
      id: 'guides',
      title: 'Guías y Tutoriales',
      description: 'Aprende a crear campañas exitosas con nuestras guías paso a paso',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      links: [
        { name: 'Guía para principiantes', url: '/resources/guides/beginners' },
        { name: 'Cómo aumentar la tasa de apertura', url: '/resources/guides/open-rates' },
        { name: 'Mejores prácticas de segmentación', url: '/resources/guides/segmentation' },
        { name: 'Ver todas las guías', url: '/resources/guides' }
      ]
    },
    {
      id: 'templates',
      title: 'Plantillas',
      description: 'Plantillas profesionales listas para usar en tus campañas',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      links: [
        { name: 'Plantillas de newsletter', url: '/resources/templates?category=newsletters' },
        { name: 'Plantillas promocionales', url: '/resources/templates?category=promotional' },
        { name: 'Plantillas de bienvenida', url: '/resources/templates?category=welcome' },
        { name: 'Ver todas las plantillas', url: '/resources/templates' }
      ]
    },
    {
      id: 'blog',
      title: 'Blog',
      description: 'Artículos y noticias sobre email marketing y tendencias del sector',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 01-2-2V6a2 2 0 00-2-2h-2M5 14h14" />
        </svg>
      ),
      links: [
        { name: 'Artículos más recientes', url: '/resources/blog' },
        { name: 'Mejores prácticas', url: '/resources/blog?category=best-practices' },
        { name: 'Casos de éxito', url: '/resources/blog?category=success-stories' },
        { name: 'Ver todos los artículos', url: '/resources/blog' }
      ]
    },
    {
      id: 'webinars',
      title: 'Webinars',
      description: 'Sesiones educativas con expertos en marketing digital',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      links: [
        { name: 'Próximos webinars', url: '/resources/webinars/upcoming' },
        { name: 'Webinars grabados', url: '/resources/webinars/recorded' },
        { name: 'Preguntas frecuentes', url: '/resources/webinars/faq' },
        { name: 'Ver todos los webinars', url: '/resources/webinars' }
      ]
    },
    {
      id: 'tools',
      title: 'Herramientas',
      description: 'Herramientas gratuitas para mejorar tus campañas de email marketing',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      links: [
        { name: 'Generador de asuntos', url: '/resources/tools/subject-generator' },
        { name: 'Analizador de spam', url: '/resources/tools/spam-analyzer' },
        { name: 'Calculadora de ROI', url: '/resources/tools/roi-calculator' },
        { name: 'Ver todas las herramientas', url: '/resources/tools' }
      ]
    },
    {
      id: 'downloads',
      title: 'Descargas',
      description: 'Ebooks, checklists y otros recursos descargables',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
      links: [
        { name: 'Guía completa de email marketing (PDF)', url: '/resources/downloads/complete-guide' },
        { name: 'Checklist pre-envío', url: '/resources/downloads/pre-send-checklist' },
        { name: 'Plantillas de calendario editorial', url: '/resources/downloads/editorial-calendar' },
        { name: 'Ver todas las descargas', url: '/resources/downloads' }
      ]
    }
  ];

  const featuredResources = [
    {
      id: 1,
      title: 'Guía definitiva de email marketing 2025',
      description: 'Todo lo que necesitas saber para ejecutar campañas exitosas este año.',
      type: 'ebook',
      image: '/img/resources/email-guide-2025.jpg'
    },
    {
      id: 2,
      title: 'Curso gratuito de automatización de email',
      description: 'Aprende a configurar flujos de automatización efectivos en 5 lecciones.',
      type: 'curso',
      image: '/img/resources/automation-course.jpg'
    },
    {
      id: 3,
      title: 'Webinar: IA y el futuro del email marketing',
      description: 'Cómo aprovechar la inteligencia artificial para mejorar tus campañas.',
      type: 'webinar',
      image: '/img/resources/ai-webinar.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StaticPageLayout 
        title="Centro de Recursos" 
        subtitle="Todo lo que necesitas para dominar el email marketing"
      >
        {/* Recursos destacados */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recursos destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map(resource => (
              <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 group">
                <div className="h-48 bg-blue-100 dark:bg-blue-900/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-blue-400 dark:text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
                    {resource.type}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {resource.description}
                  </p>
                  <div className="mt-auto">
                    <a 
                      href={`/resources/${resource.type}/${resource.id}`}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      Acceder
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Categorías de recursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resourceCategories.map(category => (
            <div 
              key={category.id} 
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
                  {category.icon}
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{category.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{category.description}</p>
                  
                  <ul className="space-y-2">
                    {category.links.map((link, index) => (
                      <li key={index}>
                        <Link 
                          to={link.url}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA de recursos personalizados */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:flex-1 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-3">¿Necesitas ayuda personalizada?</h2>
              <p className="text-blue-100 max-w-2xl">
                Nuestros expertos en email marketing pueden ayudarte a crear una estrategia personalizada 
                para tus necesidades específicas. Agenda una consulta gratuita hoy.
              </p>
            </div>
            <div>
              <a 
                href="/support/contact?subject=Consulta%20Personalizada"
                className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition shadow-md"
              >
                Reservar consulta gratuita
              </a>
            </div>
          </div>
        </div>
      </StaticPageLayout>
    </div>
  );
};

export default Resources;
