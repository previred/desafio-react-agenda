import { Drawer, Button } from "antd";
import { useSidebar } from "../../hooks/useSidebar";
import { Space } from "antd";
import { Flex } from "antd";
import { Input } from "antd";
import { Typography } from "antd";

const Sidebar = () => {
  const { visible, hideSidebar } = useSidebar();

  return (
    <>
      <Drawer
        title="Agregar nuevo Contacto"
        placement="right"
        closable={true}
        onClose={hideSidebar}
        visible={visible}
        width={500}
        extra={
          <Space>
            <Button onClick={hideSidebar}>Cancel</Button>
            <Button type="primary">Guardar</Button>
          </Space>
        }
      >
        <Flex vertical={"vertical"}>
          <Typography.Title level={5}>URL imagen de perfil</Typography.Title>
          <Input placeholder="Inserte la URL de la imagen de perfil" />

          <Typography.Title level={5}>Nombre</Typography.Title>
          <Input placeholder="Escriba el nombre del contacto" />

          <Typography.Title level={5}>descripción</Typography.Title>
          <Input placeholder="Agregue la descripción del contacto" />
        </Flex>
      </Drawer>
    </>
  );
};

export default Sidebar;
