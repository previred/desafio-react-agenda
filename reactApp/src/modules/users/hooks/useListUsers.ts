import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useUserContext } from './useUserContext'
import { UsersApiService } from '../../../api'

//Aislamos la lógica del componente ListUsersComponent a un Hook
export const useListUsers = () => {

    //Usamos nuestro hook para ocupar el contexto
    const { state, dispatch } = useUserContext()

    //Estado para la búsqueda
    const [searchValue, setSearchValue] = useState<string>('')

    //Utilizamos useQuery para la llamada a la API y gestionar los estados de mejor forma
    const { data, isFetching } = useQuery({
        queryKey: ['GET_ALL_USERS', searchValue],
        queryFn: () => UsersApiService.getAllUsers(searchValue),
        initialData: []
    })

    //Utilizamos useEffect para cuando obtengamos la data del API
    useEffect(() => {
        //creamos un dispatch para setear los usuarios que vienen de la petición
        dispatch({ type: 'SET_USERS', payload: data })
    }, [data])

    //Retornamos lo que ocupamos en el componente
    return {
        users: state,
        loading: isFetching,
        setSearchValue
    }
}
