import { FC, ReactElement, useState } from "react"
import { Button, Drawer, Form, Space } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { FormInstance } from "antd/es/form/hooks/useForm"

import { UserForm } from "./UserForm.tsx"
import { useUsersContext } from "../context"
import { CreateUserBody } from "../services/UsersApi.ts"

interface NewUserProps {
    showSuccess: (content: string) => void
    showError: (content: string) => void
}

export const NewUser: FC<NewUserProps> = ({ showSuccess, showError}): ReactElement => {
    const { createUser } = useUsersContext()
    const [form]: [FormInstance] = Form.useForm()
    const [open, setOpen] = useState<boolean>(false)

    const showDrawer = () => setOpen(true)
    const hideDrawer = () => {
        setOpen(false)
        form.resetFields()
    }

    const submitHandler = (body: CreateUserBody): void => {
        createUser(body)
            .then(() => {
                showSuccess(`Usuario "${body.name}" creado`)
                hideDrawer()
            })
            .catch(() => {
                showError("Ocurrio un error al enviar el formulario")
            })
    }

    return (
        <>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showDrawer}
            >
                Agregar Contacto
            </Button>

            <Drawer
                title="Agregar un nuevo contacto"
                onClose={hideDrawer}
                open={open}
                width={600}
                extra={
                    <Space>
                        <Button onClick={hideDrawer}>
                            Cancelar
                        </Button>
                        <Button type="primary" onClick={form.submit}>
                            Guardar
                        </Button>
                    </Space>
                }
            >
                <UserForm
                    formInstance={form}
                    submitHandler={submitHandler}
                />
            </Drawer>
        </>
    )
}
