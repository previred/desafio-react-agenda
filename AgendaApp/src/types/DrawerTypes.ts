/**
 * Interface que define el estado del drawer.
 *
 * Proporciona una estructura para el manejo del estado de apertura o cierre
 * del componente drawer dentro de la aplicación.
 */
export interface DrawerState {
  isOpen: boolean; // Indica si el drawer está abierto (`true`) o cerrado (`false`).
}

/**
 * Define los tipos de acciones disponibles para manipular el estado del drawer.
 *
 * Cada acción tiene un `type` que indica la operación a realizar sobre el estado del drawer.
 *
 * Acciones disponibles:
 * - `DRAWER_OPEN`: Acción para abrir el drawer.
 * - `DRAWER_CLOSE`: Acción para cerrar el drawer.
 */
export type DrawerAction = { type: "DRAWER_OPEN" } | { type: "DRAWER_CLOSE" };
