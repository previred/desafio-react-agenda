// Importaciones de dependencias
import React, { createContext, useReducer, ReactNode } from "react";

// Importación de tipos y el reducer para el manejo del estado del drawer.
import { DrawerState, DrawerAction } from "../types/DrawerTypes.ts";
import { drawerReducer } from "../reducers/DrawerReducer.ts";

// Definición de la interfaz para el contexto del drawer.
// Incluye el estado actual del drawer y una función dispatch para actualizar el estado.
interface DrawerContextType {
  state: DrawerState;
  dispatch: React.Dispatch<DrawerAction>;
}

// Creación del contexto del drawer con un valor por defecto indefinido.
export const DrawerContext = createContext<DrawerContextType | undefined>(
  undefined
);

// Definición de las propiedades esperadas por el componente DrawerProvider.
interface DrawerProviderProps {
  children: ReactNode;
}

// Componente DrawerProvider que provee el estado y las funciones para manejar el drawer.
// Este componente envuelve partes de la aplicación que necesitan acceso al estado del drawer.
export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(drawerReducer, { isOpen: false });

  return (
    <DrawerContext.Provider value={{ state, dispatch }}>
      {children}
    </DrawerContext.Provider>
  );
};
