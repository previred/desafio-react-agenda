import { Button as ButtonAnt } from "antd";
import { FunctionComponent } from "react";
import { ButtonProps } from "./Button.type";

export const Button: FunctionComponent<ButtonProps> = ({
  label,
  onClick,
  ...props
}) => {
  return (
    <ButtonAnt onClick={onClick} {...props}>
      {label}
    </ButtonAnt>
  );
};
