import { Button, Col, Divider, Drawer, Form, Input, Row, Space, Table, Typography, Avatar, Flex } from 'antd';
import { useEffect, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';
import type { TableProps } from 'antd';
import { useForm } from 'antd/es/form/Form';


const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const { Title, Paragraph } = Typography;

interface DataType {
  key: string;
  id: string;
  name: string;
  description: string;
  photo: string;
}
/*
const dataContacts: DataType[] = [
  {
    key: '1',
    name: 'Wally West',
    description: 'Fastest man alive'
  },
  {
    key: '2',
    name: 'Bruce Wayne',
    description: 'Dark Night'
  },
  {
    key: '3',
    name: 'Clark Kent',
    description: 'Man of Tomorrow'
  },
  {
    key: '4',
    name: 'Diana Price',
    description: 'Princess of Themyscira'
  }
]
*/
const Main: React.FC = () => {

  const { contacts, getContacts, addContact, removeContact } = useApi();
  const [form] = useForm();

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    console.log("Usuarios:", contacts);
  }, [contacts]);


  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer: () => void = () => {
    setOpenDrawer(true);
  }

  const onClose: () => void = () => {
    setOpenDrawer(false)
  }

  const onFinish = async (values: any) => {
    try {
      await addContact(values);
      onClose();
      form.resetFields();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  }

  const handleRemoveContact = async (contactId: string) => {
    try {
      await removeContact(contactId);
    } catch (error) {
      console.error('Error removing contact:', error)
    }
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'id',
      width: '12rem',
      render: (_, record) => (
        <Flex gap="large" align='center'>
          {record.photo ? (
            <Avatar src={record.photo} />
          ) : (
            <Avatar>{record.name}</Avatar>
          )}
          <Typography>{record.name}</Typography>
        </Flex>
      )
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
    },
    {
      title: 'Acciones',
      dataIndex: 'action',
      width: '10rem',
      align: 'center',
      render: (_, record) => (
        <DeleteOutlined onClick={() => {
          handleRemoveContact(record.id)
        }} />
      ),
    }
  ]

  return (

    <div className='container'>
      <Typography>
        <Title>Agenda Previred - Mi agenda de contactos laboral</Title>
        <Paragraph>
          Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar nuevos contactos y eliminar contactos no deseados.
        </Paragraph>
      </Typography>

      <Space direction='vertical'>
        <Button
          type='primary'
          onClick={showDrawer}
          icon={<PlusOutlined />}
        >
          Agregar Contacto
        </Button>

        <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
      </Space>
      <Divider />

      <Table rowKey="id" columns={columns} dataSource={contacts} />

      <Drawer
        title='Agregar nuevo Contacto'
        onClose={onClose}
        open={openDrawer}
        width={'42%'} /* 65rem */
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button type='primary' htmlType='submit' onClick={() => form.submit()}>Guardar</Button>
          </Space>
        }
      >
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="photo"
                label="URL imagen de Perfil"
                rules={[{ required: true, message: 'Por favor, ingrese url de la imagen de perfil' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Inserte la URL de la imagen de perfil"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Nombre"
                rules={[{ required: true, message: 'Por favor, escriba el nombre de contacto' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Escriba el nombre de contacto"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Descripción"
                rules={[{ required: true, message: 'Por favor, agregue la descripción del contacto' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Agregue la descripción del contacto"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>



  );
}

export default Main;