import { Input as InputAnt } from "antd";
import { FunctionComponent } from "react";

type InputProps = {
  placeholder: string;
};

export const Input: FunctionComponent<InputProps> = ({ placeholder }) => {
  return <InputAnt placeholder={placeholder} />;
};
