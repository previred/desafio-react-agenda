import { DataType } from '@/models/contact'
import { DeleteOutlined } from '@ant-design/icons'
import { Avatar, Button, Popconfirm } from 'antd'
import { ColumnsType } from 'antd/es/table'

interface ColumnActionsProps {
  handleDelete: (id: number) => void
  isLoadingDelete: boolean
  idToDelete: number | null
  openPopConfirmDelete: boolean
  togglePopConfirmDelete: (id: number | null) => void
}

/**
 * @description Función que devuelve las columnas personalizadas para la tabla de datos.
 *
 * Las columnas incluyen acciones como la eliminación de registros con un Popconfirm y un botón de eliminación.
 *
 * @param {ColumnActionsProps} props - Propiedades para configurar las acciones de las columnas.
 * @returns {ColumnsType<DataType>} - Columnas personalizadas para la tabla.
 */
export const columns = ({
  handleDelete,
  isLoadingDelete,
  idToDelete,
  openPopConfirmDelete,
  togglePopConfirmDelete
}: ColumnActionsProps): ColumnsType<DataType> => [
  {
    title: 'Nombre',
    dataIndex: 'name',
    width: '20%',
    /**
     * @description Renderizador personalizado para la columna de Nombres.
     *
     * Este renderizador muestra la foto del contacto seguido de su nombre.
     *
     * @param {string} name - name del registro.
     * @param {DataType} record - objeto del registro.
     * @returns {JSX.Element} - Elemento JSX  que representa el nombre del contacto.
     */
    render: (name: string, record: DataType): JSX.Element => (
      <div className='flex items-center gap-x-2'>
        <Avatar src={record.photo} />
        <span className='capitalize'>{name}</span>
      </div>
    )
  },
  {
    title: 'Descripción',
    dataIndex: 'description'
  },
  {
    title: 'Acciones',
    dataIndex: 'id',
    width: '10%',
    align: 'center',
    /**
     * @description Renderizador personalizado para la columna de acciones.
     *
     * Este renderizador muestra un Popconfirm para confirmar la eliminación de un registro y un botón de eliminación.
     *
     * @param {number} id - ID del registro.
     * @returns {JSX.Element} - Elemento JSX que representa las acciones de la columna.
     */
    render: (id: number): JSX.Element => (
      <Popconfirm
        title='Sure to delete?'
        onConfirm={() => handleDelete(id)}
        okButtonProps={{ loading: isLoadingDelete }}
        open={openPopConfirmDelete && id === idToDelete}
        onCancel={() => togglePopConfirmDelete(null)}
      >
        <Button type='text' onClick={() => togglePopConfirmDelete(id)}>
          <DeleteOutlined rev='span' className='text-2xl' />
        </Button>
      </Popconfirm>
    )
  }
]
