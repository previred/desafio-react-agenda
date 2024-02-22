import React, { useEffect, useState } from 'react';
import { Table, Space, Avatar, Button, message, Input, Divider } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { useApi } from '../../utils/apiContext'; 
import { BASE_URL } from '../../utils/api'; 

/**
 * Interfaz para el tipo de datos de cada fila de la tabla.
 */
interface DataType {
  id: string;
  name: string;
  description: string;
  photo: string;
}

/**
 * Propiedades esperadas por el componente TableComponent.
 */
interface Props {
  reloadData: () => void; // Función para recargar los datos
  reloadFlag: boolean; // Bandera para recargar los datos
}

/**
 * Componente funcional que representa la tabla de contactos.
 */
const TableComponent: React.FC<Props> = ({ reloadData }) => {
  // Obtiene el contexto de la API
  const { userData } = useApi();
  const { refetchData } = useApi();
  
  // Estado para almacenar los datos de la tabla
  const [data, setData] = useState<DataType[]>([]);
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState<string>('');

  /**
   * Función para recargar los datos de la tabla.
   */
  const handleReloadData = () => {
    refetchData();
  };

  // Verifica que userData esté definido antes de usarlo
  useEffect(() => {
    if (userData) {
      // Mapea userData a la estructura DataType
      const mappedData: DataType[] = userData.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        photo: item.photo
      }));
      setData(mappedData);
    }
  }, [userData]);

  /**
   * Función para eliminar un contacto.
   * @param id ID del contacto a eliminar
   */
  const deleteContact = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
  
      // Muestra un mensaje de éxito
      message.success('¡Contacto eliminado exitosamente!');
      // Recarga los datos
      handleReloadData();
      // Llama a la función reloadData para recargar los datos después de eliminar
      reloadData();
    } catch (error) {
      console.error('Error deleting contact:', error);
      // Muestra un mensaje de error si hay algún problema al eliminar el contacto
      message.error('Failed to delete contact!');
    }
  };

  /**
   * Definición de columnas para la tabla.
   */
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          {/* Avatar del contacto */}
          <Avatar size="large" src={record.photo} icon={<UserOutlined />} />
          <a>{text}</a>
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
      key: 'action',
      render: (text, record) => (
        // Botón para eliminar un contacto
        <Button type="text" icon={<DeleteOutlined />} onClick={() => deleteContact(record.id)} />
      ),
    },
  ];

  // Ordena los datos en base al campo id de mayor a menor
  const sortedData = data.slice().sort((a, b) => parseInt(b.id) - parseInt(a.id));

  // Filtra los datos basados en el término de búsqueda
  const filteredData = sortedData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Barra de búsqueda */}
      <Input.Search
        placeholder="Buscar por nombre"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      {/* Divisor */}
      <Divider />
      {/* Tabla de contactos */}
      <Table columns={columns} dataSource={filteredData} rowKey="id" />
    </div>
  );
};

export default TableComponent;
