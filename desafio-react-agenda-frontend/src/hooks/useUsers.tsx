import { useState, useEffect, useCallback } from 'react';
import { getUsers } from '../services/apiService';
import { IUser } from '../types/userTypes';

const useUsers = (initialPage = 1, pageSize = 10) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getUsers(currentPage, pageSize);
      setUsers(result.data);
      setTotalUsers(result.total);
    } catch (err) {
      setError('An error occurred while fetching the users.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, totalUsers, setCurrentPage };
};

export default useUsers;