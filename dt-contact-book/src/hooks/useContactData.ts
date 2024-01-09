import { DataType } from '@/models/contact'
import { TableParams } from '@/models/table'
import { useContactLoader } from './useContactLoader'
import { useContactDelete } from './useContactDelete'

export interface ContactDataReturn {
  data: DataType[]
  fetchData: () => Promise<void>
  handleDelete: (id: number) => Promise<void>
  isLoading: boolean
  isLoadingDelete: boolean
  idToDelete: number | null
  openPopConfirmDelete: boolean
  paginationChange: (pagination: any, searchQuery: string) => Promise<void>
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

  return {
    data,
    fetchData,
    handleDelete,
    isLoading,
    isLoadingDelete,
    idToDelete,
    openPopConfirmDelete,
    paginationChange,
    tableParams,
    togglePopConfirmDelete
  }
}

export default useContactData
