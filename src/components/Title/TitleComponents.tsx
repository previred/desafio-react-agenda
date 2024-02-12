import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography

export const TitleComponents = ({ title, descriptions }: {title: string, descriptions: string}) => {
  return (
    <div>
      <Title>{title}</Title>
      <Title level={5} style={{ fontSize: '15px', color: '#000', fontWeight: 450 }}>{descriptions}</Title>
    </div>
  )
}
