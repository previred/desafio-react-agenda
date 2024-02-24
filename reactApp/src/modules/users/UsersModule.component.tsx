import { FC, useReducer } from 'react'
import { MainLayout } from '../../layouts/Main.layout'
import { UserContext } from './contexts/UserContext'
import { userReducer } from './reducers/userReducer'
import { AddUserComponent, ListUsersComponent } from './components'

export const UsersModuleComponent: FC = () => {

    //Inicializamos el userReducer
    const [state, dispatch] = useReducer(userReducer, [])

    return (
        <MainLayout>
            {/* Lo seteamos al Context */}
            <UserContext.Provider value={{ state, dispatch }}>
                <AddUserComponent />
                <ListUsersComponent />
            </UserContext.Provider>
        </MainLayout>
    )
}
