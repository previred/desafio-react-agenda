import PropTypes from "prop-types";
import { useEffect } from "react";
import { Drawer, Button, Form, Input, Space } from "antd";
import { useSidebar } from "../../hooks/useSidebar";

const Sidebar = ({ onFinish }) => {
  const { visible, hideSidebar } = useSidebar();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields(); // Esto limpiará el formulario después del envío
  }, [form, visible]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Drawer
        title="Agregar nuevo Contacto"
        placement="right"
        closable={true}
        onClose={hideSidebar}
        open={visible}
        width={500}
        extra={
          <Space>
            <Button onClick={hideSidebar}>Cancelar</Button>
            <Button type="primary" onClick={() => form.submit()}>
              Guardar
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="photo"
            label="URL imagen de perfil"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la URL de la imagen de perfil",
              },
            ]}
          >
            <Input placeholder="Inserte la URL de la imagen de perfil" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Nombre"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre del contacto",
              },
            ]}
          >
            <Input placeholder="Escriba el nombre del contacto" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descripción"
            rules={[
              {
                required: true,
                message: "Por favor agregue la descripción del contacto",
              },
            ]}
          >
            <Input placeholder="Agregue la descripción del contacto" />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  // Aquí deshabilitamos el botón si el formulario no es válido
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Guardar
              </Button>
            )}
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

Sidebar.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default Sidebar;
