import { ContactSchemaType } from '@/components/ContactDrawer/schema'

/**
 * @description Añade un contacto a la base de datos.
 *
 * Esta función envía una solicitud POST al endpoint especificado con los datos del contacto para añadirlo a la base de datos.
 *
 * @param {ContactSchemaType} contact - Los datos del contacto que se van a añadir a la base de datos.
 * @returns {Promise<Response>} - Una promesa que se resuelve con la respuesta de la llamada a la API.
 * @throws {Error} - Lanza un error si falla la llamada a la API.
 */
export const addContact = async (
  contact: ContactSchemaType
): Promise<Response> => {
  let result: Response = new Response()
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = response
  } catch (error) {
    throw error
  } finally {
    return result
  }
}
