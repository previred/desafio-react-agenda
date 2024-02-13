import { SERVER_ADDRESS } from "../utils/constants.ts"

export interface User {
    description: string
    id: number
    name: string
    photo: string
}

export interface UsersPagination {
    current: number
    total: number
}

interface GetUsersResponse {
    users: User[]
    pagination: UsersPagination
}

const UsersApi = {
    getUsers: (page: number, limit: number = 10): Promise<GetUsersResponse> => {
        return fetch(`${SERVER_ADDRESS}/api/users?_page=${page}&_limit=${limit}`, {})
            .then(async (res: Response) => ({
                users: await res.json(),
                pagination: {
                    current: page,
                    // json-server gives the total amount of items in a Response Header
                    // ref: https://github.com/typicode/json-server/issues/371
                    total: Number.parseInt(res.headers.get('X-Total-Count') || '1')
                }
            }))
    }
}

export default UsersApi
