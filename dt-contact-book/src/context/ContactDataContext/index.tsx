'use client'

import useContactData, { ContactDataReturn } from '@/hooks/useContactData'
import { ProviderProps } from '@/models/provider'
import { createContext } from 'react'

export const ContactDataContext = createContext<ContactDataReturn>(
  {} as ContactDataReturn
)

/**
 * @description Proveedor de contexto para ContactDataContext.
 *
 * Este proveedor envuelve la aplicación o parte de la aplicación donde se necesitan los datos y las funcionalidades relacionadas con los contactos.
 *
 * @param {ProviderProps} props - Propiedades para configurar el componente ContactDataProvider.
 * @param {React.ReactNode} props.children - Los elementos hijos que estarán dentro del proveedor.
 * @returns {JSX.Element} - Elemento JSX que representa el proveedor de contexto para ContactDataContext.
 */
const ContactDataProvider = ({ children }: ProviderProps): JSX.Element => {
  const contactData = useContactData()

  return (
    <ContactDataContext.Provider value={contactData}>
      {children}
    </ContactDataContext.Provider>
  )
}

export default ContactDataProvider
