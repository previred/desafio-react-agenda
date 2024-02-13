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

export interface DeleteUserResponse {
    // empty response
}

export interface CreateUserBody {
    name: string
    description: string
    photo: string
}

export interface CreateUserResponse {
    // empty response
}

const throwErrorIfNotOk = (res: Response) : Response =>  {
    if (!res.ok) throw new Error(`Status Code ${res.status}`)

    return res
}

const UsersApi = {
    getUsers: (page: number, query: string, limit: number = 10): Promise<GetUsersResponse> => (
        fetch(`${SERVER_ADDRESS}/api/users?_page=${page}&_limit=${limit}&q=${query}`, {})
            .then(throwErrorIfNotOk)
            .then(async (res: Response) => ({
                users: await res.json(),
                pagination: {
                    current: page,
                    // json-server gives the total amount of items in a Response Header
                    // ref: https://github.com/typicode/json-server/issues/371
                    total: Number.parseInt(res.headers.get('X-Total-Count') || '1')
                }
            }))
    ),

    deleteUser: (id: number): Promise<DeleteUserResponse> => (
        fetch(`${SERVER_ADDRESS}/api/users/${id}`, { method: 'DELETE' })
            .then(throwErrorIfNotOk)
            .then((res: Response) => res.json())
    ),

    createUser: (body: CreateUserBody): Promise<CreateUserResponse> => (
        fetch(`${SERVER_ADDRESS}/api/users`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
            .then(throwErrorIfNotOk)
            .then((res: Response) => res.json())
    ),
}

export default UsersApi
