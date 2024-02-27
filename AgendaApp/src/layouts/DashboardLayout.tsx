// Importaciones de dependencias
import { FC, ReactNode, ReactElement } from "react";
import { Layout, Typography } from "antd";

/**
 * Interface para las propiedades aceptadas por DashboardLayout.
 *
 * @property {string} title - Título principal del layout. Se muestra en la parte superior del contenido.
 * @property {string} subtitle - Subtítulo que proporciona información adicional y se muestra debajo del título.
 * @property {ReactNode} children - Elementos hijos que se renderizarán dentro del layout.
 */
interface DashboardLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

/**
 * DashboardLayout es un componente funcional que estructura la página con un título, subtítulo y contenido.
 * Utiliza el diseño de 'Layout' y componentes tipográficos para organizar el contenido de manera estética y funcional.
 *
 * @param {DashboardLayoutProps} props - Propiedades pasadas al componente DashboardLayout.
 * @return {ReactElement} El componente Layout con título, subtítulo y contenido.
 */
const DashboardLayout: FC<DashboardLayoutProps> = ({
  title,
  subtitle,
  children,
}): ReactElement => {
  return (
    <Layout style={{ backgroundColor: "white", textAlign: "left" }}>
      <Typography.Title style={{ margin: 0 }}>{title}</Typography.Title>
      <Typography.Text>{subtitle}</Typography.Text>
      {children}
    </Layout>
  );
};

export default DashboardLayout;
