import React from "react";
import { Drawer, Form, Button, message, Space } from "antd";
import AddUserForm from "../../molecules/AddUserForm";
import { PlusOutlined } from "@ant-design/icons";
import { useAddUser } from "../../../hook/useAddUser";

const AddUser = () => {
  const [form] = Form.useForm();
  const { formRef, visible, showDrawer, onClose, onSubmit } = useAddUser(
    form,
    message
  );

  return (
    <React.Fragment>
      <Button type='primary' onClick={showDrawer} icon={<PlusOutlined />}>
        Agregar Usuario
      </Button>
      <Drawer
        title='Agregar Nuevo Usuario'
        width={640}
        onClose={onClose}
        open={visible}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={onSubmit} type='primary'>
              Guardar
            </Button>
          </Space>
        }
      >
        <AddUserForm ref={formRef} form={form} layout='vertical' />
      </Drawer>
    </React.Fragment>
  );
};

export default AddUser;
