import { useEffect, useState } from "react";
import { createApiUserRepository } from '../users/infrastructure/ApiUserRepository';
import { User } from '../users/domain/User';

const useApiGetAllUsers = (setDataApi: React.Dispatch<React.SetStateAction<User[]>>) => {
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await createApiUserRepository().getAll();
                
                setDataApi(response);
                
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
        fetchData();
    }, [setDataApi])

    return [loading, error];
}
export default useApiGetAllUsers;