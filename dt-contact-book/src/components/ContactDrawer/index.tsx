'use client'

import { CloseOutlined } from '@ant-design/icons'
import { ContactDrawerContext } from '@/context/ContactDrawerContext'
import { ContactSchema, ContactSchemaType, initialValues } from './schema'
import { Drawer } from 'antd'
import { useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormDrawer from './FormDrawer'
import TitleDrawer from './TitleDrawer'
import { addContact } from '@/services/addContact'
import { useNotifications } from '@/context/NotificationContext'
import { ContactDataContext } from '@/context/ContactDataContext'

/**
 * @description Componente para gestionar el Drawer de Contactos.
 *
 * Este componente permite agregar un nuevo contacto mediante un formulario en un Drawer.
 */
const ContactDrawer = () => {
  const [formKey, setFormKey] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
  const drawerContext = useContext(ContactDrawerContext)
  const { fetchData } = useContext(ContactDataContext)
  const { showError } = useNotifications()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<ContactSchemaType>({
    resolver: zodResolver(ContactSchema),
    defaultValues: initialValues
  })

  /**
   * @description Función que se ejecuta al enviar el formulario.
   * @param {ContactSchemaType} data - Datos del contacto a agregar.
   */
  const onSubmit = async (data: ContactSchemaType) => {
    try {
      const response = await addContact(data)
      if (response.ok) {
        onClose()
        fetchData()
      } else {
        showError('No se pudo agregar el contacto')
      }
    } catch (error) {
      showError('No se pudo agregar el contacto')
    }
  }

  /**
   * @description Función para cerrar el Drawer y reiniciar el formulario.
   */
  const onClose = () => {
    reset()
    setFormKey((prevKey) => prevKey + 1)
    drawerContext.toggleOpen()
  }

  return (
    <Drawer
      title={
        <TitleDrawer
          isSubmitting={isSubmitting}
          formRef={formRef}
          onClose={onClose}
        />
      }
      placement='right'
      onClose={onClose}
      open={drawerContext.open}
      width={600}
      closeIcon={<CloseOutlined rev='span' className='text-3xl' />}
      className='!bg-gray-100'
    >
      <form key={formKey} ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <FormDrawer control={control} />
      </form>
    </Drawer>
  )
}

export default ContactDrawer
