// Importación de los tipos necesarios para el estado y acciones del drawer.
import { DrawerState, DrawerAction } from "../types/DrawerTypes";

/**
 * Función reducer para manejar el estado de un drawer (componente de navegación lateral).
 *
 * Este reducer escucha a acciones específicas para abrir o cerrar el drawer y actualiza
 * el estado del drawer de acuerdo con la acción recibida.
 *
 * @param {DrawerState} state - El estado actual del drawer.
 * @param {DrawerAction} action - La acción despachada que determina cómo se debe actualizar el estado.
 *                                Las acciones esperadas son 'DRAWER_OPEN' para abrir el drawer y
 *                                'DRAWER_CLOSE' para cerrarlo.
 * @returns {DrawerState} El nuevo estado del drawer después de aplicar la acción correspondiente.
 */
export const drawerReducer = (
  state: DrawerState,
  action: DrawerAction
): DrawerState => {
  switch (action.type) {
    case "DRAWER_OPEN":
      // Actualiza el estado para abrir el drawer.
      return { isOpen: true };
    case "DRAWER_CLOSE":
      // Actualiza el estado para cerrar el drawer.
      return { isOpen: false };
    default:
      return state;
  }
};
