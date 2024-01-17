import React, { useContext, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { API_URL, getAllUsers } from '../ApiFunctions';
import { UserContext } from '../context/UserContext';

const RegistrationForm: React.FC = () => {
    const [open, setOpen] = useState(false);
    const usersContext = useContext(UserContext);
    const [newContact, setNewContact] = useState({
        id: '',
        photo: '',
        name: '',
        description: '',
    });

    // Define a function to handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewContact({ ...newContact, [name]: value });
    };

    // Define a function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Check if the form is empty
            if (newContact.photo.length === 0 || newContact.name.length === 0 || newContact.description.length === 0) {
                alert('Por favor complete todos los campos');
                return;
            }

            // Send a POST request to the server with the form data
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContact),
            });

            // Check if the request was successful (status code 2xx)
            if (response.ok) {
                alert('Nuevo contacto agregado!');
                const updatedUsers = await getAllUsers();
                usersContext.setUsers(updatedUsers);
                onClose();
            }
        } catch (error) {
            console.error('Error agregando contacto', error);
        }
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                Agregar Contacto
            </Button>
            <Drawer
                title="Agregar nuevo Contacto"
                width={720}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button onClick={handleSubmit} type="primary">
                            Guardar
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="URL imagen de perfil"
                                rules={[{ required: true, message: 'Por favor inserte el url' }]}
                            >
                                <Input
                                    placeholder="Inserte la URL de la imagen de perfil"
                                    type="text"
                                    name="photo"
                                    value={newContact.photo}
                                    onChange={handleInputChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Nombre"
                                rules={[{ required: true, message: 'Por favor escriba el nombre de contacto' }]}
                            >
                                <Input
                                    name="name"
                                    placeholder="Escriba el nombre de contacto"
                                    type="text"
                                    value={newContact.name}
                                    onChange={handleInputChange}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Descripcion"
                                rules={[{ required: true, message: 'Por favor agregue la descripcion del contacto' }]}
                            >
                                <Input
                                    name="description"
                                    placeholder="Agregue la descripcion del contacto"
                                    type="text"
                                    value={newContact.description}
                                    onChange={handleInputChange}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default RegistrationForm;