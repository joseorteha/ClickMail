import React from 'react';
import StaticPageLayout from '../../components/common/StaticPageLayout';

const Terms = () => {
  return (
    <StaticPageLayout 
      title="Términos y Condiciones" 
      subtitle="Por favor lee atentamente nuestros términos de servicio"
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Última actualización: 23 de Mayo, 2025
        </p>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">1. Introducción</h2>
        <p className="mb-6">
          Bienvenido a ClickMail ("nosotros", "nuestro", o "la Compañía"). Al acceder o utilizar nuestro servicio, 
          sitio web, y aplicación (colectivamente, el "Servicio"), usted acepta estar sujeto a estos Términos y Condiciones.
          Estos Términos se aplican a todos los visitantes, usuarios y otras personas que acceden o utilizan el Servicio.
        </p>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2. Comunicaciones</h2>
        <p className="mb-6">
          Al crear una cuenta en nuestro servicio, usted acepta recibir comunicaciones de nuestra parte,
          incluyendo emails y mensajes dentro de la aplicación. Puede optar por no recibir ciertas comunicaciones 
          ajustando la configuración de su cuenta.
        </p>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">3. Compras y Suscripciones</h2>
        <p className="mb-2">
          Al adquirir una suscripción a ClickMail, usted acepta los siguientes términos:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Las suscripciones se renuevan automáticamente al final de cada ciclo de facturación.</li>
          <li>Puede cancelar su suscripción en cualquier momento desde la configuración de su cuenta.</li>
          <li>No ofrecemos reembolsos por pagos ya procesados, a menos que lo exija la ley.</li>
          <li>Nos reservamos el derecho de cambiar nuestros precios con previo aviso.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">4. Uso del Servicio</h2>
        <p className="mb-2">
          Usted acepta utilizar nuestro servicio únicamente para fines legales y de acuerdo con estos Términos.
          Usted se compromete a no:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Violar ninguna ley o regulación aplicable.</li>
          <li>Enviar spam o comunicaciones no solicitadas.</li>
          <li>Infringir los derechos de propiedad intelectual de terceros.</li>
          <li>Interferir con o dañar la seguridad o rendimiento del Servicio.</li>
          <li>Distribuir malware, virus o cualquier código dañino.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">5. Contenido Generado por IA</h2>
        <p className="mb-6">
          El Servicio incluye funcionalidades que utilizan inteligencia artificial para generar contenido. Usted reconoce que:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>El contenido generado por IA es creado automáticamente y puede requerir revisión humana.</li>
          <li>Usted es responsable del contenido que envía a sus destinatarios, incluso si fue generado por nuestra IA.</li>
          <li>No garantizamos la precisión, relevancia o adecuación de todo el contenido generado por IA.</li>
          <li>El contenido generado no debe utilizarse para engañar o desinformar deliberadamente.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">6. Limitación de Responsabilidad</h2>
        <p className="mb-6">
          En ningún caso ClickMail, sus directores, empleados, socios, agentes, proveedores o afiliados serán responsables 
          por cualquier daño indirecto, incidental, especial, consecuente o punitivo, incluyendo, entre otros, pérdida de 
          beneficios, datos, uso, buena voluntad u otras pérdidas intangibles resultantes de:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Su uso o incapacidad para usar el Servicio.</li>
          <li>Cualquier cambio en el Servicio o cese temporal o permanente del mismo.</li>
          <li>Acceso no autorizado o alteración de sus transmisiones o datos.</li>
          <li>Declaraciones o conductas de terceros respecto al Servicio.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">7. Cambios a los Términos</h2>
        <p className="mb-6">
          Nos reservamos el derecho de modificar o reemplazar estos Términos en cualquier momento. Si realizamos cambios 
          materiales, notificaremos a través de nuestro sitio web o por email antes de que los cambios entren en vigor.
          Su uso continuado del Servicio después de dichos cambios constituye su aceptación de los nuevos Términos.
        </p>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">8. Contacto</h2>
        <p className="mb-6">
          Si tiene alguna pregunta sobre estos Términos, por favor contáctenos en legal@clickmail.app.
        </p>
      </div>
    </StaticPageLayout>
  );
};

export default Terms;
