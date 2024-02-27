// Importaciones.
import React, { FC } from "react";
import { Drawer } from "antd";

/**
 * Propiedades para el componente CustomDrawer.
 *
 * @param title Título del Drawer.
 * @param isOpen Controla la visibilidad del Drawer; `true` para abrir y `false` para cerrar.
 * @param onClose Función que se llama cuando el Drawer necesita ser cerrado.
 * @param extra Nodo de React, se puede usar para añadir contenido adicional al lado del título.
 * @param children Contenido del Drawer.
 */
interface ICustomDrawerProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  extra: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Componente CustomDrawer que utiliza el componente Drawer para crear un panel lateral.
 *
 * @param props Propiedades de CustomDrawer definidas en ICustomDrawerProps.
 * @return Componente Drawer configurado según las propiedades proporcionadas.
 */
const CustomDrawer: FC<ICustomDrawerProps> = ({
  title,
  isOpen,
  onClose,
  extra,
  children,
}) => {
  return (
    <Drawer
      title={title} // Título del Drawer.
      width={500} // Ancho fijo del Drawer.
      onClose={onClose} // Manejador para cerrar el Drawer.
      open={isOpen} // Controla la visibilidad del Drawer.
      extra={extra} // Elementos adicionales al lado del título.
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
