import { FunctionComponent } from "react";
import { Avatar as AvatarAnt } from "antd";

import { Typography } from "../../components/Typography";
import { AvatarProps } from "./Avatar.type";

import "./Avatar.scss";

export const Avatar: FunctionComponent<AvatarProps> = ({ name, urlPhoto }) => {
  return (
    <div className="avatar">
      <AvatarAnt size={64} src={urlPhoto} />
      <Typography label={name} type="text" className="avatar__text" />
    </div>
  );
};
