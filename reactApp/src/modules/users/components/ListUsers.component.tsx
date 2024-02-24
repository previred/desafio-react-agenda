import { FC } from 'react'
import { DatatableComponent, SearchInputComponent } from '../../../common/components'
import { useListUsers } from '../hooks'
import { ListUserColumns } from './ListUserColumns'

export const ListUsersComponent: FC = () => {

    //Ocupamos nuestro hook useListUser para obtener la data de usuarios, si está cargando y la función para setear la búsqueda
    const { users, loading, setSearchValue } = useListUsers()

    return (
        <>
            <SearchInputComponent isLoading={loading} setValue={setSearchValue} />
            <DatatableComponent columns={ListUserColumns} data={users} isLoading={loading} />
        </>
    )
}
