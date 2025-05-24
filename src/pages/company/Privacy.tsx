import React from 'react';
import StaticPageLayout from '../../components/common/StaticPageLayout';

const Privacy = () => {
  return (
    <StaticPageLayout 
      title="Política de Privacidad" 
      subtitle="Cómo recopilamos, utilizamos y protegemos tu información personal"
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Última actualización: 23 de Mayo, 2025
        </p>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">1. Información que recopilamos</h2>
        <p className="mb-2">
          En ClickMail, recopilamos diferentes tipos de información para proporcionar y mejorar nuestros servicios:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Información de la cuenta:</strong> Nombre, dirección de email, contraseña y datos de contacto.</li>
          <li><strong>Información de uso:</strong> Cómo interactúas con nuestra plataforma, incluidas las campañas que creas y envías.</li>
          <li><strong>Información del destinatario:</strong> Listas de contactos y datos que subes para tus campañas.</li>
          <li><strong>Datos de rendimiento:</strong> Estadísticas sobre la apertura de emails, clics y conversiones.</li>
          <li><strong>Información técnica:</strong> Dirección IP, tipo de navegador, dispositivo y sistema operativo.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2. Cómo usamos tu información</h2>
        <p className="mb-2">
          Utilizamos la información recopilada para:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Proporcionar, mantener y mejorar nuestros servicios.</li>
          <li>Procesar transacciones y enviar notificaciones relacionadas.</li>
          <li>Enviar comunicaciones técnicas, actualizaciones, alertas y mensajes de soporte.</li>
          <li>Responder a tus comentarios, preguntas y solicitudes.</li>
          <li>Monitorear y analizar tendencias, uso y actividades relacionadas con nuestros servicios.</li>
          <li>Personalizar y mejorar tu experiencia.</li>
          <li>Desarrollar nuevos productos, servicios y características.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">3. Compartir información</h2>
        <p className="mb-2">
          No vendemos ni alquilamos tu información personal a terceros. Sin embargo, podemos compartir información en las siguientes situaciones:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio.</li>
          <li>Para cumplir con requisitos legales, como una orden judicial o proceso legal.</li>
          <li>Para proteger los derechos, la privacidad, la seguridad o la propiedad de ClickMail o de otros.</li>
          <li>En relación con una transacción corporativa, como una fusión, adquisición o venta de activos.</li>
          <li>Con tu consentimiento o según tus indicaciones.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">4. Seguridad de datos</h2>
        <p className="mb-6">
          Implementamos medidas de seguridad diseñadas para proteger tu información personal, incluido el cifrado de datos, 
          acceso restringido a personal autorizado y revisiones regulares de seguridad. Sin embargo, ningún sistema es 
          completamente seguro, por lo que no podemos garantizar la seguridad absoluta de tu información.
        </p>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">5. Uso de cookies y tecnologías similares</h2>
        <p className="mb-6">
          Utilizamos cookies y tecnologías similares para recopilar información sobre cómo interactúas con nuestros servicios.
          Estas tecnologías nos ayudan a autenticar usuarios, recordar preferencias, analizar el uso del sitio y personalizar contenido.
          Puedes configurar tu navegador para rechazar todas o algunas cookies, aunque esto puede afectar a la funcionalidad de nuestros servicios.
        </p>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">6. Tus derechos y opciones</h2>
        <p className="mb-2">
          Dependiendo de tu ubicación, puedes tener ciertos derechos respecto a tu información personal:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Acceder, corregir o eliminar la información que tenemos sobre ti.</li>
          <li>Restringir u oponerte a ciertos procesamientos de tus datos.</li>
          <li>Solicitar la portabilidad de tu información.</li>
          <li>Revocar tu consentimiento para el procesamiento futuro.</li>
          <li>Presentar una queja ante una autoridad de protección de datos.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">7. Retención de datos</h2>
        <p className="mb-6">
          Conservamos tu información personal mientras tu cuenta esté activa o según sea necesario para proporcionar servicios.
          También podemos retener información para cumplir con obligaciones legales, resolver disputas y hacer cumplir nuestros acuerdos.
        </p>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">8. Cambios a esta política</h2>
        <p className="mb-6">
          Podemos actualizar esta política periódicamente para reflejar cambios en nuestras prácticas o por otros motivos operativos, 
          legales o regulatorios. Te notificaremos sobre cambios materiales a través de nuestro sitio web o por email antes de que los 
          cambios entren en vigor.
        </p>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">9. Contacto</h2>
        <p className="mb-6">
          Si tienes preguntas o inquietudes sobre nuestra Política de Privacidad o nuestras prácticas de datos, contáctanos en: 
          <a href="mailto:privacidad@clickmail.app" className="text-blue-600 dark:text-blue-400 ml-1 hover:underline">
            privacidad@clickmail.app
          </a>
        </p>
      </div>
    </StaticPageLayout>
  );
};

export default Privacy;
