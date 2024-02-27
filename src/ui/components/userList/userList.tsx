// src/components/UserList.tsx
import React, { useEffect, useState } from 'react';
import { Avatar, Table, Input, Modal, notification } from 'antd';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useUsers } from '../../../contex/userContext';
import { User } from '../../../models/models';
import { getColumns } from '../tableColumns/tableColumns';

import './userlist.css'

const { confirm } = Modal;

const UserList = () => {
    const { users, fetchUsers, deleteUser } = useUsers();
    const [page, setPage] = useState(1);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const limit = 12;

    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    const handleSearch = (value: string) => {
        const lowercasedValue = value.toLowerCase();
        const filteredData = users.filter((user) =>
            user.name.toLowerCase().includes(lowercasedValue)
        );
        setFilteredUsers(filteredData);
    };

    const handleDelete = (userId: number) => {
        confirm({
            title: '¿Estás seguro de que quieres eliminar este usuario?',
            icon: <ExclamationCircleFilled />,
            content: 'Esta acción no se puede deshacer :/',
            async onOk() {
                try {
                    await deleteUser(userId);
                    notification.success({
                        message: 'Usuario eliminado',
                        description: 'El usuario se ha eliminado con éxito.',
                    });

                    await fetchUsers(page, limit);
                } catch (error) {
                    notification.error({
                        message: 'Error al eliminar usuario',
                        description: 'No se pudo eliminar el usuario. Por favor, inténtelo de nuevo más tarde.',
                    });
                }
            },
            onCancel() {
                console.log('Cancelado');
            },
        });
    };

    const columns = getColumns(handleDelete);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchUsers(page, limit);
                setError(null);
            } catch (error) {
                setError('lo sentimos ! hubo un error intente mas tarde');
            }
        };

        fetchData();
    }, [page, limit]);

   

    return (
        <div className="userList-container">
            {error && <div className="error-message">Error: {error}</div>}
            <Input.Search
                className="userList-search"
                placeholder="Buscar por nombre..."
                allowClear
                enterButton="Buscar"
                size="large"
                onSearch={handleSearch}
            />
            <Table
                columns={columns}
                dataSource={filteredUsers}
                rowKey="id"
                pagination={{
                    current: page,
                    pageSize: limit,
                    onChange: (page) => setPage(page),
                }}
            />
        </div>
    );
};

export default UserList;
