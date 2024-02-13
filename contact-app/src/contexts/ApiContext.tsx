import { createContext, useContext, useState, ReactNode } from "react"

interface User {
  key: string;
  id: string;
  name: string;
  description: string;
  photo: string;
  action: string;
}

interface ApiContextProps {
  users: User[];
  getUsers: () => void;
  //usersImageExists: boolean[];
}

const ApiContext = createContext<ApiContextProps | undefined >(undefined);

export const ApiProvider: React.FC<{ children : ReactNode }> = ({children}) => {
  const [ users, setUsers ] = useState<User[]>([]);
  //const [ usersImageExists, setUsersImageExists ] = useState<boolean[]>([]);

  const getUsers = async () => {
    try{
      const response = await fetch('http://localhost:9000/api/users',{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
        }
      });

      if( !response.ok ){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonContactsData = await response.json();
      setUsers(jsonContactsData);

      // Verificar la existencia de las imágenes aquí y actualizar el estado
      /*const imageExistence = await Promise.all(
        jsonContactsData.map(async (user: User) => {
          try {
            await fetch(user.photo, { method: 'HEAD' });
            return true;
          } catch (error) {
            return false;
          }
        })
      );

      setUsersImageExists(imageExistence);*/

    } catch (error){
      console.error('Error getting users: ', error);
    }
  }

  const contextValue: ApiContextProps = {
    users,
    getUsers
    //usersImageExists,
  };

  return <ApiContext.Provider value={contextValue}>{ children }</ApiContext.Provider>

};

export const useApi = (): ApiContextProps => {
  const context = useContext(ApiContext);
  if(!context){
    throw new Error('useApi must be used on an ApiProvider')
  }
  return context;
};
