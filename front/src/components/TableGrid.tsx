/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Avatar, Table } from 'antd';
import { deleteUsers } from '../ApiFunctions';
import { UserContext } from '../context/UserContext';

const TableGrid = () => {
  const usersContext = useContext(UserContext);
  const handleDeleteUsers = async (id: number) => {
    try {
      await deleteUsers(id);
      // Updates the users list after deleting the user 
      // @ts-expect-error typescript doesn't like the function passed to setUsers
      usersContext.setUsers((updatedUsers: string[]) => updatedUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo: string) => <Avatar size={60} src={photo} alt='Foto de perfil' />,
    },
    {
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <p style={{ color: '#0366fc', fontSize: '14px' }}>{name}</p>
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      // @ts-expect-error item is the user object
      render: (item: any, record: any) => (
        <DeleteOutlined onClick={() => handleDeleteUsers(record.id)} className='deleteButton' />
      ),
    },
  ];
  return (
    <Table rowKey="id" dataSource={usersContext.users} columns={columns} />
  )
}

export default TableGrid;