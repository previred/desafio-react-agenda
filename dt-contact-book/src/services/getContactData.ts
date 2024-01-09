import { DataType } from '@/models/contact'
import { TableParams } from '@/models/table'

interface getContactDataReturn {
  dataResult: DataType[]
  totalCount: number
}

/**
 * @description Obtiene los datos de contacto de la API según los parámetros y la consulta de búsqueda proporcionados.
 *
 * Esta función realiza una solicitud GET a la API de contactos con parámetros de paginación y búsqueda opcionales.
 *
 * @param {TableParams} params - Parámetros de la tabla que incluyen detalles de paginación.
 * @param {string} [searchQuery] - Consulta de búsqueda opcional para filtrar los resultados.
 * @returns {Promise<DataType[]>} - Una promesa que se resuelve con los datos de contacto obtenidos.
 * @throws {Error} - Lanza un error si falla la llamada a la API o si hay un problema interno.
 */
export const getContactData = async (
  params: TableParams,
  searchQuery?: string
): Promise<getContactDataReturn> => {
  const contactApiUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/users`)

  contactApiUrl.searchParams.append('_page', String(params.pagination?.current))
  contactApiUrl.searchParams.append(
    '_limit',
    String(params.pagination?.pageSize)
  )
  if (searchQuery) {
    contactApiUrl.searchParams.append('q', searchQuery)
  }

  let dataResult: DataType[] = []
  let totalCount = 0

  try {
    const response = await fetch(contactApiUrl)
    totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10)
    const data = await response.json()
    dataResult = data as DataType[]
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  } finally {
    return { dataResult, totalCount }
  }
}
