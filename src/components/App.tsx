import { FC, ReactElement } from "react"
import { Layout, theme, Typography } from "antd"

import './app.css'
import { UsersProvider } from "../context"
import { UsersTable } from "./UsersTable.tsx"
import { FilterResults } from "./FilterResults.tsx"
import { NewUser } from "./NewUser.tsx"

const App: FC = () : ReactElement => {
    const { token: { colorBgContainer }} = theme.useToken()

    return (
        <UsersProvider>
            <Layout>
                <Layout.Content style={{
                    background: colorBgContainer,
                    padding: '0 48px'
                }} >
                    <Typography.Title level={2}>
                        Agenda Previred - Mi agenda de contactos laboral
                    </Typography.Title>
                    <Typography.Paragraph>
                        Aqui podrá encontrar o buscar todos sus contactos agregados, agregar nuevos contactos, y
                        eliminar contactos no deseados.
                    </Typography.Paragraph>

                    <NewUser />

                    <FilterResults />

                    <UsersTable />
                </Layout.Content>
            </Layout>
        </UsersProvider>
    )
}

export default App
