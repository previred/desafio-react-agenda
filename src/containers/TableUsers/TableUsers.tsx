import { useEffect, useState } from "react";
import { TableProps } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { Alert } from "antd";

import type { ColumnsType } from "./TableUsers.type";

import Table from "../../components/Table/Table";
import { Typography } from "../../components/Typography";
import { Button } from "../../components/Button";
import { Avatar } from "../Avatar/Avatar";
import { useUsers } from "../../hook/useUser";

export const TableUsers = () => {
  const { loadUserList, deleteUserById, userList } = useUsers();
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
        <Alert
          message="Contacto eliminado con exito"
          type="success"
          closable
          onClose={() => setShowAlert(false)}
        />
      )}
      <Table columns={columns} dataSource={userList} />
    </>
  );
};
