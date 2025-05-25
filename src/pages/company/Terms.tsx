import React from 'react';
import StaticPageLayout from '../../components/common/StaticPageLayout';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StaticPageLayout 
        title="Términos y Condiciones" 
        subtitle="Última actualización: 1 de Marzo, 2024"
      >
        <div className="max-w-4xl mx-auto">
          <div className="prose dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Aceptación de los Términos</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Al acceder y utilizar ClickMail, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Descripción del Servicio</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                ClickMail proporciona una plataforma para:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Gestión de campañas de email marketing</li>
                <li>Análisis de métricas y rendimiento</li>
                <li>Automatización de envíos</li>
                <li>Gestión de contactos y listas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Cuentas de Usuario</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Al crear una cuenta, usted debe:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Proporcionar información precisa y completa</li>
                <li>Mantener la seguridad de su cuenta</li>
                <li>Notificar cualquier uso no autorizado</li>
                <li>Aceptar la responsabilidad por todas las actividades en su cuenta</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Uso Aceptable</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Usted acepta no:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Violar leyes o regulaciones aplicables</li>
                <li>Enviar spam o contenido malicioso</li>
                <li>Interferir con el funcionamiento del servicio</li>
                <li>Acceder a cuentas de otros usuarios</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Propiedad Intelectual</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Todo el contenido y funcionalidades de ClickMail están protegidos por derechos de autor y otras leyes de propiedad intelectual. No se permite la copia, modificación o distribución sin autorización.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Limitación de Responsabilidad</h2>
              <p className="text-gray-600 dark:text-gray-300">
                ClickMail no será responsable por daños indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de usar el servicio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Modificaciones</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Contacto</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Para preguntas sobre estos términos, contacte a:
              </p>
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  Email: <a href="mailto:legal@clickmail.app" className="text-blue-600 dark:text-blue-400 hover:underline">legal@clickmail.app</a>
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

export default Terms; 