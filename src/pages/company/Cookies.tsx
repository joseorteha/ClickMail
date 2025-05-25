import React from 'react';
import { Link } from 'react-router-dom';
import StaticPageLayout from '../../components/common/StaticPageLayout';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StaticPageLayout 
        title="Política de Cookies" 
        subtitle="Cómo utilizamos las cookies para mejorar tu experiencia"
      >
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">¿Qué son las cookies?</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Las cookies son pequeños archivos de texto que se almacenan en tu navegador o dispositivo cuando visitas un sitio web. 
            Estos archivos permiten que el sitio web recuerde tus acciones y preferencias durante un tiempo determinado, 
            para que no tengas que volver a introducirlos cada vez que visites el sitio o navegues entre sus páginas.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Las cookies pueden ser "propias" (configuradas por nuestro sitio web) o "de terceros" (colocadas en tu dispositivo por 
            otro sitio web que proporciona servicios o funcionalidades en nuestro sitio).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tipos de cookies que utilizamos</h2>
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
            <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Cookies esenciales</h3>
            <p className="mb-2 text-gray-600 dark:text-gray-300">
              Estas cookies son necesarias para el funcionamiento básico del sitio web y no pueden ser desactivadas en nuestros sistemas.
              Generalmente solo se establecen en respuesta a acciones realizadas por ti, como establecer tus preferencias de privacidad, 
              iniciar sesión o completar formularios.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Puedes configurar tu navegador para bloquear estas cookies, pero algunas partes del sitio no funcionarán correctamente.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
            <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Cookies de rendimiento</h3>
            <p className="mb-2 text-gray-600 dark:text-gray-300">
              Estas cookies nos permiten contar las visitas y fuentes de tráfico para medir y mejorar el rendimiento de nuestro sitio.
              Nos ayudan a saber qué páginas son las más y menos populares, y cómo se mueven los visitantes por el sitio.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Toda la información que recopilan estas cookies es agregada y, por lo tanto, anónima.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
            <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Cookies de funcionalidad</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Estas cookies permiten que el sitio proporcione una funcionalidad y personalización mejoradas. Pueden ser establecidas 
              por nosotros o por proveedores externos cuyos servicios hemos añadido a nuestras páginas (como preferencias de tema 
              claro/oscuro, configuraciones regionales, etc.).
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Cookies de marketing</h3>
            <p className="mb-2 text-gray-600 dark:text-gray-300">
              Estas cookies son establecidas a través de nuestro sitio por nuestros socios publicitarios. Pueden ser utilizadas por 
              estas empresas para crear un perfil de tus intereses y mostrarte anuncios relevantes en otros sitios.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              No almacenan información personal directamente, sino que se basan en la identificación única de tu navegador y 
              dispositivo de Internet.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Cómo gestionar las cookies</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Puedes modificar tus preferencias de cookies en cualquier momento a través del panel de gestión de cookies disponible 
            en la parte inferior de nuestro sitio web. También puedes gestionar las cookies a través de la configuración de tu navegador:
          </p>
          
          <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-600 dark:text-gray-300">
            <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
            <li><strong>Firefox:</strong> Opciones → Privacidad y Seguridad → Cookies y datos del sitio</li>
            <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies y datos del sitio web</li>
            <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio → Administrar y eliminar cookies</li>
          </ul>
          
          <p className="text-gray-600 dark:text-gray-300">
            Ten en cuenta que la restricción de cookies puede impactar tu experiencia en nuestro sitio y limitar ciertas funcionalidades.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Cambios en nuestra política de cookies</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Podemos actualizar nuestra Política de Cookies periódicamente para reflejar cambios en nuestras prácticas o por 
            otras razones operativas, legales o regulatorias. Te recomendamos visitar esta página regularmente para estar 
            informado sobre el uso que hacemos de las cookies.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            La presente Política de Cookies fue actualizada por última vez el 23 de mayo de 2025.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contacto</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Si tienes alguna pregunta sobre nuestra Política de Cookies, no dudes en contactarnos:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Email: <a href="mailto:privacy@clickmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@clickmail.com</a></li>
            <li>
              <Link to="/support/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                Formulario de contacto
              </Link>
            </li>
          </ul>
        </section>
        
        {/* Banner de consentimiento de cookies (versión estática para la página) */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Gestiona tus preferencias de cookies</h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Puedes ajustar tus preferencias de cookies seleccionando las categorías que deseas permitir.
            Algunas cookies son necesarias para el funcionamiento del sitio y no pueden ser desactivadas.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <input type="checkbox" id="essential" checked disabled className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-not-allowed" />
              <label htmlFor="essential" className="ml-2 text-gray-900 dark:text-white">Cookies esenciales (obligatorias)</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="performance" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="performance" className="ml-2 text-gray-900 dark:text-white">Cookies de rendimiento</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="functional" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="functional" className="ml-2 text-gray-900 dark:text-white">Cookies de funcionalidad</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="marketing" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="marketing" className="ml-2 text-gray-900 dark:text-white">Cookies de marketing</label>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Guardar preferencias
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Rechazar todas
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Aceptar todas
            </button>
          </div>
        </div>
      </StaticPageLayout>
    </div>
  );
};

export default Cookies;
