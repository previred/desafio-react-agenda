import { Typography as TypographyAnt } from "antd";
import { FunctionComponent } from "react";
import { TypographyProps } from "./Typography.type";
const { Text, Title } = TypographyAnt;

const Typography: FunctionComponent<TypographyProps> = ({
  label,
  level,
  type,
  strong,
  textType,
}) => {
  if (type == "title") return <Title level={level}>{label}</Title>;
  if (type == "text")
    return (
      <Text strong={strong} type={textType}>
        {label}
      </Text>
    );
};

export default Typography;
