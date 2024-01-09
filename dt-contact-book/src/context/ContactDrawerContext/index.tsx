'use client'

import { createContext, useState } from 'react'
import { ContextProps } from './types/ContextProps'
import { ProviderProps } from '@/models/provider'

const ContactDrawerContext = createContext<ContextProps>({} as ContextProps)

/**
 * @description Proveedor de contexto para gestionar el estado del ContactDrawer.
 *
 * Este componente provee un contexto que permite controlar si el ContactDrawer está abierto o cerrado.
 *
 * @param {ProviderProps} props - Propiedades para el componente ContactDrawerProvider.
 * @param {ReactNode} props.children - Los elementos hijos que estarán dentro del provider.
 * @returns {JSX.Element} - El componente ContactDrawerContext.Provider con su contexto asociado.
 */
const ContactDrawerProvider = ({ children }: ProviderProps): JSX.Element => {
  /**
   * @description Estado que indica si el ContactDrawer está abierto o cerrado.
   */
  const [open, setOpen] = useState(false)

  /**
   * @description Función para alternar el estado de apertura del ContactDrawer.
   */
  const toggleOpen = (): void => {
    setOpen(!open)
  }

  return (
    <ContactDrawerContext.Provider
      value={{
        open,
        toggleOpen
      }}
    >
      {children}
    </ContactDrawerContext.Provider>
  )
}

export { ContactDrawerContext, ContactDrawerProvider }
