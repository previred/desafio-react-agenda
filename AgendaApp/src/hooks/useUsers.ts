// Importaciones de React Query y la función API específica.
import { useQuery } from "@tanstack/react-query";
import { findAll } from "../api/UsersApi";

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
 * Hook para obtener la lista de usuarios utilizando React Query.
 *
 * Este hook encapsula la lógica para realizar una solicitud asincrónica a la API
 * para obtener todos los usuarios basándose en los parámetros de paginación y búsqueda especificados.
 * Utiliza React Query para manejar el estado de la solicitud, el almacenamiento en caché, la recarga,
 * facilitando la gestión de datos asincrónicos.
 *
 * @param {FindAllParams}- Objeto que contiene los parámetros de la consulta:
 *  - page: Número de página de resultados a retornar.
 *  - limit: Límite de usuarios a retornar en una sola página.
 *  - search: Texto de búsqueda para filtrar los resultados.
 *
 * @return El estado de la consulta de React Query, incluyendo datos, estado de carga, y errores.
 *         Se puede desestructurar el resultado para acceder a información específica.
 *
 * Ejemplo de uso:
 * const { data: users, isLoading, error } = useUsers({ page: 1, limit: 10, search: 'Francisco' });
 *
 * - `data`: Los datos devueltos por la consulta, en este caso, un arreglo de usuarios.
 * - `isLoading`: Un booleano que indica si la consulta está en proceso de carga.
 * - `error`: Un objeto de error que indica si la consulta falló.
 */
export const useUsers = ({ page, limit, search }: FindAllParams) => {
  return useQuery({
    queryKey: ["usersList", { page, limit, search }],
    queryFn: () => findAll({ page, limit, search }),
  });
};
