import { Table, TableProps } from 'antd'
import { FC } from 'react'
import { IUser } from '../../interfaces/IUser'

interface IDatatableComponentProps<T> {
    columns: TableProps<T>['columns']
    data: T[]
    isLoading: boolean
}

//Creamos un componente Datatable para poder reutilizar en más componentes de la aplicación si es que lo necesitase más adelante
export const DatatableComponent: FC<IDatatableComponentProps<IUser>> = ({ columns, data, isLoading }) => {
    return (
        <>
            <Table
                columns={columns} 
                dataSource={data}
                loading={isLoading}
            />
        </>
    )
}
