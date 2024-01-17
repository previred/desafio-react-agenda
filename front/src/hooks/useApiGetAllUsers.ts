import { useEffect, useState } from "react";
import { createApiUserRepository } from '../users/infrastructure/ApiUserRepository';
import { User } from '../users/domain';

/**
 * Hook personalizado que facilita la obtención de todos los usuarios desde la API.
 * 
 * @returns {Array} Una tupla que contiene los siguientes elementos en orden:
 *   - {boolean} loading - Indica si la carga de datos está en curso.
 *   - {User[]} data - Datos de los usuarios obtenidos desde la API.
 *   - {Function} fetchData - Función para volver a cargar los datos de los usuarios desde la API.
 *   - {Error | null} error - Objeto de error, si ocurre alguno durante la carga de datos.
 */
const useApiGetAllUsers = () => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User[]>([]);

  /**
   * Función asincrónica para obtener todos los usuarios desde la API.
   * 
   * @param {string | undefined} query - Consulta opcional para filtrar los usuarios.
   * @returns {void}
   */
  const fetchData = async (query?: string) => {
    setLoading(true);
    try {
      const response = await createApiUserRepository().getAll(query);
      setData(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Error desconocido"));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [loading, data, fetchData, error] as const;
};

export default useApiGetAllUsers;