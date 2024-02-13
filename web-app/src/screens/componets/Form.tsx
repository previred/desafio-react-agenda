import { Button, Col, Drawer, Form, Input, Row, Space, notification } from "antd";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interface";
import { addUser, setOpen, setSelectedUser, updateUser } from "../../redux/actions/contacts";
import { fetchWithoutToken } from "../../utils/fetch";
import Loading, { LoadingRefObject } from "../../components/loading";


export const UserForm: React.FC = () => {
    const { users, open, selectedUser } = useSelector((state: RootState) => state.contacts);
    const loadingRef = useRef<LoadingRefObject>(null);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        console.log("selectedUser", selectedUser)
        if (selectedUser) {
            const selected = users.find(f => f.id === selectedUser);
            if (selected) form.setFields([{ name: 'name', value: selected.name }, { name: 'photo', value: selected.photo }, { name: 'description', value: selected.description }]);
        }
    }, [selectedUser, users, dispatch, form]);

    const onCancel = () => {
        form.resetFields();
        dispatch(setOpen(false));
        dispatch(setSelectedUser(null));
    }

    const onSubmit = useCallback(() => {
        form
            .validateFields()
            .then(async (values) => {
                console.log(values);

                loadingRef.current?.setActive(true); // * Mostrar loading
                // * Nuevo contacto
                if (!selectedUser) {
                    fetchWithoutToken('users', values, 'POST').then(({ ok, data, message }) => {
                        if (ok) {
                            dispatch(setOpen(false));
                            dispatch(setSelectedUser(null));
                            form.resetFields();
                            notification.success({ message: 'Contacto creado con éxito', placement: 'top' });
                            dispatch(addUser(data));
                        }
                        else notification.error({ message: 'Error al crear contacto', description: message, placement: 'top' });
                    }).finally(() => loadingRef.current?.setActive(false))
                }
                // * Actualizar contacto
                else {
                    fetchWithoutToken(`users/${selectedUser}`, { ...values, id: selectedUser }, 'PUT').then(({ ok, data, message }) => {
                        if (ok) {
                            dispatch(setOpen(false));
                            dispatch(setSelectedUser(null));
                            form.resetFields();
                            notification.success({ message: 'Contacto actualizado con éxito', placement: 'top' });
                            dispatch(updateUser(data));
                        }
                        else notification.error({ message: 'Error al actualizar contacto', description: message, placement: 'top' });
                    }).finally(() => loadingRef.current?.setActive(false))
                }
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }, [selectedUser, dispatch, form])

    return (
        <Drawer
            title="Agregar nuevo Contacto"
            open={open}
            width={'auto'}
            style={{ minWidth: 500 }}
            onClose={onCancel}
            extra={
                <Space>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={onSubmit} type="primary">{selectedUser ? 'Actualizar' : 'Guardar'}</Button>
                </Space>
            }
        >
            <Loading ref={loadingRef} />
            <Form layout="vertical" form={form}>
                <Row gutter={[0, 20]}>
                    <Col span={24}>
                        <Form.Item
                            name="photo"
                            label="URL imagen de Perfil"
                            rules={[{ required: true, message: 'Por favor ingrese url' }]}
                        >
                            <Input
                                style={{ width: '100%' }}
                                placeholder="Inserte la URL de la imagen de perfil"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Nombre"
                            rules={[{ required: true, message: 'Por favor ingrese nombre' }]}
                        >
                            <Input placeholder="Escriba el nombre del contacto" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Descripción"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese descripción',
                                },
                            ]}
                        >
                            <Input.TextArea rows={2}
                                placeholder="Agregue la descripción del contacto"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </Drawer>
    )

}