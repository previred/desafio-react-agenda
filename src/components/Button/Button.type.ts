import { ReactNode } from "react";

export type ButtonApi = {
  onClick?: () => void;
  shape?: "default" | "circle" | "round";
  icon?: ReactNode;
  type?: "primary" | "dashed" | "link" | "text" | "default";
};

export type ButtonProps = ButtonApi & {
  id?: string;
  label?: string;
};
