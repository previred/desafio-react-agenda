import { useMutation } from "@tanstack/react-query"
import { useUserContext } from "./useUserContext"
import { IUser } from "../../../interfaces/IUser"
import { UsersApiService } from "../../../api"

//Creamos hook para eliminar usuario y desacoplar la lógica del componente
export const useDeleteUser = (user: IUser) => {
    //Usamos nuestro hook para ocupar el contexto
    const { dispatch } = useUserContext()

    //Creamos una mutación para borrar un usuario y manejar el estado de la petición
    const mutationDeleteUser = useMutation({
        mutationFn: () => UsersApiService.deleteUserById(user.id),
        onSuccess: () => {
            //creamos un dispatch para borrar un usuario de nuestro estado de IUser[]
            dispatch({type: 'DELETE_USER', payload: user.id})
        }
    })

    const handleConfirm = () => {
        //Ejecutamos la mutación cuando el usuario de OK en el popconfirm
        mutationDeleteUser.mutate()
    }

    //Retornamos lo que ocuparemos en el componente
    return {
        handleConfirm
    }
}