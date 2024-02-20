import { Input as InputAnt, InputProps } from "antd";
import { FunctionComponent } from "react";

export const Input: FunctionComponent<InputProps> = ({ ...props }) => {
  return <InputAnt {...props} />;
};
