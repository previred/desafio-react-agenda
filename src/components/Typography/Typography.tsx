import { Typography as TypographyAnt } from "antd";
import { FunctionComponent } from "react";
import { TypographyProps } from "./Typography.type";
const { Text, Title } = TypographyAnt;

export const Typography: FunctionComponent<TypographyProps> = ({
  label,
  level,
  type,
  strong,
  textType,
  className,
}) => {
  if (type == "title")
    return (
      <Title level={level} className={className}>
        {label}
      </Title>
    );
  if (type == "text")
    return (
      <Text strong={strong} type={textType} className={className}>
        {label}
      </Text>
    );
};
