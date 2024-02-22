import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Space, Form } from 'antd';

import FormComponent from '../form/form'; // Importa el componente de formulario y cambia el nombre para evitar conflictos

/**
 * Propiedades opcionales que puede recibir el componente App.
 */
interface Props {
    // Define aquí las propiedades opcionales que puede recibir el componente App
}

/**
 * Componente funcional que representa la aplicación principal.
 */
const App: React.FC<Props> = ({}) => {
    // Estado para controlar la apertura y cierre del cajón
    const [open, setOpen] = useState(false);
    // Instancia del formulario
    const [form] = Form.useForm();

    /**
     * Función para mostrar el cajón.
     */
    const showDrawer = () => {
        setOpen(true);
    };

    /**
     * Función para cerrar el cajón.
     */
    const onClose = () => {
        setOpen(false);
    };

    /**
     * Función para manejar el envío del formulario.
     * Llama al método submit del formulario.
     */
    const onFinish = () => {
        form.submit();
    };

    return (
        <>
            <Space>
                {/* Botón para mostrar el cajón */}
                <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>
                    Agregar Contacto
                </Button>
            </Space>
            {/* Cajón para agregar un nuevo contacto */}
            <Drawer
                title="Agregar nuevo Contacto"
                width={500}
                onClose={onClose}
                open={open}
                // Botones adicionales en el cajón
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancelar</Button>
                        {/* Botón para guardar el formulario */}
                        <Button type="primary" onClick={onFinish}>
                            Guardar
                        </Button>
                    </Space>
                }
            >
                {/* Componente de formulario */}
                <FormComponent functionSubmit={onClose} form={form} />
            </Drawer>
        </>
    );
};

export default App;
