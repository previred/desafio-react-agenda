import React, { useState, useEffect, useContext } from 'react';
import { UsersContext } from '../../contexts/UsersContext';
import {
  Table,
  Input,
  Button,
  Space,
  Pagination,
  Spin,
  message,
  Avatar,
} from 'antd';
import { PlusOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/es/table';
import { getUsers, deleteUser } from '../../services/apiService';
import { IUser } from '../../types/userTypes';
import AddUserForm from '../AddUserForm/AddUserForm';
import styles from './UserList.module.css';

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
      message.error(
        `Error al eliminar el usuario: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      );
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
      title: <span className={styles.headerTitle}>Nombre</span>,
      key: 'name',
      render: (_, record: IUser) => (
        <Space>
          <Avatar
            src={record.photo}
            alt={record.name}
            icon={<UserOutlined />}
          />
          <span className={styles.name}>{record.name}</span>
        </Space>
      ),
    },
    {
      title: <span className={styles.headerTitle}>Descripción</span>,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: <span className={styles.headerTitle}>Acciones</span>,
      key: 'actions',
      align: 'center',
      render: (_: unknown, record: IUser) => (
        <DeleteOutlined onClick={() => handleDelete(record.id)} />
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Agenda Previred - Mi agenda de contactos laboral
        </h1>
        <p className={styles.description}>
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
          className={styles.search}
        />
      </div>

      {error && <p>Error: {error}</p>}

      <div className={styles.spinContainer}>
        {loading ? (
          <Spin
            size="large"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
              className={styles.pagination}
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
