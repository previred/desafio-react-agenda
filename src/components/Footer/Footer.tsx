import React from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

const FooterComponent = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Yosmar Hinestroza {new Date().getFullYear()} <a href='https://yosmarhinestroza.dev' target='_black'>Más información</a>
    </Footer>
  )
}

export default FooterComponent
