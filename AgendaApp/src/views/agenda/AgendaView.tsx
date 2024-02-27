// Importaciones de React, Ant Design UI components, y iconos para la interfaz de usuario.
import { FC, ReactElement } from "react";
import { Typography, Button, Divider, Space, Avatar, Form } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

// Importaciones de componentes y layouts personalizados para construir la página.
import DashboardLayout from "../../layouts/DashboardLayout.tsx";
import DataTable from "../../components/DataTable.tsx";
import CustomDrawer from "../../components/CustomDrawer.tsx";
import AddContactButton from "../../components/AddContactButton.tsx";
import SearchInput from "../../components/SearchInput.tsx";

// Importación de la interfaz de usuario para tipado y validación.
import { IUser } from "../../interfaces/IUser.ts";

// Importaciones de hooks personalizados para manejar la lógica de negocio y el estado.
import { useUsers } from "../../hooks/useUsers";
import { useUserMutation } from "../../hooks/useUserMutation";
import { usePagination } from "../../hooks/usePagination";
import { useDrawer } from "../../hooks/useDrawer.ts";

import CrearUserForm from "./CrearUserForm.tsx";

// Definición de las columnas para el componente DataTable.
const columns = [
  // Columna para mostrar el nombre del usuario con un avatar.
  {
    key: "nombre",
    title: "Nombre",
    dataIndex: "name",
    render: (_: unknown, user: IUser) => (
      <Space size="middle">
        <Avatar src={user.photo} />
        <Typography.Text style={{ color: "blue" }}>{user.name}</Typography.Text>
      </Space>
    ),
    width: "20%",
  },
  // Columna para la descripción del usuario.
  {
    key: "descripcion",
    title: "Descripcion",
    dataIndex: "description",
    width: "70%",
  },
  // Columna de acciones.
  {
    key: "acciones",
    title: "Acciones",
    dataIndex: "acciones",
    render: () => <DeleteOutlined style={{ fontSize: "20px" }} />,
    width: "10%",
    align: "center" as const,
  },
];

// Componente principal AgendaView que muestra la lista de usuarios y permite interacciones.
const AgendaView: FC = (): ReactElement => {
  // Inicialización de form para gestión de formulario y estado de paginación.
  const [form] = Form.useForm();
  const { page, setPage, limit, setLimit, search, setSearch } = usePagination();
  const users = useUsers({ page, limit, search });
  const userMutation = useUserMutation();

  // Estado y funciones para controlar la apertura/cierre del drawer.
  const { state, dispatch } = useDrawer();

  // Función para manejar la búsqueda de contactos.
  const handleSearch = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  // Función para cambiar la paginación.
  const onChangePaginator = (page: number, limit: number) => {
    setPage(page);
    setLimit(limit);
  };

  // Cierra el drawer y reinicia los campos del formulario.
  const onCloseDrawer = () => {
    form.resetFields();
    dispatch({ type: "DRAWER_CLOSE" });
  };

  // Gestiona el envío del formulario para crear un contacto.
  const submitForm = async (values: IUser) => {
    await userMutation.mutate(
      {
        photo: values.photo,
        name: values.name,
        description: values.description,
      },
      {
        onSuccess: () => {
          form.resetFields();
          alert("El contacto ha sido creado");
        },
        onError: (error) => {
          alert("Se ha producido un error al crear el contacto: " + error);
        },
      }
    );
  };

  // Renderizado del componente, incluyendo el layout, búsqueda, tabla de datos y drawer.
  return (
    <>
      <DashboardLayout
        title={"Agenda Previred - Mí agenda de contactos laboral"}
        subtitle={
          "Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar nuevos contactos y eliminar contactos no deseados."
        }
      >
        <AddContactButton onClick={() => dispatch({ type: "DRAWER_OPEN" })} />
        <SearchInput onSearch={handleSearch} />
        <Divider />
        {/* Muestra la lista de contactos. */}
        <DataTable
          rowKey={"id"}
          dataSource={users.data?.data || []}
          columns={columns}
          isLoading={users.isLoading}
          pageCurrent={page}
          totalCount={users.data?.headers["x-total-count"]}
          pageSize={limit}
          onChange={(page, pageSize) => onChangePaginator(page, pageSize)}
        />
        {/* Drawer para agregar contactos */}
        <CustomDrawer
          title={"Agregar Nuevo Contacto"}
          isOpen={state.isOpen}
          onClose={onCloseDrawer}
          extra={
            <Space>
              <Button onClick={onCloseDrawer}>Cancelar</Button>
              <Button type="primary" onClick={() => form.submit()}>
                Guardar
              </Button>
            </Space>
          }
        >
          {/* Formulario para agregar contactos */}
          <CrearUserForm form={form} onSubmit={submitForm} />
        </CustomDrawer>
      </DashboardLayout>
    </>
  );
};

export default AgendaView;
