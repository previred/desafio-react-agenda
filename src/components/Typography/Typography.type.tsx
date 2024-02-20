export type TypographyProps = {
  label: string;
  type: "title" | "text";
  level?: 1 | 2 | 3 | 4 | 5;
  textType?: "secondary" | "success" | "warning" | "danger";
  strong?: boolean;
  className?: string;
};
