import React, { createContext , useState, ReactNode } from 'react';

interface UpdateUserListProps {
  estado: boolean;
  updateEstado: (nuevoEstado: boolean) => void;
}

export const UpdateUserList = createContext<UpdateUserListProps | undefined>(undefined);

/**
 * Proveedor de contexto para la actualización de la lista de usuarios.
 * 
 * @component
 * @param {Object} props - Propiedades del proveedor de contexto.
 * @param {ReactNode} props.children - Componentes secundarios que estarán envueltos por el proveedor.
 * @returns {ReactElement} Proveedor de contexto para la actualización de la lista de usuarios.
 */
export const UpdateUserListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [estado, setEstado] = useState<boolean>(false);

  /**
   * Función para actualizar el estado del contexto.
   * 
   * @param {boolean} nuevoEstado - Nuevo estado a establecer en el contexto.
   * @returns {void}
   */
  const updateEstado = (nuevoEstado: boolean) => {
    setEstado(nuevoEstado);
  };

  const contextValue: UpdateUserListProps = {
    estado,
    updateEstado,
  };

  return <UpdateUserList.Provider value={contextValue}>{children}</UpdateUserList.Provider>;
};