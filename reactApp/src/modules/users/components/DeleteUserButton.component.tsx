import { FC } from 'react'
import { Button, Popconfirm, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { IUser } from '../../../interfaces/IUser'
import { useDeleteUser } from '../hooks'

interface IDeleteUserButtonComponentProps {
    user: IUser
}

export const DeleteUserButtonComponent: FC<IDeleteUserButtonComponentProps> = ({ user }) => {

    //Usamos nuestro custom hook para borrar un usuario
    const { handleConfirm } = useDeleteUser(user)    

    return (
        <>
            <Popconfirm
                title="Eliminar usuario"
                description="¿Estás seguro de eliminar este usuario?"
                onConfirm={handleConfirm}
                onCancel={() => console.log('Se cancela el eliminar usuario')}
                okText="Si"
                cancelText="No"
                placement="left"
            >
                <Tooltip title="Eliminar usuario">
                    <Button shape="circle" icon={<DeleteOutlined />} />
                </Tooltip>
            </Popconfirm>

        </>
    )
}
