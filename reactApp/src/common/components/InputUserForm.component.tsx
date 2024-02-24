import { FC } from 'react'
import { Form, Input } from 'antd'
import { IUser } from '../../interfaces/IUser'

interface IInputUserFormComponentProps {
    label: string
    name: keyof IUser
    placeholder: string
    requiredMessage: string
}

export const InputUserFormComponent: FC<IInputUserFormComponentProps> = ({ label, name, placeholder, requiredMessage }) => {
    return (
        <>
            <Form.Item<Partial<IUser>>
                label={label}
                name={name}
                rules={[{ required: true, message: requiredMessage }]}
            >
                <Input placeholder={placeholder} />
            </Form.Item>
        </>
    )
}
