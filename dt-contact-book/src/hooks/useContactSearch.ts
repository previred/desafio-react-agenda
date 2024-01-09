import { DataType } from '@/models/contact'
import { TableParams } from '@/models/table'
import { getContactData } from '@/services/getContactData'
import { useState } from 'react'

interface ContactSearchProps {
  setData: React.Dispatch<React.SetStateAction<DataType[]>>
}

interface ContactSearchReturn {
  isLoadingSearch: boolean
  searchContacts: ({
    searchQuery,
    tableParams
  }: SearchContactsProps) => Promise<void>
}

export interface SearchContactsProps {
  searchQuery: string
  tableParams: TableParams
}

/**
 * @description Hook personalizado para realizar búsquedas de contactos.
 *
 * Este hook proporciona una función para buscar contactos utilizando una consulta de búsqueda y parámetros de tabla.
 *
 * @param {ContactSearchProps} props - Propiedades para el hook useContactSearch.
 * @returns {ContactSearchReturn} - Un objeto que contiene el estado de carga y la función para buscar contactos.
 */
export const useContactSearch = ({
  setData
}: ContactSearchProps): ContactSearchReturn => {
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)

  /**
   * @description Función asincrónica para buscar contactos utilizando una consulta de búsqueda y parámetros de tabla.
   *
   * Esta función maneja la lógica de búsqueda, realiza la solicitud a la API y actualiza los datos en el estado.
   *
   * @param {SearchContactsProps} searchContactsProps - Propiedades para realizar la búsqueda de contactos.
   */
  const searchContacts = async ({
    searchQuery,
    tableParams
  }: SearchContactsProps) => {
    setIsLoadingSearch(true)
    try {
      const fetchedData = await getContactData(tableParams, searchQuery)
      setData(fetchedData.dataResult)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoadingSearch(false)
    }
  }

  return { isLoadingSearch, searchContacts }
}
