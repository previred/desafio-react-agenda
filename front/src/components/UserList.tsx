import { Avatar, Table, Typography, Modal, notification } from 'antd';
import type { TableProps } from 'antd';
import { UserOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { User } from '../users/domain/User';
import { createApiUserRepository } from '../users/infrastructure/ApiUserRepository';

const { Link, Text } = Typography;

interface UserListProps {
  users: User[];
}

const UserList : React.FC<UserListProps> = ({ users }) => {
  const [api, contextHolderNotification] = notification.useNotification();

  const openNotification = (description: string) => {
    api.open({
      message: 'Contacto eliminado',
      description: description,
      duration: 2,
    });
  };
  const [modal, contextHolderModal] = Modal.useModal();

  const confirm = (id: number, name: string) => {
    modal.confirm({
      title: 'Atención',
      icon: <ExclamationCircleOutlined />,
      content: `Está seguro que desea eliminar a ${name} de su agenda?`,
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      onOk() {
        handleDeleteUser(id, name);
      },
    });
  };

  const handleDeleteUser = async (id: number, name: string) => {
    console.log(id);
    createApiUserRepository().delete(id);
    openNotification(`${name} se eliminó correctamente de tu agenda.`);   
  };

  const columns: TableProps<User>['columns'] = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text, data) => (
        <div style={{ display: "flex", alignItems: "center", width: "max-content", }}>
          <Avatar 
            size='large' 
            icon={data.photo ? <img src={data.photo} alt="Avatar" /> : <UserOutlined />}
          />
          <Link href='#' target='_blank' style={{ marginLeft: "10px" }}>{text}</Link>
        </div>
      ),
    },{
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <Text type='secondary'>{text}</Text>,
    },{
      title: 'Acciones',
      key: 'action',
      render: (text) => (
        <DeleteOutlined
          onClick={() => confirm(text.id, text.name)}
          style={{
            color: "#3d3d3d",
            fontSize: 20,
            margin: "auto",
            cursor: "pointer",
          }}
        />
      ),
    },
  ];

 

  return (
    <>
      {contextHolderModal}
      {contextHolderNotification}
      <Table columns={ columns } dataSource={ users } rowKey='id' pagination={{ pageSize: 6 }} style={{ width: "100%" }} />
    </>
  );
};

export default UserList;
