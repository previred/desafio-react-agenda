import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

type ModalProps = {
  userPhoto: string;
};
export const AvatarUser = ({ userPhoto }: ModalProps) => {
  return (
    <Avatar size="large" src={userPhoto}>
      <UserOutlined style={{ fontSize: "24px" }} />
    </Avatar>
  );
};
