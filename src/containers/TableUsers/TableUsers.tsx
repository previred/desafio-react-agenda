import { useContext, useEffect, useState } from "react";
import { TableProps } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { Alert } from "antd";

//TODO: ORDERNAR IMPORT
import Table from "../../components/Table/Table";
import type { ColumnsType } from "./TableUsers.type";
import { Typography } from "../../components/Typography";
import { Button } from "../../components/Button";
import { Avatar } from "../Avatar/Avatar";
import { UserContext } from "../../Context/context";
import { useUsers } from "../../hook/useUser";

export const TableUsers = () => {
  const { loadUserList, deleteUserById } = useUsers();
  const { stateUsers } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);

  const deleteUser = (id: string) => {
    deleteUserById(id).then((res) => {
      loadUserList();
      if (res == 200) {
        setShowAlert(true);
      }
    });
  };

  const columns: TableProps<ColumnsType>["columns"] = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (name, columns) => (
        <Avatar name={name} urlPhoto={columns.photo} />
      ),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      render: (text) => <Typography type="text" label={text} />,
    },
    {
      title: "Acciones",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button
          id={id}
          icon={<DeleteOutlined />}
          onClick={() => deleteUser(id)}
        />
      ),
    },
  ];

  useEffect(() => {
    loadUserList();
  }, []);

  return (
    <>
      {showAlert && (
        <Alert message="Contacto eliminado con exito" type="success" closable />
      )}
      <Table columns={columns} dataSource={stateUsers.usersList} />
    </>
  );
};
