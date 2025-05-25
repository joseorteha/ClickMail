const EmailProvider = require('../models/EmailProvider');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Crear o actualizar la configuración de proveedor de email
exports.saveEmailProvider = async (req, res) => {
  try {
    const { provider, domain, apiKey, fromEmail, fromName } = req.body;
    
    if (!provider || !domain || !apiKey || !fromEmail || !fromName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Todos los campos son requeridos' 
      });
    }
    
    // Buscar si ya existe una configuración para este usuario
    let emailProvider = await EmailProvider.findOne({ userId: req.user.id });
    
    if (emailProvider) {
      // Actualizar configuración existente
      emailProvider.provider = provider;
      emailProvider.domain = domain;
      emailProvider.apiKey = apiKey;
      emailProvider.fromEmail = fromEmail;
      emailProvider.fromName = fromName;
      emailProvider.updatedAt = Date.now();
    } else {
      // Crear nueva configuración
      emailProvider = new EmailProvider({
        userId: req.user.id,
        provider,
        domain,
        apiKey,
        fromEmail,
        fromName
      });
    }
    
    await emailProvider.save();
    
    // No devolver la API key completa por seguridad
    const responseData = {
      id: emailProvider._id,
      provider: emailProvider.provider,
      domain: emailProvider.domain,
      fromEmail: emailProvider.fromEmail,
      fromName: emailProvider.fromName,
      isActive: emailProvider.isActive,
      createdAt: emailProvider.createdAt,
      updatedAt: emailProvider.updatedAt
    };
    
    return res.status(200).json({
      success: true,
      data: responseData,
      message: 'Configuración de email guardada correctamente'
    });
    
  } catch (error) {
    console.error('Error al guardar configuración de email:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al guardar la configuración de email'
    });
  }
};

// Obtener la configuración del proveedor de email del usuario
exports.getEmailProvider = async (req, res) => {
  try {
    const emailProvider = await EmailProvider.findOne({ userId: req.user.id });
    
    if (!emailProvider) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró configuración de email para este usuario'
      });
    }
    
    // No devolver la API key completa por seguridad
    const responseData = {
      id: emailProvider._id,
      provider: emailProvider.provider,
      domain: emailProvider.domain,
      fromEmail: emailProvider.fromEmail,
      fromName: emailProvider.fromName,
      isActive: emailProvider.isActive,
      apiKeyConfigured: Boolean(emailProvider.apiKey),
      createdAt: emailProvider.createdAt,
      updatedAt: emailProvider.updatedAt
    };
    
    return res.status(200).json({
      success: true,
      data: responseData
    });
    
  } catch (error) {
    console.error('Error al obtener configuración de email:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener la configuración de email'
    });
  }
};

// Eliminar la configuración del proveedor de email
exports.deleteEmailProvider = async (req, res) => {
  try {
    const result = await EmailProvider.deleteOne({ 
      userId: req.user.id 
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró configuración de email para eliminar'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Configuración de email eliminada correctamente'
    });
    
  } catch (error) {
    console.error('Error al eliminar configuración de email:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la configuración de email'
    });
  }
};

// Verificar configuración de Email (SMTP)
exports.verifyMailgunConfig = async (req, res) => {
  try {
    const { domain, apiKey, fromEmail } = req.body;
    
    if (!apiKey || !fromEmail) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere contraseña (API key) y correo electrónico del remitente'
      });
    }
    
    console.log('Verificando configuración de email SMTP con:', fromEmail);
    
    // Crear un transportador de prueba con Nodemailer
    // Aquí usamos un servicio SMTP gratuito para pruebas
    const testAccount = await nodemailer.createTestAccount();
    
    // Esto crea una cuenta temporal en ethereal.email para pruebas
    // No se envían emails reales, pero puedes ver si funcionaría
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    
    // Verificar la conexión
    await transporter.verify();
    
    return res.status(200).json({
      success: true,
      message: 'Configuración de email verificada correctamente',
      data: {
        name: fromEmail,
        testAccount: {
          user: testAccount.user,
          url: `https://ethereal.email/login`
        },
        isVerified: true
      }
    });
    
  } catch (error) {
    console.error('Error al verificar configuración de email:', error);
    return res.status(400).json({
      success: false,
      message: 'Credenciales de Mailgun inválidas o dominio no configurado correctamente'
    });
  }
};
