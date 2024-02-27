// Importaciones de React Query y la función API específica.
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/UsersApi";

/**
 * Hook para crear un nuevo usuario utilizando React Query.
 *
 * Este hook encapsula la lógica para realizar una operación de mutación, específicamente
 * para crear un nuevo usuario en el servidor. React Query maneja automáticamente el ciclo de vida
 * de la mutación.
 *
 * @return Un objeto que incluye:
 *         - `mutate`: Una función que puedes llamar para ejecutar la mutación, pasando los datos del usuario como argumento.
 *         - `isLoading`: Un booleano que indica si la mutación está en proceso.
 *         - `error`: Un objeto de error que indica si la mutación falló.
 *         - `data`: Los datos de respuesta de la mutación, en este caso, los detalles del usuario creado.
 *
 * Ejemplo de uso:
 * const { mutate, isLoading, error, data } = useUserMutation();
 *
 * Para crear un usuario:
 * mutate({ name: "nombre_del_usuario", description: "descripción_del_usuario", photo: "url_to_photo" });
 */
export const useUserMutation = () => {
  // Obtiene una instancia de QueryClient de React Query para invalidar consultas posteriormente.
  const queryClient = useQueryClient();

  return useMutation({
    // Se llama a la función 'createUser' para ejecutar la mutación.
    mutationFn: createUser,
    onSuccess: () => {
      // Invalida cualquier consulta con la clave "usersList".
      // Esto obligará a React Query a refrescar los datos de esta consulta
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
    },
  });
};
