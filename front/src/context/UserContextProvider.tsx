import { FC, useEffect, useState } from 'react';
import { getAllUsers } from '../ApiFunctions';
import { UserContext } from './UserContext';

interface MyContextProviderProps {
  children: React.ReactNode;
}

const UserContextProvider: FC<MyContextProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<string[]>([]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);

    } catch (error) {
      console.error('Error Fetching users:', error);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{users, setUsers}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
