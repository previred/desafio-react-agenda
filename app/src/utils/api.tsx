/**
 * URL base para las solicitudes a la API de usuarios.
 * @type {string}
 */
export const BASE_URL = 'http://localhost:9000/api/users';

/**
 * Función asincrónica para obtener datos de la API de usuarios.
 * @returns {Promise<any>} Promesa que se resuelve con los datos obtenidos de la API.
 * @throws {Error} Si la solicitud no es exitosa o si ocurre un error durante el proceso.
 */
export const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
