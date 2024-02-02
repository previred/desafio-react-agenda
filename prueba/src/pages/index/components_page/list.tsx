import React from 'react'
import { Avatar, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';

interface DataType {
  id: string;
  name: string;
  description: string;
  photo: string;
}
const List = ({dataSource, handlerDelete}:any) => {
  
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Nombre',
      key: 'name',
      dataIndex: 'name',
      render: (name, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Space size={16} wrap>
           {record.photo ?<Avatar src={record.photo} /> : <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />} 
          </Space>    
          <span style={{ marginLeft: '10px' }}>{name}</span>      
        </div>
      ),
    },
    {
      title: 'Descripción',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <DeleteOutlined  onClick={() => handlerDelete(record.id)} style={{ color: "red", cursor: "pointer", fontSize: '20px'}}/>
        </Space>
      ),
    },
  ];
  

  return (
    <Table columns={columns} dataSource={dataSource} />
  )
}

export default List;