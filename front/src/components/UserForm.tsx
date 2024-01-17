import React, { ChangeEvent } from "react";
import { Form, Input } from "antd";
import { UserFormData } from "../users/domain/User";

interface UserFormProps {
  onFormChange: (formValues: UserFormData) => void;  
}

const UserForm: React.FC<UserFormProps> = ({ onFormChange }) => {
  const [formValues, setFormValues] = React.useState<UserFormData>({
    name: "",
    description: "",
    photo: "",
  });

  const handleChange = (e: ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    onFormChange({ ...formValues, [name]: value });
  };

  return (
    <Form layout='vertical'>
      <Form.Item
        label='URL imagen de perfil'
        name='photo'
        rules={[
          {
            message: "Ingrese una url válida.",
            pattern: new RegExp(/^(http|https):\/\/[^ "]+$/),
          },
        ]}
      >
        <Input placeholder='Inserte la URL de la imagen de perfil' name='photo' onChange={handleChange} />
      </Form.Item>
      <Form.Item
        label='Nombre'
        name='name'
        rules={[
          {
            message: "Por favor, ingrese un nombre de contacto válido.",
            pattern: new RegExp(/^[a-zA-Z ]+$/),
          },
        ]}
      >
        <Input placeholder='Escriba el nombre de contacto' name="name" onChange={handleChange} />
      </Form.Item>
      <Form.Item
        label='Descripción'
        name='description'
        rules={[
          {
            message: "Por favor, ingrese una descripción válida.",
            pattern: new RegExp(/^[a-zA-Z ]+$/),
          },
        ]}
      >
        <Input.TextArea
          rows={1}
          placeholder='Agregue la descripción del contacto'
          onChange={handleChange}
          name="description"
        />
      </Form.Item>
    </Form>
  );
};

export default UserForm;