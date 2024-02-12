import { notification } from 'antd'

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const openNotificationWithIcon = (
  { type, message, description } :
  {type: NotificationType, message: string, description: string}
) => {
  const [api] = notification.useNotification()

  api[type]({
    message,
    description
  })
}
