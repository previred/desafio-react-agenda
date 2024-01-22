import React, { useContext } from 'react';
import { Button, Drawer, Form, Input, Space } from 'antd';
import { ContactContext } from '../context/ContactContext.tsx';

const ScheduleDrawer: React.FC = () => {
  const [form] = Form.useForm();
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error('Context Error');
  }

  const { getAllContacts, getContactsPerPage, createContact, drawerVisible, closeDrawer, setCurrentPageFunction } = context

  const onFinish = async (values: any) => {
    await createContact(values);
    form.resetFields();
    closeDrawer();

    await getAllContacts();
    await getContactsPerPage(1);
    setCurrentPageFunction(1);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const closeForm = () => {
    form.resetFields();
    closeDrawer();
  }
   
  type FieldType = {
    name?: string;
    description?: string;
    photo?: string;
  };

  return (
    <Drawer
      title="Agregar nuevo contacto"
      placement="right"
      onClose={closeForm}
      open={drawerVisible}
    >
      <Form
        form={form}
        name="contact"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Escriba el nombre del contacto' }]}
        >
          <Input placeholder="Escriba el nombre del contacto" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Descripción"
          name="description"
          rules={[{ required: true, message: 'Agregue la descripción del contacto' }]}
        >
          <Input placeholder="Agregue la descripción del contacto" />
        </Form.Item>

        <Form.Item<FieldType>
          label="URL imagen del perfil"
          name="photo"
          rules={[{ required: true, message: 'Inserte la URL de la imagen del perfil' }]}
        >
          <Input placeholder="Inserte la URL de la imagen del perfil" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Space size={[8, 16]} wrap>
            <Button type="default" onClick={closeForm}>
              Cancelar
            </Button>

            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  )
};

export default ScheduleDrawer;
