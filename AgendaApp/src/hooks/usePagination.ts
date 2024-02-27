// Importaciones de dependencias.
import { useState } from "react";

/**
 * Define una Interface para los parámetros iniciales del hook usePagination.
 * Esto permite una configuración inicial flexible para el paginado de datos.
 *
 * @param initialPage Número de la página inicial. Opcional, con valor predeterminado de 1.
 * @param initialLimit Número de elementos por página. Opcional, con valor predeterminado de 10.
 */
interface UsePaginationProps {
  initialPage?: number;
  initialLimit?: number;
}

// Define el hook usePagination, acepta un objeto de configuración inicial conforme a UsePaginationProps.
// Los valores predeterminados para este objeto son { initialPage: 1, initialLimit: 10 }.

/**
 * Hook para gestionar la paginación de listados o tablas.
 *
 * Este hook facilita la creación de una interfaz de usuario paginada, permitiendo especificar
 * una página inicial y un límite de elementos por página. Además, incluye una funcionalidad
 * para la búsqueda, permitiendo filtrar los resultados según el término de búsqueda especificado.
 *
 * @param {UsePaginationProps} config Objeto de configuración que puede incluir `initialPage` y `initialLimit`.
 * @return {Object} Objeto que contiene los estados `page`, `limit`, `search` y funciones para modificar estos estados.
 *
 * - `page`: El número de la página actual.
 * - `setPage`: Función para establecer el número de la página.
 * - `limit`: Número de elementos por página.
 * - `setLimit`: Función para establecer el número de elementos por página.
 * - `search`: Término de búsqueda actual.
 * - `setSearch`: Función para establecer el término de búsqueda.
 *
 */
export const usePagination = ({
  initialPage = 1,
  initialLimit = 10,
}: UsePaginationProps = {}) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [search, setSearch] = useState("");

  // Retorna los estados y funciones para su uso en componentes.
  return { page, setPage, limit, setLimit, search, setSearch };
};
