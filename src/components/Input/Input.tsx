import { Input as InputAnt, InputProps } from "antd";
import { FunctionComponent } from "react";

export const Input: FunctionComponent<InputProps> = ({
  onChange,
  ...props
}) => {
  const handlerOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event);
  };
  return <InputAnt {...props} onChange={handlerOnChange} />;
};
