import React, { useState } from "react";
import { Alert, Col, Drawer as DrawerAnt, Form, Row, Space } from "antd";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useUsers } from "../../hook/useUser";
import { User } from "../../api/User/User.type";

import "./Drawer.scss";

export const Drawer = () => {
  const { saveUser, loadUserList, onCloseDrawer, isOpen, isDisabledForm } =
    useUsers();

  const [formData, setFormData] = useState<Partial<User>>();

  const onSaveUser = () => {
    saveUser(formData as User)
      .then((res) => {
        if (res.id) {
          alert("Usuario Agregado!");
        }
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        loadUserList();
        onCloseDrawer();
      });
  };

  return (
    <DrawerAnt
      title="Agregar un nuevo contacto"
      onClose={onCloseDrawer}
      open={isOpen}
      extra={
        <Space>
          <Button onClick={onCloseDrawer} label="Cancelar" />
          <Button
            onClick={onSaveUser}
            label="Guardar"
            type="primary"
            disabled={isDisabledForm(formData as User)}
          />
        </Space>
      }>
      <Form layout="vertical" requiredMark>
        {isDisabledForm(formData as User) && (
          <Alert
            message=" Por favor complete los campos requeridos para habilitar boton
          guardar"
            type="warning"
            className="drawer__alert"
          />
        )}
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
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, photo: event.currentTarget.value })
                }
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
              <Input
                placeholder="Porfavor ingrese su nombre"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, name: event.currentTarget.value })
                }
              />
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
              <Input
                placeholder="Porfavor ingrese una descripción"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({
                    ...formData,
                    description: event.currentTarget.value,
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DrawerAnt>
  );
};
