import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Modal, Space, Table, TableProps, notification } from "antd";
import Search from "antd/es/input/Search";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../interface";
import { deleteUser, setOpen, setSelectedUser } from "../redux/actions/contacts";
import { IUser } from "../redux/types/contacts";
import { fetchWithoutToken } from "../utils/fetch";
import { UserForm } from "./componets/Form";
import Loading, { LoadingRefObject } from "../components/loading";

const ListScreen: React.FC = () => {
    const dispatch = useDispatch();
    const loadingRef = useRef<LoadingRefObject>(null);
    const { users } = useSelector((state: RootState) => state.contacts);
    const [pattern, setPattern] = useState<string | undefined>(undefined);

    const onAddContact = () => {
        dispatch(setOpen(true));
    }

    const onEditContact = useCallback((id: IUser['id']) => {
        dispatch(setOpen(true));
        dispatch(setSelectedUser(id));
    }, [dispatch]);

    const onDeleteContact = useCallback((id: IUser['id']) => {
        // * Validar que el contacto existe en lista de usuarios
        const contact = users.find(f => f.id === id);
        if (!contact) {
            notification.warning({ message: 'Acción inválida', description: 'No es posible eliminar el contacto porque no existe en la lista', placement: 'top' })
            return;
        }

        // * Levanta modal de confirmación
        Modal.confirm({
            title: 'Eliminar contacto',
            content: `¿Estas seguro de eliminar a ${contact.name} de tu lista de contactos?`,
            cancelText: 'Cancelar',
            okText: 'Aceptar',
            onOk: () => {
                loadingRef.current?.setActive(true);
                fetchWithoutToken(`users/${id}`, {}, 'DELETE').then(({ ok, message }) => {
                    if (ok) {
                        dispatch(deleteUser(id));
                        notification.success({ message: 'Contacto eliminado', placement: 'top' });
                    }
                    else notification.error({ message: 'Error al eliminar', description: message, placement: 'top' });
                }).finally(() => loadingRef.current?.setActive(false))
            }
        })
    }, [users, dispatch]);

    const columns: TableProps['columns'] = useMemo(() => [
        { key: 'id', dataIndex: 'id', title: 'ID' },
        { key: 'name', dataIndex: 'name', title: 'Nombre', width: 200, render: (val, { id, photo }) => <Space><Avatar src={photo} /><Link to={`/users/${id}`}>{val}</Link></Space> },
        { key: 'description', dataIndex: 'description', title: 'Descripción' },
        {
            key: 'action', dataIndex: 'action', title: 'Acciones', render: (_, { id }) =>
                <Space>
                    <Button onClick={() => onEditContact(id)} type="text" icon={<EditOutlined />} />
                    <Button onClick={() => onDeleteContact(id)} type="text" icon={<DeleteOutlined />} />
                </Space>
        },
    ], [onDeleteContact, onEditContact]);

    const data: IUser[] = useMemo(() => {
        if (pattern && pattern?.length > 2) {
            const lowerPattern = pattern.toLowerCase();
            const filtered = users.filter(f => (f.name.toLowerCase()).includes(lowerPattern) || (f.description.toLowerCase()).includes(lowerPattern));
            return filtered.map(d => ({ ...d, key: d.id }))
        }
        return users.map(d => ({ ...d, key: d.id }))
    }, [users, pattern])

    return (
        <div>
            <h1>Agenda Previred - Mi agenda de contactos laboral</h1>
            <p>Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar nuevos contactos y eliminar contactos no deseados.</p>

            <Button icon={<PlusOutlined />} type="primary" onClick={onAddContact}>Agregar Contacto</Button>
            <br />
            <br />
            <Search
                placeholder="Buscar contacto por nombre o descripción"
                pattern={pattern}
                onChange={e => setPattern(e.target.value)}
                onSearch={val => setPattern(val)}
                allowClear
            />

            <Divider />

            <Table
                columns={columns}
                dataSource={data}
            />

            <Loading ref={loadingRef} />
            <UserForm />
        </div>
    )
}


export default ListScreen;