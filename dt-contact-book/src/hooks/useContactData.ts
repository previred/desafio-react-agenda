import { DataType } from '@/models/contact'
import { TableParams } from '@/models/table'
import { useContactLoader } from './useContactLoader'
import { useContactDelete } from './useContactDelete'
// import { SearchContactsProps, useContactSearch } from './useContactSearch'

interface ContactDataProps {
  tableParams: TableParams
}

export interface ContactDataReturn {
  data: DataType[]
  fetchData: () => Promise<void>
  handleDelete: (id: number) => Promise<void>
  isLoading: boolean
  isLoadingDelete: boolean
  // isLoadingSearch: boolean
  idToDelete: number | null
  openPopConfirmDelete: boolean
  paginationChange: (pagination: any, searchQuery: string) => Promise<void>
  // searchContacts: ({
  //   searchQuery,
  //   tableParams
  // }: SearchContactsProps) => Promise<void>
  tableParams: TableParams
  togglePopConfirmDelete: (id: number | null) => void
}

/**
 * @description Hook personalizado para gestionar los contactos.
 *
 * Este hook combina funcionalidades de carga, eliminación y búsqueda de contactos.
 *
 * @param {ContactDataProps} props - Propiedades para el hook useContactData.
 * @returns {ContactDataReturn} - Un objeto que contiene funciones y estados para gestionar los contactos.
 */
const useContactData = (): ContactDataReturn => {
  // Cargar lista de contactos.
  const { data, fetchData, isLoading, setData, tableParams, paginationChange } =
    useContactLoader()

  // Eliminar contacto.
  const {
    handleDelete,
    isLoadingDelete,
    idToDelete,
    openPopConfirmDelete,
    togglePopConfirmDelete
  } = useContactDelete({ fetchData })

  // Buscar contactos.
  // const { isLoadingSearch, searchContacts } = useContactSearch({
  //   setData,
  //   setTableParams
  // })

  return {
    data,
    fetchData,
    handleDelete,
    isLoading,
    isLoadingDelete,
    // isLoadingSearch,
    idToDelete,
    openPopConfirmDelete,
    paginationChange,
    // searchContacts,
    tableParams,
    togglePopConfirmDelete
  }
}

export default useContactData
