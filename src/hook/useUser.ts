import { useContext } from "react";
import { UserContext } from "../Context/context";
import {
  getAllUsersApi,
  deleteUserByIdApi,
  saveUserApi,
} from "../api/User/User";
import { User } from "../api/User/User.type";
import { AxiosError } from "axios";

export const useUsers = () => {
  const { getFilterUser, getAllUsers, changeIsOpenDraw, stateUsers } =
    useContext(UserContext);
  const { isOpenDrawer, usersList } = stateUsers;

  const listUserFilter = (letter: string) => {
    try {
      getFilterUser(letter);
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error.message);
      else throw new Error("Error al obtener el usuario");
    }
  };

  const loadUserList = () => {
    getAllUsersApi()
      .then((res) => {
        getAllUsers(res);
      })
      .catch((error: Error) => {
        if (error instanceof AxiosError) throw new Error(error.message);
        else throw new Error("Error al obtener todo los usuarios");
      });
  };

  const deleteUserById = async (id: string): Promise<number> => {
    try {
      return await deleteUserByIdApi(id);
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error.message);
      else throw new Error("Error al eliminar el usuario");
    }
  };

  const saveUser = async (data: User): Promise<User> => {
    try {
      const response = await saveUserApi(data);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error.message);
      else throw new Error("Error al guardar el usuario");
    }
  };

  const onCloseDrawer = () => {
    changeIsOpenDraw(false);
  };

  // retorna estado global del drawer, es un booleano
  const isOpen = isOpenDrawer;

  //Lista de usuarios que estan guardados en el estado global
  const userList = usersList;

  //valida que los campos del formulario no esten sin información
  const isDisabledForm = (formData: User) =>
    !formData?.name || !formData?.description || !formData?.photo;

  return {
    listUserFilter,
    loadUserList,
    deleteUserById,
    saveUser,
    onCloseDrawer,
    isOpen,
    userList,
    isDisabledForm,
  };
};
