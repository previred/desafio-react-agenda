import { FC, ReactElement, ReactNode, useEffect, useState } from "react"

import { UsersContext } from "./UsersContext.ts"
import UsersApi, { CreateUserBody, User, UsersPagination } from "../services/UsersApi.ts"

interface UsersProviderProps {
    children?: ReactNode
}

const DEFAULT_PAGE = 1
const DEFAULT_QUERY = ""

export const UsersProvider: FC<UsersProviderProps> = ({ children }): ReactElement => {
    const [queryBy, setQueryBy] = useState<string>(DEFAULT_QUERY)
    const [tableUsers, setTableUsers] = useState<User[]>([])
    const [tablePagination, setTablePagination] = useState<UsersPagination>({
        current: DEFAULT_PAGE,
        total: 0
    })

    const fetchPage = (page: number = 1): void => {
        setTablePagination({ current: page, total: 0 })

        UsersApi.getUsers(page, queryBy)
            .then(({ users, pagination}) => {
                setTableUsers(users)
                setTablePagination(pagination)
                return users
            })
    }

    const fetchQuery = (query: string): void => {
        setQueryBy(query)
        setTablePagination({ current: DEFAULT_PAGE, total: 0 })

        UsersApi.getUsers(DEFAULT_PAGE, query)
            .then(({ users, pagination }) => {
                setTableUsers(users)
                setTablePagination(pagination)
                return users
            })
    }

    const deleteUser = (id: number): Promise<any> => (
        // after delete: clear filter, and query from the start
        UsersApi.deleteUser(id)
            .then(() => fetchQuery(DEFAULT_QUERY))
    )

    const createUser = (body: CreateUserBody): Promise<any> => (
        // after create: clear filter, and query from the start
        UsersApi.createUser(body)
            .then(() => fetchQuery(DEFAULT_QUERY))
    )

    useEffect(() => {
        fetchPage(1)
    }, [])

    return (
        <UsersContext.Provider value={{
            tableUsers,
            tablePagination,
            fetchPage,
            fetchQuery,
            deleteUser,
            createUser,
        }} >
            {children}
        </UsersContext.Provider>
    )
}
