// Importaciones necesarias
import { Input, Form, FormInstance } from "antd";
import { IUser } from "../../interfaces/IUser.ts";

/**
 * Interface para las propiedades del componente CrearUserForm.
 * Utiliza FormInstance de Ant Design para gestionar el estado y la validación del formulario.
 * onSubmit es una función que se llama cuando el formulario se envía correctamente.
 */
interface CrearUserFormProps {
  form: FormInstance;
  onSubmit: (values: IUser) => void;
}

const CrearUserForm: React.FC<CrearUserFormProps> = ({ form, onSubmit }) => {
  return (
    <>
      {/* Componente Form de Ant Design para la creación del formulario. */}
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
      >
        {/* Form.Item para el campo de URL de imagen de perfil con validación requerida. */}
        <Form.Item<Partial<IUser>>
          label={"URL Imagen de Perfil"}
          name={"photo"}
          rules={[
            {
              required: true,
              message: "Este valor es requerido",
            },
          ]}
        >
          <Input placeholder={"Inserte la imagen de la URL de perfil"} />
        </Form.Item>
        {/* Campo para el nombre con validación requerida. */}
        <Form.Item<Partial<IUser>>
          label={"Nombre"}
          name={"name"}
          rules={[
            {
              required: true,
              message: "Este valor es requerido",
            },
          ]}
        >
          <Input placeholder={"Escriba el nombre de contacto"} />
        </Form.Item>
        {/* Campo para la descripción con validación requerida. */}
        <Form.Item<Partial<IUser>>
          label={"Descripción"}
          name={"description"}
          rules={[
            {
              required: true,
              message: "Este valor es requerido",
            },
          ]}
        >
          <Input placeholder={"Agregue la descripción del contacto"} />
        </Form.Item>
      </Form>
    </>
  );
};

export default CrearUserForm;
