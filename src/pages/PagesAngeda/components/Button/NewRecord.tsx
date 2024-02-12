import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import DrawerComponent from '../../../../components/Drawer/DrawerComponent'

export const NewRecord = () => {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false)

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <div>
      <Button type='primary' icon={<PlusOutlined />} onClick={() => handleOpenDrawer()}>Agregar Contacto</Button>

      {/** Drawer */}
      <DrawerComponent
        openDrawer={openDrawer}
        handleOpenDrawer={handleOpenDrawer}
        typeForm={1}
      />
    </div>
  )
}
