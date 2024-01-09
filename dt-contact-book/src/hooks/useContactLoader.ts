import { DataType } from '@/models/contact'
import { TableParams } from '@/models/table'
import { getContactData } from '@/services/getContactData'
import { useEffect, useState } from 'react'

interface ContactLoaderReturn {
  data: DataType[]
  fetchData: () => Promise<void>
  isLoading: boolean
  setData: React.Dispatch<React.SetStateAction<DataType[]>>
  tableParams: TableParams
  setTableParams: React.Dispatch<React.SetStateAction<TableParams>>
  paginationChange: (pagination: any, searchQuery: string) => Promise<void>
}

/**
 * @description Hook personalizado para cargar datos de contacto utilizando una función fetchData interna.
 *
 * Este hook inicializa una solicitud para obtener datos de contacto y maneja el estado de carga.
 *
 * @param {TableParams} tableParams - Parámetros iniciales para la solicitud de datos.
 * @returns {ContactLoaderReturn} - Un objeto que contiene los datos, una función para recargar los datos, el estado de carga y una función para establecer los datos.
 */
export const useContactLoader = (): ContactLoaderReturn => {
  const [data, setData] = useState<DataType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      defaultPageSize: 6,
      pageSize: 6,
      showSizeChanger: false
    }
  })

  useEffect(() => {
    fetchData()
  }, [])

  /**
   * @description Función asincrónica para recuperar datos de contacto utilizando los parámetros iniciales.
   */
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const fetchedData = await getContactData(tableParams)
      setData(fetchedData.dataResult)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: fetchedData.totalCount
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const paginationChange = async (pagination: any, searchQuery: string) => {
    setIsLoading(true)
    try {
      const tableParamsChanged = {
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          current: pagination.current
        }
      }
      const fetchedData = await getContactData(tableParamsChanged, searchQuery)
      setData(fetchedData.dataResult)
      setTableParams({
        ...tableParamsChanged,
        pagination: {
          ...tableParamsChanged.pagination,
          total: fetchedData.totalCount
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    data,
    fetchData,
    isLoading,
    setData,
    tableParams,
    setTableParams,
    paginationChange
  }
}
