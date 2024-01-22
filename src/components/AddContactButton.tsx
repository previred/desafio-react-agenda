import React, { useContext } from "react";
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ContactContext } from "../context/ContactContext.tsx";

export const AddContactButton = (): JSX.Element => {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error('Context Error');
  }

  const { showDrawer } = context

  return (
    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={showDrawer}>
      Agregar Contacto
    </Button>
  )
}