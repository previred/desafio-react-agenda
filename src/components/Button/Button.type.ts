import { ButtonProps as ButtonAntProp } from "antd/es/button/button";

export type ButtonProps = ButtonAntProp & {
  id?: string;
  label?: string;
};
