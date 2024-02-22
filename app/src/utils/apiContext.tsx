/**
 * Archivo que define el contexto de la API.
 * Proporciona un contexto para compartir y manejar datos de la API en la aplicación.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchData } from './api';

/**
 * Interfaz que describe la estructura de los datos de usuario obtenidos de la API.
 */
interface UserData {
  key: string;
  name: string;
  description: string;
  photo: string;
}

/**
 * Interfaz que describe la estructura del contexto de la API.
 */
interface ApiContextType {
  userData: UserData[] | null; // Datos de usuario obtenidos de la API
  setUserData: React.Dispatch<React.SetStateAction<UserData[] | null>>; // Función para actualizar los datos de usuario
  refetchData: () => void; // Función para volver a cargar los datos de usuario
}


/**
 * Contexto de la API que proporciona datos y funciones relacionadas con la API a los componentes secundarios.
 */
const ApiContext = createContext<ApiContextType>({
  userData: null,
  setUserData: () => null,
  refetchData: () => null // Por defecto, una función vacía
});

/**
 * Proveedor de contexto de la API que envuelve la aplicación y proporciona el contexto de la API a los componentes secundarios.
 * Obtiene los datos de usuario de la API al montar el componente y proporciona una función para volver a cargar los datos.
 * @param children Componentes secundarios envueltos por el proveedor de contexto de la API.
 */
export const ApiProvider: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  const [userData, setUserData] = useState<UserData[] | null>(null);

  // Función para obtener los datos de usuario de la API
  const fetchUserData = async () => {
    try {
      const data = await fetchData();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Efecto para obtener los datos de usuario al montar el componente
  useEffect(() => {
    fetchUserData();
  }, []);

  // Función para volver a cargar los datos de usuario
  const refetchData = () => {
    fetchUserData();
  };

  // Proporciona el contexto de la API a los componentes secundarios
  return (
    <ApiContext.Provider value={{ userData, setUserData, refetchData }}>
      {children}
    </ApiContext.Provider>
  );
};

/**
 * Hook personalizado que proporciona acceso al contexto de la API.
 * @returns El contexto de la API.
 */
export const useApi = () => {
  return useContext(ApiContext);
};
