'use client'

import { Divider, Input, Table } from 'antd'
import { SearchProps } from 'antd/es/input'
import { columns } from './data'
import { ContactDataContext } from '@/context/ContactDataContext'
import { useContext } from 'react'

const { Search } = Input

/**
 * @description Componente de lista de contactos que muestra una tabla con datos de contactos y proporciona funcionalidades para búsqueda y eliminación.
 *
 * Este componente utiliza el hook useContactData para obtener y gestionar los datos de contacto.
 */
const ContactList = () => {
  const {
    data,
    handleDelete,
    isLoading,
    isLoadingDelete,
    idToDelete,
    openPopConfirmDelete,
    searchContacts,
    tableParams,
    togglePopConfirmDelete
  } = useContext(ContactDataContext)

  /**
   * @description Función para realizar una búsqueda de contactos.
   * @param {string} value - Valor de búsqueda introducido por el usuario.
   */
  const onSearch: SearchProps['onSearch'] = (value: string) =>
    searchContacts({ searchQuery: value, tableParams })

  return (
    <section className='mt-6'>
      <Search
        placeholder='input search text'
        allowClear
        onSearch={onSearch}
        style={{ width: '100%' }}
      />
      <Divider />
      <Table
        columns={columns({
          handleDelete,
          isLoadingDelete,
          idToDelete,
          openPopConfirmDelete,
          togglePopConfirmDelete
        })}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={isLoading}
        size='small'
      />
    </section>
  )
}

export default ContactList
