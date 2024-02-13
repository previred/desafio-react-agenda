import { Context, createContext } from "react"

import { CreateUserBody, User, UsersPagination } from "../services/UsersApi.ts"

export interface UsersContextProps {
    tableUsers: User[]
    tablePagination: UsersPagination
    fetchPage: (page: number) => void
    fetchQuery: (query: string) => void
    deleteUser: (id: number) => Promise<any>
    createUser: (body: CreateUserBody) => Promise<any>
}

// force to set the defaultValue to undefined
export const UsersContext: Context<UsersContextProps | undefined> = createContext<UsersContextProps | undefined>(undefined)
