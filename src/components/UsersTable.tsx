import { FC, ReactElement } from "react"
import { Avatar, Space, Table, TableProps } from "antd"
import { DeleteOutlined, UserOutlined } from "@ant-design/icons"

import { useUsersContext } from "../context"
import { User } from "../services/UsersApi.ts"

const columns: TableProps<User>['columns'] = [
    {
        title: 'Nombre',
        key: 'name',
        render: (_, record) => (
            <Space size="middle">
                <Avatar
                    size={48}
                    src={record.photo}
                    // UserOutlined icon as an image fallback
                    icon={<UserOutlined />}
                />
                <a>{record.name}</a>
            </Space>
        )
    }, {
        title: 'Descripción',
        dataIndex: 'description',
    }, {
        title: 'Acciones',
        key: 'id',
        render: (_, record) => (
            <DeleteOutlined
                style={{ fontSize: '24px' }}
                onClick={ () => console.log('delete ', record.id)}
            />
        )
    }
]

const UsersTable: FC = (): ReactElement => {
    const { tableUsers, tablePagination, fetchPage } = useUsersContext()
    return (
        <Table
            columns={columns}
            rowKey={'id'}
            dataSource={tableUsers}
            pagination={{
                ...tablePagination,
                onChange: (newPage) => fetchPage(newPage)
            }}
        />
    )
}

export { UsersTable }
