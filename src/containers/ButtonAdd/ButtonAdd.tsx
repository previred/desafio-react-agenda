import { PlusOutlined } from "@ant-design/icons";
import { Button } from "../../components/Button";

export const ButtonAdd = () => {
  const openDrawer = () => {
    alert("prueba boton agregar");
  };
  return (
    <Button
      label="Agregar Contacto"
      type="primary"
      onClick={openDrawer}
      icon={<PlusOutlined />}
    />
  );
};
