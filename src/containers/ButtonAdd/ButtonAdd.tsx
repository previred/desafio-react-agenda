import { PlusOutlined } from "@ant-design/icons";

import { Button } from "../../components/Button";

import "./ButtonAdd.scss";

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
      size="large"
      className="button-add"
    />
  );
};
