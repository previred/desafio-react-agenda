import React, { forwardRef } from "react";
import { Form, Input } from "antd";

const AddUserForm = forwardRef(function (props, ref) {
  return (
    <Form ref={ref} {...props}>
      <Form.Item
        name='url'
        label='URL imagen de perfil'
        rules={[
          {
            required: true,
            message: "Por favor, ingrese una url válida.",
            pattern: new RegExp(/^(http|https):\/\/[^ "]+$/),
          },
        ]}
      >
        <Input placeholder='Inserte la URL de la imagen de perfil' />
      </Form.Item>
      <Form.Item
        name='name'
        label='Nombre'
        rules={[
          {
            required: true,
            message: "Por favor, ingrese un nombre de contacto válido.",
            pattern: new RegExp(/^[a-zA-Z ]+$/),
          },
        ]}
      >
        <Input placeholder='Escriba el nombre de contacto' />
      </Form.Item>
      <Form.Item
        name='description'
        label='Descripción'
        rules={[
          {
            required: true,
            message: "Por favor, ingrese una descripción válida.",
            pattern: new RegExp(/^[a-zA-Z ]+$/),
          },
        ]}
      >
        <Input.TextArea
          rows={3}
          placeholder='Agregue la descripción del contacto'
        />
      </Form.Item>
    </Form>
  );
});

export default AddUserForm;
