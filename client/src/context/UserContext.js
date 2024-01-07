import React, { createContext, useState, useCallback } from 'react';
import { fetchUsers, addUser, deleteUser } from '../api/users';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadUsers = useCallback(async (page, limit, query) => {
    setLoading(true);
    try {
      const fetchedUsers = await fetchUsers(page, limit, query);
      setTotalCount(fetchedUsers.totalCount);
      setUsers(fetchedUsers.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
    setLoading(false);
  }, []);

  const handleAddUser = useCallback(async (user) => {
    try {
      const newUser = await addUser(user);
      setTotalCount((totalCount) => totalCount + 1);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  }, []);

  const handleDeleteUser = useCallback(async (userId) => {
    try {
      await deleteUser(userId);
      setTotalCount((totalCount) => totalCount - 1);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ users, totalCount, loadUsers, handleAddUser, handleDeleteUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
