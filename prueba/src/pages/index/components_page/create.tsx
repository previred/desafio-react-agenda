import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';

const { Option } = Select;

const Create = ({onCreate, onClose, open}: any) => {

  const [formValues, setFormValues] = useState({});
  
  const onSubmit = (data: any) => {
    onCreate(data);
  }


  const handleFormChange = (changedValues: any, allValues: any) => {
    setFormValues(allValues);
  };

  
  return (
    <>
    
      <Drawer
        title="Agregar nuevo contacto"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={() => onSubmit(formValues)} type="primary">
              Guardar
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark onValuesChange={handleFormChange}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="photo"
                label="URL imagen de perfil"
                rules={[{ required: true, message: 'Debe ingresar una URL válida' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Ingrese una URL"
                  size='large'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={24}>
              <Form.Item
                name="name"
                label="Nombre"
                rules={[{ required: true, message: 'Debe ingresar un nombre' }]}
              >
                <Input placeholder="Ingrese un nombre" size='large'/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Descripción"
                rules={[
                  {
                    required: true,
                    message: 'Ingrese una descripción',
                  },
                ]}
              >
                <Input.TextArea size='large' rows={4} placeholder="Ingrese una descripción" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default Create;