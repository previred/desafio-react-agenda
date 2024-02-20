import { PlusOutlined } from "@ant-design/icons";

import { Button } from "../../components/Button";

import "./ButtonAdd.scss";
import { useContext } from "react";
import { UserContext } from "../../Context/context";

export const ButtonAdd = () => {
  const { changeIsOpenDraw } = useContext(UserContext);

  const openDrawer = () => {
    changeIsOpenDraw(true);
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
