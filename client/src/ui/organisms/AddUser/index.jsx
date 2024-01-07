import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { Drawer, Form, Button, message, Space } from "antd";
import AddUserForm from "../../molecules/AddUserForm";
import { PlusOutlined } from "@ant-design/icons";

const AddUser = () => {
  const { handleAddUser } = useContext(UserContext);
  const formRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFormSubmit = async (user) => {
    try {
      await handleAddUser(user);
      onClose();
      message.success("Usuario agregado con éxito");
    } catch (error) {
      message.error("Error al agregar el usuario");
    }
  };

  const onSubmit = () => {
    // Validando antes de enviar el formulario
    formRef.current
      .validateFields()
      .then((values) => {
        onFormSubmit(values);
      })
      .catch((info) => {
        console.log("Validación fallida:", info);
      });
  };

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
        <AddUserForm
          ref={formRef}
          form={form}
          layout='vertical'
          onFinish={onFormSubmit}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default AddUser;
