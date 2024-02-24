import { FC } from 'react'

import { Divider, Typography } from 'antd';

interface IMainLayoutProps {
    children: React.ReactNode
}

//Creamos un layour por si tenemos que ocuparlo más adelante y poder reutilizarlo
export const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
    return (
        <>
            <header>
                <Typography.Title>
                    Agenda Previred - Mi agenda de contactos laboral
                </Typography.Title>
                <Divider />
                <Typography.Title level={5}>
                    Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar nuevos contactos y eliminar contactos no deseados.
                </Typography.Title>
            </header>
            <div>
                {children}
            </div>
        </>
    )
}
