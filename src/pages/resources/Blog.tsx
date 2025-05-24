import React from 'react';
import StaticPageLayout from '../../components/common/StaticPageLayout';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: '7 Estrategias para Incrementar las Tasas de Apertura de tus Emails',
      excerpt: 'Descubre cómo aumentar significativamente tus tasas de apertura con estas estrategias probadas por expertos en marketing.',
      author: 'María González',
      date: '18 de Mayo, 2025',
      category: 'Estrategias',
      readTime: '6 min',
      image: '/img/blog/email-open-rates.jpg'
    },
    {
      id: 2,
      title: 'Cómo la IA está Transformando el Email Marketing',
      excerpt: 'La inteligencia artificial está revolucionando la forma en que hacemos email marketing. Aprende cómo sacar provecho de esta tecnología.',
      author: 'Carlos Mendoza',
      date: '10 de Mayo, 2025',
      category: 'Tecnología',
      readTime: '8 min',
      image: '/img/blog/ai-email-marketing.jpg'
    },
    {
      id: 3,
      title: 'Diseñando Emails para Conversión: Guía Completa',
      excerpt: 'Aprende a diseñar emails que no solo se vean bien, sino que también impulsen a tus suscriptores a realizar acciones concretas.',
      author: 'Laura Pérez',
      date: '2 de Mayo, 2025',
      category: 'Diseño',
      readTime: '10 min',
      image: '/img/blog/email-design-conversion.jpg'
    },
    {
      id: 4,
      title: 'Segmentación Avanzada: El Secreto para Campañas Exitosas',
      excerpt: 'Descubre cómo la segmentación detallada de tu audiencia puede mejorar drásticamente los resultados de tus campañas de email.',
      author: 'Javier Rodríguez',
      date: '25 de Abril, 2025',
      category: 'Segmentación',
      readTime: '7 min',
      image: '/img/blog/advanced-segmentation.jpg'
    },
    {
      id: 5,
      title: 'Automatización de Email Marketing: Guía para Principiantes',
      excerpt: 'Comienza a automatizar tus campañas de email marketing con esta guía paso a paso diseñada para principiantes.',
      author: 'Ana Morales',
      date: '18 de Abril, 2025',
      category: 'Automatización',
      readTime: '9 min',
      image: '/img/blog/email-automation.jpg'
    },
    {
      id: 6,
      title: 'Métricas Clave de Email Marketing Que Debes Seguir',
      excerpt: 'Aprende cuáles son las métricas más importantes para medir el éxito de tus campañas de email marketing y cómo interpretarlas.',
      author: 'Roberto Silva',
      date: '10 de Abril, 2025',
      category: 'Analítica',
      readTime: '5 min',
      image: '/img/blog/email-metrics.jpg'
    }
  ];

  return (
    <StaticPageLayout 
      title="Blog de ClickMail" 
      subtitle="Noticias, guías y consejos para optimizar tus campañas de email marketing"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {blogPosts.map(post => (
          <article 
            key={post.id} 
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="h-48 bg-blue-100 dark:bg-blue-900/30 relative">
              {/* En producción, aquí iría la imagen real */}
              <div className="absolute inset-0 flex items-center justify-center text-blue-500 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {post.readTime} de lectura
                </span>
              </div>
              
              <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                <a href={`/resources/blog/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {post.title}
                </a>
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {post.excerpt}
              </p>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {post.date}
                </span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Por {post.author}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        <nav className="inline-flex rounded-md shadow-sm">
          <a href="#" className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
            Anterior
          </a>
          <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700">
            1
          </a>
          <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
            2
          </a>
          <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
            3
          </a>
          <a href="#" className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
            Siguiente
          </a>
        </nav>
      </div>
      
      <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
        <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-3">¿Quieres recibir los últimos artículos?</h2>
        <p className="text-blue-600 dark:text-blue-400 mb-4">
          Suscríbete a nuestro newsletter y recibirás contenido exclusivo sobre email marketing y consejos para tus campañas.
        </p>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="flex-1 px-4 py-2.5 rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            Suscribirse
          </button>
        </form>
      </div>
    </StaticPageLayout>
  );
};

export default Blog;
