import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button} from 'antd';

/**
 * Función que muestra el formulario para agregar un nuevo contacto.
 * Esta función podría ser utilizada para enviar propiedades a un componente Form.
 */
const showForm = () => {
    // Aquí se podría implementar la lógica para mostrar el formulario de contacto.
};

/**
 * Componente funcional que representa la aplicación principal.
 */
const App: React.FC = () => {
    /**
     * Manejador de evento para el clic en el botón "Agregar Contacto".
     * Llama a la función showForm para mostrar el formulario.
     */
    const handleClick = () => {
        showForm();
    };

    return (
        // Botón para agregar un nuevo contacto
        <Button type="primary" icon={<SearchOutlined />} onClick={handleClick}>
            Agregar Contacto
        </Button>
    );
};

export default App;
