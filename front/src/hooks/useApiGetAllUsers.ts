import { useEffect, useState } from "react";
import { createApiUserRepository } from '../users/infrastructure/ApiUserRepository';
import { User } from '../users/domain/User';

const useApiGetAllUsers = () => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await createApiUserRepository().getAll();
      setData(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Error desconocido"));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [loading, data, fetchData, error] as const;
};

export default useApiGetAllUsers;