import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const AddUserForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    message.success(`Usuario ${values.name} creado`);
    form.resetFields();
    setLoading(false);
  };

  return (
    <Form form={form} layout="inline" onFinish={onFinish}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Por favor ingresa un nombre' }]}
      >
        <Input placeholder="Nombre" />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[
          { required: true, message: 'Por favor ingresa una descripción' },
        ]}
      >
        <Input placeholder="Descripción" />
      </Form.Item>
      <Form.Item
        name="imageUrl"
        rules={[
          { required: true, message: 'Por favor ingresa una URL de imagen' },
        ]}
      >
        <Input placeholder="URL de imagen" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Agregar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUserForm;
