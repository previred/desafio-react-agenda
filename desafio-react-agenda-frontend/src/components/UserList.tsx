import React, { useState, useEffect, useContext } from 'react';
import { UsersContext } from '../contexts/UsersContext';
import { Table, Input, Button, Space, Pagination, Spin, message } from 'antd';
import { ColumnType } from 'antd/es/table';
import { PlusOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { IUser } from '../types/userTypes';
import { getUsers, deleteUser } from '../services/apiService';
import AddUserForm from './AddUserForm';

const UserList: React.FC = () => {
  // Acceder al contexto
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers debe estar dentro del proveedor UsersProvider');
  }
  const {
    users,
    loading,
    error,
    totalUsers,
    currentPage,
    pageSize,
    fetchUsers,
    setCurrentPage,
    setPageSize,
    setSearchText,
    setLoading,
    setUsers,
    setTotalUsers,
    setAllUsers,
    setError,
  } = context;

  // Estado para el Drawer
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  // Funciones Drawer: showDrawer, closeDrawer, handleUserCreated y reloadUsers
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  // Actualizar la lista de usuarios después de agregar uno nuevo
  const handleUserCreated = () => {
    closeDrawer();
    reloadUsers();
  };

  // Recargar los usuarios (realtime)
  const reloadUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers(currentPage, pageSize);
      setUsers(response.data);
      setTotalUsers(response.total);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocurrió un error al cargar los usuarios');
      }
    } finally {
      setLoading(false);
    }
  };

  // Cargar los usuarios al montar el componente
  useEffect(() => {
    setLoading(true);
    getUsers(currentPage, pageSize)
      .then((response) => {
        setUsers(response.data); // Almacena los usuarios de la página actual
        setAllUsers(response.data); // Almacena todos los usuarios
        setTotalUsers(response.total);
      })
      .catch((error) => {
        if (error instanceof Error) {
          // Maneja errores específicos de la API o errores de red
          setError(`Error al cargar los usuarios: ${error.message}`);
        } else {
          // Maneja otros tipos de errores
          setError('Ocurrió un error inesperado al cargar los usuarios');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, pageSize]);

  // Funciones handleDelete, handleSearch y handlePageChange
  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);
      message.success('Usuario eliminado exitosamente');
      fetchUsers(); // Recarga la lista de usuarios
    } catch (error) {
      message.error(`Error al eliminar el usuario: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  // Función para buscar usuarios
  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
    setLoading(true);
    getUsers(1, pageSize, value) // Restablece a la primera página y pasa el término de búsqueda
      .then((response) => {
        setUsers(response.data); // Actualiza con los usuarios filtrados
        setTotalUsers(response.total); // Actualiza el total de usuarios
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Función para cambiar de página
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Columnas de la tabla
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

  return (
    <div style={{ padding: 40 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <h1>Agenda Previred - Mi agenda de contactos laboral</h1>
        <p>
          Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar
          nuevos contactos y eliminar contactos no deseados.
        </p>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>
            Agregar Contacto
          </Button>
        </div>
        <Input.Search
          placeholder="Buscar contacto"
          onSearch={handleSearch}
          style={{ width: '100%', marginBottom: 16 }}
        />
      </div>

      {error && <p>Error: {error}</p>}

      <div style={{ position: 'relative' }}>
        {loading ? (
          <Spin
            size="large"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 200,
            }}
          />
        ) : (
          <>
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
              style={{ paddingTop: '20px', justifyContent: 'flex-end' }}
            />
          </>
        )}
      </div>

      <AddUserForm
        visible={isDrawerVisible}
        onClose={closeDrawer}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
};

export default UserList;
