import PropTypes from "prop-types";
import { Table } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Button } from "antd";

const TableComponent = ({
  dataSource,
  current,
  pageSize,
  total,
  onChange,
  loading,
  onDelete,
}) => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      width: "200px",
      render: (name) => {
        return (
          <div>
            {name[1] ? (
              <Avatar size="large" src={name[1]} />
            ) : (
              <Avatar size="large" icon={<UserOutlined />} />
            )}
            <a style={{ marginLeft: "1rem" }}>{name[0]}</a>
          </div>
        );
      },
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "key",
      render: (_, record) => {
        return (
          <Button
            shape="circle"
            type="text"
            icon={<DeleteOutlined />}
            size={"large"}
            onClick={() => onDelete(record.key)} // Llama a onDelete con el id del registro
          />
        );
      },
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{ current, pageSize, total }}
      onChange={onChange}
      loading={loading}
    />
  );
};

TableComponent.propTypes = {
  dataSource: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default TableComponent;
