import { FC } from 'react'
import { Drawer } from 'antd'

interface IDrawerComponentProps {
    title: string
    opened: boolean
    onClose: () => void
    children: React.ReactNode
    actions: React.ReactNode
}

//Creamos componente reutilizable
export const DrawerComponent: FC<IDrawerComponentProps> = ({ title, opened, onClose, children, actions }) => {
    return (
        <>
            <Drawer
                title={title}
                placement="right"
                width={500}
                onClose={onClose}
                open={opened}
                extra={actions}
            >
                {children}
            </Drawer>
        </>
    )
}
