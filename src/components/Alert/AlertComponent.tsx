import { Alert } from 'antd'
import React from 'react'

export type NotificationType = 'success' | 'info' | 'warning' | 'error' | undefined

export const AlertComponent = (
  { message, type } :
  {message: string, type: NotificationType}) => {
  return (
    <div>
      <Alert message={message} type={type} showIcon closable />
    </div>
  )
}
