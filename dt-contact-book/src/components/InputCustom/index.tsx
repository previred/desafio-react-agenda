import { Input, Typography } from 'antd'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface InputCustomProps<T extends FieldValues> {
  className?: string
  control: Control<T>
  label: string
  name: Path<T>
  placeholder?: string
}

/**
 * @description Componente personalizado de entrada que utiliza react-hook-form para la gestión del estado del formulario.
 *
 * Este componente envuelve el componente Input de antd y proporciona integración con react-hook-form.
 *
 * @template T
 * @param {InputCustomProps<T>} props - Propiedades para el componente InputCustom.
 * @returns {JSX.Element} - El componente InputCustom renderizado.
 */
const InputCustom = <T extends FieldValues>(
  props: InputCustomProps<T>
): JSX.Element => {
  return (
    <div className={`${props.className} flex flex-col`}>
      <Typography.Text className='mb-2'>{props.label}</Typography.Text>
      <Controller
        control={props.control}
        name={props.name}
        render={({
          field: { onChange, value },
          fieldState: { invalid, error }
        }) => (
          <>
            <Input
              placeholder={props.placeholder}
              onChange={onChange}
              status={invalid ? 'error' : ''}
            />
            {invalid && (
              <Typography.Text type='danger'>{error?.message}</Typography.Text>
            )}
          </>
        )}
      />
    </div>
  )
}

export default InputCustom
