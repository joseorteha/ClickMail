import React, { useState } from 'react';
import StaticPageLayout from '../../components/common/StaticPageLayout';
import { useToast } from '../../context/ToastContext';

const HelpCenter = () => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Categorías de preguntas frecuentes
  const categories = [
    {
      id: 'general',
      name: 'General',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'account',
      name: 'Cuenta y Facturación',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'campaigns',
      name: 'Campañas',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'ai',
      name: 'Inteligencia Artificial',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
  ];
  
  // FAQs para mostrar
  const faqs = [
    {
      id: 1,
      category: 'general',
      question: '¿Qué es ClickMail?',
      answer: 'ClickMail es una plataforma de email marketing impulsada por inteligencia artificial que te permite crear, enviar y analizar campañas de email efectivas con mínimo esfuerzo. Nuestras herramientas de IA generan contenido personalizado basado en tus objetivos y audiencia.'
    },
    {
      id: 2,
      category: 'general',
      question: '¿Qué hace especial a ClickMail?',
      answer: 'Lo que distingue a ClickMail es nuestra tecnología de IA avanzada que crea emails optimizados para maximizar la conversión. A diferencia de otras plataformas, no necesitas ser un experto en marketing para lograr resultados profesionales.'
    },
    {
      id: 3,
      category: 'account',
      question: '¿Cómo puedo cambiar mi plan?',
      answer: 'Puedes cambiar tu plan en cualquier momento desde la página de "Configuración" en tu perfil. Los cambios de plan se aplican inmediatamente, y se ajustará el costo prorrateado.'
    },
    {
      id: 4,
      category: 'account',
      question: '¿Puedo cancelar mi suscripción?',
      answer: 'Sí, puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta. No hay penalizaciones por cancelación anticipada. Si cancelas, tu cuenta permanecerá activa hasta el final del período de facturación actual.'
    },
    {
      id: 5,
      category: 'campaigns',
      question: '¿Cómo puedo crear mi primera campaña?',
      answer: 'Para crear tu primera campaña, simplemente ve al Dashboard y haz clic en el botón "Nueva Campaña". Sigue el asistente de tres pasos para describir tu producto/servicio, definir tu audiencia y generar el contenido del email con nuestra IA.'
    },
    {
      id: 6,
      category: 'campaigns',
      question: '¿Puedo programar mis campañas?',
      answer: 'Sí, ClickMail te permite programar tus campañas para que se envíen en la fecha y hora que prefieras. También puedes utilizar nuestra función de "Optimización de Tiempo de Envío" para que el sistema determine automáticamente el mejor momento para enviar tu campaña.'
    },
    {
      id: 7,
      category: 'ai',
      question: '¿Qué tan bueno es el contenido generado por la IA?',
      answer: 'Nuestra IA está entrenada con miles de emails de marketing exitosos y constantemente mejoramos sus capacidades. El contenido generado es de alta calidad y está optimizado para maximizar las conversiones. Siempre puedes editar el contenido generado para personalizarlo según tus necesidades.'
    },
    {
      id: 8,
      category: 'ai',
      question: '¿Necesito proporcionar mucha información para la IA?',
      answer: 'No, nuestra IA puede generar contenido de calidad con información mínima. Sin embargo, mientras más detalles proporciones sobre tu producto, servicio y audiencia, más personalizado y efectivo será el resultado.'
    }
  ];
  
  // Estado para el filtro activo
  const [activeCategory, setActiveCategory] = useState('general');
  
  // Filtrar FAQs por categoría y búsqueda
  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = !searchQuery || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Manejar la búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Mostrando resultados para: "${searchQuery}"`, 'info');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StaticPageLayout 
        title="Centro de Ayuda" 
        subtitle="Encuentra respuestas a tus preguntas y aprende a sacar el máximo provecho de ClickMail"
      >
        {/* Buscador */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Buscar en el centro de ayuda..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
        
        {/* Categorías */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveCategory('all')}
            >
              Todas
            </button>
            
            {categories.map(category => (
              <button 
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center ${
                  activeCategory === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="w-4 h-4 mr-1.5">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Lista de FAQs */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map(faq => (
              <details 
                key={faq.id} 
                className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 open:shadow-md transition-all duration-200"
              >
                <summary className="flex justify-between items-center p-4 cursor-pointer list-none font-medium text-gray-900 dark:text-white">
                  <span>{faq.question}</span>
                  <span className="transition group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-300">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))
          ) : (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No se encontraron resultados</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Intenta con otros términos de búsqueda o categoría
              </p>
            </div>
          )}
        </div>
        
        {/* Contacto adicional */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-3xl mx-auto shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">¿No encontraste lo que buscabas?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Nuestro equipo de soporte está listo para ayudarte con cualquier pregunta que tengas.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="/support/contact" 
              className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contactar soporte
            </a>
            <a 
              href="/support/community" 
              className="inline-flex items-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              Comunidad de usuarios
            </a>
          </div>
        </div>
      </StaticPageLayout>
    </div>
  );
};

export default HelpCenter;
