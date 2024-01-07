import React from "react";
import { Avatar, Popconfirm, Row, Table, Typography } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";

const { Link, Text } = Typography;

const UserTable = ({ onDelete, ...props }) => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (text, _record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "max-content",
          }}
        >
          <Avatar size='large' icon={<UserOutlined />} />
          <Link href='#' target='_blank' style={{ marginLeft: "10px" }}>
            {text}
          </Link>
        </div>
      ),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      render: (text, _record) => <Text type='secondary'>{text}</Text>,
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      align: "center",
      render: (_text, record) => (
        <Popconfirm
          title='¿Estás seguro de querer eliminar este usuario?'
          onConfirm={() => onDelete(record.id)}
          okText='Sí'
          cancelText='No'
        >
          <DeleteOutlined
            style={{
              color: "#5d5d5d",
              fontSize: 24,
              margin: "auto",
              cursor: "pointer",
            }}
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table {...props} columns={columns} rowKey='id' style={{ width: "100%" }} />
  );
};

export default UserTable;
