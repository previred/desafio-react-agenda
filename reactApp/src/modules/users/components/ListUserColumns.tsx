import { Avatar, Space, TableProps, Typography } from "antd"
import { IUser } from "../../../interfaces/IUser"
import { DeleteUserButtonComponent } from "."

export const ListUserColumns: TableProps<IUser>['columns'] = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        render: (_, user) => (
            <Space size="middle">
                <Avatar src={user.photo} />
                <Typography.Text style={{color: "#5198fc"}}>{user.name}</Typography.Text>
            </Space>
        ),
        width: '200px'
    },
    {
        title: 'Descripción',
        dataIndex: 'description',
        key: 'description'
    },
    {
        title: 'Acciones',
        key: 'actions',
        render: (_, user) => (
            <Space size="middle">
                <DeleteUserButtonComponent user={user} />
            </Space>
        )
    }
]