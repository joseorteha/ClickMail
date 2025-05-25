const nodemailer = require('nodemailer');
const Campaign = require('../models/Campaign');
const EmailProvider = require('../models/EmailProvider');

// Configuración de correo usando variables de entorno (la contraseña debe estar en .env)
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
const EMAIL_PORT = process.env.EMAIL_PORT || 587;
const EMAIL_USER = process.env.EMAIL_USER || 'joseortegahac@gmail.com';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || 'bayu ctya kgtk kmfp'; // Contraseña directa como fallback
const FIXED_SENDER_NAME = 'ClickMail';

console.log('Configurando servidor SMTP:', EMAIL_HOST);
console.log('Usando cuenta:', EMAIL_USER);
console.log('Contraseña configurada:', EMAIL_PASSWORD ? 'SÍ' : 'NO');

// Crear el transportador SMTP de Gmail
const gmailTransporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  },
  tls: {
    // No rechazar certificados autofirmados
    rejectUnauthorized: false
  }
});

// Verificar que el transportador esté funcionando
gmailTransporter.verify(function(error, success) {
  if (error) {
    console.error('Error al verificar la configuración SMTP:', error);
  } else {
    console.log('Servidor SMTP listo para enviar emails');
  }
});

// Enviar email de prueba a un destinatario específico
exports.sendTestEmail = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const userId = req.user.id || req.user.user_id; // Compatibilidad con ambos formatos
    const { recipient, recipients, subject } = req.body;

    console.log(`Enviando email de prueba para campaña ${campaignId}`);
    
    // Verificar si la campaña existe y pertenece al usuario
    const campaign = await Campaign.findOne({ _id: campaignId, userId });
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaña no encontrada' });
    }
    
    if (!campaign.generatedEmail) {
      return res.status(400).json({ message: 'La campaña no tiene contenido de email generado' });
    }

    // Lista de destinatarios
    let emailRecipients = [];
    
    // Añadir destinatario único si se proporciona
    if (recipient && recipient.trim() !== '') {
      emailRecipients.push(recipient);
    }
    
    // Añadir múltiples destinatarios si se proporcionan
    if (recipients && Array.isArray(recipients)) {
      emailRecipients = [...emailRecipients, ...recipients.filter(email => email && email.trim() !== '')];
    }
    
    // Si no hay destinatarios, usar una dirección de prueba
    if (emailRecipients.length === 0) {
      emailRecipients.push('test@example.com');
    }
    
    // Buscar información del usuario para personalizar el Reply-To
    const emailProvider = await EmailProvider.findOne({ userId });
    const userEmail = emailProvider?.fromEmail || req.user.email || 'usuario@clickmail.app';
    const userName = emailProvider?.fromName || req.user.name || 'Usuario ClickMail';
    
    // Asunto del correo
    const emailSubject = subject || `Prueba: ${campaign.name}`;
    
    // Resultados para seguimiento
    const results = [];
    
    // Enviar correos a todos los destinatarios
    for (const to of emailRecipients) {
      try {
        console.log(`Enviando email a ${to} con Gmail SMTP`);
        
        // Configuración del correo
        const mailOptions = {
          from: `"${FIXED_SENDER_NAME}" <${EMAIL_USER}>`,
          to,
          subject: emailSubject,
          html: campaign.generatedEmail,
          replyTo: `"${userName}" <${userEmail}>`,
          text: `Este correo fue enviado por ${userName} (${userEmail}) usando ClickMail.`
        };
        
        // Enviar correo usando el transportador de Gmail
        const info = await gmailTransporter.sendMail(mailOptions);
        
        console.log(`Email enviado exitosamente a ${to}: ${info.messageId}`);
        console.log(`Respuesta: ${JSON.stringify(info.response)}`);
        
        // Registrar resultado exitoso
        results.push({
          to,
          success: true,
          messageId: info.messageId,
          info: "Correo enviado exitosamente mediante Gmail"
        });
      } catch (err) {
        console.error(`Error enviando email a ${to}:`, err);
        results.push({
          to,
          success: false,
          error: err.message,
          info: "Error al enviar el correo. Verifica los logs del servidor."
        });
      }
    }
    
    // Contar éxitos y fracasos
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    res.json({
      message: `Email de prueba enviado a ${successful} destinatarios (${failed} fallidos)`,
      success: successful > 0,
      results
    });
  } catch (error) {
    console.error('Error enviando email de prueba:', error);
    res.status(500).json({ 
      message: 'Error enviando email de prueba', 
      error: error.message 
    });
  }
};

// Esta función auxiliar ya no es necesaria porque usamos directamente gmailTransporter

// Enviar email a una lista de destinatarios desde un archivo
exports.sendBulkEmail = async (req, res) => {
  try {
    // Extraer datos
    const { campaignId } = req.params;
    const userId = req.user.id || req.user.user_id || req.user._id; // Compatibilidad con múltiples formatos de token
    const { recipients, subject } = req.body;
    
    console.log(`Iniciando envío masivo para campaña ${campaignId} con ${recipients?.length || 0} destinatarios`);
    
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ message: 'Se requiere al menos un destinatario' });
    }
    
    // Verificar si la campaña existe y pertenece al usuario
    const campaign = await Campaign.findOne({ _id: campaignId, userId });
    
    if (!campaign) {
      console.log(`Campaña ${campaignId} no encontrada para usuario ${userId}`);
      return res.status(404).json({ message: 'Campaña no encontrada' });
    }
    
    if (!campaign.generatedEmail) {
      return res.status(400).json({ message: 'La campaña no tiene contenido de email generado' });
    }
    
    // Buscar información del usuario para personalizar el Reply-To
    const emailProvider = await EmailProvider.findOne({ userId });
    const userEmail = emailProvider?.fromEmail || req.user.email || 'usuario@clickmail.app';
    const userName = emailProvider?.fromName || req.user.name || 'Usuario ClickMail';
    
    // Asunto del correo
    const emailSubject = subject || campaign.name || 'Campaña ClickMail';
    
    console.log(`Enviando campaña "${emailSubject}" a ${recipients.length} destinatarios`);
    
    // Resultados acumulados
    const results = [];
    
    // Procesar lotes para no sobrecargar el servidor
    const batchSize = 10;
    
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      console.log(`Procesando lote ${Math.floor(i/batchSize) + 1}: ${batch.length} emails`);
      
      // Enviar correos en este lote
      for (const to of batch) {
        try {
          console.log(`Enviando email a ${to} con Gmail SMTP`);
          
          // Configuración del correo
          const mailOptions = {
            from: `"${FIXED_SENDER_NAME}" <${EMAIL_USER}>`,
            to,
            subject: emailSubject,
            html: campaign.generatedEmail,
            replyTo: `"${userName}" <${userEmail}>`,
            text: `Este correo fue enviado por ${userName} (${userEmail}) usando ClickMail.`
          };
          
          // Enviar correo usando el transportador de Gmail
          const info = await gmailTransporter.sendMail(mailOptions);
          
          console.log(`Email enviado exitosamente a ${to}: ${info.messageId}`);
          
          // Registrar resultado exitoso
          results.push({
            to,
            success: true,
            messageId: info.messageId,
            info: "Correo enviado exitosamente mediante Gmail"
          });
        } catch (err) {
          console.error(`Error enviando email a ${to}:`, err);
          results.push({
            to,
            success: false,
            error: err.message,
            info: "Error al enviar el correo. Verifica los logs del servidor."
          });
        }
      }
      
      // Pausa entre lotes para evitar exceder los límites de envío
      if (i + batchSize < recipients.length) {
        console.log('Pausa entre lotes para evitar restricciones de envío...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Contar éxitos y fracasos para el mensaje de respuesta
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    // Actualizar el estado de la campaña
    campaign.status = 'Enviada';
    campaign.sentAt = new Date();
    campaign.stats = {
      totalSent: recipients.length,
      successful,
      failed
    };
    await campaign.save();
    
    // Devolver resultados
    return res.json({
      message: `Emails enviados: ${successful} exitosos, ${failed} fallidos`,
      success: successful > 0,
      results
    });
    
  } catch (error) {
    console.error('Error en envío masivo:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al enviar emails masivos',
      error: error.message
    });
  }
};

// Procesar archivo de contactos
exports.processContactsFile = async (req, res) => {
  try {
    // Esta función simularía el procesamiento de un archivo CSV o Excel
    // En este caso, simulamos que simplemente recibimos un array de emails
    const { fileContent } = req.body;
    
    if (!fileContent) {
      return res.status(400).json({ message: 'No se proporcionó contenido de archivo' });
    }
    
    // Parsear emails del contenido (en una implementación real, usaríamos csv-parser, xlsx, etc.)
    // Aquí simulamos que el fileContent es un string con emails separados por comas o líneas nuevas
    const emails = fileContent
      .split(/[\n,]/)
      .map(email => email.trim())
      .filter(email => email && /\S+@\S+\.\S+/.test(email)); // Filtro básico de emails válidos
    
    if (emails.length === 0) {
      return res.status(400).json({ message: 'No se encontraron emails válidos en el archivo' });
    }
    
    res.json({
      message: `Se procesaron ${emails.length} contactos del archivo`,
      contacts: emails
    });
  } catch (error) {
    console.error('Error procesando archivo de contactos:', error);
    res.status(500).json({ 
      message: 'Error procesando archivo de contactos', 
      error: error.message 
    });
  }
};
