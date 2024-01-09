import type { Metadata } from 'next'
import './globals.css'

import { Roboto } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ContactDrawerProvider } from '@/context/ContactDrawerContext'
import ErrorBoundary from '@/components/ErrorBoundary'
import { NotificationProvider } from '@/context/NotificationContext'
import { ConfigProvider } from 'antd'
import ContactDataProvider from '@/context/ContactDataContext'

export const metadata: Metadata = {
  title: 'Agenda de contactos',
  description: 'Agenda de contactos'
}

const fontRoboto = Roboto({
  preload: true,
  style: ['italic', 'normal'],
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

const customTheme = {
  token: {
    ...fontRoboto.style
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body className={fontRoboto.className}>
        <AntdRegistry>
          <ConfigProvider theme={customTheme}>
            <NotificationProvider>
              <ContactDataProvider>
                <ContactDrawerProvider>
                  <ErrorBoundary>{children}</ErrorBoundary>
                </ContactDrawerProvider>
              </ContactDataProvider>
            </NotificationProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
