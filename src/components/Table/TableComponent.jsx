import { Table } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Button } from "antd";

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
      // console.log({ _, record });
      return (
        <Button
          shape="circle"
          type="text"
          icon={<DeleteOutlined />}
          size={"large"}
        />
      );
    },
  },
];
const data = [
  {
    key: "1",
    name: [
      "John Brown",
      "https://images.pexels.com/photos/157661/young-woman-shooting-model-157661.jpeg?h=350&auto=compress&cs=tinysrgb",
    ],
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    key: "2",
    name: [
      "John Brown",
      "https://images.pexels.com/photos/157661/young-woman-shooting-model-157661.jpeg?h=350&auto=compress&cs=tinysrgb",
    ],
    description: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: ["John Brown", ""],
    description: "Sydney No. 1 Lake Park",
  },
];
const TableComponent = () => <Table columns={columns} dataSource={data} />;
export default TableComponent;
