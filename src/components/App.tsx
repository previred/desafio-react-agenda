import { FC, ReactElement } from "react"
import { Layout, message, theme, Typography } from "antd"

import './app.css'
import { UsersProvider } from "../context"
import { UsersTable } from "./UsersTable.tsx"
import { FilterResults } from "./FilterResults.tsx"
import { NewUser } from "./NewUser.tsx"

const App: FC = () : ReactElement => {
    const { token: { colorBgContainer }} = theme.useToken()
    const [messageApi, messageContextHolder] = message.useMessage()

    const showSuccessMessage = (content: string) => messageApi.open({ type: "success", content, duration: 3})
    const showErrorMessage = (content: string) => messageApi.open({ type: "error", content, duration: 3 })


    return (
        <UsersProvider>
            <Layout>
                <Layout.Content style={{
                    background: colorBgContainer,
                    padding: '0 48px'
                }} >
                    {messageContextHolder}

                    <Typography.Title level={2}>
                        Agenda Previred - Mi agenda de contactos laboral
                    </Typography.Title>
                    <Typography.Paragraph>
                        Aqui podrá encontrar o buscar todos sus contactos agregados, agregar nuevos contactos, y
                        eliminar contactos no deseados.
                    </Typography.Paragraph>

                    <NewUser showSuccess={showSuccessMessage} showError={showErrorMessage} />

                    <FilterResults />

                    <UsersTable showSuccess={showSuccessMessage} showError={showErrorMessage} />
                </Layout.Content>
            </Layout>
        </UsersProvider>
    )
}

export default App
