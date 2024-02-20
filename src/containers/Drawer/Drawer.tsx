import { Col, Drawer as DrawerAnt, Form, Row, Space } from "antd";
import { useContext } from "react";
import { UserContext } from "../../Context/context";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export const Drawer = () => {
  const { stateUsers, changeIsOpenDraw } = useContext(UserContext);
  const { isOpenDrawer } = stateUsers;
  //TODO:dejarlo en customHook :D
  const onCloseDrawe = () => {
    changeIsOpenDraw(false);
  };

  return (
    <DrawerAnt
      title="Agregar un nuevo contacto"
      onClose={onCloseDrawe}
      open={isOpenDrawer}
      extra={
        <Space>
          <Button onClick={onCloseDrawe} label="Cancelar" />
          <Button onClick={onCloseDrawe} label="Guardar" type="primary" />
        </Space>
      }>
      <Form layout="vertical" requiredMark>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              name="img"
              label="Url imagen de perfil"
              rules={[
                {
                  required: true,
                  message: "Porfavor ingrese url de su foto de perfil",
                },
              ]}>
              <Input
                placeholder="Porfavor ingrese la url de su avatar"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Nombre"
              rules={[
                { required: true, message: "Porfavor ingrese su nombre" },
              ]}>
              <Input placeholder="Porfavor ingrese su nombre" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Descripción"
              rules={[
                { required: true, message: "Porfavor ingrese una descripción" },
              ]}>
              <Input placeholder="Porfavor ingrese una descripción" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DrawerAnt>
  );
};
