import { useContext } from "react"

import { UsersContext, UsersContextProps } from "./UsersContext.ts"

// Helper Hook to check for undefined context
export const useUsersContext = (): UsersContextProps => {
    const userContext = useContext<UsersContextProps | undefined>(UsersContext)
    if( !userContext )
        throw new Error("useUsersContext must be used within UsersProvider")
    return userContext
}
