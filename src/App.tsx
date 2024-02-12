import React from 'react'

import './styles/App.css'
import PagesAngeda from './pages/PagesAngeda/PagesAngeda'
import { Layout, theme } from 'antd'
import FooterComponent from './components/Footer/Footer'

const { Content } = Layout

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ padding: '40px' }}>
          <div
            style={{
              background: colorBgContainer,
              minHeight: '70vh',
              padding: 30,
              borderRadius: borderRadiusLG
            }}
          >
            <PagesAngeda />
          </div>
        </Content>
      </Layout>
      <FooterComponent />

    </div>
  )
}

export default App
