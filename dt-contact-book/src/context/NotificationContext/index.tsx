'use client'

import React, { createContext, useContext } from 'react'
import { message } from 'antd'
import { ContextProps } from './types/ContextProps'
import { ProviderProps } from '@/models/provider'

const NotificationContext = createContext<ContextProps>({} as ContextProps)

/**
 * @description Hook personalizado para acceder al contexto de notificaciones.
 *
 * Este hook permite acceder a las funciones de mostrar mensajes de éxito y error.
 *
 * @returns {ContextProps} - Un objeto que contiene funciones para mostrar mensajes.
 */
export const useNotifications = () => {
  return useContext(NotificationContext)
}

/**
 * @description Proveedor de contexto para gestionar las notificaciones.
 *
 * Este componente provee un contexto que permite mostrar mensajes de éxito y error en la aplicación.
 *
 * @param {ProviderProps} props - Propiedades para el componente NotificationProvider.
 * @returns {JSX.Element} - El componente NotificationProvider con su contexto asociado.
 */
export const NotificationProvider = ({ children }: ProviderProps) => {
  const [messageApi, contextHolder] = message.useMessage()

  /**
   * @description Muestra un mensaje de éxito.
   * @param {string} text - Texto del mensaje de éxito a mostrar.
   */
  const showSuccess = (text: string) => {
    messageApi.success(text)
  }

  /**
   * @description Muestra un mensaje de error.
   * @param {string} text - Texto del mensaje de error a mostrar.
   */
  const showError = (text: string) => {
    messageApi.error(text)
  }

  return (
    <NotificationContext.Provider value={{ showSuccess, showError }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  )
}
