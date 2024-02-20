import { useContext } from "react";
import { UserContext } from "../Context/context";
import { getAllUsersApi, deleteUserByIdApi } from "../api/User/User";

export const useUsers = () => {
  const { getFilterUser, getAllUsers } = useContext(UserContext);

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

  return { listUserFilter, loadUserList, deleteUserById };
};
