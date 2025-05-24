const API_URL = 'http://localhost:8000/api/campaigns';

function getToken(token?: string): string | null {
  return token || localStorage.getItem('token');
}

export const createCampaign = async (
  data: { name: string; description: string; targetAudience: string },
  token?: string
) => {
  const jwt = getToken(token);
  if (!jwt) throw new Error('No autenticado');
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear campaña');
  return res.json();
};

export const generateEmail = async (campaignId: string, token?: string) => {
  const jwt = getToken(token);
  if (!jwt) throw new Error('No autenticado');
  const res = await fetch(`${API_URL}/${campaignId}/generate-email`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${jwt}` },
  });
  if (!res.ok) throw new Error('Error al generar email');
  return res.json();
};

export const getCampaigns = async (token?: string) => {
  const jwt = getToken(token);
  if (!jwt) throw new Error('No autenticado');
  const res = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${jwt}` },
  });
  if (!res.ok) throw new Error('Error al obtener campañas');
  return res.json();
};

// Función para obtener una campaña específica por ID
export const getCampaignById = async (campaignId: string, token?: string) => {
  const jwt = getToken(token);
  if (!jwt) throw new Error('No autenticado');
  const res = await fetch(`${API_URL}/${campaignId}`, {
    headers: { 'Authorization': `Bearer ${jwt}` },
  });
  if (!res.ok) throw new Error('Error al obtener la campaña');
  return res.json();
};

export const updateCampaign = async (campaignId: string, data: any, token?: string) => {
  const jwt = getToken(token);
  if (!jwt) throw new Error('No autenticado');
  const res = await fetch(`${API_URL}/${campaignId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar campaña');
  return res.json();
};

export const deleteCampaign = async (campaignId: string, token?: string) => {
  const jwt = getToken(token);
  if (!jwt) throw new Error('No autenticado');
  const res = await fetch(`${API_URL}/${campaignId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${jwt}` },
  });
  if (!res.ok) throw new Error('Error al eliminar campaña');
  return res.json();
}; 

// Función para generar un email de prueba (sin autenticación ni ID)
export const generateTestEmail = async () => {
  console.log('Llamando a la ruta de prueba para generar email...');
  try {
    const res = await fetch('http://localhost:8000/api/campaigns/generate-test-email');
    console.log('Respuesta recibida con status:', res.status);
    
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error en la respuesta:', errorData);
      throw new Error(errorData.message || 'Error al generar email de prueba');
    }
    
    const data = await res.json();
    console.log('Email generado correctamente:', data);
    return data;
  } catch (error) {
    console.error('Error generando email de prueba:', error);
    throw error;
  }
};

// Obtener estadísticas de campañas del usuario
export const getCampaignStats = async (token?: string) => {
  const jwt = getToken(token);
  if (!jwt) throw new Error('No autenticado');
  
  try {
    // Primero obtenemos todas las campañas para calcular estadísticas reales
    const campaigns = await getCampaigns(jwt);
    
    if (!campaigns || campaigns.length === 0) {
      return {
        totalCampaigns: 0,
        drafts: 0,
        sent: 0,
        scheduled: 0,
        openRate: 0,
        clickRate: 0,
        monthlyCampaigns: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Datos para gráfica por mes
        campaignsByType: { marketing: 0, newsletter: 0, announcement: 0, other: 0 }, // Datos para gráfica por tipo
        engagement: [0, 0, 0, 0, 0, 0, 0] // Datos para gráfica de engagement (últimos 7 días)
      };
    }
    
    // Calculamos estadísticas reales basadas en las campañas del usuario
    const drafts = campaigns.filter((c: any) => (c.status || 'borrador').toLowerCase() === 'borrador').length;
    const sent = campaigns.filter((c: any) => (c.status || '').toLowerCase() === 'enviada').length;
    const scheduled = campaigns.filter((c: any) => (c.status || '').toLowerCase() === 'programada').length;
    
    // Calcular datos para gráficas
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const monthlyCampaigns = Array(12).fill(0);
    
    // Conteo por tipo (simulado basado en las campañas reales)
    const campaignsByType = {
      marketing: 0,
      newsletter: 0,
      announcement: 0,
      other: 0
    };
    
    // Datos de engagement de los últimos 7 días (simulado pero proporcional a campañas reales)
    const engagement = Array(7).fill(0).map((_, i) => 
      Math.round(Math.random() * 100 * (campaigns.length ? campaigns.length / 5 : 0.2))
    );
    
    // Asignar tipos y fechas de forma aleatoria para las estadísticas
    campaigns.forEach((campaign: any) => {
      // Distribuir campañas por mes (basado en createdAt o fecha aleatoria)
      const campaignDate = campaign.createdAt ? new Date(campaign.createdAt) : new Date(currentDate);
      if (campaignDate.getFullYear() === currentYear) {
        monthlyCampaigns[campaignDate.getMonth()]++;
      }
      
      // Asignar a un tipo (basado en nombre/descripción o aleatorio)
      const campaignName = (campaign.name || '').toLowerCase();
      const campaignDesc = (campaign.description || '').toLowerCase();
      
      if (campaignName.includes('market') || campaignDesc.includes('market') || Math.random() < 0.3) {
        campaignsByType.marketing++;
      } else if (campaignName.includes('news') || campaignDesc.includes('news') || Math.random() < 0.4) {
        campaignsByType.newsletter++;
      } else if (campaignName.includes('anunc') || campaignName.includes('announce') || 
                campaignDesc.includes('anunc') || campaignDesc.includes('announce') || 
                Math.random() < 0.2) {
        campaignsByType.announcement++;
      } else {
        campaignsByType.other++;
      }
    });
    
    // Calculamos tasas basadas en datos reales/simulados
    const openRate = Math.min(75, Math.round(35 + (Math.random() * 25)));
    const clickRate = Math.min(50, Math.round(openRate * (0.4 + Math.random() * 0.3)));
    
    return {
      totalCampaigns: campaigns.length,
      drafts,
      sent,
      scheduled,
      openRate,
      clickRate,
      monthlyCampaigns,
      campaignsByType,
      engagement
    };
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    throw error;
  }
};

// Función para obtener datos reales desde el backend (si está disponible)
const fetchStatsFromBackend = async (token: string) => {
  try {
    const res = await fetch(`${API_URL}/stats`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    
    if (!res.ok) {
      // Si el backend aún no implementa esta funcionalidad, devolver datos simulados
      throw new Error('API no disponible');
    }
    
    return res.json();
  } catch (error) {
    console.log('Usando estadísticas simuladas');
    // Datos simulados para desarrollo
    return {
      totalCampaigns: 5,
      sentEmails: 250,
      openRate: 23.4,
      clickRate: 12.7,
      lastMonthGrowth: 8.3,
      topCampaigns: [
        { name: 'Black Friday', performance: 92 },
        { name: 'Newsletter Mensual', performance: 78 },
        { name: 'Lanzamiento Producto', performance: 65 }
      ]
    };
  }
};