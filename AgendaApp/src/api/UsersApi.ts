// Importaciones para realizar solicitudes HTTP y manejar tipos de datos.
import { AxiosInstance } from "../services/AxiosInstance";
import { IUser } from "../interfaces/IUser";

/**
 * Define los parámetros para la función de búsqueda de usuarios.
 *
 * Esta interfaz se utiliza para especificar los argumentos aceptados por la función
 * que realiza consultas para obtener una lista de usuarios, permitiendo la paginación
 * y la búsqueda por términos específicos.
 *
 * @param page - El número de página de resultados a retornar. Es opcional y, si no se proporciona,
 *               se asume un valor predeterminado de primera página (1).
 *
 * @param limit - El límite de usuarios a retornar en una sola página de resultados. Es opcional y,
 *                si no se proporciona, se utiliza un valor predeterminado de 10 que define el tamaño de página..
 *
 * @param search - Una cadena de texto opcional utilizada para filtrar los resultados de la consulta
 *                 basada en coincidencias con esta cadena.
 */
interface FindAllParams {
  page?: number;
  limit?: number;
  search?: string;
}

/**
 * Realiza una solicitud GET para obtener una lista de usuarios.
 * Utiliza la instancia de Axios configurada para hacer la solicitud a la ruta '/users'.
 * La solicitud incluye parámetros de consulta para paginación, limitando los resultados a un número específico de usuarios por página
 * y permitiendo la búsqueda por términos específicos.
 *
 * @param {FindAllParams} - Objeto que contiene los parámetros de la consulta:
 *  - page: El número de página de resultados a retornar. Si no se proporciona, se asume el valor de 1.
 *  - limit: El número máximo de usuarios a retornar en una sola página. Si no se proporciona, se asume el valor de 10.
 *  - search: Una cadena de texto opcional utilizada para filtrar los resultados de la consulta.
 *
 * @returns Una promesa que resuelve con la respuesta de la API que contiene un arreglo de usuarios.
 * @throws Una promesa rechazada con el error en caso de que la solicitud falle.
 */
const findAll = async ({ page, limit, search }: FindAllParams) => {
  try {
    const params = new URLSearchParams();
    params.append("_page", String(page || 2));
    params.append("_limit", String(limit || 10));
    if (search) params.append("q", search);

    const response = await AxiosInstance.get<IUser[]>(`/users?${params}`);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Crea un nuevo usuario enviando datos al servidor mediante una solicitud POST.
 * Los datos del usuario a crear son especificados por los parámetros de la función.
 *
 * @param {IUser} userData - Objeto que contiene los datos del nuevo usuario, incluyendo nombre, descripción y foto.
 * @return Una promesa que resuelve con la respuesta de la API que confirma la creación del usuario.
 * @throw Una promesa rechazada con el error en caso de que la solicitud falle.
 */
const createUser = async ({ name, description, photo }: IUser) => {
  try {
    // Objeto que contiene los datos del usuario.
    const userData = { name, description, photo };
    // Realiza la solicitud POST a la ruta '/users' con los datos del usuario.
    // Especifica el tipo de contenido esperado en los headers de la solicitud (de acuerdo a API).
    const response = await AxiosInstance.post<IUser>("/users", userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { findAll, createUser };
