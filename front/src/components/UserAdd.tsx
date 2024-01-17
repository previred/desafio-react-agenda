import React, { useState, useContext } from "react";
import UserForm from "./UserForm";
import { UserFormData } from "../users/domain";
import { UpdateUserList } from '../context/UpdateUserListContext';
import { createApiUserRepository } from "../users/infrastructure/ApiUserRepository";
import { Drawer, Button, Space, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UserAdd : React.FC = () => {
  const { updateEstado } = useContext(UpdateUserList)!;

  const [open, setOpen] = useState(false);
  const [disabledButtonn, setDisabledButtonn] = useState(true);
  
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (description: string) => {
    api.open({
      message: 'Nuevo contacto agregado',
      description: description,
      duration: 2,
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [formValues, setFormValues] = useState<UserFormData>({
    name: "",
    description: "",
    photo: "",
  });
  
  const handleFormChange = (formData: UserFormData) => {
    const { name, description, photo } = formData;
    // Validación
    if (name.trim() !== "" && description.trim() !== "" && photo.trim() !== "") {
      setDisabledButtonn(false);
      setFormValues(formData);
    }else{
      setDisabledButtonn(true);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createApiUserRepository().save(formValues);
    openNotification(`${response.name} se agrego correctamente a tu agenda.`);
    onClose();
    updateEstado(true); 
  };
  
  return (
    <>
      <Button type='primary' onClick={showDrawer} icon={<PlusOutlined />} style={{ marginBottom: "24px" }}>
        Agregar Contacto
      </Button>
      {contextHolder}
      <Drawer
        title='Agregar Nuevo Contacto'
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={handleFormSubmit} disabled={disabledButtonn} htmlType="submit" type='primary'>Guardar</Button>
          </Space>
        }
      >
        <UserForm onFormChange={handleFormChange} />
      </Drawer>
    </>
  );
};

export default UserAdd;