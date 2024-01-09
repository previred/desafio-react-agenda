import { Control } from 'react-hook-form'
import InputCustom from '../InputCustom'
import { ContactSchemaType } from './schema'

interface FormDrawerProps {
  control: Control<ContactSchemaType>
}

/**
 * @description Componente para renderizar los campos del formulario en el Drawer de Contactos.
 *
 * Este componente utiliza el componente InputCustom para renderizar los campos del formulario con validaciones y control del estado.
 *
 * @param {FormDrawerProps} props - Propiedades para configurar el componente.
 * @returns {JSX.Element} - Elemento JSX que representa los campos del formulario en el Drawer.
 */
const FormDrawer = ({ control }: FormDrawerProps): JSX.Element => {
  return (
    <>
      <InputCustom
        className='mb-6'
        control={control}
        label='URL imagen de Perfil'
        name='photo'
        placeholder='Inserte la URL de la imagen de perfil'
      />
      <InputCustom
        className='mb-6'
        control={control}
        label='Nombre'
        name='name'
        placeholder='Escriba el nombre de contacto'
      />
      <InputCustom
        control={control}
        label='Descripción'
        name='description'
        placeholder='Agregue la descripción del contacto'
      />
    </>
  )
}

export default FormDrawer
