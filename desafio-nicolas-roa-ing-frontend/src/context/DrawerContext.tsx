import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DrawerContextProps } from '../@types/drawer'

/* 

  Funcionamiento del context Drawer

  En breves palabras "Es aqui donde se maneja el estado del drawer"

  Una vez ya declarada el Type y podemos crear nuestro context el cual
  hederara a nuestro provider el cual tiene toda la logica

  tenemos el estado isOpen el cual comienza en false, además de esto
  contamos con showDrawer -> actualza el estado isOpen a true
  &
  contamos con hideDrawer -> actualza el estado isOpen a false

  de igual forma esto se pudo a ver optimizado en 

  const statusDrawer = () => {
    setIsOpen(!isOpen)
  }

  pero por efecto de la prueba decidí ser lo más especifico.

  luego realizamos nuestra configuración de retorno con el provider 

  y ya esta listo para ser utilizado este context
*/

const DrawerContext = createContext<DrawerContextProps | null>(null);

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const showDrawer = () => {
    setIsOpen(true);
  };

  const hideDrawer = () => {
    setIsOpen(false);
  };

  const contextValue: DrawerContextProps = {
    isOpen,
    showDrawer,
    hideDrawer,
  };

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer debe tener un DrawerProvider');
  }
  return context;
};
