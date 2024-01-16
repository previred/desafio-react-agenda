import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Space, Spin, Table } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useApiUsers } from '../../context/UserContext';
import { DataType } from '../../@types/dataTable';
import './tableData.css';

/*
    Aqui tenemos nuestro componente que es la Tabla

    este componente utiliza el contexto de User, para lograr obtener:
    El estado de carga o error
    La lista actualizada de usuarios.
    La función de eliminación ya que esta será llamada en el boton de acción eliminar

    Primero se realiza la configuración de las columnas (Tabla utilizada de la libreria Ant Desing)
    En el nombre realizo un render customizado para poner la foto del usuario y su nombre.
    
    Los campos contienen la key misma que los del API, así al momento de hacer el Match es más rapido

    Utilice el UseEffect el cual se ejecuta cada vez que existe un cambio en el listado de los usuarios
    Estos cambios pueden ser Nuevos Usuarios, Busquedas o Eliminación de usuarios

    Este listado actualizado y transformado al tipo DataType (exigencia de Table), se almacena en un estado local
    llamado dataSource el cual luego se pasa al componente <Table>, esto ultimo es para evitar redundancia de llamadas.

    Se utilizo al igual que el header Row y Col para que respete el orden de la estructura del componente.

    Tambien tenemos la utilización de icono directo de ant desing y la hoja de estilo propia del componente.

    Se agrego un Spider para indicar que esta cargando, de igual forma como estamos en local con Db local, esta carga es instantanea

    De igual forma para probar el spiner 
    (
      En google chrome, si inpeccionamos ponemos 
      dimensions: responsive y en No throttling lo cambiamos por 
      low-end mobile o mid-tier mobile (recomendado)
      Lograremos ver el spiner funcionar
      NO OLVIDAR VOLVER AL No throttling
    )
*/
  
const TableData: React.FC = () => {
    const { users, isLoading, error, deleteUser } = useApiUsers();
    const [dataSource, setDataSource] = useState<DataType[]>([]); 

    const columns: TableProps<DataType>['columns'] = [
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        render: (record) => {
          return (
            <Space>
              <img
                  src={record.photo}
                  alt={record.name}
                  className='profileUser'
              />
              <Button type="link">{record.name}</Button>
            </Space>
          );
        },
      },
      {
        title: 'Descripción',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Acciones',
        key: 'action',
        render: (_, record) => (
          <div className='contentIconDelete'>
            <Button type='text' onClick={() => record?.key && deleteUser(record.key)}>
              <DeleteOutlined className='iconDelete'/>
            </Button>
          </div>
        ),
      },
  ];

  useEffect(() => {
    const data: DataType[] = users.map(item => ({
      key: item.id,
      name: {name: item.name, photo:item.photo},
      description: item.description,
    }));

    setDataSource(data)
  }, [users])


    if (isLoading) {
        return <Spin />;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
    <Row>
        <Col span={24}>
            <Table columns={columns} dataSource={dataSource} />    
        </Col>
    </Row>
    )
};

export default TableData;