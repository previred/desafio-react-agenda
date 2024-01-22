import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Pagination } from 'antd';
import { ColumnType } from 'antd/es/table';
import { PlusOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { IUser } from '../types/userTypes';
import { getUsers, deleteUser } from '../services/apiService';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    getUsers(currentPage, pageSize)
      .then((response) => {
        setUsers(response.data); // Almacena los usuarios de la página actual
        setAllUsers(response.data); // Almacena todos los usuarios
        setTotalUsers(response.total);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, pageSize]);

  const columns: ColumnType<IUser>[] = [
    {
      title: 'Nombre',
      key: 'name',
      render: (_, record: IUser) => (
        <Space>
          {record.photo && record.photo.endsWith('404.png') ? (
            <UserOutlined style={{ fontSize: '30px' }} />
          ) : (
            <img
              src={record.photo}
              alt={record.name}
              style={{ width: 30, height: 30, borderRadius: '50%' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'; // Oculta la imagen en caso de error

                // Verifica si el error es 404 (Not Found)
                if (e.currentTarget.naturalWidth === 0) {
                  // Muestra el ícono UserOutlined como marcador de posición
                  if (e.currentTarget.parentNode) {
                    (
                      e.currentTarget.parentNode as HTMLElement
                    ).insertAdjacentHTML(
                      'beforeend',
                      '<span><UserOutlined style={{ fontSize: "30px" }} /></span>',
                    );
                  }
                }
              }}
            />
          )}
          {record.name}
        </Space>
      ),
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: unknown, record: IUser) => (
        <DeleteOutlined onClick={() => handleDelete(record.id)} />
      ),
    },
  ];

  // Funciones handleDelete, handleSearch y handlePageChange
  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);
      // Actualiza la lista de usuarios después de eliminar (realtime)
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la eliminación
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
    setLoading(true);
    getUsers(1, pageSize, value) // Restablece a la primera página y pasa el término de búsqueda
      .then(response => {
        setUsers(response.data); // Actualiza con los usuarios filtrados
        setTotalUsers(response.total); // Actualiza el total de usuarios
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Agenda Previred - Mi agenda de contactos laboral</h1>
      <p>
        Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar
        nuevos contactos y eliminar contactos no deseados.
      </p>
      <div
        style={{
          marginBottom: 16,
          display: 'flex',
          flexDirection: 'column',
          padding: '0 20px',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ width: '100%' }}>
          <div style={{ marginBottom: 16, width: '20%' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ width: '100%' }}
            >
              Agregar Contacto
            </Button>
          </div>
          <div style={{ width: '100%' }}>
            <Input.Search
              placeholder="Buscar contacto"
              onSearch={handleSearch}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={false}
      />

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalUsers}
        onChange={handlePageChange}
        onShowSizeChange={handlePageChange}
      />
    </div>
  );
};

export default UserList;
