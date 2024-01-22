import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { getUsers } from '../services/apiService';
import { IUser } from '../types/userTypes';

// Definición del tipo para los props del proveedor
interface UsersProviderProps {
  children: ReactNode; // Define el tipo para children
}

// Definición del tipo para el contexto
type UsersContextType = {
  users: IUser[];
  loading: boolean;
  error: string | null;
  totalUsers: number;
  currentPage: number;
  pageSize: number;
  fetchUsers: () => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  setTotalUsers: React.Dispatch<React.SetStateAction<number>>;
  setAllUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

// Creación del contexto con un valor por defecto
export const UsersContext = createContext<UsersContextType | null>(null);

// Proveedor del contexto
export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [searchText, setSearchText] = useState<string>('');
  const [allUsers, setAllUsers] = useState<IUser[]>([]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getUsers(currentPage, pageSize);
      setUsers(result.data);
      setTotalUsers(result.total);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error al cargar los usuarios');
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const contextValue: UsersContextType = {
    users,
    loading,
    error,
    totalUsers,
    currentPage,
    pageSize,
    fetchUsers,
    setCurrentPage,
    setPageSize,
    setSearchText,
    setLoading,
    setUsers,
    setTotalUsers,
    setAllUsers,
    setError,
  };

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};