import axios from 'axios'

//Creamos una instancia de Axios para no estar seteando la API URL
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APIURL || ''
})

export default axiosInstance