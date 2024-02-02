import { useCallback } from "react";
import axios from "axios";
import { DELETE_USERS_API_ROUTE } from "../_services/services";

export default function useDelete() {
  const deleteUser = useCallback(async (id: number) => {
    try {
      await axios.delete(DELETE_USERS_API_ROUTE + id);
      console.log(`User with ID ${id} has been deleted.`);
    } catch (error:any ) {
      console.error(`Error deleting user with ID ${id}: ${error.message}`);
    }
  }, []);

  return { deleteUser };
}
