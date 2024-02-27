// Importaciones de dependencias.
import { FC, ReactElement } from "react";
import { Input } from "antd";

/**
 * Interface para definir las propiedades esperadas por el componente SearchInput.
 * @property {Function} onSearch - Función que se llama al realizar una búsqueda.
 */
interface SearchInputProps {
  onSearch: (value: string) => void;
}

/**
 * Componente SearchInput que proporciona un campo de búsqueda.
 *
 * Este componente utiliza Input.Search de Ant Design para ofrecer una interfaz de búsqueda
 * estilizada y funcional. Está diseñado para ser reutilizable y fácil de integrar en diferentes partes
 * de una aplicación.
 *
 * Props:
 * - onSearch: Función que se invoca cuando el usuario realiza una búsqueda, pasando el valor ingresado.
 *
 * @param {SearchInputProps} props - Propiedades del componente.
 * @returns {ReactElement} Un campo de búsqueda funcional.
 */
const SearchInput: FC<SearchInputProps> = ({ onSearch }): ReactElement => (
  <div style={{ marginTop: 20 }}>
    <Input.Search
      placeholder="Ingrese un término de búsqueda..."
      onSearch={onSearch}
      allowClear
    />
  </div>
);

export default SearchInput;
