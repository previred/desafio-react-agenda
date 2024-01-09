/**
 * @description Elimina un contacto de la base de datos utilizando su ID.
 *
 * Esta función envía una solicitud DELETE al endpoint específico para eliminar un usuario según su ID.
 *
 * @param {number} id - El ID del usuario que se va a eliminar.
 * @returns {Promise<Response>} - Una promesa que se resuelve con la respuesta de la llamada a la API.
 * @throws {Error} - Lanza un error si falla la llamada a la API o si hay un problema interno.
 */
export const deleteContact = async (id: number): Promise<Response> => {
  let result: Response = new Response()

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
      {
        method: 'DELETE'
      }
    )

    result = response
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  } finally {
    return result
  }
}
