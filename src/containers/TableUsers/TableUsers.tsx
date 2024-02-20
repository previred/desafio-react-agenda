import { useContext, useEffect } from "react";
import { TableProps } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";

import Table from "../../components/Table/Table";
import type { ColumnsType } from "./TableUsers.type";
import { Typography } from "../../components/Typography";
import { Button } from "../../components/Button";
import { Avatar } from "../Avatar/Avatar";
import { UserContext } from "../../Context/context";
import { useUsers } from "../../hook/useUser";

export const TableUsers = () => {
  const { loadUserList } = useUsers();
  const { stateUsers } = useContext(UserContext);
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
      dataIndex: "acciones",
      key: "acciones",
      render: (id) => <Button id={id} icon={<DeleteOutlined />} />,
    },
  ];

  useEffect(() => {
    loadUserList();
  }, []);

  return <Table columns={columns} dataSource={stateUsers} />;
};
