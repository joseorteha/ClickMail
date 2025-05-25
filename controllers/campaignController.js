const Campaign = require('../models/Campaign');
const { OpenAI } = require('openai');
require('dotenv').config();

// Configurar OpenAI
const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  console.error('Error: OPENAI_API_KEY no está configurada en .env');
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

// Crear una campaña
exports.createCampaign = async (req, res) => {
  try {
    console.log('Recibiendo solicitud para crear campaña:', req.body);
    console.log('Usuario autenticado:', req.user);
    
    const { name, description, targetAudience } = req.body;
    
    if (!name || !description || !targetAudience) {
      console.log('Faltan campos requeridos:', { name, description, targetAudience });
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }
    
    // Compatibilidad con ambos formatos de token (user_id y id)
    const userId = req.user.id || req.user.user_id || req.user._id;
    console.log('ID de usuario:', userId);
    
    const campaign = new Campaign({
      name,
      description,
      targetAudience,
      userId
    });
    
    await campaign.save();
    console.log('Campaña creada con ID:', campaign._id);
    
    // Formato unificado de respuesta para que el frontend sepa qué esperar
    res.status(201).json({
      message: 'Campaña creada exitosamente',
      campaign: {
        _id: campaign._id,
        id: campaign._id, // Duplicado para mayor compatibilidad
        name: campaign.name,
        description: campaign.description,
        targetAudience: campaign.targetAudience,
        userId: campaign.userId
      }
    });
  } catch (error) {
    console.error('Error detallado al crear campaña:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Obtener todas las campañas del usuario
exports.getCampaigns = async (req, res) => {
  try {
    // Compatibilidad con ambos formatos de token (user_id y id)
    const userId = req.user.id || req.user.user_id || req.user._id;
    console.log(`Obteniendo campañas para el usuario: ${userId}`);
    
    const campaigns = await Campaign.find({ userId });
    console.log(`Se encontraron ${campaigns.length} campañas`);
    
    // Log de cada campaña para depurar
    campaigns.forEach((campaign, index) => {
      console.log(`Campaña ${index + 1}:`);
      console.log(`- ID: ${campaign._id}`);
      console.log(`- Nombre: ${campaign.name}`);
      console.log(`- Tiene email generado: ${Boolean(campaign.generatedEmail)}`);
      if (campaign.generatedEmail) {
        console.log(`- Primeros 50 caracteres del email: ${campaign.generatedEmail.substring(0, 50)}...`);
      }
    });
    
    // Devolver las campañas con todos sus campos
    res.json(campaigns.map(campaign => ({
      id: campaign._id,
      _id: campaign._id, // Añadir _id para mayor compatibilidad
      name: campaign.name,
      description: campaign.description,
      targetAudience: campaign.targetAudience,
      generatedEmail: campaign.generatedEmail,
      userId: campaign.userId,
      // Añadir campos adicionales para el dashboard
      status: campaign.status || 'Borrador',
      date: new Date(campaign.createdAt).toLocaleDateString(),
      emailContent: campaign.generatedEmail,
      stats: campaign.stats
    })));
  } catch (error) {
    console.error('Error al obtener campañas:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Actualizar una campaña
exports.updateCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    // Compatibilidad con ambos formatos de token (user_id y id)
    const userId = req.user.id || req.user.user_id || req.user._id;
    const updates = req.body;
    
    const campaign = await Campaign.findOneAndUpdate(
      { _id: campaignId, userId },
      { $set: updates },
      { new: true }
    );
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaña no encontrada' });
    }
    
    res.json({
      id: campaign._id,
      name: campaign.name,
      description: campaign.description,
      targetAudience: campaign.targetAudience,
      generatedEmail: campaign.generatedEmail,
      userId: campaign.userId
    });
  } catch (error) {
    console.error('Error al actualizar campaña:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Eliminar una campaña
exports.deleteCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    // Compatibilidad con ambos formatos de token (user_id y id)
    const userId = req.user.id || req.user.user_id || req.user._id;
    
    const result = await Campaign.deleteOne({ _id: campaignId, userId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Campaña no encontrada' });
    }
    
    res.json({ message: 'Campaña eliminada' });
  } catch (error) {
    console.error('Error al eliminar campaña:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener una campaña específica por ID
exports.getCampaignById = async (req, res) => {
  try {
    const { campaignId } = req.params;
    // Compatibilidad con ambos formatos de token (user_id y id)
    const userId = req.user.id || req.user.user_id || req.user._id;
    
    console.log(`Obteniendo detalles de la campaña ${campaignId} para el usuario ${userId}`);
    
    const campaign = await Campaign.findOne({ _id: campaignId, userId });
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaña no encontrada' });
    }
    
    // Devolver la campaña con todos sus detalles y estadísticas
    res.json({
      id: campaign._id,
      _id: campaign._id, // Duplicado para mayor compatibilidad
      name: campaign.name,
      description: campaign.description,
      targetAudience: campaign.targetAudience,
      generatedEmail: campaign.generatedEmail,
      emailContent: campaign.generatedEmail, // Para compatibilidad
      userId: campaign.userId,
      createdAt: campaign.createdAt,
      updatedAt: campaign.updatedAt,
      status: campaign.status || 'Borrador',
      // Estadísticas simuladas (en producción vendrían de una base de datos real)
      stats: {
        opens: Math.floor(Math.random() * 100),
        clicks: Math.floor(Math.random() * 50),
        bounces: Math.floor(Math.random() * 5),
        openRate: Math.floor(Math.random() * 40) + 20 + '%', // Entre 20% y 60%
        clickRate: Math.floor(Math.random() * 20) + 5 + '%', // Entre 5% y 25%
        lastSent: new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)).toISOString() // En los últimos 10 días
      }
    });
  } catch (error) {
    console.error('Error al obtener detalles de la campaña:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Generar email para una campaña
exports.generateEmail = async (req, res) => {
  try {
    console.log('=== INICIO GENERACION DE EMAIL ===');
    console.log('Generando email para campaña:', req.params.campaignId);
    // Compatibilidad con ambos formatos de token (user_id y id)
    const userId = req.user ? (req.user.id || req.user.user_id || req.user._id) : null;
    console.log('Usuario autenticado:', req.user ? `Sí (ID: ${userId})` : 'No');
    console.log('OpenAI API Key:', openaiApiKey ? 'Configurada (primeros 5 caracteres: ' + openaiApiKey.substring(0, 5) + '...)' : 'No configurada');
    
    // Primero vamos a probar si OpenAI funciona con una solicitud simple
    try {
      console.log('Realizando prueba básica de OpenAI...');
      const testResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Responde con un simple 'Hola'" }],
        max_tokens: 5
      });
      console.log('Prueba OpenAI exitosa:', testResponse.choices[0].message.content);
    } catch (openaiError) {
      console.error('Error en prueba básica de OpenAI:', openaiError);
      return res.status(500).json({ 
        message: 'Error al conectar con OpenAI', 
        error: openaiError.message,
        solution: 'Verifica tu API key de OpenAI y que tengas fondos suficientes'
      });
    }
    
    // Ahora continuamos con la generación del email para la campaña
    const { campaignId } = req.params;
    // Ya definimos userId arriba, no necesitamos redefinirlo
    
    console.log('Buscando campaña con ID:', campaignId, 'para usuario:', userId);
    const campaign = await Campaign.findOne({ _id: campaignId, userId });
    
    if (!campaign) {
      console.log('Campaña no encontrada:', campaignId, 'para usuario:', userId);
      return res.status(404).json({ message: 'Campaña no encontrada' });
    }
    
    console.log('Campaña encontrada:', campaign.name);
    
    const prompt = `Genera un correo electrónico de marketing para el siguiente producto/servicio:
Nombre: ${campaign.name}
Descripción: ${campaign.description}
Público objetivo: ${campaign.targetAudience}
El correo debe ser persuasivo, profesional y enfocado en el público objetivo.`;
    
    console.log('Enviando prompt a OpenAI:', prompt.substring(0, 100) + '...');
    
    // Usando el método correcto de la API de OpenAI (chat.completions en lugar de completions)
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Modelo actualizado
      messages: [
        { role: "system", content: "Eres un experto en marketing por email que escribe correos persuasivos y profesionales." },
        { role: "user", content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.7
    });
    
    // La respuesta tiene una estructura diferente ahora
    const generatedEmail = response.choices[0].message.content.trim();
    
    console.log('Email generado correctamente. Primeras 50 caracteres:', generatedEmail.substring(0, 50) + '...');
    
    campaign.generatedEmail = generatedEmail;
    await campaign.save();
    console.log('Email guardado en base de datos');
    
    console.log('=== FIN GENERACION DE EMAIL ===');
    
    res.json({
      message: 'Correo generado exitosamente',
      email: generatedEmail
    });
  } catch (error) {
    console.error('Error al generar email:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      message: 'Error en el servidor', 
      error: error.message,
      details: error.stack
    });
  }
};
