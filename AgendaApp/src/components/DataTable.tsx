// Importaciones de Ant Design para usar el componente Table.
import { Table, TableProps } from "antd";

/**
 * Interface para las propiedades del componente DataTable.
 * Este componente es genérico y puede manejar cualquier tipo de datos, facilitando la creación
 * de tablas dinámicas con funcionalidades como paginación y carga.
 *
 * @template T - Tipo genérico que extiende de object, asegurando que los datos manejados sean objetos.
 *
 * @param rowKey - Propiedad única requerida para cada fila de datos, utilizada por Ant Design para optimizar el renderizado de la lista.
 * @param columns - Configuración de las columnas de la tabla. Debe ser un arreglo de objetos que definen cómo se deben mostrar los datos.
 * @param dataSource - Arreglo de datos de tipo T que se mostrarán en la tabla.
 * @param isLoading - Controla la visualización del indicador de carga en la tabla.
 * @param pageCurrent - Número de la página actual para la paginación de la tabla.
 * @param totalCount - Número total de elementos en todos las páginas, necesario para calcular el número de páginas en la paginación.
 * @param pageSize - Número de elementos a mostrar en cada página.
 * @param onChange - Función que maneja el cambio de página o tamaño de página. Recibe el número de la nueva página y el tamaño de página.
 */
interface IDataTableProps<T extends object> {
  rowKey: string;
  columns: TableProps<T>["columns"];
  dataSource: T[];
  isLoading: boolean;
  pageCurrent: number;
  totalCount: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
}

/**
 * Componente DataTable genérico para mostrar tablas de datos con funcionalidades de paginación y carga.
 * Utiliza el componente Table de Ant Design, adaptándolo para un uso más genérico y flexible.
 *
 * @template T - Tipo genérico que extiende de object.
 * @param props - Propiedades del componente, conforme a la interfaz IDataTableProps<T>.
 *
 * @return El componente Table configurado con las propiedades proporcionadas.
 */
const DataTable = <T extends object>({
  rowKey,
  columns,
  dataSource,
  isLoading,
  pageCurrent,
  totalCount,
  pageSize,
  onChange,
}: IDataTableProps<T>) => {
  return (
    <Table<T>
      rowKey={rowKey} // Identificador único para cada fila.
      dataSource={dataSource} // Datos a mostrar en la tabla.
      columns={columns} // Configuración de las columnas de la tabla.
      loading={isLoading} // Indicador de carga mientras los datos están siendo cargados.
      pagination={{
        // Configuración de la paginación de la tabla.
        current: pageCurrent, // Página actual.
        total: totalCount, // Total de datos a paginar.
        pageSize: pageSize, // Número de datos por página.
        showSizeChanger: false, // Selector de cantidad de filas
        onChange: (page) => onChange(page, pageSize), // Manejador para cambios de página o tamaño de página.
      }}
    />
  );
};

export default DataTable;
