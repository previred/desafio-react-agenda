import { IUser } from "../interfaces";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const UNKNOWN_ERROR = "Ha ocurrido un error al obtener usuarios";

/**
 * Obtiene la lista de usuarios desde la API.
 * @returns {Promise<IUser[]>} Una promesa que se resuelve con un array de usuarios.
 * @throws {Error} Si ocurre un error al obtener los usuarios.
 */
export const getUsers = async (): Promise<IUser[] | undefined> => {
  try {
    const response = await fetch(`${API_BASE}/users`);
    if (!response.ok) {
      throw new Error("Error al obtener Usuarios");
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error: unknown) {
    handleFetchError(error);
  }
};

/**
 * Elimina un usuario de la API.
 * @param {number} userId - El ID del usuario que se eliminará.
 * @returns {Promise<void>} Una promesa que indica que el usuario ha sido eliminado con éxito.
 * @throws {Error} Si ocurre un error al eliminar el usuario.
 */
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar Usuario");
    }
  } catch (error: unknown) {
    handleFetchError(error);
  }
};

/**
 * Agrega un nuevo usuario a la API.
 * @param {IUser} user - El usuario que se agregará a la API.
 * @returns {Promise<IUser>} Una promesa que se resuelve con el usuario creado.
 * @throws {Error} Si ocurre un error al agregar el usuario.
 */
export const addUser = async (user: IUser): Promise<IUser | undefined> => {
  try {
    const response = await fetch(`${API_BASE}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Error al crear un Usuario");
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error: unknown) {
    handleFetchError(error);
  }
};

const handleFetchError = (error: unknown) => {
  if (error instanceof TypeError) {
    throw new Error("Error de red");
  } else if (error instanceof SyntaxError) {
    throw new Error("Error de análisis JSON");
  } else {
    throw new Error(UNKNOWN_ERROR);
  }
};
