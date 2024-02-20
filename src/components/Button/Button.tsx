import { Button as ButtonAnt } from "antd";
import { FunctionComponent } from "react";
import { ButtonProps } from "./Button.type";

export const Button: FunctionComponent<ButtonProps> = ({
  icon,
  shape,
  label,
  type,
}) => {
  const handlerClick = () => {
    alert("agregar logica eliminar tabla");
  };
  return (
    <ButtonAnt shape={shape} type={type} onClick={handlerClick} icon={icon}>
      {label}
    </ButtonAnt>
  );
};
