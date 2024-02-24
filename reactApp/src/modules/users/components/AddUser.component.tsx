import { FC, useMemo } from 'react'
import { Button, Form, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { DrawerComponent, InputUserFormComponent } from '../../../common/components'
import { useCreateUser } from '../hooks'

export const AddUserComponent: FC = () => {

    //Usamos nuestro custom hook para crear un usuario
    const { form, opened, handleOpenDrawer, handleCloseDrawer, submitForm } = useCreateUser()

    //Pequeño componente para los actions del Drawer que lo guardamos con useMemo
    const Actions = useMemo(() => <Space>
        <Button onClick={handleCloseDrawer}>Cancelar</Button>
        <Button type="primary" onClick={form.submit}>
            Guardar
        </Button>
    </Space>, [])

    return (
        <>
            <DrawerComponent title="Agregar contacto" onClose={handleCloseDrawer} opened={opened} actions={Actions}>
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    onFinish={submitForm}
                    autoComplete="off"
                >

                    <InputUserFormComponent
                        label="URL imagen de Perfil"
                        name="photo"
                        placeholder="Inserte la URL de la imagen de perfil"
                        requiredMessage="Ingresa la URL de la imagen de perfil" />


                    <InputUserFormComponent
                        label="Nombre"
                        name="name"
                        placeholder="Escriba el nombre del contacto"
                        requiredMessage="Ingresa el nombre del contacto"
                    />

                    <InputUserFormComponent
                        label="Descripción"
                        name="description"
                        placeholder="Agregue la descripción del contacto"
                        requiredMessage="Ingresa la descripción del contacto"
                    />

                </Form>
            </DrawerComponent>
            <div style={{ paddingBottom: 20 }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenDrawer}>
                    Agregar contacto
                </Button>
            </div>
        </>
    )
}
