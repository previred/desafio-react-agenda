export type ButtonApi = {
  onClick?: () => void;
};

export type ButtonDeleteProps = ButtonApi & {
  id: string;
};
