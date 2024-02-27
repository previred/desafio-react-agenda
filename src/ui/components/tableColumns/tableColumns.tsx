import React from 'react';
import { Avatar } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { User } from '../../../models/models';

// Definición de la función que maneja la eliminación, pasada como parámetro
export const getColumns = (handleDelete: (id: number) => void) => [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        render: (_: any, record: User) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={record.photo} style={{ marginRight: 8 }} />
                {record.name}
            </div>
        ),
    },
    {
        title: 'Descripción',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Acciones',
        key: 'actions',
        render: (_: any, record: User) => (
            <DeleteOutlined onClick={() => handleDelete(record.id)} style={{ color: 'red', cursor: 'pointer' }} />
        ),
    },
];
