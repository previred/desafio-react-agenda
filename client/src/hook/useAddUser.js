import { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";

export const useAddUser = (form, msg) => {
  const { handleAddUser } = useContext(UserContext);
  const formRef = useRef(null);
  const [visible, setVisible] = useState(false);

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
      msg.success("Usuario agregado con éxito");
    } catch (error) {
      msg.error("Error al agregar el usuario");
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

  return {
    formRef,
    visible,
    showDrawer,
    onClose,
    onSubmit,
  };
};
