import { Button, Col, Divider, Drawer, Form, Input, Row, Space, Table, Typography, Avatar } from 'antd';
import { useEffect, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';
import type { TableProps } from 'antd';
import { text } from 'stream/consumers';


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

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'id',
    render: (text, record) => (
      <>
        {record.photo ? (
          <Avatar src={record.photo} />
        ) : (
          <Avatar>{text}</Avatar>
        )}
      </>
    )
  },
  {
    title: 'Descripción',
    dataIndex: 'description',
  },
  {
    title: 'Acciones',
    dataIndex: 'action',
    render: (_, record) => (
      <DeleteOutlined onClick={() => { console.log(record.id) }} />
    ),
  }
]
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

  const { users, getUsers } = useApi();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log("Usuarios:", users);
  }, [users]);

  
  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer: () => void = () => {
    setOpenDrawer(true);
  }

  const onClose: () => void = () => {
    setOpenDrawer(false)
  }


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

      <Table rowKey="id" columns={columns} dataSource={users} />

      <Drawer
        title='Agregar nuevo Contacto'
        onClose={onClose}
        open={openDrawer}
        width={'42%'} /* 65rem */
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button type='primary' onClick={onClose}>Guardar</Button>
          </Space>
        }
      >
        <Form layout='vertical'>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="url"
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