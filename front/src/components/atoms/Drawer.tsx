import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { IUser } from "../../interfaces";
import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";

type DrawerProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  onAccept: (userData: IUser) => void;
};

type FieldType = {
  photo?: string;
  description?: string;
  name?: string;
};

export const DrawerApp = ({ open, title, onClose, onAccept }: DrawerProps) => {
  const [form] = useForm();

  const handleClose = () => {
    onClose();
    form.resetFields();
  };

  useEffect(() => {
    return () => {
      open && form.resetFields();
    };
  }, [form, open]);

  return (
    <Drawer
      title={title}
      width={720}
      onClose={handleClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            htmlType="submit"
            type="primary"
            onClick={() => form.submit()}
          >
            Guardar
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" requiredMark form={form} onFinish={onAccept}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item<FieldType>
              name="photo"
              label="URL imagen del Perfil"
              rules={[
                {
                  required: true,
                  message: "Debe ingresar la URL de la imagen",
                },
              ]}
            >
              <Input placeholder="Inserte la URL de la imagen del perfil" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<FieldType>
              name="name"
              label="Nombre"
              rules={[
                {
                  required: true,
                  message: "Debe ingresar nombre del contacto",
                },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder="Escriba el nombre del contacto"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item<FieldType>
              name="description"
              label="Descripción"
              rules={[
                {
                  required: true,
                  message: "Debe ingresar descripción del contacto",
                },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder="Agregue la descripción del contacto"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
