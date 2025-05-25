import React, { useState } from 'react';
import StaticPageLayout from '../../components/common/StaticPageLayout';

const FAQ = () => {
  // ... existing code ...

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StaticPageLayout 
        title="Preguntas Frecuentes" 
        subtitle="Encuentra respuestas rápidas a las preguntas más comunes sobre ClickMail."
      >
        <div className="max-w-4xl mx-auto">
          {/* Búsqueda */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar en preguntas frecuentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Categorías */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categorías</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Preguntas y Respuestas */}
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <svg
                      className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform ${
                        openFAQs.includes(faq.id) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                {openFAQs.includes(faq.id) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                    {faq.link && (
                      <a
                        href={faq.link}
                        className="inline-block mt-2 text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Leer más →
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sección de ayuda adicional */}
          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-blue-700 dark:text-blue-300 mb-4">
              Nuestro equipo de soporte está disponible para ayudarte con cualquier pregunta adicional.
            </p>
            <a
              href="/support/contact"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              Contactar soporte
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </StaticPageLayout>
    </div>
  );
};

export default FAQ; 