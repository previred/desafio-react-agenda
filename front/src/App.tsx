import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Layout,
  App as AntApp,
  Popconfirm,
  Row,
  Table,
  TableProps,
  message,
} from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import Link from "antd/es/typography/Link";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { AvatarUser } from "./components/atoms/AvatarUser";
import { DrawerApp } from "./components/atoms/Drawer";
import { PageInfo } from "./components/molecules/PageInfo";
import { IUser } from "./interfaces";
import { addUser, deleteUser, getUsers } from "./services/services";

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { modal } = AntApp.useApp();

  const columns: TableProps<IUser>["columns"] = [
    {
      width: "15%",
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (_, userData) => (
        <Row align="middle">
          <Col>
            <AvatarUser userPhoto={userData.photo} />
          </Col>
          <Col style={{ marginLeft: 30 }}>
            <Link onClick={() => showUserInfo(userData)}>{userData.name}</Link>
          </Col>
        </Row>
      ),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Acciones",
      key: "action",
      align: "center",
      render: (_, userData) => (
        <Popconfirm
          title={`¿Desea eliminar a ${userData.name}?`}
          onConfirm={() => handleRemoveUser(userData.id)}
          okText="Aceptar"
          cancelText="Cancelar"
        >
          <Button type="text" shape="circle" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const handleRemoveUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      messageApi.open({
        type: "success",
        content: "Usuario eliminado correctamente",
      });
      fetchData();
    } catch (error) {
      modal.error({
        title: "Ha ocurrido un error",
        content: <>No se pudo eliminar al Usuario</>,
        okText: "Cerrar",
      });
    }
  };

  const handleAddUser = async (userData: IUser) => {
    try {
      await addUser(userData);
      closeDrawer();
      messageApi.open({
        type: "success",
        content: "Usuario agregado correctamente",
      });
      fetchData();
    } catch (error) {
      modal.error({
        title: "Ha ocurrido un error",
        content: <>No se pudo agregar al Usuario</>,
        okText: "Cerrar",
      });
    }
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    const filteredUsers = users.filter(
      (user) =>
        user.name.toUpperCase().includes(value.toUpperCase()) ||
        user.description.toUpperCase().includes(value.toUpperCase())
    );
    setFilteredUsers(filteredUsers);
  };

  const showUserInfo = (user: IUser) => {
    modal.info({
      title: <Col style={{ marginLeft: 10 }}>{user.name}</Col>,
      content: <Col style={{ marginLeft: 10 }}>{user.description}</Col>,
      okText: "Cerrar",
      icon: (
        <Col span={4}>
          <AvatarUser userPhoto={user.photo} />
        </Col>
      ),
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const users = await getUsers();
      if (users) {
        setUsers(users);
        setFilteredUsers(users);
      }
    } catch (error: unknown) {
      console.error("Error al obtener la lista de usuarios", error);
      modal.error({
        title: "Ha ocurrido un error",
        content: <>No se pudo obtener la lista de Usuarios</>,
        okText: "Cerrar",
      });
    }
  }, [modal]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {contextHolder}
      <Layout
        style={{
          minHeight: "100vh",
          backgroundColor: "white",
          textAlign: "left",
        }}
      >
        <DrawerApp
          open={openDrawer}
          onClose={closeDrawer}
          onAccept={handleAddUser}
          title="Agregar nuevo Contacto"
        />

        <PageInfo />

        <Row>
          <Col span={24} style={{ marginTop: 30 }}>
            <Button
              style={{
                paddingBottom: 15,
                paddingTop: 15,
                display: "flex",
                alignItems: "center",
              }}
              type="primary"
              icon={<PlusOutlined />}
              onClick={showDrawer}
            >
              Agregar Contacto
            </Button>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Search
              allowClear
              onSearch={onSearch}
              placeholder="Buscar Usuario"
              style={{
                width: "100%",
                paddingBottom: 20,
                paddingTop: 20,
                display: "flex",
                alignItems: "center",
              }}
            />
          </Col>
          <Col span={24}>
            <Divider />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Table
              locale={{ emptyText: "Sin información" }}
              columns={columns}
              dataSource={filteredUsers}
              rowKey={"id"}
            />
          </Col>
        </Row>
      </Layout>
    </>
  );
}

export default App;
