import { FC } from 'react'
import { Divider, Input } from 'antd'

interface ISearchInputComponentProps {
    setValue: (value: string) => void
    isLoading: boolean
}

//Creamos un componente SearchInput para poder reutilizar en más componentes de la aplicación si es que lo necesitase más adelante
export const SearchInputComponent: FC<ISearchInputComponentProps> = ({ setValue, isLoading }) => {

    const handleSearch = (value: string) => {
        setValue(value)
    }

    return (
        <>
            <Input.Search placeholder="Ej: Pedro" allowClear onSearch={handleSearch} loading={isLoading} />
            <Divider />
        </>
    )
}
