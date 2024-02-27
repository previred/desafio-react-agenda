// Importación del módulo Axios para realizar solicitudes HTTP.
import axios from "axios";

// Se obtienen las variable de entorno VITE_API_URL y VITE_API_TIMEOUT usando import.meta.env.
// Estas variables se utilizan para especificar la URL base de todas las solicitudes API y el tiempo máximo de ejecución de la llamada,
// respectivamente. Ambas deben ser definidas en el archivo .env en la raíz del proyecto.
// VITE_API_URL es la dirección base del servidor API con el que se comunica la aplicación.
// VITE_API_TIMEOUT es el tiempo en milisegundos antes de que una solicitud se considere fallida por tiempo de espera.
const { VITE_API_URL, VITE_API_TIMEOUT } = import.meta.env;

// Verificación para asegurarse de que VITE_API_URL está definida.
// Si no está definida, se genera un error para evitar la ejecución con una configuración incorrecta.

// Verificación para asegurarse de que ambas VITE_API_URL y VITE_API_TIMEOUT están definidas.
// Se genera un error si alguna de las dos variables no está definida.
if (!VITE_API_URL || !VITE_API_TIMEOUT) {
  throw new Error(
    "VITE_API_URL o VITE_API_TIMEOUT no está definida en el entorno."
  );
}

// Creación de una instancia de Axios con configuraciones predeterminadas basadas en las variables de entorno.
// - `baseURL` se establece con VITE_API_URL para definir el prefijo de URL para todas las llamadas a la API.
// - `timeout` se establece con VITE_API_TIMEOUT para definir un límite de tiempo en las solicitudes.
const AxiosInstance = axios.create({
  baseURL: VITE_API_URL,
  timeout: VITE_API_TIMEOUT,
});

export { AxiosInstance };
