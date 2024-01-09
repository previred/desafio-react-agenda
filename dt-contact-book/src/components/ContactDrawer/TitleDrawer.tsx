import { ContactDrawerContext } from '@/context/ContactDrawerContext'
import { Button } from 'antd'
import { MouseEvent, useContext } from 'react'

interface TitleDrawerProps {
  formRef: React.RefObject<HTMLFormElement>
  isSubmitting: boolean
  onClose: () => void
}

/**
 * @description Componente para mostrar el título y los botones de acción en el Drawer de Contacto.
 *
 * Este componente incluye botones para cancelar y guardar el formulario.
 *
 * @param {TitleDrawerProps} props - Propiedades para configurar el componente.
 * @returns {JSX.Element} - Elemento JSX que representa el título y los botones de acción del Drawer.
 */
const TitleDrawer = ({
  isSubmitting,
  formRef,
  onClose
}: TitleDrawerProps): JSX.Element => {
  /**
   * @description Manejador para crear un nuevo contacto.
   *
   * Este manejador evita el comportamiento por defecto del evento y envía el formulario.
   *
   * @param {MouseEvent<HTMLButtonElement>} event - Evento del botón de acción.
   */
  const handleCreate = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (formRef.current) {
      formRef.current.requestSubmit()
    }
  }

  return (
    <div className='flex justify-between items-center'>
      <h1 className='text-base'>Agregar nuevo Contacto</h1>
      <div className='flex gap-x-4'>
        <Button type='default' onClick={onClose}>
          Cancelar
        </Button>
        <Button type='primary' loading={isSubmitting} onClick={handleCreate}>
          Guardar
        </Button>
      </div>
    </div>
  )
}

export default TitleDrawer
