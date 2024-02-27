// Importaciones de dependencias.
import { FC, ReactElement } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

/**
 * Interface para definir las propiedades esperadas por el componente AddContactButton.
 * @property {Function} onClick - Función a ejecutar cuando el botón es presionado.
 */
interface AddContactButtonProps {
  onClick: () => void;
}

/**
 * Componente AddContactButton que renderiza un botón para agregar un nuevo contacto.
 *
 * Este componente es reutilizable y se puede integrar en cualquier parte de la aplicación
 * donde se necesite un botón que, al ser presionado, ejecute una acción específica definida
 * externamente a través de la propiedad onClick.
 *
 * Props:
 * - onClick: Manejador de evento para cuando se hace clic en el botón. Permite definir
 *   una función específica que se llamará al presionar el botón.
 *
 * @param {AddContactButtonProps} props - Propiedades pasadas al componente.
 * @return {ReactElement} - Un elemento React que representa el botón para agregar contacto.
 */
const AddContactButton: FC<AddContactButtonProps> = ({
  onClick,
}): ReactElement => (
  <div style={{ marginTop: 10 }}>
    <Button type="primary" icon={<PlusOutlined />} onClick={onClick}>
      Agregar Contacto
    </Button>
  </div>
);

export default AddContactButton;
