import { useNotifications } from '@/context/NotificationContext'
import { deleteContact } from '@/services/deleteContact'
import { useState } from 'react'

interface ContactDeleteProps {
  fetchData: () => Promise<void>
}

interface ContactDeleteReturn {
  handleDelete: (id: number) => Promise<void>
  isLoadingDelete: boolean
  idToDelete: number | null
  openPopConfirmDelete: boolean
  togglePopConfirmDelete: (id: number | null) => void
}

/**
 * @description Hook personalizado para gestionar la eliminación de un contacto.
 *
 * Este hook proporciona funciones y estados para manejar la eliminación de un contacto, incluida la confirmación y el estado de carga.
 *
 * @param {ContactDeleteProps} props - Propiedades para el hook useContactDelete.
 * @returns {ContactDeleteReturn} - Un objeto que contiene funciones y estados para gestionar la eliminación de un contacto.
 */
export const useContactDelete = ({
  fetchData
}: ContactDeleteProps): ContactDeleteReturn => {
  const { showError } = useNotifications()
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [openPopConfirmDelete, setOpenPopConfirmDelete] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number | null>(null)

  /**
   * @description Función asincrónica para eliminar un contacto utilizando su ID.
   *
   * Esta función maneja la lógica de eliminación, verifica la respuesta de la API y actualiza el estado de carga.
   *
   * @param {number} id - ID del contacto que se va a eliminar.
   */
  const handleDelete = async (id: number) => {
    setIsLoadingDelete(true)

    try {
      const response = await deleteContact(id)

      if (response.ok) {
        setIsLoadingDelete(false)
        await fetchData()
      } else {
        showError('Error al eliminar el contacto.')
      }
    } catch (error) {
      showError('Error al eliminar el contacto.')
    } finally {
      setIsLoadingDelete(false)
    }
  }

  /**
   * @description Función para mostrar o ocultar el modal de confirmación de eliminación.
   *
   * Esta función actualiza el estado del modal y el ID del contacto a eliminar.
   *
   * @param {number | null} id - ID del contacto a eliminar o null para ocultar el modal.
   */
  const togglePopConfirmDelete = (id: number | null) => {
    if (id === null) {
      setOpenPopConfirmDelete(false)
      setIdToDelete(null)
      return
    }
    setOpenPopConfirmDelete(true)
    setIdToDelete(id)
  }

  return {
    handleDelete,
    idToDelete,
    isLoadingDelete,
    openPopConfirmDelete,
    togglePopConfirmDelete
  }
}
