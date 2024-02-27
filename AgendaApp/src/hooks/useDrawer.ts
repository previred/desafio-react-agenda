// Importaciones de dependencias.
import { useContext } from "react";
import { DrawerContext } from "../contexts/DrawerContext";

/**
 * Hook para acceder al contexto del Drawer.
 *
 * Este hook simplifica el acceso al contexto del Drawer, permitiendo a los componentes consumir
 * el estado del drawer y las funciones dispatch asociadas de manera directa.
 *
 * @return El contexto del Drawer que incluye el estado y la función dispatch.
 * @throw Error si se intenta usar fuera de un componente envuelto en un DrawerProvider.
 */
export const useDrawer = () => {
  // Utiliza el hook useContext para acceder al contexto del Drawer.
  const context = useContext(DrawerContext);

  // Verifica si el contexto es undefined, lo cual indicaría que el hook se está usando fuera de un DrawerProvider.
  if (context === undefined) {
    // Lanza un error para informar del mal uso del hook.
    throw new Error("useDrawer debe usarse dentro de un DrawerProvider");
  }
  return context;
};
