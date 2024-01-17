import React, { ChangeEvent } from "react";
import { UserFormData } from "../users/domain";
import { Form, Input } from "antd";

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
            message: "El nombre debe tener 4 caracteres como mínimo.",
            pattern: new RegExp(/^.{4,}$/),
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
            message: "El nombre debe tener 10 caracteres como mínimo.",
            pattern: new RegExp(/^.{10,}$/),
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