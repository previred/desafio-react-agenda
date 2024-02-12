import { Button, Col, Divider, Drawer, Form, Input, Row, Space, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';
import type { TableProps } from 'antd';


const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const { Title, Paragraph } = Typography;




interface DataType {
  key: string;
  name: string;
  description: string;
  action: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Descripción',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Acciones',
    dataIndex: 'action',
    key: 'action',
    render: (_, record) => (
      <DeleteOutlined onClick={() => { console.log(record.key) }} />
    ),
  }
]
const data: DataType[] = [
  {
    key: '1',
    name: 'Wally West',
    description: 'Fastest man alive',
    action: 'Delete'
  },
  {
    key: '2',
    name: 'Bruce Wayne',
    description: 'Dark Night',
    action: 'Delete'
  },
  {
    key: '3',
    name: 'Clark Kent',
    description: 'Man of Tomorrow',
    action: 'Delete'
  },
  {
    key: '4',
    name: 'Diana Price',
    description: 'Princess of Themyscira',
    action: 'Delete'
  }
]

const Main: React.FC = () => {

  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer: () => void = () => {
    setOpenDrawer(true);
  }

  const onClose: () => void = () => {
    setOpenDrawer(false)
  }

  const getContacts = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const jsonContactsData = await response.json();
      console.log(jsonContactsData);

    } catch (error) {
      console.error("Error getting contacts: ", error);
    }
  }

  useEffect(() => {
    getContacts();
  }, [])


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

      <Table columns={columns} dataSource={data} />

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