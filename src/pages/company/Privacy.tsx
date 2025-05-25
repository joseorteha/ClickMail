import React from 'react';
import StaticPageLayout from '../../components/common/StaticPageLayout';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StaticPageLayout 
        title="Política de Privacidad" 
        subtitle="Última actualización: 1 de Marzo, 2024"
      >
        <div className="max-w-4xl mx-auto">
          <div className="prose dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Información que Recopilamos</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Recopilamos información que usted nos proporciona directamente cuando:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Crea una cuenta</li>
                <li>Utiliza nuestros servicios</li>
                <li>Se comunica con nosotros</li>
                <li>Se suscribe a nuestro boletín</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Uso de la Información</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Proporcionar y mantener nuestros servicios</li>
                <li>Mejorar y personalizar su experiencia</li>
                <li>Comunicarnos con usted</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Compartir Información</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                No vendemos ni alquilamos su información personal. Podemos compartir su información con:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Proveedores de servicios que nos ayudan a operar</li>
                <li>Socios comerciales con su consentimiento</li>
                <li>Autoridades legales cuando sea requerido por ley</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Sus Derechos</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Usted tiene derecho a:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Acceder a su información personal</li>
                <li>Corregir información inexacta</li>
                <li>Solicitar la eliminación de sus datos</li>
                <li>Oponerse al procesamiento de sus datos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Seguridad</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Contacto</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Si tiene preguntas sobre esta política de privacidad, puede contactarnos en:
              </p>
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  Email: <a href="mailto:privacy@clickmail.app" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@clickmail.app</a>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Dirección: Calle Principal 123, Ciudad, País
                </p>
              </div>
            </section>
          </div>
        </div>
      </StaticPageLayout>
    </div>
  );
};

export default Privacy; 