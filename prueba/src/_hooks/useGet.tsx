import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { GET_USERS_API_ROUTE } from "../_services/services";

export default function useGet() {
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    const response = await axios.get(GET_USERS_API_ROUTE);
    setUsers(response.data);
  }, []);

  const search = async (value: string) => {
    const response = await axios.get(`${GET_USERS_API_ROUTE}?q=${value}`);
    setUsers(response.data);
  }

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return { users, getUsers, search};
}
