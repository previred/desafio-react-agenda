import { Form } from "antd"
import { useUserContext } from "./useUserContext"
import { useMutation } from "@tanstack/react-query"
import { IUser } from "../../../interfaces/IUser"
import { UsersApiService } from "../../../api"
import { useOpenClose } from "../../../common/hooks"

//Creamos hook para eliminar usuario y desacoplar la lógica del componente
export const useCreateUser = () => {

    //Usamos nuestro hook para ocupar el contexto
    const { dispatch } = useUserContext()

    //Obtenemos hook de form de AntD para poder ocuparlo
    const [form] = Form.useForm()

    //Usamos el hook para abrir y cerrar el Drawer
    const { opened, handleClose, handleOpen } = useOpenClose(false)

    //Creamos una mutación para la creación del nuevo usuario
    const mutation = useMutation({
        mutationFn: (newUser: Partial<IUser>) => UsersApiService.createUser(newUser),
        onSuccess: (userCreated: IUser | null) => {
            if (userCreated) {
                //reseteamos el formulario
                form.resetFields()
                //creamos un dispatch para el agregar usuario a nuestro estado de IUser[]
                dispatch({ type: 'ADD_USER', payload: userCreated })
                //Cerramos el formulario
                handleClose()
            }
        }
    })

    const onFinish = (values: Partial<IUser>) => {
        //Ejecutamos la mutación cuando el formulario esté correcto al submit
        mutation.mutate(values)
    }

    //Retornamos lo que ocuparemos en el componente
    return {
        form,
        opened,
        handleOpenDrawer: handleOpen,
        handleCloseDrawer: handleClose,
        submitForm: onFinish
    }
}