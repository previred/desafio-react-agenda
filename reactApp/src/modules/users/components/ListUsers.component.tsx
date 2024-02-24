import { Avatar, Space, TableProps, Typography } from 'antd'
import { FC } from 'react'
import { IUser } from '../../../interfaces/IUser'
import { DeleteUserButtonComponent } from './DeleteUserButton.component'
import { DatatableComponent, SearchInputComponent } from '../../../common/components'
import { useListUsers } from '../hooks'

const columns: TableProps<IUser>['columns'] = [
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

export const ListUsersComponent: FC = () => {

    //Ocupamos nuestro hook useListUser para obtener la data de usuarios, si está cargando y la función para setear la búsqueda
    const { users, loading, setSearchValue } = useListUsers()

    return (
        <>
            <SearchInputComponent isLoading={loading} setValue={setSearchValue} />
            <DatatableComponent columns={columns} data={users} isLoading={loading} />
        </>
    )
}
