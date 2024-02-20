import { useContext } from "react";
import { UserContext } from "../Context/context";
import {
  getAllUsersApi,
  deleteUserByIdApi,
  saveUserApi,
} from "../api/User/User";
import { User } from "../api/User/User.type";

export const useUsers = () => {
  const { getFilterUser, getAllUsers, changeIsOpenDraw, stateUsers } =
    useContext(UserContext);
  const { isOpenDrawer, usersList } = stateUsers;
  const listUserFilter = (letter: string) => {
    getFilterUser(letter);
  };

  const loadUserList = () => {
    getAllUsersApi()
      .then((res) => {
        getAllUsers(res);
      })
      .catch((err: Error) => {
        new Error(err.message);
      });
  };

  const deleteUserById = async (id: string): Promise<number> => {
    return await deleteUserByIdApi(id);
  };

  const saveUser = async (data: User): Promise<User> => {
    const response = await saveUserApi(data);
    return response;
  };

  const onCloseDrawer = () => {
    changeIsOpenDraw(false);
  };

  const isOpen = isOpenDrawer;
  const userList = usersList;

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
