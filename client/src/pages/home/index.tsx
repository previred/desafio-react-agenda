import { Avatar, Button, Drawer, Form, Input, Modal, Space, Table } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import useAxios from "axios-hooks";
import Search from "antd/es/input/Search";
import { useState } from "react";

const API_URL = "http://localhost:9000/api/users";

interface UserType {
  id: number;
  name: string;
  description: string;
  photo: string;
}

const Home = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [addForm] = Form.useForm();
  const [deleteModal, contextHolder] = Modal.useModal();

  // Table columns
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (_: string, { name, photo }: UserType) => (
        <Space align={"center"} style={{ width: 150 }}>
          <Avatar src={photo} />
          {name}
        </Space>
      ),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (_: string, { id, name }: UserType) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => onDelete(id, name)}
        />
      ),
    },
  ];

  // API Calls
  const [{ data: usersData, loading, error }, refreshUsers] =
    useAxios<UserType[]>(API_URL);

  const [, executeAdd] = useAxios(
    {
      url: API_URL,
      method: "POST",
    },
    { manual: true }
  );

  const [, executeDelete] = useAxios(
    {
      baseURL: API_URL,
      method: "DELETE",
    },
    { manual: true }
  );

  // Functions
  const onSearch = async (search: string) => {
    try {
      await refreshUsers({ params: { q: search } });
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (id: number, name: string) => {
    try {
      const confirmModal = await deleteModal.confirm({
        title: "¿Estás seguro de que quieres eliminar este contacto?",
        content: name,
      });

      if (confirmModal) {
        await executeDelete({ url: id.toString() });
        await refreshUsers();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onAddSummit = async () => {
    const hasError = addForm.getFieldsError().reduce((prev, field) => {
      return prev || field.errors.length > 0;
    }, false);

    if (!hasError) {
      const userData = {
        name: addForm.getFieldValue("name"),
        photo: addForm.getFieldValue("photo"),
        description: addForm.getFieldValue("description"),
      };

      console.log(userData);

      try {
        await executeAdd({ data: userData });
        await refreshUsers();
        onCloseDrawer();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const showAddDrawer = () => setOpenDrawer(true);
  const onCloseDrawer = () => setOpenDrawer(false);

  return (
    <>
      {/* {loading && <Spin fullscreen />} */}
      <Title level={2} style={{ marginBottom: 5 }}>
        Agenda Previred - Mi agenda de contactos laboral
      </Title>
      <Paragraph style={{ marginBottom: 20, fontSize: 18 }}>
        Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar
        nuevos contactos y eliminar contactos no deseados.
      </Paragraph>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 40 }}
        onClick={showAddDrawer}
      >
        Agregar Contacto
      </Button>

      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: "100%", marginBottom: 20 }}
      />

      <Table
        dataSource={usersData}
        columns={columns}
        loading={loading}
        rowKey={(record) => record.id}
      />

      <Drawer
        title="Agregar nuevo Contacto"
        onClose={onCloseDrawer}
        open={openDrawer}
        width={600}
        extra={
          <Space>
            <Button onClick={onCloseDrawer}>Cancelar</Button>
            <Button onClick={onAddSummit} type="primary">
              Guardar
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={addForm} onFinish={onAddSummit}>
          <Form.Item
            name="photo"
            label="URL imagen de Perfil"
            rules={[{ required: true, message: "Por favor, inserte una url" }]}
          >
            <Input placeholder="Inserte la URL de la imagen de perfil" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Nombre"
            rules={[
              { required: true, message: "Por favor, inserte un nombre" },
            ]}
          >
            <Input placeholder="Inserte el nombre de contacto" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descripción"
            rules={[
              { required: true, message: "Por favor, inserte una descripción" },
            ]}
          >
            <Input placeholder="Inserte la descripción del contacto" />
          </Form.Item>
        </Form>
      </Drawer>
      {contextHolder}
    </>
  );
};

export default Home;
