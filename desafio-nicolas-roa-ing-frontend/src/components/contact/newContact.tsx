import React from 'react';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import "./newContact.css";
import { useDrawer } from '../../context/DrawerContext';
import { useApiUsers } from '../../context/UserContext';
import { useForm } from 'antd/es/form/Form';

/*
  Llegamos al segundo componente el cual esta utilizando 2 contextos
  useDrawer -> utilizamos para abrir y cerrar el drawer
              En el boton close usamos el hideDrawer el cual hace una actualización al estado 
              isOpen, tál actualización es False

              le indicamos al componente Drawer el actual estado isOpen

  useApiUsers -> utilizamos para guardar al nuevo usuario y así mediante el context 
                poder enviar el post con el nuevo usuario.

  para poder obtener los datos se realiza la importación de useForm, así podemos enviar el formulario.
  desde un boton fuera de tál y obtener los campos escritos por el usuario.

  Todos los campos son requeridos para poder validar que estos no esten nulos o vacios.

  El boton cancelar cierra el Drawer

*/


const NewContact: React.FC = () => {
  const { hideDrawer, isOpen } = useDrawer();
  const [form] = useForm();  
  const { saveUser } = useApiUsers();

  const onFinish = (values: any) => {
    saveUser(values);
    hideDrawer();
  };

  return (
    <>
      <Drawer
        title="Agregar Nuevo Contacto"
        width={500}
        onClose={hideDrawer}
        open={isOpen}
        className='drawer'
        extra={
          <Space>
            <Button onClick={hideDrawer}>Cancelar</Button>            
            <Button type="primary" onClick={() => form.submit()}>
              Guardar
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="photo"
                        label="URL Imagen de Perfil"
                        className='photo'
                        rules={[{ required: true, message: 'Inserte la URL Imagen de Perfil' }]}
                    >
                        <Input placeholder="Inserte la URL Imagen de Perfil" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name="name"
                        label="Nombre"
                        className='name'
                        rules={[{ required: true, message: 'Inserte la URL Imagen de Perfil' }]}
                    >
                        <Input placeholder="Escriba el nombre del contacto" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name="description"
                        label="Descripción"
                        className='description'
                        rules={[{ required: true, message: 'Agrege la descripción del contacto' }]}
                    >
                        <Input placeholder="Agrege la descripción del contacto" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default NewContact;