import { Form, Input, message, Space } from 'antd';
import { useApi } from '../../utils/apiContext'; 
import { BASE_URL } from '../../utils/api'; 

/**
 * Propiedades esperadas por el componente Formulario.
 */
interface Props {
    functionSubmit: () => void; // Función para llamar cuando se envía el formulario
    form: any; // Recibe la instancia del formulario como prop
}

/**
 * Componente funcional que representa el formulario para agregar un nuevo contacto.
 */
const Formulario: React.FC<Props> = ({ functionSubmit, form }) => {
    // Función para recargar los datos después de enviar el formulario
    const { refetchData } = useApi();

    /**
     * Manejador para recargar los datos y resetear el formulario.
     */
    const handleReloadData = () => {
        refetchData(); 
        form.resetFields(); 
    };

    /**
     * Función para manejar el envío del formulario.
     */
    const onFinish = async (formData: any) => {
        try {
            // Envía los datos del formulario al servidor
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit data');
            }

            // Muestra un mensaje de éxito
            message.success('¡Contacto guardado!');
            // Llama a la función para cerrar el formulario
            functionSubmit();
            // Recarga los datos
            handleReloadData();

        } catch (error) {
            console.error('Error submitting data:', error);
            // Muestra un mensaje de error si hay algún problema al enviar los datos
            message.error('¡Completar formulario!');
        }
    };

    /**
     * Función para manejar el error al enviar el formulario.
     */
    const onFinishFailed = () => {
        // Muestra un mensaje de error si no se completó correctamente el formulario
        message.error('¡Completar formulario!');
    };

    return (
        <div>
            {/* Formulario de Ant Design */}
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                colon={false}
            >
                {/* Campo para la URL de la foto */}
                <Form.Item
                    name="photo"
                    label={<strong>URL imagen de Perfil</strong>}
                    rules={[
                        { required: true, message: 'Por favor ingresa la URL de la imagen' },
                        { type: 'url', message: 'Por favor ingresa una URL válida' },
                        { type: 'string', min: 6, message: 'La URL debe tener al menos 6 caracteres' },
                    ]}
                >
                    <Input placeholder="URL de la imagen" />
                </Form.Item>
                {/* Campo para el nombre */}
                <Form.Item
                    label={<strong>Nombre</strong>}
                    name="name"
                    rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
                >
                    <Input />
                </Form.Item>   
                {/* Campo para la descripción */}
                <Form.Item
                    label={<strong>Descripción</strong>}
                    name="description"
                    rules={[{ required: true, message: 'Por favor ingresa la descripción' }]}
                >
                    <Input />
                </Form.Item>                 
            </Form>
        </div>
    );
};

export default Formulario;
