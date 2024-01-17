import { createContext } from 'react';

export const UserContext = createContext<{ users: string[]; setUsers: (users: string[]) => void }>({
    users: [],
    setUsers: () => []
  });