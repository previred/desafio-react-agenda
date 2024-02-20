import { FunctionComponent } from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { ButtonProps } from "../../components/Button/Button.type";

export const ButtonDelete: FunctionComponent<ButtonProps> = ({ id }) => {
  const handlerClick = () => {
    alert("agregar logica eliminar tabla" + id);
  };
  return (
    <Button shape="circle" onClick={handlerClick} icon={<DeleteOutlined />} />
  );
};
