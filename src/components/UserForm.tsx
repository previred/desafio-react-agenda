import { FC, ReactElement } from "react"
import { Form, Input } from "antd"
import { FormInstance } from "antd/es/form/hooks/useForm"

interface UserFormProps {
    formInstance: FormInstance
    submitHandler: (data: UserFormState) => void
}

interface UserFormState {
    name: string
    description: string
    photo: string
}

const INITIAL_VALUES: UserFormState = {
    name: '',
    description: '',
    photo: '',
}

export const UserForm: FC<UserFormProps> = ({ formInstance, submitHandler }): ReactElement => {
    const requiredFieldRule = { required: true, message: "Campo obligatorio" }

    return (
        <Form
            form={formInstance}
            initialValues={INITIAL_VALUES}
            autoComplete="off"
            layout="vertical"
            onFinish={submitHandler}
        >
            <Form.Item name="photo" label="URL imagen de Perfil" rules={[requiredFieldRule]}>
                <Input placeholder="Inserte la URL de la imagen de perfil"></Input>
            </Form.Item>

            <Form.Item name="name" label="Nombre" rules={[requiredFieldRule]}>
                <Input placeholder="Escriba el nombre de contacto"></Input>
            </Form.Item>

            <Form.Item name="description" label="Descripción" rules={[requiredFieldRule]}>
                <Input placeholder="Agregue la descripción del contacto"></Input>
            </Form.Item>
        </Form>
    )
}