const API_URL = 'http://localhost:8000/api/auth';

export const register = async (data: { name: string; email: string; password: string }) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error en el registro');
  return res.json();
};

export async function login(data: { email: string; password: string }) {
  // Enviar credenciales como JSON
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error en el login");
  }
  return res.json();
};

export const updateProfile = async (data: { name: string; email: string }, token: string) => {
  const res = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar perfil');
  return res.json();
};

export const changePassword = async (data: { currentPassword: string; newPassword: string }, token: string) => {
  const res = await fetch(`${API_URL}/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Error al cambiar la contraseña');
  }
  
  return res.json();
};

export const updatePreferences = async (preferences: any, token: string) => {
  const res = await fetch(`${API_URL}/preferences`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(preferences),
  });
  
  if (!res.ok) throw new Error('Error al actualizar preferencias');
  return res.json();
};
