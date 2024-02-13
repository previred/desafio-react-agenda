import { FC, ReactElement, ReactNode, useEffect, useState } from "react"

import { UsersContext } from "./UsersContext.ts"
import UsersApi, { User, UsersPagination } from "../services/UsersApi.ts"

interface UsersProviderProps {
    children?: ReactNode
}

export const UsersProvider: FC<UsersProviderProps> = ({ children }): ReactElement => {
    const [tableUsers, setTableUsers] = useState<User[]>([])
    const [tablePagination, setTablePagination] = useState<UsersPagination>({
        current: 1,
        total: 0
    })

    const fetchPage = (page: number = 1): void => {
        setTablePagination({ current: page, total: 0 })

        UsersApi.getUsers(page)
            .then(({ users, pagination}) => {
                console.log(users, pagination)
                setTableUsers(users)
                setTablePagination(pagination)
                return users
            })
    }

    useEffect(() => {
        fetchPage(1)
    }, [])

    return (
        <UsersContext.Provider value={{
            tableUsers,
            tablePagination,
            fetchPage,
        }} >
            {children}
        </UsersContext.Provider>
    )
}
