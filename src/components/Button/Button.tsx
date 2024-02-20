import { Button as ButtonAnt } from "antd";
import { FunctionComponent } from "react";
import { ButtonProps } from "./Button.type";

export const Button: FunctionComponent<ButtonProps> = ({ label, ...props }) => {
  const handlerClick = () => {
    alert("agregar logica eliminar tabla");
  };
  return (
    <ButtonAnt onClick={handlerClick} {...props}>
      {label}
    </ButtonAnt>
  );
};
