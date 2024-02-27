// src/components/AddUserForm.tsx
import React from 'react';
import { Form, Input, Button, Drawer, Modal, notification } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useUsers } from '../../../contex/userContext';
import { User } from '../../../models/models';

interface AddUserFormProps {
    visible: boolean;
    onClose: () => void;
}

const { confirm } = Modal;

const AddUserForm: React.FC<AddUserFormProps> = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const { fetchUsers, createUser } = useUsers();

    const handleSubmit = async (values: User) => {
        confirm({
            title: '¿Estás seguro de que quieres crear un usuario?',
            icon: <ExclamationCircleFilled />,
            async onOk() {
                try {
                    await createUser(values);
                    notification.success({
                        message: 'Usuario creado',
                        description: 'El usuario se ha creado con éxito.',
                    });
                    form.resetFields();
                    fetchUsers(); 
                } catch (error) {
                    notification.error({
                        message: 'Error al crear usuario',
                        description: 'No se pudo crear el usuario. Por favor, inténtelo de nuevo más tarde.',
                    });
                }
            },
            onCancel() {
                console.log('Creación de usuario cancelada');
            },
        });
    };


    return (
        <Drawer
            title="Agregar Nuevo Usuario"
            width={720}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}

        >

            <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginBottom: '15px' }}>

                <Form.Item name="photo" label="Foto URL" rules={[
                    { required: true, message: 'Por favor, ingrese el link ' }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="Nombre" rules={[
                    { required: true, message: 'Por favor, ingrese el nombre del usuario.' }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Descripción" rules={[
                    { required: true, message: 'Por favor, la descripción' }
                ]}>
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </Drawer >
    );
};

export default AddUserForm;
