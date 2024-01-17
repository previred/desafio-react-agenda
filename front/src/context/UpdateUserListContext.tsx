import React, { createContext , useState, ReactNode } from 'react';

interface UpdateUserListProps {
  estado: boolean;
  updateEstado: (nuevoEstado: boolean) => void;
}

// Crea el contexto
export const UpdateUserList = createContext<UpdateUserListProps | undefined>(undefined);

// Crea un proveedor para envolver los componentes que necesitan acceder al contexto
export const UpdateUserListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [estado, setEstado] = useState<boolean>(false);

  const updateEstado = (nuevoEstado: boolean) => {
    setEstado(nuevoEstado);
  };

  const contextValue: UpdateUserListProps = {
    estado,
    updateEstado,
  };

  return <UpdateUserList.Provider value={contextValue}>{children}</UpdateUserList.Provider>;
};