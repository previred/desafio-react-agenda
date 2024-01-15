const BASE_URL = "http://localhost:9000/api/users";

// Obtener todos los usuarios con paginación y búsqueda opcional
export const getUsers = async ({ page, limit, query }) => {
  // Preparar la URL para obtener el total de registros
  let responseTotal = null;
  let usersTotal = null;
  if (!query) {
    // Si no hay búsqueda, obtener el total de registros
    responseTotal = await fetch(BASE_URL);
    if (!responseTotal.ok) {
      throw new Error(`HTTP error! status: ${responseTotal.status}`);
    }
    usersTotal = await responseTotal.json();
  }
  const total = usersTotal ? usersTotal.length : 0;

  // Preparar la URL para la paginación y búsqueda
  let url = BASE_URL;
  const params = new URLSearchParams();

  if (page) params.append("_page", page);
  if (limit) params.append("_limit", limit);
  if (query) params.append("q", query);

  if (params.toString()) url += `?${params}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const users = await response.json();
  console.log({ users, total });
  return {
    data: users,
    total, // Agregar el total al objeto de retorno
  };
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Eliminar un usuario por ID
export const deleteUserById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json(); // O retorna true/false o algún otro indicador de éxito
};
