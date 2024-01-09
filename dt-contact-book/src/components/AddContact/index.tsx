'use client'

import { Button } from 'antd'
import { IcRoundPlus } from '../icons/icRoundPlus'
import { ContactDrawerContext } from '@/context/ContactDrawerContext'
import { useContext } from 'react'

/**
 * @description Componente para renderizar el botón de "Agregar Contacto".
 *
 * Este componente utiliza el contexto `ContactDrawerContext` para abrir el Drawer de Contactos al hacer clic en el botón.
 *
 * @returns {JSX.Element} - Elemento JSX que representa el botón de "Agregar Contacto".
 */
const AddContact = (): JSX.Element => {
  const drawerContext = useContext(ContactDrawerContext)

  return (
    <Button
      className='!flex items-center mt-6'
      type='primary'
      onClick={drawerContext.toggleOpen}
    >
      <IcRoundPlus height={20} width={20} stroke='white' />
      <span className='pl-2 '>Agregar Contacto</span>
    </Button>
  )
}

export default AddContact
