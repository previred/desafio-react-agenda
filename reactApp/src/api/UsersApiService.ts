import { IUser } from "../interfaces/IUser";
import { UserApiErrorHandler } from "./UserApiErrorHandler";
import axiosInstance from "./axiosInstance";

//Creamos una función por cada petición
export const UsersApiService = {
    getAllUsers: async (searchValue = ''): Promise<IUser[]> => {
        try {
            const { data } = await axiosInstance.get(`/users`, {
                params: {
                    q: Boolean(searchValue) ? searchValue : undefined
                }
            })
            return data
        } catch (error) {
            return UserApiErrorHandler<IUser[]>(error, [])
        }
    },
    deleteUserById: async (userId: number): Promise<boolean> => {
        try {
            await axiosInstance.delete(`/users/${userId}`)
            return true
        } catch (error) {
            return UserApiErrorHandler<boolean>(error, false)
        }
    },
    createUser: async (newUser: Partial<IUser>): Promise<IUser | null> => {
        try {
            const { data } = await axiosInstance.post(`/users`, newUser, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return data
        } catch (error) {
            return UserApiErrorHandler<null>(error, null)
        }
    }
}
