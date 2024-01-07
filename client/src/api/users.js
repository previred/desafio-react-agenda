const API_BASE_URL = '/api';

export const fetchUsers = async (page, limit, query) => {
  const someQuery = page || limit || query ? '?' : '';
  const pageQuery = page ? `_page=${page}` : '';
  const limitQuery = limit ? `&_limit=${limit}` : '';
  const searchQuery = query ? `&q=${query}` : '';
  const response = await fetch(`${API_BASE_URL}/users${someQuery}${pageQuery}${limitQuery}${searchQuery}`);

  const totalCount = parseInt(response.headers.get('X-Total-Count'), 10);
  const data = await response.json();
  return {
    data,
    totalCount,
  };

};

export const addUser = async (user) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error('Error al agregar el usuario');
  }
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el usuario');
  }
  return true;
};