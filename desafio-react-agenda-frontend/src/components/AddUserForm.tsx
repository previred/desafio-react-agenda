import React, { useState } from 'react';
import { Drawer, Form, Input, Button, message, Space } from 'antd';
import { createUser } from '../services/apiService';
import { IUser } from '../types/userTypes';

interface AddUserFormProps {
  visible: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({
  visible,
  onClose,
  onUserCreated,
}) => {
  const [form] = Form.useForm();

  const onSubmit = async (values: IUser) => {
    try {
      await createUser(values);
      message.success('Usuario agregado exitosamente');
      form.resetFields();
      onClose();
      onUserCreated();
    } catch (error) {
      message.error('Hubo un error al agregar el usuario');
      console.error(error);
    }
  };

  return (
    <>
      <Drawer
        title="Agregar Nuevo Contacto"
        width={520}
        open={visible}
        onClose={onClose}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={() => form.submit()} type="primary">
              Guardar
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            name="photo"
            label="URL imagen de Perfil"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese la URL de la imagen de perfil',
              },
            ]}
          >
            <Input placeholder="Ingrese la URL de la imagen de perfil" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Nombre"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese el nombre del contacto',
              },
            ]}
          >
            <Input placeholder="Escriba el nombre de contacto" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descripción"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese la descripción del contacto',
              },
            ]}
          >
            <Input placeholder="Agregue la descripción del contacto" />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default AddUserForm;
