import axios, { AxiosError } from "axios"

//Tenemos aquí un pequeño manejador de errores que devuelve a la consola el status code http y retornamos algún valor por defecto
export const UserApiErrorHandler = <T>(error: unknown, data: T): T => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
            console.error('Error de la API: ', axiosError.response.status);
        }
    }
    return data
}