// Plantillas de email prediseñadas para ClickMail
// Cada plantilla tiene un ID, nombre, descripción y el HTML con placeholders para el contenido

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  html: string;
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Diseño limpio y moderno con acentos azules',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eaeaea;">
          <h1 style="color: #3b82f6; margin-bottom: 10px; font-size: 24px;">{{CAMPAIGN_NAME}}</h1>
        </div>
        
        <div style="padding: 20px 0; line-height: 1.6; color: #333333;">
          {{EMAIL_CONTENT}}
        </div>
        
        <div style="padding: 20px 0; text-align: center;">
          <a href="#" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 4px; font-weight: 500;">Saber más</a>
        </div>
        
        <div style="border-top: 1px solid #eaeaea; padding-top: 20px; text-align: center; font-size: 12px; color: #666666;">
          <p>© 2025 {{COMPANY_NAME}}. Todos los derechos reservados.</p>
          <p>Si no quieres recibir más emails, haz <a href="#" style="color: #3b82f6;">clic aquí</a>.</p>
        </div>
      </div>
    `
  },
  {
    id: 'corporate',
    name: 'Corporativo',
    description: 'Diseño formal para comunicaciones profesionales',
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #dddddd;">
        <div style="background-color: #333333; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 22px;">{{CAMPAIGN_NAME}}</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border: 1px solid #eeeeee; line-height: 1.6; color: #333333;">
          {{EMAIL_CONTENT}}
        </div>
        
        <div style="background-color: white; padding: 20px; border: 1px solid #eeeeee; text-align: center; margin-top: 10px;">
          <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #2c3e50; color: white; text-decoration: none; font-weight: 500;">Más Información</a>
        </div>
        
        <div style="padding-top: 20px; text-align: center; font-size: 12px; color: #777777;">
          <p>© 2025 {{COMPANY_NAME}} | <a href="#" style="color: #555555;">Política de Privacidad</a></p>
          <p>Has recibido este email porque estás suscrito a nuestras actualizaciones.</p>
          <p>Para darte de baja, haz <a href="#" style="color: #555555;">clic aquí</a>.</p>
        </div>
      </div>
    `
  },
  {
    id: 'colorful',
    name: 'Colorido',
    description: 'Diseño vibrante para campañas llamativas',
    html: `
      <div style="font-family: 'Trebuchet MS', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">{{CAMPAIGN_NAME}}</h1>
        </div>
        
        <div style="padding: 30px; line-height: 1.6; color: #444444; background-color: white;">
          {{EMAIL_CONTENT}}
        </div>
        
        <div style="padding: 25px; text-align: center; background-color: #f9fafb;">
          <a href="#" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; text-decoration: none; border-radius: 50px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">¡Descubre Más!</a>
        </div>
        
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>© 2025 {{COMPANY_NAME}}</p>
          <p>Para dejar de recibir estos emails, <a href="#" style="color: #8b5cf6;">haz clic aquí</a>.</p>
        </div>
      </div>
    `
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Diseño limpio y sencillo con enfoque en el contenido',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; color: #1f2937;">
        <div style="margin-bottom: 30px;">
          <h1 style="font-size: 22px; font-weight: 600; color: #111827; margin-bottom: 10px;">{{CAMPAIGN_NAME}}</h1>
          <div style="width: 50px; height: 3px; background-color: #d1d5db; margin-bottom: 20px;"></div>
        </div>
        
        <div style="line-height: 1.6;">
          {{EMAIL_CONTENT}}
        </div>
        
        <div style="margin: 40px 0; text-align: left;">
          <a href="#" style="display: inline-block; padding: 10px 16px; border: 1px solid #d1d5db; color: #4b5563; text-decoration: none; font-size: 14px; font-weight: 500;">Leer más →</a>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
          <p>© 2025 {{COMPANY_NAME}}</p>
          <p>Si prefieres no recibir más emails, <a href="#" style="color: #6b7280; text-decoration: underline;">cancela la suscripción</a>.</p>
        </div>
      </div>
    `
  },
  {
    id: 'product',
    name: 'Promoción de Producto',
    description: 'Ideal para destacar productos o servicios',
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f7fafc;">
        <div style="background-color: #2563eb; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 26px; letter-spacing: -0.5px;">{{CAMPAIGN_NAME}}</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; color: #374151; line-height: 1.6; border: 1px solid #e5e7eb;">
          {{EMAIL_CONTENT}}
        </div>
        
        <div style="background-color: #dbeafe; padding: 25px; text-align: center; border: 1px solid #e5e7eb; border-top: none;">
          <h2 style="margin-top: 0; color: #1e40af; font-size: 20px;">¡Oferta por tiempo limitado!</h2>
          <a href="#" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Comprar ahora</a>
        </div>
        
        <div style="padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>© 2025 {{COMPANY_NAME}}. Todos los derechos reservados.</p>
          <p>Este email fue enviado a [email]. Para darte de baja, <a href="#" style="color: #4b5563;">haz clic aquí</a>.</p>
        </div>
      </div>
    `
  }
];

// Función para aplicar una plantilla al contenido generado
export const applyTemplate = (templateId: string, content: string, campaignName: string = '', companyName: string = 'ClickMail'): string => {
  // Buscar la plantilla por ID
  const template = emailTemplates.find(t => t.id === templateId);
  
  // Si no se encuentra, devolver el contenido original
  if (!template) return content;
  
  // Reemplazar los placeholders con el contenido real
  return template.html
    .replace('{{EMAIL_CONTENT}}', content)
    .replace('{{CAMPAIGN_NAME}}', campaignName)
    .replace(/{{COMPANY_NAME}}/g, companyName);
};
