import { AxiosError, HttpStatusCode } from "axios";
import { Api } from "../../server/Api";
import { User } from "./User.type";

// instancia de la clase Api, se utiliza el patron repository para centralizar el llamado y contrato de las apis
const userApi = new Api<User>("http://localhost:9000/api/users");

export const getAllUsersApi = async (): Promise<User[]> => {
  try {
    const allUsers = await userApi.getAll();
    return allUsers;
  } catch (error) {
    // En esta parte validamos el mensaje de error a devolver, si es una instancia de axios devolvemos el mensaje correspondiente, de no ser así un mensaje generico, igualmente siempre entrara en la condición
    if (error instanceof AxiosError) throw new Error(error.message);
    else throw new Error("Error al obtener todo los usuarios");
  }
};

export const deleteUserByIdApi = async (
  id: string
): Promise<HttpStatusCode> => {
  try {
    const statusCode = await userApi.deleteUserById(id);
    return statusCode;
  } catch (error) {
    // En esta parte validamos el mensaje de error a devolver, si es una instancia de axios devolvemos el mensaje correspondiente, de no ser así un mensaje generico, igualmente siempre entrara en la condición
    if (error instanceof AxiosError) throw new Error(error.message);
    else throw new Error("Error al eliminar el usuario indicado");
  }
};

export const saveUserApi = async (data: User): Promise<User> => {
  try {
    return await userApi.saveUser(data);
  } catch (error) {
    // En esta parte validamos el mensaje de error a devolver, si es una instancia de axios devolvemos el mensaje correspondiente, de no ser así un mensaje generico, igualmente siempre entrara en la condición
    if (error instanceof AxiosError) throw new Error(error.message);
    else throw new Error("Error al guardar el usuario");
  }
};
