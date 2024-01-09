import { z as zod } from 'zod'

export const ContactSchema = zod.object({
  photo: zod
    .string({
      required_error: 'Este campo es requerido'
    })
    .min(1, 'Este campo es requerido')
    .url(),
  name: zod
    .string({
      required_error: 'Este campo es requerido'
    })
    .min(1, 'Este campo es requerido'),
  description: zod
    .string({
      required_error: 'Este campo es requerido'
    })
    .min(1, 'Este campo es requerido')
})

export const initialValues = {
  photo: '',
  name: '',
  description: ''
}

export type ContactSchemaType = zod.infer<typeof ContactSchema>
