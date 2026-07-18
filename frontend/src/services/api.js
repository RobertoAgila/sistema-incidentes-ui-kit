const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = { success: false, message: 'El servidor devolvió una respuesta no válida.' };
  }

  if (!response.ok) {
    const validation = Array.isArray(payload.errors) ? ` ${payload.errors.join(' ')}` : '';
    throw new Error(`${payload.message || 'No se pudo completar la solicitud.'}${validation}`);
  }

  return payload;
}

export const ticketApi = {
  health: () => request('/api/health'),
  list: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    const query = params.toString() ? `?${params.toString()}` : '';
    return request(`/api/tickets${query}`);
  },
  create: (ticket) => request('/api/tickets', {
    method: 'POST',
    body: JSON.stringify(ticket),
  }),
  update: (id, changes) => request(`/api/tickets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(changes),
  }),
  remove: (id) => request(`/api/tickets/${id}`, { method: 'DELETE' }),
};

export { API_BASE_URL };
