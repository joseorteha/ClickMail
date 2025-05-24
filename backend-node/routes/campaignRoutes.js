const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta de prueba para OpenAI (sin autenticación para simplificar)
router.get('/test-openai', async (req, res) => {
  const { OpenAI } = require('openai');
  require('dotenv').config();
  
  const openaiApiKey = process.env.OPENAI_API_KEY;
  console.log('Test OpenAI API Key:', openaiApiKey ? 'Configurada (primeros 5 caracteres: ' + openaiApiKey.substring(0, 5) + '...)' : 'No configurada');
  
  if (!openaiApiKey) {
    return res.status(500).json({ message: 'OpenAI API Key no configurada' });
  }
  
  try {
    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Responde con un simple 'Hola'" }],
      max_tokens: 5
    });
    
    return res.json({
      success: true,
      message: 'OpenAI funcionando correctamente',
      response: response.choices[0].message.content
    });
  } catch (error) {
    console.error('Error en test de OpenAI:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al conectar con OpenAI',
      error: error.message,
      stack: error.stack
    });
  }
});

// Ruta para generar un email sin autenticación ni ID de campaña (para pruebas directas)
router.get('/generate-test-email', async (req, res) => {
  const { OpenAI } = require('openai');
  require('dotenv').config();
  
  const openaiApiKey = process.env.OPENAI_API_KEY;
  console.log('Generando email de prueba...');
  
  if (!openaiApiKey) {
    return res.status(500).json({ message: 'OpenAI API Key no configurada' });
  }
  
  try {
    const openai = new OpenAI({ apiKey: openaiApiKey });
    
    // Obtener datos de los parámetros de consulta (query params) si están disponibles
    const { name, description, targetAudience, tone } = req.query;
    
    // Usar los datos de la consulta o valores predeterminados si no están disponibles
    const campaignData = {
      name: name || 'Producto/Servicio',
      description: description || 'Descripción no proporcionada',
      targetAudience: targetAudience || 'Público general',
      tone: tone || 'profesional'
    };
    
    console.log('Usando datos reales de la campaña:', campaignData);
    
    const prompt = `Genera un correo electrónico de marketing para el siguiente producto/servicio:
Nombre: ${campaignData.name}
Descripción: ${campaignData.description}
Público objetivo: ${campaignData.targetAudience}
Tono: ${campaignData.tone}
El correo debe ser persuasivo, usar el tono especificado y estar enfocado en el público objetivo.`;
    
    console.log('Enviando prompt a OpenAI:', prompt);
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Eres un experto en marketing por email que escribe correos persuasivos y profesionales." },
        { role: "user", content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.7
    });
    
    const generatedEmail = response.choices[0].message.content.trim();
    console.log('Email generado correctamente:', generatedEmail.substring(0, 50) + '...');
    
    // Formatear el email para que sea HTML válido
    const formattedEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        ${generatedEmail.replace(/\n/g, '<br>')}
      </div>
    `;
    
    return res.json({
      success: true,
      message: 'Email generado correctamente',
      email: formattedEmail
    });
  } catch (error) {
    console.error('Error generando email de prueba:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al generar email',
      error: error.message,
      stack: error.stack
    });
  }
});

// Todas las rutas de campañas requieren autenticación
router.use(authMiddleware);

// Rutas CRUD para campañas
router.post('/', campaignController.createCampaign);
router.get('/', campaignController.getCampaigns);
router.put('/:campaignId', campaignController.updateCampaign);
router.delete('/:campaignId', campaignController.deleteCampaign);

// Ruta para generar email con IA
router.post('/:campaignId/generate-email', campaignController.generateEmail);

module.exports = router;
