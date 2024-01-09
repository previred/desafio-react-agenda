import { DataType } from '@/models/contact'
import { TableParams } from '@/models/table'
import { getContactData } from '@/services/getContactData'
import { useEffect, useState } from 'react'

interface ContactLoaderReturn {
  data: DataType[]
  fetchData: () => Promise<void>
  isLoading: boolean
  setData: React.Dispatch<React.SetStateAction<DataType[]>>
}

/**
 * @description Hook personalizado para cargar datos de contacto utilizando una función fetchData interna.
 *
 * Este hook inicializa una solicitud para obtener datos de contacto y maneja el estado de carga.
 *
 * @param {TableParams} tableParams - Parámetros iniciales para la solicitud de datos.
 * @returns {ContactLoaderReturn} - Un objeto que contiene los datos, una función para recargar los datos, el estado de carga y una función para establecer los datos.
 */
export const useContactLoader = (
  tableParams: TableParams
): ContactLoaderReturn => {
  const [data, setData] = useState<DataType[]>([])
  const [isLoading, setIsLoading] = useState(false)

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
      setData(fetchedData)
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
    setData
  }
}
