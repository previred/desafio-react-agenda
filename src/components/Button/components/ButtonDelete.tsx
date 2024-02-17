import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FunctionComponent } from "react";
import { ButtonDeleteProps } from "../Button.type";

export const ButtonDelete: FunctionComponent<ButtonDeleteProps> = ({ id }) => {
  const handlerClick = () => {
    alert("agregar logica eliminar tabla" + id);
  };
  return (
    <Button shape="circle" onClick={handlerClick} icon={<DeleteOutlined />} />
  );
};
